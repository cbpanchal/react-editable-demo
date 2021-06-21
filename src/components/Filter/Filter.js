import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../Fields/Input";
import Select from "../Fields/Select";
import { categoryOfDocumentItems } from "../dataFactory";

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    padding: "30px 0",
  },
  form: {
    margin: 20,
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginTop: 8,
    marginRight: 20,
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
        <Grid container>
          <Grid item>
            <Input
              label="BVD9 ID"
              name="bvd9Id"
              value={bvd9Id}
              variant="outlined"
              type="number"
              error={error}
              helperText={bvd9IdErrorText}
              handleInputChange={handleInputChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 9);
              }}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.textField}
              id="outlined-basic"
              label="Company Name"
              name="companyName"
              value={companyName}
              variant="outlined"
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Select
              inputLabel="Category of Document"
              value={categoryOfDoc}
              name="categoryOfDoc"
              label="Category of Document"
              menuItems={categoryOfDocumentItems}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.textField}
              id="outlined-basic"
              label="Published Year"
              name="publishedYear"
              value={publishedYear}
              variant="outlined"
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.textField}
              id="outlined-basic"
              label="Document Name"
              name="docName"
              value={docName}
              variant="outlined"
              handleInputChange={handleInputChange}
            />
          </Grid>
        </Grid>
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
