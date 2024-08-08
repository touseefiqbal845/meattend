import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // default icon

interface CustomSingleSelectProps {
  label?: string;
  options: Array<{ label: string; value: any }>;
  icon?: string;
  placeholder?: string;
  value: any;
  onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
  iconProps?: Partial<InputAdornmentProps>;
  inputProps?: Partial<TextFieldProps['InputProps']>;
}

const CustomSingleSelect: React.FC<CustomSingleSelectProps> = ({
  label,
  options,
  icon,
  placeholder,
  value,
  onChange,
  iconProps,
  inputProps,
  ...rest
}) => {
  return (
    <>
    <Stack direction="column" sx={{ flexGrow: 1, marginTop: "0px" }}>
      {label && (
        <Typography
          fontWeight={"400"}
          color={"#262A45"}
          mb={1}
          fontSize={14}
          mt={2}
        >
          {label}
        </Typography>
      )}
      <Autocomplete
        disablePortal
        options={options}
        value={value}
        onChange={onChange}
        fullWidth
        {...rest}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ color: '#343436' }} {...iconProps}>
                  {typeof icon === 'string' ? (
                    <img src={icon} alt="icon" style={{ width: 20, height: 20 }} />
                  ) : (
                    icon 
                  )}
                </InputAdornment>
              ),
              ...inputProps,
            }}
            sx={{
              ".MuiOutlinedInput-root": {
                flexDirection: "row",
                borderRadius: 3,
                border: "1px solid #C7CADA",
                position: "unset",
                fontSize: 12,
                fontFamily: "mulish",
                "&.Mui-focused fieldset": {
                  borderColor: "#FFC000",
                },
              },
              input: {
                height: "1.8vh",
                fontSize: 14,
                color: "#343436",
                fontWeight: 400,
              },
            }}
          />
        )}
      />
    </Stack>

    </>
  );
};

export default CustomSingleSelect;