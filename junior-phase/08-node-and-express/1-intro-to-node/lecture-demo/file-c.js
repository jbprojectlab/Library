module.exports = function (excitementLevel) {
  let end;
  if (excitementLevel === 0) {
    end = '.';
  } else {
    end = '!';
  }
  return 'hello' + end;
};
