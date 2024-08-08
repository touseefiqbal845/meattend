import { TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";

function CustomInput({
  img,
  title,
  placeholder,
  height = "0.2vh",
  fontWeight = 400,
  fontSize = 14,
  helperText,
  error,
  onChange,
  value,
  name,
}: {
  img: string | undefined;
  title: string;
  placeholder: string;
  height?: string;
  fontWeight?: number;
  fontSize?: number;
  helperText?: string;
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  value?: string;
  name?: string;
}) {
  return (
    <>
      <Typography
        fontWeight={fontWeight}
        color={"black"}
        mb={1}
        fontSize={fontSize}
        mt={2}
      >
        {title}
      </Typography>
      <TextField
        name={name}
        id="input-with-icon-textfield"
        variant="outlined"
        fullWidth
        value={value}
        multiline={!img ? true : false}
        rows={!img ? 4 : 0}
        helperText={helperText}
        error={error}
        onChange={onChange}
        sx={{
          ".MuiOutlinedInput-root": {
            flexDirection: "row",
            borderRadius: 3,
            border: "1px solid #C7CADA",
            position: "unset",
            fontSize: 14,
            fontFamily: "mulish",
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
          },
        }}
        InputProps={{
          startAdornment: img ? (
            <img width={20} height={20} src={img!} />
          ) : null,
          disableUnderline: true,
        }}
        placeholder={placeholder}
      />
    </>
  );
}

export default CustomInput;
