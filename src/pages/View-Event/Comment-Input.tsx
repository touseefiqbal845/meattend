import { TextField, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import React, { useState } from "react";
import errorImg from "../../assets/icons/information.png";

function CustomInput({
  img,
  endImg,
  title,
  placeholder,
  height = "0.2vh",
  fontWeight = 400,
  fontSize = 14,
  error,
  disabled,
  onChange,
  onKeyPress,
  onClick,
  onBlur,
  type,
  inputFontSize,
  row,
  style = {} as any,
  showLabel = true,
  value = "",
  helperText,
  name,
}: {
  img?: string | undefined;
  row?: number | 0;
  endImg?: string | undefined;
  title?: string;
  placeholder?: string;
  height?: string | number;
  fontWeight?: number;
  fontSize?: number | "14px";
  inputFontSize?: number;
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void | Promise<void>;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void | Promise<void>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
  type: "text" | string;
  style?: {};
  showLabel?: boolean;
  value?: string;
  multiline?: boolean;
  helperText?: string;
  name?: string;
  disabled?: boolean;
}) {
  const [types, setTypes] = useState(type);

  const handleOnChange: React.MouseEventHandler<HTMLImageElement> = () => {
    if (type === "password") {
      setTypes(types === "text" ? "password" : "text");
    }
  };

  return (
    <>
      {showLabel && (
        <Typography
          fontWeight={fontWeight}
          color={"#262A45"}
          mb={1}
          fontSize={fontSize}
          mt={2}
        >
          {title}
        </Typography>
      )}
      <TextField
        disabled={disabled}
        name={name}
        defaultValue={value}
        onClick={onClick}
        type={type}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        error={error}
        id="input-with-icon-textfield"
        variant="outlined"
        fullWidth
        multiline={!img ? true : false}
        rows={0}
        helperText={error ? helperText : ""}
        value={value}
        sx={{
          ".MuiOutlinedInput-input": {
            padding: "10px",

          },
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontSize: inputFontSize || fontSize,
            fontFamily: "mulish",
            padding: "0px",

            "&.Mui-focused fieldset": {
              borderColor: "#FFC000",
            },
            ...style,
          },
          inputContainer: {},
          img: {
            // paddingRight: "1rem",
          },
          input: {
            height: height,
            font: "unset",
            fontSize: inputFontSize || fontSize,
            color: "#343436",
            fontWeight: 400,
            transform: !img ? "translate(0, -28%)" : undefined,
            ...style,
          },
        }}
        InputProps={{
          readOnly: disabled,

          startAdornment: img ? (
            <img width={20} height={20} src={img!} />
          ) : null,
          disableUnderline: true,
          endAdornment: endImg ? (
            error ? (
              <img
              alt="error"
                width={20}
                height={20}
                src={errorImg!}
                onClick={handleOnChange}
                style={{ cursor: "pointer", paddingRight: "0px" }}
              />
            ) : (
              <img
              alt="img"

                width={35}
                height={35}
                src={endImg!}
                onClick={handleOnChange}
                style={{ cursor: "pointer", padding: "5px" }}
              />
            )
          ) : error ? (
            <img
            alt="error"
              width={20}
              height={20}
              src={errorImg!}
              onClick={handleOnChange}
              style={{ cursor: "pointer", paddingRight: "0px" }}
            />
          ) : null,
        }}
        placeholder={placeholder}
      />
    </>
  );
}

export default CustomInput;
