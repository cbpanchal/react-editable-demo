import React from "react";
import Filter from "./Filter";

const FilterComponent = ({
  filters,
  bvd9IdErrorText,
  handleSearch,
  handleInputChange,
  isSearchEnabled,
  handleReset,
}) => (
  <Filter
    formValues={{
      ...filters,
    }}
    bvd9IdErrorText={bvd9IdErrorText}
    isSearchEnabled={isSearchEnabled}
    handleSearch={handleSearch}
    handleInputChange={handleInputChange}
    handleReset={handleReset}
  />
);

export default FilterComponent;
