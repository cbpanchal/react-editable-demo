import React from "react";
import { Field } from "redux-form";
import { Button } from "@material-ui/core";
import Table from "react-table";
import * as BS from "react-bootstrap";
import cloneDeep from "lodash/cloneDeep";
import FormProvider from "./FormProvider";
import ActionsCell from "./ActionsCell";
import HighlightCell from "./HighlightCell";
import GridFilters from "./GridFilters";
import Filter from "./Filter/Filter";
import useTable from "./useTable";

import { headerStyle, rowStyle } from "./styles/tableStyle";

const TableComponent = () => {
  const {
    data,
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
  } = useTable();

  const editableComponent = ({ input, editing, value, ...rest }) => {
    const Component = editing ? BS.FormControl : BS.FormControl.Static;
    const children =
      (!editing && <HighlightCell value={value} {...rest} />) || undefined;
    // const children =
    //   (editing && (
    //     <TextField
    //       defaultValue={value}
    //       margin="normal"
    //       variant="outlined"
    //       {...rest}
    //     />
    //   )) ||
    //   undefined;
    return <Component {...input} children={children} />;
  };

  const editableColumnProps = {
    ...GridFilters,
    Cell: (props) => {
      const editing = rawEditing === props.original;
      const fieldProps = {
        component: editableComponent,
        editing,
        props,
      };

      return <Field name={props.column.id} {...fieldProps} />;
    },
  };

  const getActionProps = (gridState, rowProps) =>
    (rowProps && {
      mode:
        rawDeleting === rowProps.original
          ? "delete"
          : rawEditing === rowProps.original
          ? "edit"
          : "view",
      actions: {
        onEdit: () => setRawEditing(rowProps.original),
        onDelete: () => {
          console.log(rowProps.original, "rowProps.original");
          setRawDeleting(rowProps.original);
          let _data = cloneDeep(data);
          _data.splice(rowProps.index, 1);
          console.log("_data", _data);
          // setData(_data);
        },
        onCancel: () => {
          setRawDeleting(null);
          setRawEditing(null);
        },
      },
    }) ||
    {};

  const renderHeader = (name) => {
    return (
      <span
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {name}
      </span>
    );
  };

  const columns = [
    {
      Header: "",
      filterable: false,
      minWidth: 140,
      getProps: getActionProps,
      Cell: ActionsCell,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "100 0 auto",
        ...rowStyle,
      },
    },
    {
      Header: renderHeader("BVD9 ID"),
      accessor: "bvd9Id",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("VE ID"),
      accessor: "veId",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Company Name"),
      accessor: "companyName",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Standalone Document"),
      accessor: "stdDoc",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Name of Document"),
      accessor: "nameOfDoc",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Soruce of the Document"),
      accessor: "sourceOfDoc",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Category of Document"),
      accessor: "categoryOfDoc",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("URL of Document"),
      accessor: "urlOfDoc",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Published Year"),
      accessor: "publishedYear",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: renderHeader("Comments"),
      accessor: "comments",
      ...editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
  ];
  console.log("data", data);
  return (
    <>
      <Filter
        formValues={{
          ...filters,
        }}
        bvd9IdErrorText={bvd9IdErrorText}
        isSearchEnabled={isSearchEnabled}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        handleReset={handleReset}
      />
      {isFilterEnabled && (
        <BS.Panel bsStyle="primary">
          <FormProvider
            form="inline"
            onSubmit={handleSubmit}
            onSubmitSuccess={() => {
              setRawEditing(null);
              setRawDeleting(null);
            }}
            initialValues={rawEditing}
            enableReinitialize
          >
            {(formProps) => {
              return (
                <form onSubmit={formProps.handleSubmit}>
                  <Table
                    columns={columns}
                    data={data}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    resizable={true}
                  />
                </form>
              );
            }}
          </FormProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="default"
              style={{ marginRight: 10 }}
            >
              Edit All
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
            >
              Save All
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit All
            </Button>
          </div>
        </BS.Panel>
      )}
    </>
  );
};

export default TableComponent;
