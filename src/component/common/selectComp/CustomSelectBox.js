import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Typography, Stack } from "@mui/material";
import { themeOrange } from "./../../../utils/colorTheme";

const CustomSelectBox = ({
  options = [],
  value = null,
  onChange,
  isMulti = false,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  placeholder = "Select...",
  className = "",
  customStyles = {},
  defaultValue = null,
  label,
  selectStyle,
  error,
  errorStyle = {},
  customColor = themeOrange, // Custom color prop for border and shadow
  showClearIcon = true, // New prop to conditionally show or hide clear icon
  loading = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || value);

  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const defaultStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "10px",
      border: `1px solid ${
        error ? "red" : state.isFocused ? customColor : "lightgrey"
      }`,
      minHeight: "40px",
      width: "100%",
      height: "42px",
      boxShadow: state.isFocused
        ? error
          ? "0 0 5px rgba(255, 0, 0, 0.5)"
          : `0 0 5px ${customColor}80` // Use customColor for shadow with transparency
        : "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        border: `1px solid ${customColor}`, // Hover border color
      },
      padding: "2px 0px 2px 4px",
      ...customStyles.control,
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "'Poppins', sans-serif",
      ...customStyles.menu,
    }),
    menuList: (provided) => ({
      ...provided,
      fontFamily: "'Poppins', sans-serif",
      ...customStyles.menuList,
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: state.isFocused ? `${customColor}33` : "white", // Custom hover color with transparency
      color: state.isFocused ? customColor : "#333", // Custom text color on hover
      cursor: "pointer",
      "&:active": {
        backgroundColor: `${customColor}66`, // Custom active background color
      },
      ...customStyles.option,
    }),
    placeholder: (provided) => ({
      ...provided,
      // color: "#888",
      color: "#615d5d",
      fontFamily: "'Poppins', sans-serif",
      ...customStyles.placeholder,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      fontFamily: "Poppins, sans-serif",
      ...customStyles.singleValue,
    }),
    multiValue: (provided) => ({
      ...provided,
      // backgroundColor: `${customColor}33`, // Custom color for selected multi-value background
      // borderRadius: "12px",
      // padding: "2px 20px",
      fontFamily: "'Poppins', sans-serif",
      ...customStyles.multiValue,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: customColor, // Custom text color for multi-value label
      fontFamily: "'Poppins', sans-serif",
      // padding: "2px 20px",
      ...customStyles.multiValueLabel,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: customColor, // Custom remove icon color
      cursor: "pointer",
      "&:hover": {
        backgroundColor: `${customColor}33`,
        color: customColor,
      },
      ...customStyles.multiValueRemove,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        width: "100%",
      }}
    >
      {label && (
        <label
          className="input-label"
          style={{
            color: "black",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            ...selectStyle,
          }}
        >
          {label}
        </label>
      )}
      <Stack sx={{ width: "100%" }}>
        <Select
          options={options}
          value={selectedValue}
          onChange={handleChange}
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          isLoading={loading}
          placeholder={placeholder}
          className={`react-select-container ${className}`}
          classNamePrefix="react-select"
          // styles={defaultStyles}
          styles={{
            ...defaultStyles,
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (base) => ({ ...base, zIndex: 9999, position: "absolute" }),
          }}
        />
        {error && (
          <Typography sx={{ color: "red", fontSize: "12px", ...errorStyle }}>
            {error}
          </Typography>
        )}
      </Stack>
    </div>
  );
};

export default CustomSelectBox;
