const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const addSpaceBetweenCapitalizeLetter = (string: string) => {
  return string.replace(/([A-Z])/g, ' $1').trim();
};

const StringHelper = {
  addSpaceBetweenCapitalizeLetter,
  capitalizeFirstLetter,
};

export default StringHelper;
