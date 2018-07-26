class $ {
  constructor (selector) {
    if (selector.startsWith('.')) {
      this.elements = Array.from(document.getElementsByClassName(selector.slice(1)));
    } else if (selector.startsWith('#')) {
      this.elements = [document.getElementById(selector.slice(1))];
    } else {
      this.elements = Array.from(document.getElementsByTagName(selector));
    }
  }
  hide () {
    this.elements.forEach(element => {
      element.style.display = 'none';
    });
    return this;
  }
  show () {
    this.elements.forEach(element => {
      element.style.display = 'inherit';
    });
    return this;
  }
  addClassName (classToAdd) {
    this.elements.forEach(element => {
      element.classList.add(classToAdd);
    });
    return this;
  }
  removeClassName (classToRemove) {
    this.elements.forEach(element => {
      element.classList.remove(classToRemove);
    });
    return this;
  }
  text (newText) {
    this.elements.forEach(element => {
      element.innerText = newText;
    });
    return this;
  }
  addChild (elementType) {
    this.elements.forEach(element => {
      const childToAdd = document.createElement(elementType);
      element.appendChild(childToAdd);
    });
    return this;
  }
  blink (msInterval) {
    setInterval(() => {
      this.elements.forEach(element => {
        if (element.style.display === 'none') {
          element.style.display = 'inherit';
        } else {
          element.style.display = 'none';
        }
      });
    }, msInterval);
    return this;
  }
}
