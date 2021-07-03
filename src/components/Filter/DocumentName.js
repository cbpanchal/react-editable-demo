import React from "react";
import Input from "../Fields/Input";

const DocumentName = ({ className, docName, handleInputChange }) => {
  return (
    <Input
      className={className}
      id="outlined-basic"
      label="Document Name"
      name="docName"
      value={docName}
      variant="outlined"
      handleInputChange={handleInputChange}
    />
  );
};

export default DocumentName;
