import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

// Calculate the maximum allowable date (18 years ago from today)
const getEighteenYearsAgo = () => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  };

const DOBPicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value || null} // Ensure the value is always either null or a valid date
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: null, // Removes label inside the text field
              }}
              InputLabelProps={{
                shrink: false, // Prevents label from appearing above the text box
              }}
            />
          )}
        disableFuture
        maxDate={getEighteenYearsAgo()} // Prevent dates more recent than 18 years ago
      />
    </LocalizationProvider>
  );
};

export default DOBPicker;
