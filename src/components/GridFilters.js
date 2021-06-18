import HighlightCell from "./HighlightCell";

function containsInsensitive(filter, row) {
  return (
    row[filter.id] == null ||
    String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
  );
}

function getFiltered(gridState) {
  return { filtered: gridState.filtered };
}

// eslint-disable-next-line
export default {
  Cell: HighlightCell,
  filterMethod: containsInsensitive,
  getProps: getFiltered,
};
