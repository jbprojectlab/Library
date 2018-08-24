# Review React, Redux, and React-Redux

## Questions
    * thunks work, why, don't really get it.
        * What are they? Thunks allow us to block an action from being passed to a dispatcher (aka action + state into reducer).
        const thunkMiddleware = store => next => action => {
            axios.get('/api/puppies')
                .then(puppies => {
                    action = actionCreateGetPuppiesAction(puppies);
                    return next(action)
                })
            return next(action); // i have the option here to STOP an action from even being dispatched.
        }
        * By default --> 
            * action SOMETIMES generated with an ACTION Creator function.
            * actions get combined with the current state in the reducer.
            * we return a new state
            * we call all functions that are subscribed.
            ```js
                const store = {

                }
                function applyMiddleware(...hereAreMiddleware){

                }
                
                function createStore(reducer, appliedMiddleware){
                    let state = {};
                    const subscribers = [];
                    return {
                        getState: () => {
                            return state;
                        },
                        dispatch: (action) => {
                            for(let i = 0; i < applyMiddleware; i++){
                                action = applyMiddleware[i]();
                            }  
                            state = reducer(state, action)
                            for(let i = 0; i < subscribers.lenght; i++){
                                subscribers[i]();
                            }
                        },
                        subscribe: (cb) => {
                            subscribers.push(cb);
                        }
                    }
                }


                store.someValue = 5; // this was problem 1.
            ```
    * mapStateToProps and mapDispatchToProps. Where is this being passed from? How does it know about state? Connect, HOC, Provider.


## Key Takeaways
    * react-redux, isn't realllyyyy a real thing. It's sort of helps us get around always rerendering and always using stateful components that look very similar.
        * why did we use it?
            * Because it turns out the way we subscribe to redux is the same for pretty much every component. We solved this issue by creating a higher-order-component. connect(mSTP,mDTP) <-- Higher Order Component!!! (YourComponent)!!!
            ```js
                AKA 
                componentDidMount(){
                    this.unsubscribe = store.subscribe(() => this.setState(this.getState()))
                }

                componentWillUnmount(){
                    this.unsubscribe();
                }
            ```
            * We wanted to map and only listen to specific change sin the store. 
    * Provider takes in the store as a prop and calls props.children with it's own internal mechanics. Any connected function will be passed state and dispatch as props. 
    * Connect is a higher-order-component that takes map dispatch to props and returns a HOC that takes your specific component which allows us to do the things mentioned above.

```js
    setInterval(() => {
        getPuppiesThunk();
    }, 1000)


    socket.on('data:new', (data) => {
        store.dispatch(dataMaker(data));
    })

```