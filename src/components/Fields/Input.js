import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: 20,
  },
}));

const Input = ({
  value,
  name,
  label,
  type,
  error = false,
  helperText = "",
  handleInputChange,
  onInput,
}) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      id="outlined-basic"
      label={label}
      name={name}
      value={value}
      variant="outlined"
      type={type}
      error={error}
      helperText={helperText}
      onChange={handleInputChange}
      margin="normal"
      onInput={onInput}
    />
  );
};

export default Input;
