import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  Avatar,
  FormLabel,
  Typography,
} from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  title: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  startImg?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  title,
  value,
  onChange,
  options,
  startImg,
}) => {
  return (
    <FormControl fullWidth>
      <FormLabel
        focused
        sx={{
          mt: 2,
          mb: 1,
          fontSize: "14px",
          color: "black",
          "&.Mui-focused": {
            color: "black",
          },
        }}
      >
        {title}
      </FormLabel>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        startAdornment={
          startImg && (
            <InputAdornment position="start">
              <Avatar
                src={startImg}
                sx={{ width: "20px", height: "20px", paddingRight: 1 }}
              />
            </InputAdornment>
          )
        }
        sx={{
          borderRadius: "12px",
          height:"6.5vh",
        }}
      >
        <MenuItem disabled value="">
          <Typography sx={{ fontSize: "0.8rem", color: "#343436" }}>
            Select Role
          </Typography>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <Typography sx={{ fontSize: "0.8rem", color: "#343436" }}>
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
