# What GameDex is

GameDex is a desktop app for people who catalogue their game libraries. It bundles a static Next.js front end inside a Tauri shell on top of an ASP.NET Core (.NET 10) Web API — and the entire stack runs offline, with no server and no internet dependency at any point of the experience.

## Why desktop, why offline

Library data is small, personal, and rarely urgent across machines. A web app would have asked the user to create an account to store data in a cloud they don't own. GameDex inverts that: **the data belongs to the machine, the app is the reader.** Opening the app should feel like opening a filing drawer, not logging into a service.

## The .gdex export

The part I'm proudest of. A `.gdex` file bundles the library's encrypted metadata (JSON) and every media asset it references into a single portable container:

- No external service resolves anything — the file is self-contained.
- Libraries travel peer to peer: one file equals one shareable library.
- The format is versioned from day one, so future fields don't corrupt old exports.

## Testing shape

The domain is covered by **304 unit tests** — value objects, aggregates, invariants, exceptions, enums — plus one integration test booting the API with `WebApplicationFactory` and exercising the export end to end.

That ratio is deliberate: the interesting logic in GameDex lives in the domain, and that's where the tests pile up. The endpoint layer is thin by design, so one integration test over the real composition is worth more there than a mock-per-controller suite.
