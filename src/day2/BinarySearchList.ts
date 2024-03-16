export default function bs_list(haystack: number[], needle: number): boolean {
  let start = 0;
  let end = haystack.length - 1;
  while (end >= start) {
    if (end === start) {
      return haystack[end] === needle;
    }
    const middle = start + Math.floor((end - start) / 2)
    const guess = haystack[middle];
    console.log('state: ', { start, end, middle, guess, needle, haystack })
    if (guess === needle) {
      return true;
    }
    if (guess < needle) {
      start = middle + 1;
    }
    if (guess > needle) {
      end = middle - 1;
    }
  }
  return false;
}