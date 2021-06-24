import axios from "axios";
import apiConstant from "../../../utils/apiConstant";
import { showErrorToast } from "../helper";

export const searchAPI = async (params, options) => {
  const { setData, setTableLoader, setTableMsg } = options;
  setTableLoader(true);
  await axios
    .post(apiConstant.search_api, params)
    .then((response) => {
      if (response?.data?.body?.length) {
        setData(response.data.body);
        setTableMsg(null);
      } else {
        showErrorToast("Record Doesn't exist!. Try Again!");
        setTableMsg(true);
      }
    })
    .catch((e) => {
      showErrorToast("Network Error!. Connect to the network!");
      setTableMsg(true);
    });
};
