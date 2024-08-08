import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Typography, Chip } from "@mui/material";

interface Option {
    id: number;
    name: string;
    discount_code: string;
}

interface MultiSelectCheckboxProps {
  label: string;
  names: Option[];
  onChange?: ((selected: Option[]) => void | undefined) | undefined;
  selected?: Option[];
  placeholder?: string;
  helperText?: string;
  error?: boolean;
}

export default function MultiSelectCheckbox({
  label,
  names,
  onChange,
  selected = [],
  placeholder,
  error,
  helperText,
}: MultiSelectCheckboxProps) {

  const [localSelectedValues, setLocalSelectedValues] =
    React.useState<Option[]>(selected);

  const handleOptionClick = (option: Option) => {
    setLocalSelectedValues((prevValues) => {
      if (prevValues.some((value) => value.id === option.id)) {
        const updatedValues = prevValues.filter(
          (value) => value.id !== option.id
        );
        return updatedValues;
      } else {
        const updatedValues = [...prevValues, option];
        return updatedValues;
      }
    });
  };

  React.useEffect(() => {
    const setData = async () => {
      if (onChange) {
        onChange(localSelectedValues);
        console.log("onChange(localSelectedValues);", localSelectedValues);
      }
    };

    setData();
  }, [localSelectedValues]);
  const handleAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Option[]
  ) => {
    setLocalSelectedValues(value);

    console.log("localSelectedValues", localSelectedValues);
    console.log("value", value);
  };

  return (
    <div className="multi-select">
      <Typography
        fontWeight={400}
        color={"#262A45"}
        mb={1}
        fontSize={14}
        // mt={2}
      >
        {label}
      </Typography>
      <Autocomplete
        multiple
        id="searchable-select"
        options={names}
        value={localSelectedValues}
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option?.name ?? ""}
        disableListWrap
        sx={{
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontFamily: "mulish",
            height: localSelectedValues.length === 0 ? "50px" : "auto",
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
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
              sx={{
                height: "24px",
                marginBottom: "14px",

                "& .MuiChip-root": {
                  marginBottom: "14px",
                  height: "24px",
                },

                "& .MuiChip-label": {
                  color: "#262A45",
                  fontSize: 14,
                  fontWeight: 400,
                  height: "25px",
                },
                "& .MuiButtonBase-root-MuiChip-root": {
                  height: "27px",
                },
                "& .MuiChip-deleteIcon": {
                  color: "rgba(0,0,0, 0.7)",
                },
                backgroundColor: "#FFC000",
              }}
            />
          ));
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              error={error}
              helperText={error ? helperText : ""}
              fullWidth
              variant="outlined"
            />
          </>
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} onClick={() => handleOptionClick(option)}>
            <Checkbox key={option.id} checked={selected} />
            {option?.name}
          </li>
        )}
      />
    </div>
  );
}
