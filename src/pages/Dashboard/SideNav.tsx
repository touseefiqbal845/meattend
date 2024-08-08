
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { getList, items } from "./config";
import Logo from "../../assets/navIcons/nav-logo.png";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  menuClasses,
} from "react-pro-sidebar";
import { TopNav } from "./TopNav";
import { getRoleId } from "../../services/cacheFunc";
import _ from "lodash";


type Theme = "light" | "dark";

export const SideNav = (props: any) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, 1)
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: "transparent",
        // color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  const handleToggeled = () => {
    setToggled(!toggled);
  };

  if (!getList(getRoleId())) {
    return null;
  }
  if (getRoleId() != 2) {
    const found = getList(getRoleId())?.filter((item: { path: string }) => {
      return item.path == location.pathname;
    });
    if (_.size(found) == 0 && location.pathname != "/chat") {
      return null;
    }
  }
  return (
    <React.Fragment>
      <TopNav collapsed={collapsed} menuIconClick={handleToggeled} />
      <div
        style={{
          display: broken ? "block" : "flex",
          height: "100%",
          minHeight: "100vh",
          direction: rtl ? "rtl" : "ltr",
          width: "100%",
        }}
      >
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          onBreakPoint={setBroken}
          rtl={rtl}
          breakPoint="md"
          backgroundColor={"#000315"}
          rootStyles={{
            color: themes[theme].sidebar.color,
          }}
          style={{ marginTop: !broken ? -70 : 65 }}
        >
          <Box sx={{ minHeight: 64 }}>
            <Stack
              flexDirection={"row"}
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              sx={{ p: 2 }}
            >
              <Box
                component={"img"}
                src={Logo}
                sx={{
                  display: "inline-flex",
                  width: "25%",
                  objectFit: "contain",
                }}
              />
              <Box
                component={"div"}
                sx={{ cursor: "pointer" }}
                onClick={handleClick}
              >
                {collapsed ? (
                  <ArrowForward sx={{ color: "white" }} />
                ) : (
                  <ArrowBack sx={{ color: "white" }} />
                )}
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ borderColor: "#262A45" }} />
          <Menu menuItemStyles={menuItemStyles}>
            {/* {items.map((item) => { */}
            {getList(getRoleId())!?.map((item) => {
              return (
                <div
                  style={{
                    position: "relative",
                    marginLeft: 0,
                    background:
                      item.path === location.pathname
                        ? "linear-gradient(45deg, rgba(255, 247, 221, 0.3), rgba(255, 247, 221, 0))"
                        : "none",
                    borderRadius:
                      item.path === location.pathname
                        ? "9px 0px 0px 8px"
                        : "initial",
                  }}
                >
                  <MenuItem
                    component={<Link to={item.path} />}
                    icon={
                      item.path == location.pathname
                        ? item.activeIcon
                        : item.icon
                    }
                    style={{
                      marginLeft: item.title
                        .toLocaleLowerCase()
                        .startsWith("buy")
                        ? 30
                        : 0,
                    }}
                  >
                    <Typography
                      sx={{
                        position: "relative",
                        "&:hover": {
                          color: "white",
                        },
                        color:
                          item.path === location.pathname ? "white" : "#607489",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </MenuItem>
                  {item.path === location.pathname && (
                    <div
                      style={{
                        content: "''",
                        position: "absolute",
                        top: 12,
                        left: 0,
                        height: "50%",
                        width: "3px",
                        backgroundColor: "orange",
                        borderRadius: "9px 0px 0px 8px",
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </Menu>
          {!collapsed && (
            <Box component={"div"} bottom={20} left={20}>
              <Typography color={"gray.quat"}>©2023 Me Attend </Typography>
            </Box>
          )}
        </Sidebar>
        {props.children}
      </div>
    </React.Fragment>
  );
};

const themes: any = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
