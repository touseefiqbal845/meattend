import React, { useState } from "react";
import { IconButton, Popover, Typography, Box } from "@mui/material";

interface MenuItem {
  icon: React.ReactNode;
  name: string;
  color?: string;
}

interface MenuItemsPopoverProps {
  icon: React.ReactNode;
  items: MenuItem[];
  handleDelete: () => void;
}

const MenuItemsPopover: React.FC<MenuItemsPopoverProps> = ({handleDelete, icon, items }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    handleClose();
    if (action === "Delete") {
      handleDelete(); 
    }
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        {icon}
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
            borderRadius: "6px",
            borderTop: "4px solid #DE9300",
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              component="div"
              onClick={() => handleAction(item.name)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
                color: item.color || "red",
                "&:hover": {
                  bgcolor: '#FFF7DD',
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: "10px",fontSize:"16px",fontWeight:600,color:"#84858D" }}>
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default MenuItemsPopover;
