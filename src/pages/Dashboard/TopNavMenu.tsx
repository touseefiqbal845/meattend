import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

export default function BasicMenu() {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(null);
    logout()
    navigate("/login");
  };

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          marginTop: 0.5,
        }}
        component={"div"}
        onClick={handleClick}
      >
        {!open ? <GridExpandMoreIcon /> : <ExpandLess />}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleNavigate}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
