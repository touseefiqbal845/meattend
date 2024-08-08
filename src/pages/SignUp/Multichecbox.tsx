import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Popover, Typography, Box, Chip } from "@mui/material";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectCheckboxProps {
  label: string;
  names: Option[];
  onChange?: ((selected: Option[]) => void | undefined) | undefined;
  selected?: Option[];
  placeholder?: string;
  helperText?: string;
  name?: string;
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
  name,
}: MultiSelectCheckboxProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [localSelectedValues, setLocalSelectedValues] =
    React.useState<Option[]>(selected);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("anchorEl", anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

    // if (onChange) {

    // onChange(value);
    console.log("value", value);

    // }
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
      {/* <TextField
        name={name}
        fullWidth
        onClick={handleOpen}
        placeholder={placeholder}
        multiline={true}
        variant="outlined"
        helperText={error ? helperText : ""}
        error={error}
        InputProps={{
          endAdornment: (
            <img
              width={20}
              height={20}
              src={require("../../assets/icons/arrowTop.png")}
              alt="Email Icon"
              className="end-img"
            />
          ),
        }}
        sx={{
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontFamily: "mulish",
            height: "5.7vh",
            fontSize: 14,

            "&.Mui-focused fieldset": {
              borderColor: "#FFC000", // Color when focused
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
      /> */}
      {/* <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: anchorEl ? anchorEl.clientWidth : "auto",
          },
        }}
      > */}
      <Autocomplete
        multiple
        id="searchable-select"
        options={names}
        value={localSelectedValues}
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option.name}
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
              borderColor: "#FFC000", // Color when focused
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
                height: '24px',
                // margin: '4px',
                marginBottom: '14px',

                "& .MuiChip-root":{
                  marginBottom: '14px',
                  height: '24px',
                  // margin: '14px',
                },
                
                "& .MuiChip-label": {
                  color: "#262A45",
                  fontSize: 14,
                  fontWeight: 400,
                  height: '25px',
                },
                // "& .MuiButtonBase-root-MuiChip-root": {
                //   height: '27px',
                // },
                "& .MuiButtonBase-root-MuiChip-root":{
                  height: '27px',

                },
                "& .MuiChip-deleteIcon": {
                  color: "rgba(0,0,0, 0.7)",
                },
                //tag background color
                backgroundColor: "#FFC000",
              }}
              // sx={{
              //   "& .MuiChip-label": {
              //     color: "#262A45",
              //     fontSize: 14,
              //     fontWeight: 400,
              //   },
              //   "& .MuiChip-deleteIcon": {
              //     color: "rgba(0,0,0, 0.7)",
              //   },
              //   //tag background color
              //   backgroundColor: "#FFC000",
              // }}
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
            {option.name}
          </li>
        )}
      />
    </div>
  );
}
