import { ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import { MouseEvent } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

function WhiteCustomButton({
  color = "#3F435E",
  bgColor = "#FBFBFB",
  borderColor = "#00000",
  title,
  fullWidth,
  mdFullWidth,
  notArrow = true,
  className,
  onClick,
  disabled,
  XFontSize,
  MFontSize,
  marginLeft,
  marginTop = "0px",
  children = null,
  xsHeight = null,
  xsFontSize = null,
  xsWidth = null,
  width,
}: {
  marginLeft?: string | "0px";
  marginTop?: string;
  color?: string;
  bgColor?: string | "#FBFBFB";
  borderColor?: string | "#3F435E";
  XFontSize?: string | 10;
  MFontSize?: string | 12;
  title: string;
  fullWidth?: boolean;
  mdFullWidth?: boolean;
  notArrow?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  children?: React.ReactNode;
  xsHeight?: number | null;
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
        backgroundColor: bgColor ? bgColor : "#FBFBFB",
        borderColor: borderColor ? borderColor : "#3F435E",
        border: borderColor == "#3F435E" ? "" : "1px solid",
        boxShadow: "none",
        color: { color },
        textTransform: "none",
        borderRadius: "12px",
        fontSize: { xs: XFontSize, md: MFontSize },
        alignSelf: "center",
        fontWeight: 700,
        mt: 3,
        width: {
          md: width ? width : mdFullWidth ? "100%" : "95%",
          xs: width ? width : fullWidth ? "100%" : xsWidth ? xsWidth : "120px",
        },
        height: { md: "42px", xs: xsHeight ? xsHeight : "30px" },
        "&:hover": {
          backgroundColor: bgColor ? bgColor : "rgba(0, 0, 0, 0)",
          borderColor: borderColor ? borderColor : "#3F435E",
        },
        // width: { xs: "100px", md: "120px" },
        marginTop: marginTop,
      }}
      onClick={onClick}
      // disabled={disabled?'true':'false'}
      endIcon={
        notArrow ? null : (
          <ArrowForwardIos sx={{ height: 14, width: 14, mt: 0.2 }} />
        )
      }
    >
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
    </Button>
  );
}
export default WhiteCustomButton;
// end
