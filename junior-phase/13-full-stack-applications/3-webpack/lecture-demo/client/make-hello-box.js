function makeHelloBox () {
  const box = document.createElement('div');
  box.innerText = 'Hello';
  box.style.border = '1px solid black';
  return box;
}

module.exports = makeHelloBox;
