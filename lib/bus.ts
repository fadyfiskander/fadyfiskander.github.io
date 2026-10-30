// ─── Terminal cross-section bridge ─────────────────────────────────────────────
// Lets any part of the page (project cards, nav, footer) push a command into the
// hero terminal without prop drilling or a context provider.

export const TERMINAL_RUN_EVENT = "terminal:run"

export type TerminalRunDetail = {
  command: string
  /** scroll the terminal into view before running */
  focus?: boolean
}

export function runTerminalCommand(command: string, focus = true) {
  if (typeof window === "undefined") return
  const detail: TerminalRunDetail = { command, focus }
  window.dispatchEvent(new CustomEvent<TerminalRunDetail>(TERMINAL_RUN_EVENT, { detail }))
}
