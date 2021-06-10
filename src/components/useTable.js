import React, { useState } from "react";
import set from "lodash/fp/set";
import cloneDeep from "lodash/cloneDeep";
import { bvd9IdPattern } from "./helper";
import initialData from "./dataFactory";

function useTable() {
  const [data, setData] = useState(initialData);
  const [rawEditing, setRawEditing] = useState(null);
  const [rawDeleting, setRawDeleting] = useState(null);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState("");
  const [bvd9IdErrorText, setBvd9IdErrorText] = useState("");

  const [filters, setFilters] = React.useState({
    bvd9Id: "",
    companyName: "",
    categoryOfDoc: "",
    publishedYear: "",
    docName: "",
  });

  const validateBvd9Id = (value) => {
    if (value.match(bvd9IdPattern)) {
      setBvd9IdErrorText("");
      setIsSearchEnabled(true);
    } else {
      setBvd9IdErrorText("BVD9 ID should be 9 digits");
      setIsSearchEnabled(false);
      setIsFilterEnabled(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "bvd9Id") {
      validateBvd9Id(value);
    }
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };

  const handleSearch = () => {
    setIsFilterEnabled(true);
  };

  const handleReset = () => {
    console.log("handleReset called");
    setBvd9IdErrorText("");
    setIsFilterEnabled(false);
    setIsSearchEnabled(false);
    setFilters({
      bvd9Id: "",
      companyName: "",
      categoryOfDoc: "",
      publishedYear: "",
      docName: "",
    });
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    // this.setState((state) => {
    //   const index = this.state.data.indexOf(this.state.editing);
    //   return {
    //     data: set(`[${index}]`, values, state.data),
    //   };
    // });
    const operation = rawEditing ? "edit" : "delete";
    const operationId = rawEditing ? rawEditing?.id : rawDeleting?.id;
    let _data = cloneDeep(data);
    const index = _data.findIndex((raw) => raw.id === operationId);
    console.log("index", index);
    if (index !== -1) {
      _data =
        operation === "edit"
          ? _data.map((el, i) => (i === index ? { ...values } : el))
          : _data.filter((raw) => raw.id !== operationId);
      console.log("_data", _data);
      setData(_data);
    }
  };

  return {
    data,
    setData,
    isFilterEnabled,
    filters,
    handleInputChange,
    handleSearch,
    handleReset,
    handleSubmit,
    rawEditing,
    rawDeleting,
    setRawEditing,
    setRawDeleting,
    isSearchEnabled,
    bvd9IdErrorText,
  };
}

export default useTable;
