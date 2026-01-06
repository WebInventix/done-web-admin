
import React, { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { themeOrange } from "../../utils/colorTheme";

const ShiftsSelector = ({
  selectedDate,
  onShiftSelect,
  allDates,
  initialShifts,
  spacing = 2,
  isModal = false,
}) => {
  const [selectedShifts, setSelectedShifts] = useState(initialShifts || []);

  const shifts = [
    { label: "Morning", time: "09:00 AM" },
    { label: "Afternoon", time: "01:00 PM" },
    { label: "Evening", time: "06:00 PM" },
  ];

  // useEffect(() => {
  //   setSelectedShifts(initialShifts || []); // Initialize shifts from props
  // }, [initialShifts]);

  // const isTodaySelected = allDates.some(
  //   (date) => new Date(date).toDateString() === new Date().toDateString()
  // );

  const isOnlyTodayInArray = () => {
    const today = new Date().toDateString();
    // Check if all dates in the array match today's date
    return (
      allDates.length === 1 && new Date(allDates[0]).toDateString() === today
    );
  };

  const _modalShiftsDisabled = (shiftTime) => {
    // If allDates does not contain only today's date, enable all shifts
    if (!isOnlyTodayInArray()) return false;

    const now = new Date();
    // const now = new Date("2024-11-22T13:16:00"); // Static time: 1:16 PM on Nov 22, 2024
    const today = new Date().toDateString();
    const selectedDay = new Date(selectedDate).toDateString();

    // Check if the selected date is today
    if (today !== selectedDay) {
      return false; // Enable all shifts for non-today dates
    }

    // Logic for disabling shifts only for today's date
    const [hours, minutesPart] = shiftTime.split(":");
    const minutes = parseInt(minutesPart.slice(0, 2));
    const ampm = shiftTime.slice(-2);
    const shiftDate = new Date();

    // Convert 12-hour time to 24-hour time
    shiftDate.setHours(
      ampm === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours)
    );
    shiftDate.setMinutes(minutes);
    shiftDate.setSeconds(0);
    shiftDate.setMilliseconds(0);

    return now > shiftDate; // Disable if the shift time has passed
  };

  const _isShiftDisabled = (shiftTime) => {
    // Check if today's date is selected
    const today = new Date();
    // const today = new Date("2024-11-22T13:16:00");
    const selectedDay = new Date(selectedDate).toDateString();

    if (selectedDay !== today.toDateString()) {
      // Enable all shifts for non-today dates
      return false;
    }

    // Logic for disabling past shifts for today's date
    const [hours, minutesPart] = shiftTime.split(":");
    const minutes = parseInt(minutesPart.slice(0, 2));
    const ampm = shiftTime.slice(-2);
    const shiftDate = new Date();

    // Convert 12-hour time to 24-hour time
    shiftDate.setHours(
      ampm === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours)
    );
    shiftDate.setMinutes(minutes);
    shiftDate.setSeconds(0);
    shiftDate.setMilliseconds(0);

    return today > shiftDate; // Disable if the shift time has passed
  };

  const handleShiftToggle = (shift) => {
    let updatedShifts;
    if (selectedShifts.includes(shift)) {
      updatedShifts = selectedShifts.filter((s) => s !== shift);
    } else {
      updatedShifts = [...selectedShifts, shift];
    }
    setSelectedShifts(updatedShifts);
    onShiftSelect(selectedDate, updatedShifts);
  };

  return (
    <Stack spacing={2}>
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction="row"
        gap={spacing}
        flexWrap={"wrap"}
      >
        {shifts.map(({ label, time }) => {
          const isSelected = selectedShifts.includes(label);
          const isDisabled = isModal
            ? _modalShiftsDisabled(time)
            : _isShiftDisabled(time); // Dynamically check if the shift should be disabled
          return (
            <Button
              disabled={isDisabled}
              key={label}
              variant={isSelected ? "contained" : "outlined"}
              onClick={() => handleShiftToggle(label)}
              sx={{
                backgroundColor: isSelected ? themeOrange : "white",
                borderColor: themeOrange,
                color: isSelected ? "white" : themeOrange,
                ":hover": {
                  borderColor: themeOrange,
                  backgroundColor: isSelected ? themeOrange : "white",
                },
                padding: {
                  xl: "9.8px 15px",
                  lg: "9.8px 15px",
                  md: "9.8px 15px",
                  sm: "7px 10px",
                  xs: "5px 8px",
                },
                textTransform: "capitalize",
                // width: {
                //   xl: "auto",
                //   lg: "auto",
                //   md: "auto",
                //   sm: "auto",
                //   xs: "100%",
                // },
                fontSize: {
                  xl: "13px",
                  lg: "13px",
                  md: "13px",
                  sm: "12px",
                  xs: "10px",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ShiftsSelector;
