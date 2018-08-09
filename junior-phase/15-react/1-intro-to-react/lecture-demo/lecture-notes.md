## `.setState`

`.setState` CHANGES the component's state object (the "data") AND triggers the component to re-render (recalculate the "view").

## does it re-render the entire page?

`.setState` will re-render ONLY the component that it was triggered on. For example, if we `.setState` on `RandomLetterView` it will not trigger a re-render of `Welcome`.
