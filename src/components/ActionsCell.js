import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const editModes = {
  view: (props) => (
    <>
      <EditIcon size="small" onClick={props.onEdit} color="primary" />
      <DeleteIcon size="small" onClick={props.onDelete} color="secondary" />
    </>
  ),
  edit: (props) => (
    <React.Fragment>
      <Button size="small" type="submit" variant="contained" color="primary">
        Save
      </Button>
      <Button
        size="small"
        variant="contained"
        color="default"
        onClick={props.onCancel}
      >
        Cancel
      </Button>
    </React.Fragment>
  ),
  delete: (props) => (
    <React.Fragment>
      <Button size="small" type="submit" variant="contained" color="secondary">
        Delete
      </Button>
      <Button
        size="small"
        variant="contained"
        color="default"
        onClick={props.onCancel}
      >
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flex: "100 0 auto",
      }}
    >
      <Buttons
        onEdit={() => onEdit(props.index)}
        onDelete={() => onDelete(props.index)}
        onCancel={onCancel}
      />
    </div>
  );
}
