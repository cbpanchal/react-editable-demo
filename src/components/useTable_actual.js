import React, { useState } from "react";
import { toast } from 'react-toastify';
import cloneDeep from "lodash/cloneDeep";
import { bvd9IdPattern } from "./searchComponents/helper";
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
            setBvd9IdErrorText("BVD9 ID should be 9 digits");
            setIsSearchEnabled(false);
            setIsFilterEnabled(false);
        }
        if(count){
        setIsFilterEnabled(true);
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

    const searchBvd9idAPI = async () => {
        const bvd9 = filters.bvd9Id;
        const postData = { bvd9 }
        const response = await axios.post(apiConstant.search_api, postData)
            .then(response => {
                if (response?.data?.body?.length) {
                    const structuredData = response.data.body.map((data, index) => {
                        return ({
                            id: index,
                            bvd9Id: data["BVD9 ID"],
                            veId: data["VE ID"],
                            companyName: data["Company Name"],
                            stdDoc: data["Standalone Document"],
                            nameOfDoc: data["Name of Document"],
                            sourceOfDoc: data["Source Of the Document"],
                            categoryOfDoc: data["Category Of Document"],
                            urlOfDoc: data["URL for Document"],
                            publishedYear: data["Published Year"],
                            comments: data["Comments"]
                        })
                    })
                    setData(structuredData)
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
        setCount(1)
        if(isSearchEnabled){
        setExportMsg("Export Excel File")
        }
        setIsFilterEnabled(true);
        setTableLoader(true)
        searchBvd9idAPI()
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
    };
}

export default useTable;
