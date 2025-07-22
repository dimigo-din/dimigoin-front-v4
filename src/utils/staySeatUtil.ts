export const alignRange = (range: string[]) => {
  const [range1, range2] = range;
  const range1Detail = [range1.charAt(0), range1.slice(1)];
  const range2Detail = [range2.charAt(0), range2.slice(1)];
  return [
    `${range1Detail[0].charCodeAt(0) > range2Detail[0].charCodeAt(0) ? range2Detail[0] : range1Detail[0]}${parseInt(range1Detail[1]) > parseInt(range2Detail[1]) ? parseInt(range2Detail[1]) : parseInt(range1Detail[1])}`,
    `${range1Detail[0].charCodeAt(0) <= range2Detail[0].charCodeAt(0) ? range2Detail[0] : range1Detail[0]}${parseInt(range1Detail[1]) <= parseInt(range2Detail[1]) ? parseInt(range2Detail[1]) : parseInt(range1Detail[1])}`,
  ];
};

export const isInRange = (range: string[], target: string) => {
  const [range1, range2] = alignRange(range);
  const range1Detail = [range1.charCodeAt(0), range1.slice(1)];
  const range2Detail = [range2.charCodeAt(0), range2.slice(1)];
  const targetDetail = [target.charCodeAt(0), target.slice(1)];

  return (
    range1Detail[0] <= targetDetail[0] &&
    targetDetail[0] <= range2Detail[0] &&
    parseInt(range1Detail[1].toString()) <= parseInt(targetDetail[1].toString()) &&
    parseInt(targetDetail[1].toString()) <= parseInt(range2Detail[1].toString())
  );
};

export const generateRange = (range: string[]) => {
  const arr = [];

  const [start, end] = alignRange(range);
  const startDetail = [start.charAt(0), start.slice(1)];
  const endDetail = [end.charAt(0), end.slice(1)];
  for (let i = startDetail[0].charCodeAt(0); i <= endDetail[0].charCodeAt(0); i++) {
    for (let j = parseInt(startDetail[1]); j <= parseInt(endDetail[1]); j++) {
      arr.push(String.fromCharCode(i) + j.toString());
    }
  }
  return arr;
};

export const genTable = (): string[][] => {
  const to18 = chunkArray(generateRange(["A1", "L18"]), 18);
  const to7 = chunkArray(generateRange(["M1", "N7"]), 7);

  return [...to18, ...to7];
}

const chunkArray = (array: string[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}