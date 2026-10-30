# A modeled library, not a shapeless store

GameDex treats the library world with proper DDD: the model refuses invalid states instead of validating them later. What follows are the load-bearing numbers of the domain.

## The inventory of the domain

| Building block | Count | What it covers |
| --- | --- | --- |
| Aggregates | 8 | game entries, collections, categories, reviews, and their boundaries |
| Strongly-typed IDs | 16 | every identity-worthy concept has its own `GameId`, `CollectionId`, … |
| Domain events | 7 | things that "happened" — game added, review posted, export created |

## Why 16 strongly-typed IDs

Because an `int` that means "game" being passed to a method that expects a "collection" is a bug the compiler could have caught. Every persistent concept carries its own ID type. It costs almost nothing at creation and repays itself in every signature since.

## Invariants live in the aggregates

A game entry cannot outlive its platform references; a collection cannot include the same game twice; ratings cannot be a string. The aggregate roots own these rules — services never re-implement them, and nothing bypasses them without an aggregate root in play.

## Events as history, not decoration

The 7 domain events are raised *inside* the aggregates when business facts change: `GameAddedToCollection`, `ExportCreated`, and friends. They feed the export pipeline and will feed an eventual activity log; the point is that "what happened" is emitted by the layer that decided it should happen.

## What the 304 tests protect

Every value object gets its construction/failure set. Every aggregate gets its invariant torture suite — the tests that matter are the ones asserting a payload *rejects* the change. The integration test walks Tauri-independent API startup through `WebApplicationFactory` and runs a full export cycle so serialization assumptions are checked against reality, not against mocks.
