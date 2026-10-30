# What Stocka is

Stocka is a multi-brand, multi-branch ERP system for small and medium businesses in Egypt. It is being built to replace the workflows those businesses run today on Excel and Microsoft Access: stock counts, invoices, and branch reports that live in disconnected files and break the moment a second person touches them.

The scope is deliberately narrow: **inventory, invoicing and branch reporting — done extremely well.** Every feature must pay rent for a shop owner with two branches, not an enterprise procurement office.

## The problem in practice

Most retail setups around me run the same shape of failure:

- One master Excel sheet per branch, merged nightly — by hand.
- "Inventory counts" that happen at the end of the month, because the live version is a spreadsheet.
- Permissions handled by *who has the file open*, not who should.

Stocka treats the branch as the unit of truth: every document is scoped to a branch, every brand can run in parallel isolation, and the reporting comes from the same database the operations write to — not from a re-keyed sheet.

## Where it stands

Stocka is actively under development (`WIP`). The backend domain and the CQRS pipelines are in place; the Next.js front end is being built feature by feature. The [Architecture](/projects/stocka#architecture) section covers the structural decisions — Clean Architecture first, with a hybrid EF Core / Dapper data access layer, before anything was wired to the UI.

## What ships alongside the core

Two decisions I made early because they change the shape of the system rather than add features:

1. **Local-first deployment.** Shop owners with unreliable internet still need to bill and restock. A local deployment mode keeps the same domain layer running on a shop machine; sync becomes an add-on, not a dependency.
2. **SaaS-ready by construction.** The model separation between *brand*, *branch* and *tenant data* is enforced at the domain level, so offering Stocka as a hosted SaaS later is a deployment decision — not a rewrite.
