import React, { Component } from 'react';
import set from 'lodash/fp/set';
import { Field } from 'redux-form';
import { Button } from '@material-ui/core';
import Table from 'react-table';
import * as BS from 'react-bootstrap';
import initialData from './dataFactory';
import FormProvider from './FormProvider';
import ActionsCell from './ActionsCell';
import HighlightCell from './HighlightCell';
import GridFilters from './GridFilters';
import Filter from './Filter/Filter';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: initialData, editing: null, deleting: null, isFilterEnabled: false };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSearch = () => {
    this.setState({ isFilterEnabled: true });
  };

  editableComponent = ({ input, editing, value, ...rest }) => {
    const Component = editing ? BS.FormControl : BS.FormControl.Static;
    const children = (!editing && <HighlightCell value={value} {...rest} />) || undefined;
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
    return <Component {...input} {...rest} children={children} />;
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
          ? 'delete'
          : this.state.editing === rowProps.original
          ? 'edit'
          : 'view',
      actions: {
        onEdit: () =>
          this.setState({ editing: rowProps.original }, () =>
            console.log('editing', this.state.editing),
          ),
        onDelete: () => {
          this.setState({ deleting: rowProps.original });
          let data_ = this.state.data;
          data_.splice(rowProps.index, 1);
          this.setState({ data: data_ });
        },
        onCancel: () => this.setState({ editing: null, deleting: null }),
      },
    }) ||
    {};

  renderHeader = (name) => {
    return (
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {name}
      </span>
    );
  };

  columns = [
    {
      Header: '',
      maxWidth: 300,
      filterable: false,
      getProps: this.getActionProps,
      Cell: ActionsCell,
    },
    {
      Header: this.renderHeader('BVD9 ID'),
      accessor: 'bvd9Id',
      ...this.editableColumnProps,
    },
    { Header: this.renderHeader('VE ID'), accessor: 'veId', ...this.editableColumnProps },
    {
      Header: this.renderHeader('Company Name'),
      accessor: 'companyName',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('Standalone Document'),
      accessor: 'stdDoc',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('Name of Document'),
      accessor: 'nameOfDoc',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('Soruce of the Document'),
      accessor: 'sourceOfDoc',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('Category of Document'),
      accessor: 'categoryOfDoc',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('URL of Document'),
      accessor: 'urlOfDoc',
      ...this.editableColumnProps,
    },
    {
      Header: this.renderHeader('Published Year'),
      accessor: 'publishedYear',
      ...this.editableColumnProps,
    },
    { Header: this.renderHeader('Comments'), accessor: 'comments', ...this.editableColumnProps },
  ];

  handleSubmit = (values) => {
    console.log('values', values);
    this.setState((state) => {
      const index = this.state.data.indexOf(this.state.editing);
      return {
        data: set(`[${index}]`, values, state.data),
      };
    });
  };

  render() {
    return (
      <>
        <Filter handleSearch={this.handleSearch} handleInputChange={this.handleInputChange} />
        {this.state.isFilterEnabled && (
          <>
            <FormProvider
              form="inline"
              onSubmit={this.handleSubmit}
              onSubmitSuccess={() => this.setState({ editing: null })}
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
                    />
                  </form>
                );
              }}
            </FormProvider>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
              <Button type="submit" variant="contained" color="default" style={{ marginRight: 10 }}>
                Edit All
              </Button>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
                Save All
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Submit All
              </Button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default TableComponent;
