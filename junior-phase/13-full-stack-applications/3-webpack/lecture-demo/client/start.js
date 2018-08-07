const makeHelloBox = require('./make-hello-box');

setInterval(() => {
  document.body.appendChild(makeHelloBox());
}, 1000);
