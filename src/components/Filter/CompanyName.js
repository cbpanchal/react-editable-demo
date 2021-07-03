import React from "react";
import Input from "../Fields/Input";

const CompanyName = ({ className, companyName, handleInputChange }) => {
  return (
    <Input
      className={className}
      id="outlined-basic"
      label="Company Name"
      name="companyName"
      value={companyName}
      variant="outlined"
      handleInputChange={handleInputChange}
    />
  );
};

export default CompanyName;
