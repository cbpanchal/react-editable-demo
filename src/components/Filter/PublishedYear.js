import React from "react";
import { publishedYearItems } from "../dataFactory";
import Select from "../Fields/Select";

const PublishedYear = ({ publishedYear, handleInputChange }) => {
  return (
    <Select
      inputLabel="Published Year"
      value={publishedYear}
      name="publishedYear"
      label="Published Year"
      menuItems={publishedYearItems}
      handleInputChange={handleInputChange}
    />
  );
};

export default PublishedYear;
