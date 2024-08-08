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

import BorderImage from "../../assets/icons/borderImage.png";
import { Link } from "react-router-dom";

const pages: string[] = [];

function AuthResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const matches = useMediaQuery("(max-width:600px)");
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
          <MenuItem onClick={handleClose}>{title}</MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
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
        paddingRight: { xs: 0 },
      }}
      position="static"
    >
      <Container maxWidth="xl">
        {/* <Typography sx={{ justifyContent:'space-between' }}> */}
        <Toolbar disableGutters sx={{ justifyContent: "space-evenly" }}>
          <Link to="/">
            <Box
              component={"img"}
              sx={{
                width: { md: "70px", xs: "50px" },
                paddingLeft: { xs: "0px", md: "0px" },
              }}
              alt="logo"
              src={require("../../assets/icons/website-logo.png")}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 0.5,
              display: {
                xs: "none",
                md: "flex",
                paddingLeft: "100px",
              },
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
          </Box>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Avatar
              sx={{
                height: "20px",
                width: "20px",
                display: { xs: "none", md: "block" },
              }}
              variant="rounded"
              src={require("../../assets/icons/country.png")}
            />

            <Typography
              sx={{ display: { xs: "none", md: "block" } }}
              color={"black"}
              fontSize={"12px"}
            >
              ENG
            </Typography>
            <ExpandMoreIcon
              sx={{
                position: "relative",
                color: "#84858D",
                display: { xs: "none", md: "block" },
              }}
              fontSize="small"
            />
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
                  fontSize: { xs: "10px", md: "14px" },
                  py: 0.9,
                  px: 1.5,
                  ml: 1.5,
                }}
                endIcon={
                  <ArrowForwardIos sx={{ height: 14, width: 14, mt: 0 }} />
                }
              >
                Sign up
              </Button>
            </Link>
          </Stack>
        </Toolbar>
        {/* </Typography> */}
      </Container>
    </AppBar>
  );
}
export default AuthResponsiveAppBar;
