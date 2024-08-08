export const DatePickerCSS = {
  width: "100%",
  minWidth: "0px!important",
  minHeight: "0px!important",
  // overflow: "hidden !important",
  ".MuiFormLabel-root,.MuiInputLabel-root": {
    color: "#BCBCBD",
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#FFC000",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover > fieldset": {
      borderColor: "#FFC000",
    },
    "@media (max-width: 430px)": {
      width: "100%",
      height: "100%",
    },
    height: "50px",
    borderRadius: "14px",
    borderColor: "red",
    fontSize: "12px",
  },
  "& .MuiStack-root > :not(style)": {
    // overflow: "hidden !important",
  },
  "& .MuiFormControl-root-MuiTextField-root": {
    height: 200,
    // overflow: "hidden !important",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    color: "#A0A3B5",
  },
};
