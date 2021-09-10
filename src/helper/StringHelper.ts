const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const searchDeepText = (string: string, search: string) => {
  const stringLower = string.toLocaleLowerCase();
  const searchLower = search.toLocaleLowerCase();
  if (stringLower === searchLower) return true;
  const searchArr = searchLower.split(' ');
  let foundNum = 0;
  searchArr.forEach((item) => {
    const idx = stringLower.indexOf(item);
    if (idx >= 0) foundNum += 1;
  });
  if (foundNum === searchArr.length) return true;
  return false;
};

const StringHelper = {
  capitalizeFirstLetter,
  searchDeepText,
};

export default StringHelper;
