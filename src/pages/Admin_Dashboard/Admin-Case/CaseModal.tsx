import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";

function CaseModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const show = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        bgcolor={"white"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: "40%", xs: "90%" },
          bgcolor: "white",
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          px: "20px",
          overflowY: "scroll",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography
            variant="h6"
            fontSize={32}
            color={"#000315"}
            fontWeight={0}
          >
            Me Attend Case
          </Typography>
          <div>
            <Button
              id="demo-customized-button"
              aria-controls={show ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={show ? "true" : undefined}
              variant="contained"
              disableElevation
              sx={{
                textTransform: "capitalize",
                color: "white",
                backgroundColor: "secondary",
              }}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Open
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={show}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleMenuClose} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleMenuClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={handleMenuClose} disableRipple>
                <MoreHorizIcon />
                More
              </MenuItem>
            </StyledMenu>
          </div>
        </Stack>
        <Divider />
        <Stack mt={2}>
          <Typography color={"#000315"} fontSize={20} fontWeight={700}>
            Me attend Admin
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"} mt={2}>
            <Avatar src="https://picsum.photos/200/300" />
            <Typography color={"gray.main"} fontSize={16} fontWeight={400}>
              John Doe
            </Typography>
          </Stack>
          <Typography color={"#000315"} fontSize={20} fontWeight={700} mt={2}>
            Description
          </Typography>
          <Typography color={"gray.main"} fontSize={20} fontWeight={400} mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nunc non varius.
          </Typography>
          <Typography color={"#000315"} fontSize={20} fontWeight={700} mt={2}>
            Event
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"} mt={2}>
            <Box
              width={100}
              height={78}
              borderRadius={2}
              component={"img"}
              src="https://picsum.photos/200/300"
            />
            <Typography color={"gray.main"} fontSize={24} fontWeight={400}>
              John Doe
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box width={"100%"} height={"100px"} border="2px solid #E6E8F0"></Box>
        </Stack>
      </Box>
    </Modal>
  );
}

export default CaseModal;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
