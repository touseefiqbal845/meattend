import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose }) => {
  const imageUrl = require("../../../assets/icons/company bill.png");

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <React.Fragment>
        <IconButton
          sx={{
            position: "absolute",

            top: "10vh",
            right: (theme) => ({
              lg: theme.breakpoints.up("lg") ? "25vw" : "unset",
              md: theme.breakpoints.up("md") ? "23vw" : "unset",
              sm: theme.breakpoints.up("sm") ? "15vw" : "unset",
              xs: theme.breakpoints.up("xs") ? "1vw" : "unset",
            }),
            color: "white",
          }}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            top: (theme) => ({
              md: theme.breakpoints.up("md") ? "50%" : "unset",
              xs: theme.breakpoints.up("xs") ? "50%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "100%", md: "100%" },
            minWidth: { xs: "80%", sm: "50%", md: "40%" },
            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Me Attend Report
          </Typography>
          <hr />
          <span style={{ color: "black", fontWeight: 700 }}>Reported User</span>
          <br />
          <span style={{ color: "#262A45D", fontSize: "10px" }}>USERS</span>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-10px",
              marginTop: "5px",
            }}
          >
            <Avatar
              src="https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
              sx={{}}
            ></Avatar>

            <div
              style={{
                color: "#84858D",
                fontSize: "12px",
                marginLeft: "5px",
                marginTop: "10px",
              }}
            >
              Oleo blame
            </div>
          </div>
          <br />
          <span style={{ color: "black", fontWeight: 700, marginRight: "5px" }}>
            Message
          </span>
          <br />
          <br />
          <span style={{ color: "#84858D", fontWeight: 400 }}>
            Ea pro tibique comprehensam, sed ea verear. Nam te omittam compre.
            Ne nam nonumy putent fuisset, reque fabulas usu ne.
          </span>
          <br />
          <br />
          <span style={{ color: "black", fontWeight: 700, marginRight: "5px" }}>
            Subject Reported
          </span>
          <br />
          <span style={{ color: "#262A45D", fontSize: "10px" }}>EVENT</span>
          <br />
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{}}>
              <img
                alt="Event"
                src={imageUrl}
                style={{ width: 109, height: 78 }}
              />
            </div>
            <div
              style={{
                color: "#84858D",
                fontSize: "17px",
                marginTop: "20px",
                marginLeft: "19px",
                lineHeight: "19px",
              }}
            >
              Purple Friday
            </div>
          </div>
        </Box>
      </React.Fragment>
    </Modal>
  );
};

export default ReportModal;
