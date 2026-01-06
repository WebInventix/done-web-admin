import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import css from "./CustomPhoneInput.module.css";
import PhoneInput from "react-phone-input-2";
import { Typography } from "@mui/material";

const CustomPhoneInput = ({
  value,
  onChange,
  placeholder,
  defaultCountry,
  error,
  disabled = false,
  defaultValue = "",
}) => {
  return (
    <div className={css.phone_input_container}>
      <PhoneInput
        disabled={disabled}
        containerStyle={{ height: "100%" }}
        inputStyle={{
          width: "100%",
          height: "100%",
          borderColor: error ? "#d32f2f" : "",
        }}
        searchStyle={{ borderColor: error ? "#d32f2f" : "" }}
        buttonClass={css.phone_inp}
        buttonStyle={{ borderColor: error ? "#d32f2f" : "" }}
        inputClass={`${css.phone_inp} ${error ? css.phone_inp_error : ""}`}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        autoFormat={true}
        value={value || defaultValue}
        onChange={onChange}
        country={"us"}
      />
      {error && (
        <Typography sx={{ color: "#d32f2f", fontSize: "12px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default CustomPhoneInput;
