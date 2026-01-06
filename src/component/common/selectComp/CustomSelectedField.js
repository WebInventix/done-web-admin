// import {
//   FormControl,
//   ThemeProvider,
//   createTheme,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import "./selectComp.css";

// const CustomSelectedField = ({
//   label,
//   placeholder,
//   optionsArr,
//   onChange,
//   defaultValue,
// }) => {
//   const [value, setValue] = useState(defaultValue || "");

//   const themeInp = createTheme({
//     palette: {
//       primary: {
//         main: "#F15A24", // Color 3
//       },
//     },
//   });

//   useEffect(() => {
//     setValue(defaultValue || "");
//   }, [defaultValue]);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//     onChange && onChange(event);
//   };
//   return (
//     <ThemeProvider theme={themeInp}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           label={label}
//           onChange={handleChange}
//         >
//           {optionsArr &&
//             optionsArr.map(({ value, title }, i) => {
//               return (
//                 <MenuItem key={i} value={value}>
//                   {title}
//                 </MenuItem>
//               );
//             })}
//         </Select>
//       </FormControl>
//     </ThemeProvider>
//   );
// };

// export default CustomSelectedField;



import React, { useEffect, useState } from "react";
import {
  FormControl,
  ThemeProvider,
  createTheme,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomSelectedField = ({
  label,
  placeholder,
  optionsArr = [],
  onChange,
  defaultValue = [],
  isMultiSelect = false, // Toggle for single/multi-select
  borderRadius = "5px",
  disabled = false,
}) => {
  const [value, setValue] = useState(
    isMultiSelect ? defaultValue ?? [] : defaultValue ?? ""
  );

  const themeInp = createTheme({
    palette: {
      primary: {
        main: "#F15A24",
      },
    },
  });

  useEffect(() => {
    setValue(isMultiSelect ? defaultValue ?? [] : defaultValue ?? "");
  }, [defaultValue, isMultiSelect]);

  const handleChange = (event) => {
    const { value } = event.target;
    const newValue = isMultiSelect
      ? typeof value === "string"
        ? value.split(",")
        : value
      : value;

    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ThemeProvider theme={themeInp}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          multiple={isMultiSelect}
          value={value}
          onChange={handleChange}
          input={
            <OutlinedInput
              label={label}
              sx={{
                fontSize: "18px",
                borderRadius: borderRadius,
              }}
            />
          }
          renderValue={(selected) =>
            isMultiSelect
              ? selected
                  .map(
                    (id) =>
                      optionsArr.find((option) => option.value === id)?.title ||
                      ""
                  )
                  .filter(Boolean) // Ensures no undefined values
                  .join(", ")
              : optionsArr.find((option) => option.value === selected)?.title ||
                ""
          }
          MenuProps={MenuProps}
        >
          {optionsArr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {isMultiSelect && (
                <Checkbox checked={value.includes(option.value)} />
              )}
              <ListItemText primary={option.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomSelectedField;
