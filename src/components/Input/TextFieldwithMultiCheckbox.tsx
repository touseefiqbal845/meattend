import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Popover, Typography, Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface Option {
  id: number;
  name: string;
  event_images: string;
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
  const [localSelectedValues, setLocalSelectedValues] = React.useState<Option[]>(selected);
  const [openPopover, setOpenPopover] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };

  const handleOptionClick = (option: Option) => {
    setLocalSelectedValues((prevValues) => {
      if (prevValues.some((value) => value.id === option.id)) {
        const updatedValues = prevValues.filter((value) => value.id !== option.id);
        return updatedValues;
      } else {
        const updatedValues = [...prevValues, option];
        return updatedValues;
      }
    });
  };

  const handleAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: Option[]) => {
    setLocalSelectedValues(value);
  };

  const filteredOptions = names.filter(option =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="multi-select">
      <Typography fontWeight={400} color={"#262A45"} mb={1} fontSize={14} mt={2}>
        {label}
      </Typography>
      <Autocomplete
        multiple
        id="searchable-select"
        options={filteredOptions}
        value={localSelectedValues}
        onChange={handleAutocompleteChange}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option.name}
        disableListWrap
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={handleOpen}
            placeholder={placeholder}
            variant="outlined"
            error={error}
            helperText={error ? helperText : ""}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              "& .MuiChip-root": {
                display: "none !important",
              },

              "& .MuiChip-label": {
                display: "none !important",
              },

            }}
          />
        )}
      />
      <Box mt={1} sx={{ display: "flex", flexWrap: "wrap" }}>
        {localSelectedValues.map((option) => (
          <Chip
            key={option.id}
            label={option.name}
            onDelete={() => handleOptionClick(option)}
            deleteIcon={<CancelIcon />}
            variant="outlined"
            sx={{
              backgroundColor: "#FFC000",
              margin: "2px",
              "& .MuiChip-root": {
              },

              "& .MuiChip-label": {
              },
              "& .MuiChip-deleteIcon": {
                color: "rgba(0,0,0, 0.7)",
              },

            }}
          />
        ))}
      </Box>
      <Popover
        open={openPopover}
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
      >
        <Box width={anchorEl ? anchorEl.clientWidth : "auto"}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            fullWidth
            sx={{ marginTop: 1 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <List sx={{ maxHeight: '170px', overflow: 'auto' }}>
            {filteredOptions.map((option) => (
              <ListItem key={option.id} onClick={() => handleOptionClick(option)}>
                <Checkbox
                  edge="start"
                  checked={localSelectedValues.some((value) => value.id === option.id)}
                />
                  <div>
                  <img style={{ width: "40px", height: "30px", borderRadius: "7px", marginRight: "5px" }} alt={option.name} src={option.event_images} />
                </div>
                <ListItemText primary={option.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </div>
  );
}
