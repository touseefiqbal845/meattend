import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { TopNav } from "./TopNav";
import { SideNav } from "./SideNav";

const SIDE_NAV_WIDTH = 280;

export const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

export const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = (props: any) => {
  const { children } = props;

  return (
    <React.Fragment>
      <SideNav>{children}</SideNav>
    </React.Fragment>
  );
};
