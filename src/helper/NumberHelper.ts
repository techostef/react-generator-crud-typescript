const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  const number = value.toString().split('.')[1];
  if (number) return number.length || 0;
  return 0;
};

const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const numberFormat = (value?: number) => {
  if (typeof value === 'undefined' || value === null) return '';
  return new Intl.NumberFormat().format(value);
};

const isValidPositifNum = (value?: number | string) => {
  return typeof value === 'number' && value >= 0;
};

const validNumber = (number = 0) => (number < 10 ? `0${number}` : number);

const NumberHelper = {
  countDecimals,
  isValidPositifNum,
  validNumber,
  randomInt,
  numberFormat,
};

export default NumberHelper;
