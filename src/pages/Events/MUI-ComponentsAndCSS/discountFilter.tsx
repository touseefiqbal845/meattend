import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Stack,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

interface Option {
  value: string;
  label: string;
}

interface CustomFilterSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown, label: string }>) => void;
  icon?: string;
  placeholder?: string;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  label,
  options,
  value,
  onChange,
  icon,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Stack direction="column" sx={{ flexGrow: 1, marginTop: "0px" }}>
      <Typography
        sx={{
          color: "#262A45",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <FormControl
        fullWidth
        sx={{ width: "100%", minHeight: "50px", marginRight: "0px" }}
      >
        <Select
          value={value}
          //@ts-ignore
          onChange={onChange}
          displayEmpty
          input={
            <OutlinedInput
              startAdornment={
                icon && (
                  <InputAdornment position="start">
                    <img src={icon} alt="icon" style={{ width: 20, height: 20 }} />
                  </InputAdornment>
                )
              }
              sx={{
                '&::placeholder': {
                  fontSize: '14px', 
                },
              }}
              placeholder={placeholder}
            />
          }
          fullWidth
          variant="outlined"
          sx={{
            height: "50px",
            borderRadius: "14px",
            "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
              paddingRight: "0px !important",
              color: "#A0A3B5",
              fontSize: "14px",
            },
            "& .MuiSelect-icon": {
              color: "#A0A3B5",
              position: "absolute",
              right: "10px",
              top: "calc(50% - 12px)",
              pointerEvents: "none",
            },
          }}
          IconComponent={ExpandMoreRoundedIcon}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default CustomFilterSelect;
