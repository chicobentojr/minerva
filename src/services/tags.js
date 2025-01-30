export const filterData = (data, tags, onlyRest) => {
  console.log({ onlyRest, tags });
  if (onlyRest) {
    return data.filter((row) => !tags.some((tag) => isRowFromTag(row, tag)));
  }

  return data.filter((row) => tags.some((tag) => isRowFromTag(row, tag)));
};

export const isRowFromTag = (row, tag) => {
  const tagQueries =
    tag.filters.length > 0 ? tag.filters : [tag.label.toLowerCase()];

  const hasMatch = tagQueries.some(
    (query) => query === "*" || row.label.toLowerCase().includes(query)
  );

  // console.log({ row, tag, tagQueries, hasMatch });

  return hasMatch;
};
