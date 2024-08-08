import PropTypes from "prop-types";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNavigate } from "react-router-dom";
import NotificationDialogue from "../../../components/NotificationDialogue";

const SIDE_NAV_WIDTH = 250;
const TOP_NAV_HEIGHT = 64;

interface Props {
  menuIconClick: () => void;
  collapsed: boolean;
}
export const TopNav = (props: Props) => {
  const { menuIconClick } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: props.collapsed ? "95%" : `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          pr: 2,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #D8DAE7",
        }}
      >
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Button onClick={menuIconClick}>
            <MenuIcon
              sx={{
                display: { md: "none", xs: "flex" },
                color: "text.primary",
              }}
            />
          </Button>
          <Link to="/">
            <Box
              component={"img"}
              sx={{
                width: { md: "70px", xs: "50px" },
                paddingLeft: { xs: "0px", md: "12%" },
                display: { md: "none", xs: "block" },
              }}
              alt="logo"
              src={require("../../../assets/icons/website-logo.png")}
            />
          </Link>
        </Box>
        <TextField
          placeholder="Search..."
          variant="outlined"
          sx={{
            borderWidth: 0,
            flexGrow: 1,
            backgroundColor: "white",
            display: { md: "flex", xs: "none" },
          }}
          InputProps={{
            sx: {
              "& fieldset": { border: "none" },
            },
            startAdornment: (
              <Box
                component="img"
                width={18}
                height={18}
                mr={1}
                src={require("../../../assets/navIcons/search.png")}
              />
            ),
          }}
        />
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            onClick={() => navigate("/chat")}
            width={30}
            height={30}
            component={"img"}
            sx={{
              cursor: "pointer",
            }}
            src={require("../../../assets/navIcons/message.png")}
          />
          <Box
            onClick={() => setOpen(!open)}
            width={30}
            height={30}
            component={"img"}
            src={require("../../../assets/navIcons/notificationwithcount.png")}
            sx={{
              cursor: "pointer",
            }}
          />

          <Stack alignItems="center" direction="row" spacing={2}>
            <Box
              width={30}
              height={30}
              component={"img"}
              src={require("../../../assets/navIcons/profile.png")}
            />
            <Typography color={"#3F435E"} fontWeight={500} fontSize={12}>
              Oleo Bone
            </Typography>
            <ExpandMoreIcon />
          </Stack>
        </Stack>
      </Stack>
      {open && <NotificationDialogue open={open} onClose={handleClose} />}
    </Box>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
