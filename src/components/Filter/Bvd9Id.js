import React from "react";
import Input from "../Fields/Input";

const Bvd9Id = ({ bvd9Id, error, bvd9IdErrorText, handleInputChange }) => (
  <Input
    label="BVD9 ID"
    name="bvd9Id"
    value={bvd9Id}
    variant="outlined"
    type="number"
    error={error}
    helperText={bvd9IdErrorText}
    handleInputChange={handleInputChange}
    onInput={(e) => {
      e.target.value = Math.max(0, parseInt(e.target.value))
        .toString()
        .slice(0, 9);
    }}
  />
);

export default Bvd9Id;
