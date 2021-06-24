import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import { bvd9IdPattern, searchParams } from "./helper";
import { initialData } from "./dataFactory";

function useTable() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [rawEditing, setRawEditing] = useState(null);
  const [rawDeleting, setRawDeleting] = useState(null);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState("");
  const [bvd9IdErrorText, setBvd9IdErrorText] = useState("");

  const [loading, setLoading] = useState(false);

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
      if (!isEmpty(value)) {
        setBvd9IdErrorText("BVD9 ID should be 9 digits");
      } else {
        setBvd9IdErrorText("");
      }
      setIsSearchEnabled(
        isCategoryOfDocuments || isPublishedYear ? true : false
      );
      setIsFilterEnabled(false);
    }
  };

  const isCategoryOfDocuments = !isEmpty(filters.categoryOfDoc);

  const isPublishedYear = !isEmpty(filters.publishedYear);

  const hasBvd9Error = bvd9IdErrorText.length > 0;

  const searchFilterLength = Object.values(filters).filter(
    (item) => !isEmpty(item)
  ).length;

  const shouldSearch = searchFilterLength === 1;

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "bvd9Id") {
      validateBvd9Id(value);
    }
    if (
      event.target.name === "categoryOfDoc" ||
      event.target.name === "publishedYear"
    ) {
      if (!isEmpty(value)) {
        setIsSearchEnabled(true);
      } else {
        if (!hasBvd9Error && isEmpty(value)) {
          setIsSearchEnabled(true);
        } else {
          setIsSearchEnabled(false);
        }
      }
    }
    if (searchFilterLength) {
      setIsSearchEnabled(true);
    }
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };

  const handleSearch = () => {
    if (!shouldSearch) {
      setModalOpen(true);
      return;
    }
    const params = pickBy({ ...searchParams, ...filters }, identity);
    console.log("params", params);
    setIsFilterEnabled(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
    loading,
    isModalOpen,
    setModalOpen,
  };
}

export default useTable;
