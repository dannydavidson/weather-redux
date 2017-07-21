# Weather Redux

An example React + Redux app focused on encapsulated state, I/O, and user interface layers
composed with dependency injection.

## How to Run

The project uses the Webpack Dev Server running inside Docker.
As long as you have Docker installed, the command to run locally is:

```sh
./bin/dev
```

To stop running:
```sh
./bin/dev-stop
```

## How To Build

To build the project for deployment, with Docker installed, run:
```sh
./bin/build
```
The script copies the deployable assets to `./client/dist` on the host system.

## How to Test

Testing is done with Jest running inside Docker.
With Docker installed, run:
```sh
./bin/test
```

## Architectural Approach

The project focuses on defining distinct abstractions for managing state, io, and ui. Each layer can be used and tested
independently, allowing for easy reuse in next year's hot new JS frameworks.

Configuration is done through a single entry point.  This allows for scalable feature flagging and gives the developer a clear
starting point for building a mental model of how the app fits together.

Dependency injection is used heavily to guarantee tests have a straightforward path for mocking.  I think that DI is the biggest
missing piece of the React + Redux story, something that Angular and its nuts-to-bolts framework cousins gives you for free.

On the UI side, I make the distinction between layouts, containers and components.  Layouts define page layout and provide slots
for containers to be injected.  Containers connect to the Redux state and action dispatch systems.  Components are stateless taking all their
configuration from props.

## With More Time

I don't include a history api module for managing push state. I've been wanting to experiment with React Router v4 but
didn't have the time.  I've also got limited test coverage, though I tried to provide test samples for each part of the stack.
With more time I'd get this fully covered.

I also didn't do any optimization or tree shaking on the generated js bundle, so it definitely is
unnecessarily large.



