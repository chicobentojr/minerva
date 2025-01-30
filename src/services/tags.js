export const filterData = (data, tags, onlyRest) => {
  if (onlyRest) {
    return getOnlyRestItems(data, tags);
  }

  return data.filter((row) => tags.some((tag) => isRowFromTag(row, tag)));
};

export const isRowFromTag = (row, tag) => {
  if (tag.itemsKey && tag.itemsKey.includes(row.key)) {
    return true;
  }

  const tagQueries =
    tag.filters?.length > 0 ? tag.filters : [tag.label.toLowerCase()];

  const hasMatch = tagQueries.some(
    (query) => query === "*" || row.label.toLowerCase().includes(query)
  );

  return hasMatch;
};

export const getTagItems = (tag, data) => {
  if (tag.itemsKey) {
    return tag.itemsKey.map((key) => data[key]);
  }

  return filterData(data, [tag]);
};

export const getOnlyRestItems = (data, tags) => {
  return data.filter((row) => !tags.some((tag) => isRowFromTag(row, tag)));
};
