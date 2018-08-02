function getLuckyGem(birthMonth) {
  const gems = ['Emerald', 'Amethyst', 'Jade', 'Opal', 'Sapphire', 'Perl',
                'Ruby', 'Agate', 'Diamond', 'Moonstone', 'Jasper', 'Onyx'];
  if (gems[birthMonth]) {
    return gems[birthMonth];
  } else {
    throw new Error('Invalid birth Month');
  }
}

let myGem;
try { // statements to try
  myGem = getLuckyGem(2); // function could throw exception
}
catch (error) {
  myGem = 'unknown';
  console.error(error.message);
}

console.log('my gem is', myGem);

