import React from "react";
import { categoryOfDocumentItems } from "../dataFactory";
import Select from "../Fields/Select";

const CategoryOfDocument = ({ categoryOfDoc, handleInputChange }) => {
  return (
    <Select
      inputLabel="Category of Document"
      value={categoryOfDoc}
      name="categoryOfDoc"
      label="Category of Document"
      menuItems={categoryOfDocumentItems}
      handleInputChange={handleInputChange}
    />
  );
};

export default CategoryOfDocument;
