import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
      <FormControl
        fullWidth
        sx={{ width: "100%", minHeight: "44px", marginRight: "0px" }}
      >
        <InputLabel
          style={{
            fontSize: "14px",
            marginBottom: "5px",
            marginTop: "-4px",
            marginLeft: "0px",
            color: "#A0A3B5",
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          //@ts-ignore
          onChange={onChange}
          label={label}
          fullWidth
          variant="outlined"
          sx={{
            height: "44px",
            borderRadius: "14px",
            "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
              paddingRight: "0px !important",
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
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default CustomFilterSelect;
