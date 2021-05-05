exports.max = (numbers) => Math.max(...numbers);
exports.min = (numbers) => Math.min(...numbers);
exports.avg = (numbers) =>
  numbers.reduce(
    (acc, current, index, { length }) => acc + current / length,
    0
  );
exports.sort = (numbers) => numbers.sort((a, b) => a - b);
exports.median = (numbers) => {
  const middle = Math.floor(numbers.length / 2);
  const { length } = numbers;
  return length % 2
    ? numbers[middle]
    : (numbers[middle - 1] + numbers[middle]) / 2;
  /*
  //if odd
  if (numbers.length % 2) return numbers[middle];
  //if even
  return (numbers[middle - 1] + numbers[middle]) / 2;
  */
};
exports.frequency = (numbers) => {
  const counts = new Map();
  numbers.forEach((number) => {
    const count = counts.get(number) || 0;
    counts.set(number, count + 1);
  });
  const maxCount = Math.max(...counts.values());
  const result = [...counts.keys()].filter(
    (number) => counts.get(number) === maxCount
  );
  //no frequency : all frequency is same.
  const noRepeatNumbers = Array.from(new Set(numbers));
  //1er method : Object.entries().toString()
  /*
  if (
    Object.entries(result).toString() ===
    Object.entries(noRepeatNumbers).toString()
  )
  */
  //2nd method: JSON.stringify()
  if (JSON.stringify(result) === JSON.stringify(noRepeatNumbers)) return null;

  //multiple frequency
  if (result.length > 1) return result;
  //frequency is one
  return result[0];
};
