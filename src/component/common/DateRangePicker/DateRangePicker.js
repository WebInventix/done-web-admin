


import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({
  selectedDates = [],
  onSelect,
  disabledDates = [],
  disableAllDates = false,
  exceptDates = [],  // New prop for dates to be enabled
  customClassNames = {
    selected: "custom-selected",
    recent: "custom-recent-selected",
  },
  customStyles = {
    day: { border: "none" },
  },
  containerStyles = {
    // backgroundColor: "white",
    // borderRadius: "5px",
    // boxShadow: "5px 0px 10px rgba(0,0,0,0.2)",
    // padding: "20px",
    // overflow:"auto"
  },
}) => {
  const isDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time for today comparison

    // If disableAllDates is true, disable all dates
    if (disableAllDates) {
      return true;
    }

    // If exceptDates has values, only allow dates from exceptDates
    if (exceptDates.length > 0) {
      const isExceptDate = exceptDates.some(
        (exceptDate) => new Date(exceptDate).toDateString() === date.toDateString()
      );
      return !isExceptDate;  // Disable all except for the dates in exceptDates
    }

    // Check if the date is in the disabledDates array
    const isSpecificDateDisabled = disabledDates.some(
      (disabledDate) => new Date(disabledDate).toDateString() === date.toDateString()
    );

    const isBeforeToday = date < today;

    return isSpecificDateDisabled || isBeforeToday; // Disable based on disabledDates and past dates
  };

  return (
    <div style={containerStyles}>
      <DayPicker
        mode="multiple"
        disabled={isDisabled}
        selected={selectedDates}
        onSelect={onSelect}
        classNames={customClassNames}
        styles={customStyles}
      />
    </div>
  );
};

export default DateRangePicker;
