const wordWrap = (line, maxLen) => {
  if (line.length <= maxLen) {
    return line;
  }
  const indexOfBlank = line.lastIndexOf(' ', maxLen);
  let split, offset;
  if (indexOfBlank > -1) {
    split = indexOfBlank;
    offset = 1;
  } else {
    split = maxLen;
    offset = 0;
  }
  return line.substring(0, split) + '\n' + wordWrap(line.substring(split + offset), maxLen);
};

module.exports = wordWrap;
