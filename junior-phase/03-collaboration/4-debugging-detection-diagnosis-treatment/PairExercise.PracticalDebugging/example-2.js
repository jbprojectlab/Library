function run() {
  document.querySelector('#out').innerHTML = JSON.stringify(parseDocument(document));
}

function parseDocument(doc) {
  var els = [].slice.call(doc.querySelectorAll('body *[class]'));

  return els.map(function(el) {
    var type = getType(el);
    return {
      class: el.className,
      type: type
    };
  });
}

function getType(el) {
  if(el.nodeName == 'IMG') {
    return 'image';
  }

  return 'other';
}
