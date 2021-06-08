import React, { Component } from "react";
import set from "lodash/fp/set";
import { Field } from "redux-form";
import { Button } from "@material-ui/core";
import Table from "react-table";
import * as BS from "react-bootstrap";
import initialData from "./dataFactory";
import FormProvider from "./FormProvider";
import ActionsCell from "./ActionsCell";
import HighlightCell from "./HighlightCell";
import GridFilters from "./GridFilters";
import Filter from "./Filter/Filter";

import { headerStyle, rowStyle } from "./styles/tableStyle";
import { bvd9IdPattern } from "./helper";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData,
      editing: null,
      deleting: null,
      isFilterEnabled: false,
      bvd9Id: "",
      companyName: "",
      categoryOfDoc: "",
      publishedYear: "",
      docName: "",
      bvd9IdErrorText: "",
      isSearchEnabled: false,
    };
  }

  validateBvd9Id = (value) => {
    if (value.match(bvd9IdPattern)) {
      this.setState({ bvd9IdErrorText: "", isSearchEnabled: true });
    } else {
      this.setState({
        bvd9IdErrorText: "BVD9 ID should be 9 digits",
        isSearchEnabled: false,
        isFilterEnabled: false,
      });
    }
  };

  handleInputChange = (event) => {
    if (event.target.name === "bvd9Id") {
      this.validateBvd9Id(event.target.value);
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = () => {
    this.setState({ isFilterEnabled: true });
    console.log("State::>", this.state);
  };

  handleReset = () => {
    this.setState({
      isFilterEnabled: false,
      bvd9Id: "",
      companyName: "",
      categoryOfDoc: "",
      publishedYear: "",
      docName: "",
      bvd9IdErrorText: "",
      isSearchEnabled: false,
    });
  };

  editableComponent = ({ input, editing, value, ...rest }) => {
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

  editableColumnProps = {
    ...GridFilters,
    Cell: (props) => {
      const editing = this.state.editing === props.original;
      const fieldProps = {
        component: this.editableComponent,
        editing,
        props,
      };

      return <Field name={props.column.id} {...fieldProps} />;
    },
  };

  getActionProps = (gridState, rowProps) =>
    (rowProps && {
      mode:
        this.state.deleting === rowProps.original
          ? "delete"
          : this.state.editing === rowProps.original
          ? "edit"
          : "view",
      actions: {
        onEdit: () =>
          this.setState({ editing: rowProps.original }, () =>
            console.log("editing", this.state.editing)
          ),
        onDelete: () => {
          console.log(rowProps.original, "rowProps.original");
          this.setState({ deleting: rowProps.original });
          let data_ = this.state.data;
          data_.splice(rowProps.index, 1);
          console.log("data_", data_);
          // this.setState({ data: data_ });
        },
        onCancel: () => this.setState({ editing: null, deleting: null }),
      },
    }) ||
    {};

  renderHeader = (name) => {
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

  columns = [
    {
      Header: "",
      filterable: false,
      minWidth: 140,
      getProps: this.getActionProps,
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
      Header: this.renderHeader("BVD9 ID"),
      accessor: "bvd9Id",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("VE ID"),
      accessor: "veId",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Company Name"),
      accessor: "companyName",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Standalone Document"),
      accessor: "stdDoc",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Name of Document"),
      accessor: "nameOfDoc",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Soruce of the Document"),
      accessor: "sourceOfDoc",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Category of Document"),
      accessor: "categoryOfDoc",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("URL of Document"),
      accessor: "urlOfDoc",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Published Year"),
      accessor: "publishedYear",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
    {
      Header: this.renderHeader("Comments"),
      accessor: "comments",
      ...this.editableColumnProps,
      headerStyle: { ...headerStyle },
      style: { ...rowStyle },
    },
  ];

  handleSubmit = (values) => {
    console.log("values", values);
    this.setState((state) => {
      const index = this.state.data.indexOf(this.state.editing);
      return {
        data: set(`[${index}]`, values, state.data),
      };
    });
  };

  render() {
    const {
      bvd9Id,
      companyName,
      categoryOfDoc,
      publishedYear,
      docName,
      bvd9IdErrorText,
      isSearchEnabled,
    } = this.state;
    return (
      <>
        <Filter
          formValues={{
            bvd9Id,
            companyName,
            categoryOfDoc,
            publishedYear,
            docName,
          }}
          bvd9IdErrorText={bvd9IdErrorText}
          isSearchEnabled={isSearchEnabled}
          handleSearch={this.handleSearch}
          handleInputChange={this.handleInputChange}
          handleReset={this.handleReset}
        />
        {this.state.isFilterEnabled && (
          <BS.Panel bsStyle="primary">
            <FormProvider
              form="inline"
              onSubmit={this.handleSubmit}
              onSubmitSuccess={() =>
                this.setState({ editing: null, deleting: null })
              }
              initialValues={this.state.editing}
              enableReinitialize
            >
              {(formProps) => {
                return (
                  <form onSubmit={formProps.handleSubmit}>
                    <Table
                      columns={this.columns}
                      data={this.state.data}
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
  }
}

export default TableComponent;
