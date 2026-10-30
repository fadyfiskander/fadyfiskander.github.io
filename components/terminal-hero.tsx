"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  owner,
  projects,
} from "@/lib/portfolio"
import {
  bootOutput,
  chipCommands,
  idleReplay,
  bootSequence,
  runCommand,
  type TerminalLine,
} from "@/lib/terminal"
import { TERMINAL_RUN_EVENT, type TerminalRunDetail } from "@/lib/bus"

// ─── Small building blocks ─────────────────────────────────────────────────────

type ToneClass = { strong: string; body: string; soft: string; muted: string; faint: string }

/** The design's monochrome scale — deliberately narrow: three value steps. */
const toneClass: ToneClass = {
  strong: "text-zinc-50 font-medium",
  body: "text-zinc-400",
  soft: "text-zinc-400",
  muted: "text-zinc-600",
  faint: "text-zinc-600",
}

type Entry =
  | { id: number; kind: "line"; line: TerminalLine }
  | { id: number; kind: "cmd"; text: string }

// ─── Component ─────────────────────────────────────────────────────────────────

export default function TerminalHero() {
  const [lines, setLines] = useState<Entry[]>([])
  const [value, setValue] = useState("")
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)

  const bodyRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const mounted = useRef(true)
  const touched = useRef(false)
  const history = useRef<string[]>([])
  const historyIdx = useRef<number | null>(null)
  const idRef = useRef(1)
  const idleCounter = useRef(0)

  const nextId = () => idRef.current++
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      if (mounted.current) fn()
    }, ms)
    timers.current.push(t)
  }
  const pushLine = useCallback((line: TerminalLine) => {
    if (mounted.current) setLines((prev) => [...prev, { id: nextId(), kind: "line", line }])
  }, [])
  const pushEcho = useCallback((text: string) => {
    if (mounted.current) setLines((prev) => [...prev, { id: nextId(), kind: "cmd", text }])
  }, [])
  const respond = useCallback(
    (out: TerminalLine[]) => {
      out.forEach((l, i) => later(() => pushLine(l), 45 * i + 20))
    },
    [pushLine],
  )

  /** Types `cmd` into the input character by character, then executes it. */
  const typeAndRun = (cmd: string) => {
    if (busy || !mounted.current) return
    setBusy(true)
    let i = 0
    const tick = () => {
      if (!mounted.current) return
      i++
      setValue(cmd.slice(0, i))
      if (i < cmd.length) later(tick, 36 + Math.random() * 46)
      else
        later(() => {
          execute(cmd, false)
          setBusy(false)
        }, 340)
    }
    later(tick, 90)
  }

  /** Echo + dispatch a command. `fromUser` stops the idle replay loop. */
  const execute = useCallback(
    (raw: string, fromUser: boolean) => {
      const cmd = raw.trim()
      if (fromUser) touched.current = true
      pushEcho(cmd)
      if (cmd) {
        history.current.push(cmd)
        historyIdx.current = null
      }
      setValue("")
      const { clear, lines: out } = runCommand(cmd)
      if (clear) setLines([])
      else respond(out)
    },
    [pushEcho, respond],
  )

  // ── Boot + idle replay loop ──────────────────────────────────────────────────
  const bootPlan = useMemo(() => bootSequence, [])

  useEffect(() => {
    mounted.current = true
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      let id = 0
      const instant: Entry[] = []
      for (const l of bootOutput().slice(0, 2)) instant.push({ id: id++, kind: "line", line: l })
      instant.push({ id: id++, kind: "cmd", text: bootPlan[0] })
      for (const l of bootOutput().slice(2)) instant.push({ id: id++, kind: "line", line: l })
      idRef.current = id
      // non-motion path: everything is already printed, just queue it
      later(() => {
        setLines(instant)
        setBooted(true)
      }, 0)
      return
    }

    // MOTD appears before the first keystroke
    later(() => {
      bootOutput()
        .slice(0, 2)
        .forEach((l, i) => later(() => pushLine(l), 60 * i))
    }, 500)

    const beginReplay = () => {
      const loop = () => {
        if (!mounted.current || touched.current) return
        const cmd = idleReplay[idleCounter.current++ % idleReplay.length]
        later(() => {
          if (touched.current || !mounted.current) return
          typeAndRun(cmd)
          later(loop, 7200)
        }, 900)
      }
      loop()
    }

    // boot: type the opening command, execute, then hand over to replay loop
    later(() => {
      const boot = bootPlan[0]
      let i = 0
      const tick = () => {
        if (!mounted.current) return
        i++
        setValue(boot.slice(0, i))
        if (i < boot.length) later(tick, 38 + Math.random() * 42)
        else
          later(() => {
            execute(boot, false)
            setBusy(false)
            setBooted(true)
            later(beginReplay, 1400)
          }, 420)
      }
      setBusy(true)
      later(tick, 60)
    }, 1500)

    return () => {
      mounted.current = false
      for (const t of timers.current) clearTimeout(t)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootPlan])

  // bridge: project cards (and any other section) push commands into this shell
  const busyRef = useRef(false)
  const executeRef = useRef(execute)
  useEffect(() => {
    executeRef.current = execute
    busyRef.current = busy
  }, [execute, busy])

  useEffect(() => {
    const handler = (e: Event) => {
      const { command, focus } = (e as CustomEvent<TerminalRunDetail>).detail
      touched.current = true
      if (focus) {
        document.getElementById("terminal-banner")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      if (!busyRef.current) executeRef.current(command, false)
    }
    window.addEventListener(TERMINAL_RUN_EVENT, handler)
    return () => window.removeEventListener(TERMINAL_RUN_EVENT, handler)
  }, [])

  // keep pinned to the bottom as output arrives
  useEffect(() => {
    const b = bodyRef.current
    if (b) b.scrollTop = b.scrollHeight
  }, [lines, value])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !busy) {
      execute(value, true)
      inputRef.current?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const h = history.current
      if (!h.length) return
      const idx = historyIdx.current === null ? h.length - 1 : Math.max(0, historyIdx.current - 1)
      historyIdx.current = idx
      setValue(h[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx.current === null) return
      const idx = historyIdx.current + 1
      if (idx >= history.current.length) {
        historyIdx.current = null
        setValue("")
      } else {
        historyIdx.current = idx
        setValue(history.current[idx])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const v = value.trim()
      const pool = [...chipCommands.map((c) => c.command), "clear", "whoami", `show ${projects[0].id}`]
      const match = pool.find((c) => c.startsWith(v))
      if (match) setValue(match)
    }
  }

  const copyCurl = async () => {
    try {
      await navigator.clipboard.writeText(`curl -sL ${owner.website} | sh`)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <header className="bg-black text-zinc-100">
      {/* ── HUD ticker band ─────────────────────────────────────────────── */}
      <div className="border-b border-[#1f1f23] bg-[#0e0e10] px-5 py-2">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-1 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-x-4">
            <span className="flex items-center gap-1.5 text-zinc-100">
              <span className="motion-safe:animate-ping inline-block h-1.5 w-1.5 bg-zinc-50" />
              {"DEV_ENV // ACTIVE REPOSITORIES"}
            </span>
            <span className="hidden md:inline">
              FOCUS: <strong className="font-medium text-zinc-100">{`${owner.focusLabel.toUpperCase()} // FULL STACK`}</strong>
            </span>
            <span className="hidden lg:inline">
              ACADEMICS: <strong className="font-medium text-zinc-100">HELWAN UNIVERSITY MIS</strong>
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <span>
              PROJECTS: <span className="text-zinc-100">{projects.length} CORE</span>
            </span>
            <span className="text-[#1f1f23]">/</span>
            <span>
              RUNTIME: <span className="text-zinc-100">{owner.runtime}</span>
            </span>
            <span className="hidden sm:inline text-[#1f1f23]">/</span>
            <span className="hidden sm:inline">
              DATABASE: <span className="text-zinc-100">{owner.database}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Profile dossier headline ────────────────────────────────────── */}
      <section className="border-b border-b-[#1f1f23] bg-black px-5 pb-5 pt-6 sm:px-6">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] text-zinc-600">
                <span className="border border-[#1f1f23] bg-[#151518] px-2 py-0.5 text-zinc-400">
                  {owner.spec}
                </span>
                <span className="text-zinc-300">{owner.name.toUpperCase()}</span>
                <span className="text-zinc-700">{"//"}</span>
                <span>{owner.focusFull.toUpperCase()}</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.04em]">
                {owner.name}
              </h1>
              <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                {owner.intro}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px]">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 bg-zinc-50 px-4 py-2.5 font-medium text-black transition-colors hover:bg-zinc-300"
              >
                Featured Projects
                <span aria-hidden>↓</span>
              </a>
              <button
                onClick={copyCurl}
                className="inline-flex items-center gap-2 border border-zinc-800/60 bg-[#121214] px-4 py-2.5 text-zinc-100 transition-colors hover:border-zinc-700 hover:bg-[#18181b]"
              >
                <span className="text-zinc-600">[$]</span>
                <span>{`curl -sL ${owner.website} | sh`}</span>
                <span className="text-zinc-600" aria-hidden>
                  ⧉
                </span>
              </button>
            </div>
          </div>

          {/* ── The terminal banner ──────────────────────────────────────── */}
          <div
            id="terminal-banner"
            className="flex flex-col overflow-hidden border border-[#27272a] bg-[#050506]"
            onPointerDown={() => {
              touched.current = true
            }}
            onKeyDown={() => {
              touched.current = true
            }}
          >
            {/* window chrome */}
            <div className="flex items-center justify-between gap-4 border-b border-b-[#1f1f23] bg-[#0e0e10] px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="inline-block h-2.5 w-2.5 bg-zinc-600" />
                  <span className="inline-block h-2.5 w-2.5 bg-zinc-600" />
                  <span className="inline-block h-2.5 w-2.5 bg-zinc-600" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
                  <span className="font-medium text-zinc-100">{owner.hostname}</span>
                  <span className="text-zinc-700">:</span>
                  <span>{owner.cwd}</span>
                  <span className="hidden md:inline text-zinc-700">[dotnet:9.0⚡]</span>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-600">
                <span className="hidden sm:inline">
                  <span className="font-medium text-zinc-100">CLI:</span> {owner.shell}
                </span>
                <span className="hidden sm:inline text-[#1f1f23]">|</span>
                <span className="font-medium text-zinc-100">[SESSION ACTIVE]</span>
                <span>UTF-8</span>
              </div>
            </div>

            {/* exec pill bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-b-[#1f1f23] bg-[#121214] px-4 py-1.5 font-mono text-[11px]">
              <span className="mr-1 uppercase tracking-wider text-zinc-600">EXEC:</span>
              {chipCommands.map((c) => (
                <button
                  key={c.label}
                  onClick={() => {
                    touched.current = true
                    execute(c.command, false)
                    inputRef.current?.focus()
                  }}
                  className={`px-2 py-0.5 transition-colors ${
                    c.primary
                      ? "bg-[#2a2a2c] font-medium text-zinc-50 hover:bg-[#39393b]"
                      : "bg-[#2a2a2c] text-zinc-400 hover:bg-[#39393b] hover:text-zinc-50"
                  }`}
                >
                  {`[$ ${c.label}]`}
                </button>
              ))}
            </div>

            {/* scrollback — background carries the design's 3% scanline raster */}
            <div
              ref={bodyRef}
              aria-live="polite"
              className="scanlines relative h-[220px] select-text overflow-y-auto space-y-1 px-3.5 py-2.5 font-mono text-[11.5px] leading-relaxed sm:h-[260px] sm:px-4"
            >
              {lines.map((e) =>
                e.kind === "cmd" ? (
                  <div key={e.id} className="whitespace-pre-wrap break-words">
                    <span className="text-zinc-500">{owner.hostname}:~$ </span>
                    <span className="font-medium text-zinc-50">{e.text}</span>
                  </div>
                ) : (
                  <div key={e.id} className="whitespace-pre-wrap break-words text-zinc-300">
                    {e.line.map((s, i) => (
                      <span key={i} className={toneClass[s.tone ?? "body"]}>
                        {s.text}
                      </span>
                    ))}
                  </div>
                ),
              )}
            </div>

            {/* input row */}
            <form
              className="flex items-center gap-3 border-t border-t-[#1f1f23] bg-[#0e0e10] px-3.5 py-2 sm:px-4"
              onSubmit={(e) => {
                e.preventDefault()
                if (!busy) {
                  execute(value, true)
                }
              }}
            >
              <span className="hidden select-none font-mono text-[11.5px] font-medium text-zinc-600 sm:inline">
                {owner.hostname}:~$
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={
                  booted
                    ? `Try 'show ${projects[0].id}', 'projects', 'stack', 'clear'…`
                    : "booting session…"
                }
                disabled={busy || !booted}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-zinc-50 caret-zinc-50 placeholder:text-zinc-600 focus:outline-none disabled:cursor-default"
              />
              <button
                type="submit"
                disabled={busy || !booted}
                className="bg-zinc-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-black transition-colors hover:bg-zinc-300 disabled:opacity-40"
              >
                EXECUTE
              </button>
            </form>
          </div>
        </div>
      </section>
    </header>
  )
}
