type ScoreObject = {
  score: number | string;
};

export function parseScores(stringList: string[]): Map<number, number[]> {
  const parseSingleString = (s: string): number[] => {
    // Try parsing as JSON array first
    try {
      const data = JSON.parse(s) as ScoreObject[];
      if (Array.isArray(data)) {
        return data.map(item => Number(item.score));
      }
    } catch {
      // Continue to next approach if this fails
    }
    
    // Try parsing as multiple JSON objects
    try {
      const scores: number[] = [];
      const lines = s.trim().split('\n');
      
      for (const line of lines) {
        if (line) {
          const obj = JSON.parse(line) as ScoreObject;
          scores.push(Number(obj.score));
        }
      }
      return scores;
    } catch {
      // Try parsing as single JSON object
      try {
        const obj = JSON.parse(s) as ScoreObject;
        return [Number(obj.score)];
      } catch {
        return [];
      }
    }
  };

  // Use Map to maintain numeric keys
  return new Map(
    stringList.map((str, index) => [index, parseSingleString(str)])
  );
}

// // Example usage
// const inputList = [
//   "[\n{\"score\":0.5},\n{\"score\":0.5},\n{\"score\":0.5}\n]",
//   "{\"score\": \"0.1\"}\n{\"score\": \"0.1\"}",
//   "{\"score\":0}\n{\"score\":0}\n{\"score\":0}\n{\"score\":0}\n{\"score\":0}",
//   "{\"score\":0.5}"
// ];

// const result = parseScores(inputList);
// console.log(result);

// // To demonstrate that keys are numbers
// result.forEach((value, key) => {
//   //console.log(`Type of key: ${typeof key}`); // Will show "number"
//   console.log(`${key}: ${value}`);
// });