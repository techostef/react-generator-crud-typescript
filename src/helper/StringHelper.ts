const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const StringHelper = {
  capitalizeFirstLetter,
};

export default StringHelper;
