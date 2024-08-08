import { ArrowForwardIos } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { MouseEvent } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

function CustomButton({
  color = "black",
  bgColor = "#FFC000",
  borderColor = "#FFC000",
  title,
  fullWidth,
  mdFullWidth,
  notArrow = true,
  className,
  onClick,
  disabled,
  loading = false, // New prop for loading state
  XFontSize,
  MFontSize,
  marginLeft,
  marginTop = "0px",
  marginBottom = "0px",
  children = null,
  xsHeight = null,
  mdHeight= null,
  xsFontSize = null,
  xsWidth = null,
  width,
}: {
  marginLeft?: string | "0px";
  marginTop?: string;
  marginBottom?: string;
  color?: string;
  bgColor?: string | "#FFC000";
  borderColor?: string | "#FFC000";
  XFontSize?: string | 10;
  MFontSize?: string | 12;
  title: string;
  fullWidth?: boolean;
  mdFullWidth?: boolean;
  notArrow?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean; // New prop for loading state
  children?: React.ReactNode;
  xsHeight?: number |string| null ;
  mdHeight?: number |string| null ;
  xsFontSize?: number | null;
  xsWidth?: string | null;
  width?: any;
}) {
  const matches = useMediaQuery("(max-width:400px)");

  return (
    <Button
      variant="contained"
      sx={{
        marginLeft: marginLeft,
        backgroundColor: bgColor ? bgColor : "#FFC000",
        borderColor: borderColor ? borderColor : "#FFC000",
        border: borderColor == "#FFC000" ? "" : "1px solid",
        boxShadow: "none",
        color: { color },
        textTransform: "none",
        borderRadius: "10px",
        fontSize: { xs: XFontSize, md: MFontSize },
        alignSelf: "center",
        fontWeight: 700,
        mt: 3,
        width: {
          md: width ? width : mdFullWidth ? "100%" : "95%",
          xs: width ? width : fullWidth ? "100%" : xsWidth ? xsWidth : "120px",
        },
        height: { md:mdHeight? mdHeight :"42px", xs: xsHeight ? xsHeight : "30px" },
        "&:hover": {
          backgroundColor: bgColor ? bgColor : "#FFC000",
          borderColor: borderColor ? borderColor : "#FFC000",
        },
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
      onClick={onClick}
      disabled={ loading} // Disable button when loading
      endIcon={
        notArrow ? null : (
          <ArrowForwardIos sx={{ height: 14, width: 14, mt: 0.2 }} />
        )
      }
    >
      {loading ? (
        <CircularProgress size={24} style={{color:"black"}} /> // Display loading indicator
      ) : (
        <>
          {children && (
            <>
              <span
                style={{
                  display: "inline",
                  marginTop: "8px",
                  marginLeft: "-4px",
                }}
              >
                {children}
              </span>
              <span style={{ fontSize: matches ? 10 : 13 }}>{title}</span>
            </>
          )}
          {!children && title}
        </>
      )}
    </Button>
  );
}

export default CustomButton;
