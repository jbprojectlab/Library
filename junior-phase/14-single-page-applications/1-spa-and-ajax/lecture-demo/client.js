const counterInfo = document.getElementById('counter-content');

// retrieve initial info
fetch('/counters')
.then(response => response.json())
.then((getResponseBody) => {
  // for each of our contestants
  Object.keys(getResponseBody).forEach((name) => {
    // create our text for each counter
    const p = document.createElement('p');
    const span = document.createElement('span');
    const button = document.createElement('button');
    let count = getResponseBody[name];
    span.innerText = `name: ${name} counter: ${count} `;
    // create our button
    button.innerText = '+';
    button.addEventListener('click', () => {
      // on click send PUT request to server (for persistence)
      fetch(`/counters/${name}`, {
        method: 'PUT'
      })
      .then(response => response.json())
      .then((putResponseBody) => {
        // aftewards, update the view
        span.innerText = `name: ${name} counter: ${putResponseBody.updatedNumber} `;
      });
    });
    // glue it all together and add it to the DOM
    p.appendChild(span);
    p.appendChild(button);
    counterInfo.appendChild(p);
  });
});
