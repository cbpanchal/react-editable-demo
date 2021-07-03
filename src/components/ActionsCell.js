import React from "react";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Checkbox from "@material-ui/core/Checkbox";

const editModes = {
  view: (props) => {
    const { checkedRow } = props;
    return (
      <>
        <Checkbox
          color="primary"
          checked={checkedRow}
          inputProps={{ "aria-label": "secondary checkbox" }}
          onChange={props.onSelection}
        />
        <EditIcon size="small" onClick={props.onEdit} color="primary" />
        <SaveAlt size="small" />
        <DeleteIcon size="small" onClick={props.onDelete} color="secondary" />
      </>
    );
  },
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
    actions: {
      onEdit,
      onCancel,
      onDelete,
      onSelection,
      currentRow,
      checkedRow,
    },
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
        onSelection={onSelection}
        currentRow={currentRow}
        checkedRow={checkedRow}
      />
    </div>
  );
}
