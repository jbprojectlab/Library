## loading

The general idea: we want to display some loading text / image / whatever when the client is currently waiting for a response from the server (or any other async action).

This is not redux-specific. If anything, the problem we're solving is react-related. If we're using the two together, it's good to understand how to do this effectively with redux.

In our store, we should have some sort of `isLoading` (or similar) key stored for any given data that might load. When we go to fetch / update to the server, we should dispatch *beforehand* to set that `isLoading` to `true` and dispatch afterwards to set it back to `false`.

This means any / all react components can subscribe to that part of the store state and display something different when loading.

## selectors (redux)

A term for deriving additional info in `mapStateToProps`. The props we pass to the wrapped component (via `connect`) do not *have* to be exactly what our store state contains. We can "derive" props from the store state and pass them along.

When we do so, `mapStateToProps` is a "selector". Or really, `mapStateToProps` is always a "selector", but we use this term especially when deriving props to pass that are not literally on the state.
