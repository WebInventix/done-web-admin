import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { 
  Stack, 
  Typography, 
  IconButton, 
  Grid, 
  Box,
  Chip,
  Divider,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { RxCross2, RxPlus } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import CustomModal from "../common/CustomModal/CustomModal";
import { themeOrange } from "../../utils/colorTheme";
import { format, isBefore, isSameDay, addDays } from "date-fns";
import CustomButton from "../common/Button/Button";

const AdminDateShiftPicker = ({
  initialDates = [],
  onDatesChange,
  maxDates = 10,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState({
    Morning: true,
    Afternoon: true,
    Evening: true
  });

  // Disable past dates and already selected dates
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return (
      isBefore(date, today) || 
      initialDates.some(d => isSameDay(new Date(d.selected_date), date)
    ))
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleShiftToggle = (shift) => {
    setSelectedShifts(prev => ({
      ...prev,
      [shift]: !prev[shift]
    }));
  };

  const handleRemoveDate = (dateToRemove) => {
    const updated = initialDates.filter(
      item => item.selected_date !== dateToRemove
    );
    onDatesChange(updated);
  };

  const handleSaveDates = () => {
    // Get active shifts
    const activeShifts = Object.entries(selectedShifts)
      .filter(([_, isSelected]) => isSelected)
      .map(([shift]) => shift);

    // Format new dates with shifts
    const newDateEntries = selectedDates.map(date => ({
      selected_date: format(date, 'yyyy-MM-dd'),
      shifts: activeShifts
    }));

    // Combine with existing dates (filter out duplicates just in case)
    const allDates = [...initialDates, ...newDateEntries].reduce((acc, curr) => {
      if (!acc.some(item => item.selected_date === curr.selected_date)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    onDatesChange(allDates);
    setSelectedDates([]);
    setOpenModal(false);
  };

  const handleSelectAllShifts = (selectAll) => {
    setSelectedShifts({
      Morning: selectAll,
      Afternoon: selectAll,
      Evening: selectAll
    });
  };

  const allShiftsSelected = Object.values(selectedShifts).every(Boolean);

  return (
    <Stack gap={2}>
      {/* Current Dates Display */}
      {initialDates.length > 0 ? (
        <Stack gap={1}>
          <Typography variant="subtitle2">Selected Dates:</Typography>
          {initialDates.map(({ selected_date, shifts }) => {
            const dateObj = new Date(selected_date);
            return (
              <Grid 
                container 
                key={selected_date} 
                alignItems="center" 
                spacing={1}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Grid item xs={5}>
                  <Typography fontWeight={500}>
                    {format(dateObj, "EEE, MMM d, yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {shifts?.map(shift => (
                      <Chip 
                        key={shift}
                        label={shift} 
                        size="small"
                        sx={{ 
                          bgcolor: themeOrange + '20',
                          color: 'text.primary'
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <IconButton 
                    onClick={() => handleRemoveDate(selected_date)}
                    size="small"
                  >
                    <TiDelete color={themeOrange} size={20} />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No dates selected yet
        </Typography>
      )}

      <Divider />

      {/* Add Dates Button */}
      <CustomButton
        onClick={() => setOpenModal(true)}
        disabled={initialDates.length >= maxDates}
        startIcon={<RxPlus size={18} />}
        style={{
          background: themeOrange,
          color: "white",
          borderRadius: "8px",
          alignSelf: 'flex-start'
        }}
      >
        {initialDates.length >= maxDates 
          ? `Maximum ${maxDates} dates reached` 
          : 'Add Dates'}
      </CustomButton>

      {/* Date Picker Modal */}
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        modal_inner_Style={{ 
          maxWidth: "500px",
          p: 3
        }}
      >
        <Stack gap={3} sx={{background: "white" , padding: 2}}>
          {/* Modal Header */}
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Typography variant="h6">Add Dates & Shifts</Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <RxCross2 />
            </IconButton>
          </Stack>

          {/* Date Picker */}
          <Box sx={{ 
            p: 2, 
            border: "1px solid", 
            borderColor: 'divider', 
            borderRadius: 1 
          }}>
            <DayPicker
              mode="multiple"
              min={1}
              max={maxDates - initialDates.length}
              selected={selectedDates}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              modifiersClassNames={{
                selected: "custom-selected",
                disabled: "custom-disabled",
              }}
              styles={{
                day: { 
                  border: "none",
                  borderRadius: "4px",
                  margin: "2px"
                },
                selected: { 
                  backgroundColor: themeOrange,
                  color: 'white'
                },
                disabled: {
                  color: 'text.disabled'
                }
              }}
            />
          </Box>

          {/* Shift Selection - Only shown when dates are selected */}
          {selectedDates.length > 0 && (
            <Box sx={{ 
              p: 2, 
              border: "1px solid", 
              borderColor: 'divider', 
              borderRadius: 1 
            }}>
              <Stack gap={2}>
                <Stack 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center"
                >
                  <Typography variant="subtitle1">Available Shifts</Typography>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={allShiftsSelected}
                        onChange={(e) => handleSelectAllShifts(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Select All"
                  /> */}
                </Stack>

                <Stack direction="row" gap={2} flexWrap="wrap">
                  {Object.entries(selectedShifts).map(([shift, isSelected]) => (
                    <Chip
                      key={shift}
                      label={shift}
                      onClick={() => handleShiftToggle(shift)}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        bgcolor: isSelected ? themeOrange + '20' : 'transparent',
                        borderColor: themeOrange,
                        minWidth: 100,
                        '&:hover': {
                          bgcolor: isSelected ? themeOrange + '30' : themeOrange + '10'
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Action Buttons */}
          <Stack 
            direction="row" 
            justifyContent="flex-end" 
            gap={2}
            pt={2}
          >
            <CustomButton
              onClick={() => setOpenModal(false)}
              style={{
                background: "transparent",
                color: "text.primary",
                border: "1px solid",
                borderColor: 'divider',
                borderRadius: "8px"
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleSaveDates}
              disabled={selectedDates.length === 0 || !Object.values(selectedShifts).some(Boolean)}
              style={{
                background: themeOrange,
                color: "white",
                borderRadius: "8px"
              }}
            >
              Save Changes
            </CustomButton>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  );
};

export default AdminDateShiftPicker;