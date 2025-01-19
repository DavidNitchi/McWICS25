export function fit() {
  const total = 1096;

  const data = [
    {
      ECA: [0.8, 0.6, 0.7, 0.9, 0.5],
      Education: [0.9, 0.3, 0.9, 0.8, 0.7],
      Experience: [0.8, 0.7, 0.6, 0.9, 0.3],
      Projects: [0.9, 0.8, 0.9, 0.7, 0.8],
    },
  ];

  //userInfo = {}

  let result = {ECA: [], Education: [], Experience: [], Projects: []};

  // New array to store max value, category, and index
  const maxValues = [];

  // Iterate over each object in the array (in this case, there is only one object)
  data.forEach((item) => {
    // Iterate over each category key in the object
    Object.keys(item).forEach((category) => {
      const scores = item[category]; // Get the array of scores
      const maxValue = Math.max(...scores); // Find the max value
      const maxIndex = scores.indexOf(maxValue); // Find the index of the max value

      // Push the max value, category, and index into the array
      maxValues.push({ category, maxValue, maxIndex });
    });
  });

  // Find the overall max value in the new array
  const overallMax = maxValues.reduce(
    (max, current) => {
      return current.maxValue > max.maxValue ? current : max;
    },
    { maxValue: -Infinity }
  );

  // Output the results
  console.log("Max Values in Each Category:");
  maxValues.forEach((item) => {
    console.log(
      `Category: ${item.category}, Max Value: ${item.maxValue}, Index: ${item.maxIndex}`
    );
  });

  console.log("Overall Max Value:", overallMax.maxValue);
  console.log("Category with Overall Max Value:", overallMax.category);
  console.log("Index of Overall Max Value:", overallMax.maxIndex);
  result[overallMax.category] = 0
}
