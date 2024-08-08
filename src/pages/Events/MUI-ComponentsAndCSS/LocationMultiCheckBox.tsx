import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Typography, Box, FormControlLabel } from "@mui/material";

interface Option {
  id?: number;
  addressOne?: string;
  companyId?: number;
}

interface MultiSelectCheckboxProps {
  label: string;
  names: Option[];
  onChange?: ((selected: Option | null) => void | undefined) | undefined;
  selected?: Option | null;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
}

export default function MultiSelectCheckbox({
  label,
  names,
  onChange,
  selected = null,
  placeholder,
  error,
  helperText,
}: MultiSelectCheckboxProps) {
  const [localSelectedValue, setLocalSelectedValue] =
    React.useState<Option | null>(selected);

  const handleOptionClick = (option: Option) => {
    setLocalSelectedValue((prevValue) => (prevValue?.id === option.id ? null : option));
  };

  React.useEffect(() => {
    if (onChange) {
      onChange(localSelectedValue);
      console.log("onChange(localSelectedValue);", localSelectedValue);
    }
  }, [localSelectedValue]);

  const handleAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option | null
  ) => {
    setLocalSelectedValue(value);

    console.log("localSelectedValue", localSelectedValue);
    console.log("value", value);
  };

  return (
    <div className="multi-select">
      <Typography
        fontWeight={400}
        color={"#262A45"}
        mb={1}
        fontSize={14}
      >
        {label}
      </Typography>
      <Autocomplete
        id="searchable-select"
        options={names}
        value={localSelectedValue}
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option?.addressOne ?? ""}
        disableCloseOnSelect
        sx={{
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontFamily: "mulish",
            height: localSelectedValue ? "auto" : "50px",
            fontSize: 14,
            "&.Mui-focused fieldset": {
              borderColor: "#FFC000",
            },
          },
          inputContainer: {},
          img: {
            paddingRight: "1rem",
          },
          input: {
            font: "unset",
            color: "#343436",
            fontWeight: 400,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error}
            helperText={error ? helperText : ""}
            fullWidth
            variant="outlined"
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} onClick={() => handleOptionClick(option)}>
            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localSelectedValue?.id === option.id}
                    disabled={localSelectedValue !== null && localSelectedValue.id !== option.id}
                  />
                }
                label={option.addressOne}
              />
            </Box>
          </li>
        )}
      />
    </div>
  );
}
