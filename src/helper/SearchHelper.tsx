function searchByName<T extends {name: string}>(search: string, data: T[]) {
  let searchResult: T[];
  if (!search || search === '') {
    searchResult = data;
  } else {
    const lowerCaseSearch = search.toLowerCase();
    searchResult = data.filter((item: T) => {
      if (item.name) {
        return item.name.toLowerCase().indexOf(lowerCaseSearch) > -1;
      }
      return false;
    });
  }
  return searchResult;
}

const SearchHelper = {
  searchByName,
};

export default SearchHelper;
