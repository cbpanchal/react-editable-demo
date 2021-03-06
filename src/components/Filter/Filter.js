import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Bvd9Id from "./Bvd9Id";
import CompanyName from "./CompanyName";
import CategoryOfDocument from "./CategoryOfDocument";
import PublishedYear from "./PublishedYear";
import DocumentName from "./DocumentName";

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
            <Bvd9Id
              bvd9Id={bvd9Id}
              error={error}
              bvd9IdErrorText={bvd9IdErrorText}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <CompanyName
              className={classes.textField}
              companyName={companyName}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <CategoryOfDocument
              categoryOfDoc={categoryOfDoc}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <PublishedYear
              publishedYear={publishedYear}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <DocumentName
              className={classes.textField}
              docName={docName}
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
