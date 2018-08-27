## `combineReducers`

A function in `redux`. This allows us to split our reducer into multiple "sub-reducers" and ultimately combine them into one "root" reducer.

This is useful for breaking up the logic of ONE giant reducer. Instead we can have lots of little reducers. This is also useful because we don't have to remember / do as much array / object copying, and / or nested state copying.
