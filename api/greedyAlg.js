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

  // // New array to store max value, category, and index
  // const maxValues = [];

  // // Iterate over each object in the array (in this case, there is only one object)
  // data.forEach((item) => {
  //   // Iterate over each category key in the object
  //   Object.keys(item).forEach((category) => {
  //     const scores = item[category]; // Get the array of scores
  //     const maxValue = Math.max(...scores); // Find the max value
  //     const maxIndex = scores.indexOf(maxValue); // Find the index of the max value

  //     // Push the max value, category, and index into the array
  //     maxValues.push({ category, maxValue, maxIndex });
  //   });
  // });

  // // Find the overall max value in the new array
  // const overallMax = maxValues.reduce(
  //   (max, current) => {
  //     return current.maxValue > max.maxValue ? current : max;
  //   },
  //   { maxValue: -Infinity }
  // );

  // // Replace the overall max value with 0 in the original data
  // data.forEach((item) => {
  //   Object.keys(item).forEach((category) => {
  //     item[category][overallMax.maxIndex] = 0;
  //   });
  // });

  // console.log("Overall Max Value:", overallMax.maxValue);
  // console.log("Category with Overall Max Value:", overallMax.category);
  // console.log("Index of Overall Max Value:", overallMax.maxIndex);
  // console.log("Updated Data:", data);
  // result[overallMax.category] = 0


  console.log("STARTING");
  console.log("Data:", data);
  // create a new array to store all the values in descending order
  const allValues = [];
  // create a new array to store all the values in descending order
  let hasNonZeroValues = true;
  while (hasNonZeroValues) {
    hasNonZeroValues = false; // Assume all fields are zero until proven otherwise

    data.forEach((item) => {
      Object.keys(item).forEach((category) => {
        const scores = item[category];
        const maxValue = Math.max(...scores);

        if (maxValue > 0) {
          hasNonZeroValues = true; // If any value is non-zero, keep looping
          const maxIndex = scores.indexOf(maxValue);

          // Add the max value, category, and index to the allValues array
          allValues.push({ category, maxValue, maxIndex });

          // Replace the max value with 0 in the original data
          item[category][maxIndex] = 0;
        }
      });
    });
  }
  // sort the values in descending order
  allValues.sort((a, b) => b.maxValue - a.maxValue);
  console.log("All Values:", allValues);
}
