# Structure before screens

Everything in Stocka was decided at the layer level first. The codebase is split into four layers with a strict reference direction — dependencies point inward, and nothing outside Domain knows that HTTP exists.

## Layers

| Layer | Lives in | Knows about |
| --- | --- | --- |
| Domain | entities, value objects, invariants | nothing |
| Application | commands, queries, handlers | domain only |
| Infrastructure | EF Core, Dapper, Identity | application interfaces |
| Presentation | ASP.NET Core endpoints, Next.js UI | application contracts |

## Hybrid data access

This is the decision people ask about most, so here it is honestly:

- **EF Core for writes.** Change tracking, transactions, and navigation integrity are worth their cost when the operation is a mutation.
- **Dapper for reads.** Reports and list screens are projections over many rows. Materializing aggregates just to read four columns is waste; SQL projections are faster and simpler to reason about at the branch-report level.

Both access paths sit behind the Application layer — handlers never know which engine answered.

## Security model

Authentication is ASP.NET Core Identity with JWT. Authorization is role-based, but with a second axis that matters for this domain: **branch-level data scoping.** A user is a user *of a branch first*; queries are filtered by branch scope at the query level, and write operations validate cross-branch access explicitly. A cashier at Branch A quoting Branch B's prices is a domain violation, not a UI bug.

## Where CQRS fits

- Commands go through MediatR pipelines with validation and logging behaviors.
- Queries bypass the heavy handler machinery and hit the Dapper read side directly — the mediator pipeline for reads did nothing but add latency, and pretending otherwise would have been architecture theater.

## What is intentionally not decided yet

Sync between local deployments and a hosted SaaS instance is designed as an outbox to infrastructure, but not built. I will not pretend it exists.
