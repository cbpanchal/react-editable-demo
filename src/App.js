import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableComponent from "./components/TableComponent";

function App() {
  return (
    <>
      <TableComponent />
      <ToastContainer />
    </>
  );
}

export default App;
