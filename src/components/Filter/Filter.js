import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  filterContainer: {
    padding: "30px 0",
  },
  form: {
    margin: 20,
    display: "flex",
    alignItems: "center",
  },
  textField: {
    marginRight: 20,
  },
  filterTitle: {
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 30,
  },
  searchButton: {
    marginLeft: 20,
    marginBottom: 30,
  },
}));

const Filter = ({
  isSearchEnabled,
  bvd9IdErrorText,
  handleSearch,
  handleInputChange,
  handleReset,
  formValues,
}) => {
  const classes = useStyles();
  const error = bvd9IdErrorText.length > 0;
  const { bvd9Id, companyName, categoryOfDoc, publishedYear, docName } =
    formValues;
  return (
    <div className={classes.filterContainer}>
      <Typography variant="h4" className={classes.filterTitle} color="primary">
        Filters
      </Typography>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="BVD9 ID"
          name="bvd9Id"
          value={bvd9Id}
          variant="outlined"
          type="number"
          error={error}
          helperText={bvd9IdErrorText}
          onChange={handleInputChange}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 9);
          }}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Company Name"
          name="companyName"
          value={companyName}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Category of Document"
          name="categoryOfDoc"
          value={categoryOfDoc}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Published Year"
          name="publishedYear"
          value={publishedYear}
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Document Name"
          name="docName"
          value={docName}
          variant="outlined"
          onChange={handleInputChange}
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.searchButton}
        onClick={handleSearch}
        disabled={!isSearchEnabled}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.searchButton}
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  );
};

export default Filter;
