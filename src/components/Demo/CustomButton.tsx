import { ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

export default function CustomButton({
  title,
  fullWidth,
  mdFullWidth,
  notArrow = true,
  onClick,
}: {
  title: string;
  fullWidth?: boolean;
  mdFullWidth?: boolean;
  notArrow?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#FFC000",
        boxShadow: "none",
        color: "black",
        textTransform: "none",
        borderRadius: "7px",
        fontSize: { xs: 10, md: 12 },
        alignSelf: "center",
        fontWeight: 700,
        mt: 3,
        width: {
          md: mdFullWidth ? "100%" : "140px",
          xs: fullWidth ? "100%" : "120px",
        },
        height: { md: "42px", xs: "30px" },

        // width: { xs: "100px", md: "120px" },
      }}
      endIcon={
        notArrow ? null : (
          <ArrowForwardIos sx={{ height: 14, width: 14, mt: 0.2 }} />
        )
      }
    >
      {title}
    </Button>
  );
}
