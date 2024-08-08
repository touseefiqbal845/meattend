import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../../../components/button/CustomButton";
import React from "react";

interface RejectModelProps {
  selectedItemIdProps: number | null;
  handleActionProps: (action: string, rowId: number) => void;
  setOpenModelRejectProps: (value: boolean) => void;
  open: boolean;
  onClose: () => void;
}

const RejectModelComponent: React.FC<RejectModelProps> = ({
  selectedItemIdProps,
  handleActionProps,
  setOpenModelRejectProps,
  open,
  onClose,
}) => {
  const handleRejectAction = async () => {
    if (selectedItemIdProps !== null) {
      handleActionProps("Reject", selectedItemIdProps);
      setOpenModelRejectProps(false);
    }
  };
  const handleRemoveImage = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <React.Fragment>
      <Box>
        <IconButton
          sx={{ position: "absolute",
          top: (theme) => ({
            xl: "7vw",
            lg: "9vw",
            md: theme.breakpoints.up("md") ? "12vw" : "unset",
            sm: "18vw",
            xs: theme.breakpoints.up("xs") ? "18vh" : "unset",
          }),
          right: (theme) => ({
            xl: "13vw",
            lg: "13vw",
            md: theme.breakpoints.up("md") ? "12vw" : "unset",
            sm: theme.breakpoints.up("sm") ? "2px" : "unset",
            xs: theme.breakpoints.up("xs") ? "0px" : "unset",
          }),
           color: "white" }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: (theme) => ({
              lg: "60%",
              md: theme.breakpoints.up("md") ? "60%" : "unset",
              xs: theme.breakpoints.up("xs") ? "50%" : "unset",
            }),
            transform: "translate(-50%, -50%)",
            width: "45%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "80%", md: "100%" },
            minWidth: { xs: "80%", md: "40%" },

            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Why Reject the Company
          </Typography>
          <hr />
          <br />
          <Grid item md={12} xs={12} padding={1}>
            <TextField
              placeholder="Your report is anonymous, except if you're reporting an intellectual property infringement. If someone is in immediate danger, call the local emergency services - don't wait"
              title=""
              multiline
              rows={7}
              variant="outlined"
              style={{
                height: "170px",
                width: "100%",
                fontSize: "16px",
                marginLeft: "-9px",
              }}
            />
          </Grid>

          <Grid container marginTop={4} sx={{marginBottom:{sm:10,xs:0}}} >
            <Grid item sm={2} xs={12}>
              <CustomButton
                marginTop="0px"
                notArrow
                title="Cancel"
                color="#A0A3B5"
                borderColor="#A0A3B5"
                bgColor="white"
                XFontSize="16px"
                MFontSize="16px"
                xsWidth="100%"
                onClick={() => setOpenModelRejectProps(false)}
              />
            </Grid>
            <Grid item sm={3} xs={12} sx={{marginLeft:{sm:"16px",xs:0},marginTop:{sm:0,xs:"16px"}}} >
              <CustomButton
                marginLeft="0px"
                marginTop="0px"
                notArrow
                title={"Submit"}
                xsWidth="100%"
                XFontSize="16px"
                MFontSize="16px"
                onClick={handleRejectAction}
              />
            </Grid>
          </Grid>
        </Box>
        </Box>
      </React.Fragment>
    </Modal>
  );
};

export default RejectModelComponent;
