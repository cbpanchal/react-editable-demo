import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  filterContainer: {
    padding: '30px 0',
  },
  form: {
    margin: 20,
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginRight: 20,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 30,
  },
  searchButton: {
    marginLeft: 20,
    marginBottom: 30,
  },
}));

const Filter = ({ handleSearch, handleInputChange }) => {
  const classes = useStyles();
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
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Category of Document"
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Published Year"
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Document Name"
          variant="outlined"
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.searchButton}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default Filter;
