import { toast } from "react-toastify";

export const bvd9IdPattern = new RegExp("^\\d{9}$");

export const searchParams = {
  bvd9Id: "",
  companyName: "",
  categoryOfDoc: "",
  publishedYear: "",
  docName: "",
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    hideProgressBar: false,
    autoClose: 6000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
