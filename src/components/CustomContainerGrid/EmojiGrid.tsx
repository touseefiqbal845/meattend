import { Box, Grid } from "@mui/material";
import React from "react";

export default function EmojiGrid({ img }: { img: string }) {
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          display: "block",
        }}
        component={"img"}
        alt="logo"
        src={img}
      />
      <Box
        sx={{
          position: "absolute",
          top: { md: 500, xs: 630 },
          right: { md: 150, xs: 0 },
          left: { md: "auto", xs: 30 },
        }}
        width={120}
        height={120}
        component={"img"}
        src={require("../../assets/icons/thumb.png")}
      />
      <Box
        sx={{
          position: "absolute",
          top: { md: 570, xs: 690 },
          right: { md: 180, xs: 0 },
          left: { md: "auto", xs: -10 },
        }}
        width={120}
        height={120}
        component={"img"}
        src={require("../../assets/icons/heart.png")}
      />
    </Grid>
  );
}
