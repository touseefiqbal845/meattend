import { TextField, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import React, { useState } from "react";
import errorImg from "../../assets/icons/information.png";
import visibilityOnImg from "../../assets/icons/eye-empty.svg";
import visibilityOffImg from "../../assets/icons/eye-slash.png";
// import { HiOutlineEye } from "react-icons/hi2";
// import { GoEyeClosed } from "react-icons/go";

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
  // name,
}: {
  img?: string | undefined;
  row?: number | 0;
  endImg?: string | undefined;
  title?: string;
  placeholder?: string;
  height?: string | number;
  fontWeight?: number;
  fontSize?: number | "14";
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
  // name?: string | undefined;
  disabled?: boolean;
}) {
  const [inputType, setInputType] = useState(type);
  const [passImg,setPassImg]=useState(visibilityOffImg)

  const handleOnChange = () => {
    if (type === "password" && !error) {
      const newType = inputType === "password" ? "text" : "password";
      setInputType(newType);
      if (onChange && typeof type === "string") {
         //@ts-ignore
        onChange({ target: { value, type: newType } });
        setPassImg(newType === "password" ? visibilityOffImg : visibilityOnImg);

      }
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
        // name={name}
        defaultValue={value}
        onClick={onClick}
        type={inputType}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        error={error}
        id="input-with-icon-textfield"
        variant="outlined"
        fullWidth
        multiline={!img}
        rows={0}
        helperText={error ? helperText : ""}
        value={value}
        sx={{
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontSize: { inputFontSize },
            fontFamily: "mulish",
            "&.Mui-focused fieldset": {
              borderColor: "#FFC000", // Color when focused
            },
            ...style,
          },
          inputContainer: {},
          img: {
            paddingRight: "1rem",
          },
          input: {
            height: height,
            font: "unset",
            fontSize: "0.8rem",
            color: "#343436",
            fontWeight: 400,
            transform: !img ? "translate(0, -28%)" : undefined,
            ...style,
          },
        }}
        InputProps={{
          readOnly: disabled,
          startAdornment: img ? <img width={20} height={20} src={img!} /> : null,
          disableUnderline: true,
          endAdornment: endImg ? (
            error ? (
              <img
                width={20}
                height={20}
                src={errorImg!}
                onClick={handleOnChange}
                style={{ cursor: "pointer",paddingRight: "0px" }}

              />
            ) : (
              <img
                width={20}
                height={20}
                src={passImg}
                onClick={handleOnChange}
                style={{ cursor: "pointer",paddingRight: "0px" }}
              />
            )
          ) : error ? (
            <img
              width={20}
              height={20}
              src={errorImg!}
              onClick={handleOnChange}
              style={{ cursor: "pointer",paddingRight: "0px" }}
            />
          ) : null,
        }}
        placeholder={placeholder}
      />
    </>
  );
}

export default CustomInput;

