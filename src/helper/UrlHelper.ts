export const getParam = ({
  urlString = '',
  paramName = '',
}) => {
  if (!urlString) return null;
  const arrUrlString = urlString.split('?');
  const result: any = {};
  if (!arrUrlString[1]) return null;
  let params: any = arrUrlString[1];
  params = params.split('&');
  params.forEach((item: any) => {
    item = item.split('=');
    const key = item[0];
    const value = item[1];
    result[key] = value;
  });

  return result[paramName];
};

export const getCurrentPath = (urlString: any) => {
  if (!urlString) return null;
  const arrUrlString = urlString.split('//');
  if (!arrUrlString[1]) return null;
  let paths: any = arrUrlString[1];
  paths = paths.split('/');

  return paths[1];
};
