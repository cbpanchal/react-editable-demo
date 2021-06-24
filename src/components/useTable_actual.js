import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { bvd9IdPattern } from "./searchComponents/helper";
import isEmpty from "lodash/isEmpty";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import { searchAPI } from "./Api/api";
import { searchParams } from "./helper";

function useTable() {
  const [data, setData] = useState([]);
  const [tableMsg, setTableMsg] = useState(null);
  const [tableLoader, setTableLoader] = useState(false);
  const [rawEditing, setRawEditing] = useState(null);
  const [rawDeleting, setRawDeleting] = useState(null);
  const [count, setCount] = useState(0);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState("");
  const [bvd9IdErrorText, setBvd9IdErrorText] = useState("");
  const [exportMsg, setExportMsg] = useState("");

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
    if (count) {
      setIsFilterEnabled(true);
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
    searchAPI(params, { setData, setTableLoader, setTableMsg });
    setTableLoader(false);
    setIsFilterEnabled(true);
  };

  const handleReset = () => {
    setExportMsg("");
    setBvd9IdErrorText("");
    setIsFilterEnabled(false);
    setIsSearchEnabled(false);
    setTableMsg(null);
    setCount(0);
    setFilters({
      bvd9Id: "",
      companyName: "",
      categoryOfDoc: "",
      publishedYear: "",
      docName: "",
    });
  };

  const handleSubmit = (values) => {
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
    if (index !== -1) {
      _data =
        operation === "edit"
          ? _data.map((el, i) => (i === index ? { ...values } : el))
          : _data.filter((raw) => raw.id !== operationId);
      //   console.log("_data", _data);
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
    tableLoader,
    tableMsg,
    exportMsg,
    isModalOpen,
    setModalOpen,
  };
}

export default useTable;
