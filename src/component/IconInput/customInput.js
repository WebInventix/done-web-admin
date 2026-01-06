import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Typography } from "@mui/material";
import { themeBlue, themeOrange } from "../../utils/colorTheme";

function CustomLocationSearch({
  setSelectedLocationProps,
  textCondition,
  defaultValue,
  label = "Where do you need a Done?",
}) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelect = (place) => {
    setSelectedLocation(place);
    setSelectedLocationProps(place);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {textCondition && (
          <Typography className="label-text" style={{ marginBottom: "10px" }}>
            {label}
          </Typography>
        )}
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            componentRestrictions: {
              country: ["ca"],
            },
          }}
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          query={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            language: "en",
          }}
          selectProps={{
            defaultInputValue: defaultValue,
            selectedLocation,
            onChange: handleSelect,
            styles: {
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              control: (provided) => ({
                ...provided,
                // backgroundColor: "red",
                border: `1px solid ${themeOrange}`,
                padding: "0px 5px",
                boxShadow: "none",
                "&:hover": {
                  borderColor: themeBlue,
                },
                borderRadius: "6px",
              }),
              input: (provided) => ({
                ...provided,
                color: themeBlue,
                padding: "10px 10px 10px 0px",
              }),
              singleValue: (provided) => ({
                ...provided,
                // color: "#031444",
              }),
              placeholder: (provided) => ({
                ...provided,
                // color: " #031444",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "white",
                border: `1px solid ${themeOrange}`,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#eaeaea" : "white",
                // color: "red",
                padding: "10px",
                cursor: "pointer",
              }),

              dropdownIndicator: (provided) => ({
                ...provided,
                color: themeOrange, // Change this to your desired arrow color
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: themeBlue, // Change this to your desired border color
              }),
            },
          }}
        />
      </div>
    </div>
  );
}

export default CustomLocationSearch;
