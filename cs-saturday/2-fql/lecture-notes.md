## FQL

Functional query language: build your own DBMS in node. Learn what a DBMS is (from the inside), practice Javascript.

## terms

- database: a collection of persistent information
  - persistent
  - organized
  - queryable
- DBMS: database management system, a program that allows you to interact with a database—some examples MySQL, postgres, sqlite, mongo, neo4j, riak, ...many more
- query language: the literal code / wors we use to form requests to the database—an example is SQL; a DBMS supports some kind of query language (and needs to have something that executes / interprets that language)

Database is like a spreadsheet, and a DBMS is like excel.

## how will we build own DBMS?

In FQL we will acheive...

- **Persistence** via the file system
- **Organization** via JSON (a data format)
- **Queryable** via Javascript classes we write
  - `Table` (file persistence)
  - `FQL` (query interface)
  - `Plan` (holds information relevant to the query—internal)

Specifically, we have a "database" already, it is a folder (called "film-database"). In that folder are other folders—which represent tables (e.g. "movies-table"). In each of *those* folders are JSON files (e.g. "0001.json"). Those files are formatted in "JSON" format, but ultimately are just strings of text.

Here's what a "query might look like":

```js
const movieTable = new Table('film-database/movies-table');
const movieQuery = new FQL(movieTable);
movieQuery
.select('id', 'name')
.where({
  year: 1992
})
.limit(2)
.get(); // executes the query
```

## `fs`

`fs` is built-in node library (module) that has methods for interacting with the file system.

```js
const fs = require('fs');
// non-blocking
fs.readFile('the-file.txt', (err, fileContents) => {
  // here's where we do something with the file contents
});
```

Asynchronous code can be tricky / awkward to deal with, and is not the focus for today. SO WE ARE GOING TO AVOID IT. THE CODE ABOVE IS NOT WHAT WE ARE GOING TO BE DOING TODAY.

Instead...

```js
const fs = require('fs');
// blocking
const fileContents = fs.readFileSync('the-file.txt');
// here's where we do something with the file contents
```

## JSON

**J**ava**S**cript **O**bject **N**otation: a text format that *looks* (is formatted) like a Javascript object.

We can convert a JSON string to an object:

```js
const jsonStr = '{"a": 100}';
console.log(jsonStr.a); // undefined
const dataObj = JSON.parse(jsonStr); // {a: 100}
console.log(dataObj.a); // 100
```

We can convert and object to a JSON string:

```js
const dataObj = {b: 50};
const jsonStr = JSON.stringify(dataObj);
console.log(jsonStr); // '{"b": 50}'
```

WHY?? What is JSON useful for?

You cannot store a JS object in a file. Nor can you send a JS object to some other machine (e.g. via HTTP). BUT text can be stored in a file / sent across a connection.

JSON is useful for "sharing" data between computers and for storing data onto the file system.

Converting data into a format that can be stored / transmitted is called "serialization". Converting serialized data back into a hydrated "object" is called "deserialization". JSON is a serailzation format. There are other ones: XML, yaml, pkl, ...and more.

JSON is not specific to Javascript, and is not *only* for Javascript programs. We could have a Java server that serializes its information into JSON then sends it to a python program that deserializes the JSON string into a dictionary.

## class (static) vs. instance methods

An object-oriented programming idea (again not specific to JS, nor sequelize). Here's what it looks in JS:

```js
const carA = new Car('a8j2l');
// ...
carA.accelerate(); // instance method
// ...
const foundCar = Car.findByLicense('a8j2l'); // class method
```

An instance method is inovked "on an instance" (the thing to the left of the dot is an instance).

A class method is invoked "on a class" (the thing to the left of the dot is the class).

How would we define them?

```js
// es6 with `class` syntax
const allCars = [];
class Car {
  constructor (license) {
    this.license = license;
    this.speed = 0;
    // // one way to define an instance method (directly on the instance object)
    // this.accelerate = function () {
    //   this.speed += 10;
    // }
    allCars.push(this);
  }
  // another way to define an instance method (on the prototype)
  accelerate () {
    this.speed += 10;
  }
  // define a class (or static) method
  static findByLicense (searchLicense) {
    for (let i = 0; i < allCars.length; i++) {
      if (allCars[i].license === searchLicense) {
        return allCars[i];
      }
    }
  }
}
```

Or without `class` syntax...

```js
// es5
function Car () {
  this.license = license;
    this.speed = 0;
    // // one way to define an instance method (directly on the instance object)
    // this.accelerate = function () {
    //   this.speed += 10;
    // }
    allCars.push(this);
}
// another way to define an instance method (on the prototype)
Car.prototype.accelerate = function () {
  this.speed += 10;
};
// define a class (or static) method
Car.findByLicense = function (searchLicense) {
  for (let i = 0; i < allCars.length; i++) {
    if (allCars[i].license === searchLicense) {
      return allCars[i];
    }
  }
};
```

Why? Why do we choose to define something as a class method as opposed to an instance method (or vice versa)?

All this class definition stuff is about humans—to help us understand our code so that we read / maintain it more effectively. If we are trying to determine whether something should be a class or instance method, the question we should be asking is: "what makes sense?"

Instance methods operate on a single instance. Class methods operate on many instances or "class-wide" information.

*An analogy...*

A car factory (real factory) is like our car constructor. A car driving around in the world is like our car instance.

A car factory might be able to look up certain cars it produced by license plate. This is a thing a "factory" can / should be responsible for, because it has access to all the cars it created, and is central point of information about any / all cars.

So it makes sense "find by license" is a thing a factory can do, and that a car cannot do, so it should be a *class method*.

It also makes sense that "accelerate" is a thing a car can do, and that a factory cannot od, so it should be an *instance method*.
