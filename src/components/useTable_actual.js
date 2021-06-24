import React, { useState } from "react";
import { toast } from 'react-toastify';
import cloneDeep from "lodash/cloneDeep";
import { bvd9IdPattern } from "./searchComponents/helper";
import isEmpty from "lodash/isEmpty";
import axios from 'axios';
import apiConstant from "../../../utils/apiConstant";

function useTable() {
    const [data, setData] = useState([]);
    const [tableMsg, setTableMsg] = useState(null)
    const [tableLoader, setTableLoader] = useState(false)
    const [rawEditing, setRawEditing] = useState(null);
    const [rawDeleting, setRawDeleting] = useState(null);
    const [count, setCount] = useState(0);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSearchEnabled, setIsSearchEnabled] = useState("");
    const [bvd9IdErrorText, setBvd9IdErrorText] = useState("");
    const [exportMsg, setExportMsg] = useState('')

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

            setIsSearchEnabled(isCategoryOfDocuments ? true : false);
            setIsFilterEnabled(false);

        }
        if (count) {
            setIsFilterEnabled(true);
        }
    };
    const isCategoryOfDocuments = !isEmpty(filters.categoryOfDoc);
    const hasBvd9Error = bvd9IdErrorText.length > 0;

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "bvd9Id") {
            validateBvd9Id(value);
        }
        if (event.target.name === "categoryOfDoc" || event.target.name === "publishedYear") {
            if (!isEmpty(value)) {
                setIsSearchEnabled(true)
            } else {
                if (!hasBvd9Error && isEmpty(value)) {
                    setIsSearchEnabled(false);
                } else {
                    setIsSearchEnabled(false);
                }
            }
        }

        setFilters({
            ...filters,
            [event.target.name]: value,
        });
    };
    const searchBvd9idAPI = async () => {
        const { bvd9Id, categoryOfDoc } = filters;
        const postData = {}
        if (!isEmpty(categoryOfDoc)) {
            postData.categoryOfDocument = categoryOfDoc
        }
        if (!isEmpty(bvd9Id)) {
            postData.bvd9 = bvd9Id
        }
        const response = await axios.post(apiConstant.search_api, postData)
            .then(response => {
                if (response?.data?.body?.length) {
                    // const structuredData = structureData(response.data.body)
                    setData(response.data.body)
                    setTableLoader(false)
                    setTableMsg(null)
                } else {
                    toast.error('Record Doesn\'t exist!. Try Again!', {
                        position: "top-right",
                        hideProgressBar: false,
                        autoClose: 6000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTableMsg(true)
                }
            })
            .catch(e => {
                toast.error('Network Error!. Connect to the network!', {
                    position: "top-right",
                    hideProgressBar: false,
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTableMsg(true)
            })
    }

    const handleSearch = () => {
        const { bvd9Id, categoryOfDoc, publishedYear } = filters;
        if (!isEmpty(bvd9Id) && !hasBvd9Error && isCategoryOfDocuments) {
            setModalOpen(true);
            return;
        }
        if (!hasBvd9Error && !isEmpty(categoryOfDoc)) {
            searchBvd9idAPI()
            // setTableMsg(true)
        } else {
            searchBvd9idAPI()
        }
        setCount(1)
        if (isSearchEnabled) {
            setExportMsg("Export Excel File")
        }
        setIsFilterEnabled(true);
        setTableLoader(true)
    };

    const handleReset = () => {
        setExportMsg("")
        setBvd9IdErrorText("");
        setIsFilterEnabled(false);
        setIsSearchEnabled(false);
        setTableMsg(null)
        setCount(0)
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
