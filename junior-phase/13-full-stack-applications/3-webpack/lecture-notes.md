## why do we want / need a frontend module system?

`require` DOES NOT EXIST IN THE BROWSER (nor `module.exports`).

## what is webpack

It is a command line tool (not the only way to use it, but the most common) that takes an "entry point" and looks through all of that files `require`s in order to create one big "bundle" file.

Now we can use that one file and load it into our frontend.

Webpack "gives us" `require` / `module.exports` for our frontend code. It does not make `require` / `module.exports` "work on the frontend", instead it creates a bundle.

Yay! We have a module system!

## getting started

Installing: `npm install --save-dev webpack webpack-cli` (cli = Command Line Interface)

Define a `webpack.config.js` file:

```js
module.exports = {
  mode: 'development',
  entry: './client/start.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
```

Run `webpack` from the command line (which will create the `bundle.js` file).

Make sure the HTML file loads the bundle!

## tips and tricks

- use `--watch` so you don't have to keep re-bundling when you change your client-side source code
- you can make an `npm` script for building your frontend
- enable bundle-to-source line-mapping (for error stack traces) with `devtool: 'source-map'` in your webpack config
