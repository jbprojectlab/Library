## applying FP to tech we know

*"Lots of little functions"*

- In react: split logic into lots of components
- In sequelize: split logic into lots of class / instance methods
- In express: split logic into lots of routers, also shift logic in route handlers to an instance / class method

*Composition*

- In react: lots of little components will mean that they often use each other
- In sequelize: less common, can happen when we use instance methods within instance methods
- In express: the middleware stack is a composition

*Pure functions*

- In react: making lots of function-style components
- In sequelize: making sure to return values from instance methods (instead of mutating the instance)
- In express: uncommon, we would need to refactor significantly

*Immutability*

- In react: setting state properly, also virtual DOM (internal react)
- In sequelize: hard! sequelize code queries are meant to mutate data
- In express: unrelated (we don't use data structures in express)

**Redux is coming up and will have a LOT of overlap with FP ideas**
