import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
import { Paper, Stack, Rating, Avatar } from "@mui/material";

import CustomButton from "../../components/button/CustomButton";
import { CustomBox } from "../../components/CustomBox/CustomBox";

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const RefundModal: React.FC<RefundModalProps> = ({
  // selectedItemIdProps,
  open,
  onClose,
  data,
}) => {
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
      <>
        {/* <IconButton
          sx={{ position: "absolute", top: 8, right: 415, color: "white" }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton> */}
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: (theme) => ({
              lg: "50%",
              md: theme.breakpoints.up("md") ? "60%" : "unset",
              xs: theme.breakpoints.up("xs") ? "60%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
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
          <Box
            component={"section"}
            sx={{
              marginTop: { xs: 0, md: 0 },
              borderRadius: "5px",
              backgroundColor: "#FFFFF",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h1">
              Refund Conformation
            </Typography>

            <Stack direction="column" spacing={2} mt={3}>
  <Stack
    direction={{ md: "row", sm: "row", xs: "column" }}
    alignItems="center"
    justifyContent="space-between"
    spacing={1}
  >
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#000315",
      }}
    >
      Email
    </Typography>
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#84858D",
      }}
    >
      william@gomail.com
    </Typography>
  </Stack>
</Stack>

<Stack direction="column" spacing={2} mt={3}>
  <Stack
    direction={{ md: "row", sm: "row", xs: "column" }}
    alignItems="center"
    justifyContent="space-between"
    spacing={1}
  >
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#000315",
      }}
    >
      Customer Name
    </Typography>
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#84858D",
      }}
    >
      william James
    </Typography>
  </Stack>
</Stack>

<Stack direction="column" spacing={2} mt={3}>
  <Stack
    direction={{ md: "row", sm: "row", xs: "column" }}
    alignItems="center"
    justifyContent="space-between"
    spacing={1}
  >
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#000315",
      }}
    >
      Ticket Number
    </Typography>
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#84858D",
      }}
    >
      12343
    </Typography>
  </Stack>
</Stack>


<Stack direction="column" spacing={2} mt={3}>
  <Stack
    direction={{ md: "row", sm: "row", xs: "column" }}
    alignItems="center"
    justifyContent="space-between"
    spacing={1}
  >
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#000315",
      }}
    >
      Transaction Number
    </Typography>
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#84858D",
      }}
    >
      424242424242
    </Typography>
  </Stack>
</Stack>


            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                mt:3
              }}
            >
              <Grid item xs={12} md={6}>
                <CustomButton
                  marginLeft="1px"
                  marginTop="2px"
                  notArrow
                  title="Refund"
                  XFontSize="16"
                  xsWidth="100%"
                  MFontSize="12px"
                  //   onClick={() => setOpenUpgrade(false)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomButton
                  marginLeft="1px"
                  marginTop="2px"
                  notArrow
                  color="#A0A3B5"
                  borderColor="#A0A3B5"
                  bgColor="white"
                  title="Cancel"
                  xsWidth="100%"
                  XFontSize="12px"
                  MFontSize="12px"
                  onClick={handleRemoveImage}
                />
              </Grid>
            </Grid>
           
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default RefundModal;
