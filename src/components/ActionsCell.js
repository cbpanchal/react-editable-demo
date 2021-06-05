import React from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const editModes = {
  view: (props) => (
    <>
      <EditIcon onClick={props.onEdit} color="primary" />
      <DeleteIcon onClick={props.onDelete} color="secondary" />
    </>
  ),
  edit: (props) => (
    <React.Fragment>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={props.onCancel}>
        Cancel
      </Button>
    </React.Fragment>
  ),
};

export default function ActionsCell(props) {
  const {
    mode,
    actions: { onEdit, onCancel, onDelete },
  } = props.columnProps.rest;
  const Buttons = editModes[mode];
  return <Buttons onEdit={() => onEdit(props.index)} onCancel={onCancel} />;
}
