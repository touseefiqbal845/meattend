import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ArrowForward, ArrowForwardIos, ExpandLess } from "@mui/icons-material";
import { Stack, useMediaQuery } from "@mui/material";

import BorderImage from "../../../assets/icons/borderImage.png";
import HowItWork from "../../../pages/Home/howWorks";
import { Link, useNavigate } from "react-router-dom";

const pages: string[] = [
  "Home",
  "About us",
  "How it Works",
  "In-Sight",
  "Pricing",
  "Investors",
  "Contact Us",
];

function ResponsiveAppBar({
  handleLinkClick,
}: {
  handleLinkClick?: (value: string) => void;
}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const matches = useMediaQuery("(max-width:600px)");
  const isScreenSmall = useMediaQuery("(max-width:1330px)");
  const isScreen900 = useMediaQuery("(max-width:1060px)");
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function CustomMenuItem({
    title,
    body,
    img,
    onClick,
  }: {
    title: string;
    body: string;
    img: string;
    onClick: () => void;
  }) {
    return (
      <>
        {matches ? (
          <MenuItem
            onClick={() => {
              handleClose();
              if (title.toLowerCase() === "showcase") {
                navigate("/showcase");
              } else {
                handleLinkClick
                  ? handleLinkClick!(title.toLowerCase())
                  : navigate("/", { state: { title } });
              }
              setAnchorEl(null);
              handleCloseNavMenu();
            }}
          >
            {title}
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              if (title.toLowerCase() === "showcase") {
                navigate("/showcase");
              } else {
                handleLinkClick
                  ? handleLinkClick!(title.toLowerCase())
                  : navigate("/", { state: { title } });
              }
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <Box component={"img"} src={img} height={50} width={50} />
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </Typography>
                <Typography fontSize={"12px"} color={"#84858D"}>
                  {body}
                </Typography>
                <Box
                  width={"105%"}
                  py={1}
                  borderBottom={"1px solid #E5E5EF "}
                />
              </Box>
            </Stack>
          </MenuItem>
        )}
      </>
    );
  }
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        backgroundColor: "white",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexGrow={1}
            paddingX={{ md: isScreenSmall ? 4 : 20, xs: 0 }}
          >
            <Link to="/">
              <Box
                component={"img"}
                sx={{
                  width: { md: "70px", xs: "50px" },
                  ml: { md:isScreen900 ? 0 : -4},
                  
                }}
                alt="logo"
                src={require("../../../assets/icons/website-logo.png")}
              />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: isScreen900 ? "none" : "flex",
                // paddingLeft: "100px",
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  endIcon={
                    page == "In-Sight" ? (
                      anchorEl ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    ) : null
                  }
                  key={page}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    if (page.toLowerCase() === "in-sight") {
                      setAnchorEl(event.currentTarget);
                    } else if (page.toLowerCase() === "home") {
                      navigate("/");
                    } else if (page.toLowerCase() === "about us") {
                      navigate("/about_us");
                    } else if (page.toLowerCase() === "how it works") {
                      navigate("/howitwork");
                    } else if (page.toLowerCase() === "contact us") {
                      navigate("/contactus");
                    } else if (page.toLowerCase() === "pricing") {
                      handleLinkClick
                        ? handleLinkClick(page.toLowerCase())
                        : navigate("/", {
                            state: { title: page.toLowerCase() },
                          });
                    } else {
                      navigate("/" + page.toLowerCase());
                    }
                  }}
                  sx={{
                    my: 2,
                    color: "#84858D",
                    mx: 1,
                    textTransform: "none",
                    "&:hover": {
                      color: "#DE9300",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Typography fontSize={"14px"}>{page}</Typography>
                </Button>
              ))}
              {anchorEl && (
                <MenuItem>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={BorderImage}
                      height={10}
                      width={50}
                      sx={{
                        position: "absolute",
                        top: isScreen900 ? "2vw" : "0.6vw",
                        right: isScreenSmall ? "25vw" : "20vw",
                        transform: "translateX(-50%)",
                      }}
                    />
                  </Box>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    PaperProps={{
                      anchorOrigin: {
                        vertical: "center",
                        horizontal: "center",
                      },
                      transformOrigin: {
                        vertical: "center",
                        horizontal: "center",
                      },
                      sx: {
                        borderTop: matches ? 0 : "1px solid #FFC000", // Set border color
                        // boxShadow: "0px 3px 6px #00000029", // Optional shadow
                      },
                    }}
                  >
                    <CustomMenuItem
                      onClick={handleClose}
                      img={require("../../../assets/icons/sight_1.png")}
                      title="Benefits"
                      body="Ea pro tibique comprehensam, sed ea verear"
                    />
                    <CustomMenuItem
                      onClick={handleClose}
                      img={require("../../../assets/icons/sight_2.png")}
                      title="Features"
                      body="Ea pro tibique comprehensam, sed ea verear"
                    />
                    <CustomMenuItem
                      onClick={handleClose}
                      img={require("../../../assets/icons/sight_3.png")}
                      title="Showcase"
                      body="Ea pro tibique comprehensam, sed ea verear"
                    />
                    <CustomMenuItem
                      onClick={handleClose}
                      img={require("../../../assets/icons/sight_4.png")}
                      title="FAQ's"
                      body="Ea pro tibique comprehensam, sed ea verear"
                    />
                  </Menu>
                </MenuItem>
              )}
            </Box>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              justifyContent={"flex-end"}
              sx={{
                flexGrow: isScreen900 ? 1 : 0,
                
              }}
            >
              <Avatar
                sx={{
                  height: "20px",
                  width: "20px",
                  display: isScreen900 ? "none" : "block",
                }}
                variant="rounded"
                src={require("../../../assets/icons/country.png")}
              />

              <Typography
                sx={{
                  display: isScreen900 ? "none" : "block",
                }}
                color={"black"}
                fontSize={"12px"}
              >
                ENG
              </Typography>
              <ExpandMoreIcon
                sx={{
                  position: "relative",
                  color: "#84858D",
                  display: isScreen900 ? "none" : "block",
                }}
                fontSize="small"
              />
              <Link to="/login">
                <Button>
                  <Typography
                    sx={{
                      color: "#84858D",
                      textTransform: "none",
                      fontWeight: 800,
                      isplay: { xs: "none", md: "block" },
                      fontSize: "13px",
                    }}
                  >
                    Login
                  </Typography>{" "}
                </Button>
              </Link>
              <Link to="/signUp">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC000",
                    boxShadow: "none",
                    color: "black",
                    textTransform: "none",
                    borderRadius: "5px",
                    fontWeight: 700,
                    fontSize: { xs: "10px", md: "12px" },
                    py: 0.9,
                    px: 1.5,
                    minWidth: { xs: "50px", md: "70px" },
                  }}
                  endIcon={
                    isScreenSmall ? null : (
                      <ArrowForwardIos
                        sx={{ height: 14, width: 14, mt: 0.5 }}
                      />
                    )
                  }
                >
                  Sign up
                </Button>
              </Link>
            </Stack>

            <Box
              sx={{
                display: isScreen900 ? "flex" : "none",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "black" }}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: isScreen900 ? "block" : "none",
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={(event: any) => {
                      if (page.toLowerCase() === "in-sight") {
                        setAnchorEl(event.currentTarget);
                      } else if (page.toLowerCase() === "home") {
                        navigate("/");
                      } else if (page.toLowerCase() === "about us") {
                        navigate("/about_us");
                      } else if (page.toLowerCase() === "how it works") {
                        navigate("/howitwork");
                      } else if (page.toLowerCase() === "contact us") {
                        navigate("/contactus");
                      } else if (page.toLowerCase() === "pricing") {
                        handleLinkClick
                          ? handleLinkClick(page.toLowerCase())
                          : navigate("/", {
                              state: { title: page.toLowerCase() },
                            });
                      } else {
                        navigate("/" + page.toLowerCase());
                      }
                      // handleCloseNavMenu();

                      //? function to close the menu
                      // handleCloseNavMenu
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
