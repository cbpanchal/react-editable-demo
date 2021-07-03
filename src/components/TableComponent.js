import React from "react";
import { Field } from "redux-form";
import Skeleton from "@material-ui/lab/Skeleton";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Checkbox from "@material-ui/core/Checkbox";
import * as BS from "react-bootstrap";
import ActionsCell from "./ActionsCell";
import HighlightCell from "./HighlightCell";
import GridFilters from "./GridFilters";
import useTable from "./useTable";
import {
  headerStyle,
  rowStyle,
  selectAllHeader,
  skeletonContainer,
} from "./styles/tableStyle";
import Modal from "./Modal/Modal";
import { lazyComponent } from "../helpers/misc";

const Filter = lazyComponent(() => import("./Filter"));
const Table = lazyComponent(() => import("./Table"));

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
    loading,
    isModalOpen,
    setModalOpen,
    selectedRows,
    handleSelection,
  } = useTable();

  const editableComponent = ({ input, editing, value, ...rest }) => {
    const Component = editing ? BS.FormControl : BS.FormControl.Static;
    const children =
      (!editing && <HighlightCell value={value} {...rest} />) || undefined;
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
        },
        onCancel: () => {
          setRawDeleting(null);
          setRawEditing(null);
        },
        onSelection: () => {
          console.log("onSelection", rowProps.original);
          handleSelection(rowProps.original.id);
        },
        onDownload: () => {
          // call download handler here
          // handleDownload(rowProps.original.id);
        },
        checkedRow: selectedRows.includes(rowProps.original.id),
      },
    }) ||
    {};

  const renderSelectAllHeader = () => {
    return (
      <div style={{ ...selectAllHeader }}>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          onChange={() => {}}
        />
        <SaveAlt size="small" />
      </div>
    );
  };

  const renderHeader = (name) => {
    return (
      <span
        style={{
          color: "#A1A1A2",
          fontSize: 18,
        }}
      >
        {name}
      </span>
    );
  };

  // eslint-disable-next-line
  const columns = [
    {
      Header: renderSelectAllHeader,
      sortable: false,
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
      Cell: (e) => (
        // eslint-disable-next-line
        <a
          onClick={(event) => {
            event.preventDefault();
            const { value, row } = e;
            console.log("Link clicked!!", value);
            console.log("raw", row);
          }}
          href=""
          target="_blank"
        >
          {e.value}{" "}
        </a>
      ),
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

  const tableData = React.useMemo(
    () => (loading ? Array(5).fill({}) : data),
    [loading, data]
  );

  const tableColumns = React.useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            Cell: (
              <div style={{ ...skeletonContainer }}>
                <Skeleton width={100} />
              </div>
            ),
          }))
        : columns,
    [loading, columns]
  );

  return (
    <>
      <Filter
        filters={filters}
        bvd9IdErrorText={bvd9IdErrorText}
        isSearchEnabled={isSearchEnabled}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        handleReset={handleReset}
      />
      {isFilterEnabled && (
        <Table
          handleSubmit={handleSubmit}
          setRawEditing={setRawEditing}
          setRawDeleting={setRawDeleting}
          rawEditing={rawEditing}
          tableColumns={tableColumns}
          tableData={tableData}
        />
      )}
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default TableComponent;
