// CustomInput.tsx
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CustomInput = ({ type, error, title, icon, ...rest }: any) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <TextField
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            error={error}
            label={title}
            {...rest}
            InputProps={{
                endAdornment: type === 'password' && (
                    <InputAdornment position="end">
                        {icon ? icon : (
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                {showPassword ? 'off': "on"}
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default CustomInput;
