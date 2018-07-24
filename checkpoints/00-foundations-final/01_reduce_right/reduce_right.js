function reduceRight (arr, initialValue, reducer) {
  let accumulatedValue = initialValue;
  for (let i = arr.length - 1; i >= 0; i--) {
    accumulatedValue = reducer(accumulatedValue, arr[i]);
  }
  return accumulatedValue;
}

function reduceRightRecursive (arr, initialValue, reducer) {
  if (arr.length === 0) return initialValue;
  const nextValue = reducer(initialValue, arr[arr.length - 1]);
  const nextArr = arr.slice(0, -1);
  return reduceRightRecursive(nextArr, nextValue, reducer);
}
