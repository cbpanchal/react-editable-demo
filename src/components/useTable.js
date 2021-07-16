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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rawEditing, setRawEditing] = useState(null);
  const [rawDeleting, setRawDeleting] = useState(null);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState("");
  const [bvd9IdErrorText, setBvd9IdErrorText] = useState("");
  const [selectedRows, setSelectedRow] = useState([]);

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
    (item) => !isEmpty(item) && !hasBvd9Error
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
    console.log("shouldSearch", shouldSearch);
    console.log("searchFilterLength", searchFilterLength);
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
    }, 1000);
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

  const handleSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRow(selectedRows.filter((row) => row !== id));
    } else {
      setSelectedRow([...selectedRows, id]);
    }
  };

  const handleSaveRow = async (index) => {
    console.log("handleSaveRow index::>", index);
    const _data = data;
    _data[index] = {
      ..._data[index],
      loading: true,
    };
    console.log("_data", _data);
    setData(_data);
  };

  const handleDelete = () => {
    const _deleteData = data.filter((raw) => raw.id !== rawDeleting?.id);
    setData(_deleteData);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    const operation = rawEditing ? "edit" : "delete";
    const operationId = rawEditing ? rawEditing?.id : rawDeleting?.id;
    let _data = cloneDeep(data);
    const index = _data.findIndex((raw) => raw.id === operationId);
    console.log("index", index);
    if (index !== -1) {
      switch (operation) {
        case "edit":
          handleSaveRow(index, values);
          setTimeout(() => {
            _data = _data.map((el, i) => (i === index ? { ...values } : el));
          }, 5000);
          break;
        case "delete":
          _data = _data.filter((raw) => raw.id !== operationId);
          break;
        default:
          break;
      }
      setTimeout(() => {
        console.log("_data", _data);
        setData(_data);
      }, 3000);
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
    setSelectedRow,
    selectedRows,
    handleSelection,
    isDeleteModalOpen,
    setDeleteModalOpen,
    handleDelete,
  };
}

export default useTable;
