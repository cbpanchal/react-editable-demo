import React from "react";
import Table from "react-table";
import * as BS from "react-bootstrap";
import FormProvider from "../FormProvider";
import Pagination from "../Pagination/Pagination";

const TableComponent = ({
  handleSubmit,
  setRawEditing,
  setRawDeleting,
  rawEditing,
  tableColumns,
  tableData,
}) => {
  return (
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
                columns={tableColumns}
                data={tableData}
                defaultPageSize={5}
                className="-striped -highlight"
                resizable={true}
                showPaginationTop={true}
                showPaginationBottom={false}
                PaginationComponent={Pagination}
                selectType="checkbox"
              />
            </form>
          );
        }}
      </FormProvider>
    </BS.Panel>
  );
};

export default TableComponent;
