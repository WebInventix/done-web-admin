import { Stack, ThemeProvider, createTheme } from "@mui/material";
import TextField from '@mui/material/TextField';

// import { themeGrey, themeLight } from "../../utils/colorTheme";
import "./input.css";
function Input(props) {
  const {
    value,
    placeholder,
    type,
    id,
    onChange,
    color,
    required,
    disabled,
    className,
    width,
    label,
    style,
    maxLength,
    minLength,
    defaultValue,
    rest_stack_styles,
    multiline,
    maxRows,
    rows,
  } = props;

  const themeInp = createTheme({
    palette: {
      primary: {
        main: "#F15A24", // Color 3
      },
    },
  });
  return (
    <Stack style={{ ...rest_stack_styles }}>
      <ThemeProvider theme={themeInp}>
        <TextField
          defaultValue={defaultValue}
          type={type}
          maxRows={maxRows}
          multiline={multiline}
          width={width}
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={className ? "inputStyle " + className : "inputStyle"}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          sx={{ ontSize: "18px", color: "gray", outline: "none", ...style }}
          label={label}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
      </ThemeProvider>
    </Stack>
  );
}
export default Input;
