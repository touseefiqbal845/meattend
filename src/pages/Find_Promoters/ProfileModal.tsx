import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
import { Paper, Stack, Rating, Avatar } from "@mui/material";

import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../../components/button/CustomButton";
import { CustomBox } from "../../components/CustomBox/CustomBox";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
  event: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  // selectedItemIdProps,
  open,
  onClose,
  data,
  event,
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
            <Stack direction={"column"} spacing={2}>
              <Stack
               direction={{md:"row",sm:"row",xs:"column"}}
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#3F435E",
                    }}
                  >
                    Olive
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#3F435E",
                    }}
                  >
                    1000K Followers
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  4.5
                  <Box>
                    <Rating value={4.5} />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <img
              alt="event"
              src={require("../../assets/others/mapframe.png")}
              style={{ width: "100%", marginTop: "20px" }}
            />

            <Grid
              container
              direction={"row"}
              columnSpacing={2}
              rowSpacing={2}
              mt={3}
            >
              <Grid item lg={4} md={12} xs={12}>
                <CustomBox
                  color={"#DE9300"}
                  figure={"1.6k"}
                  title={"Total Attending"}
                  img={require("../../assets/navIcons/events.png")}
                  style={{ backgroundColor: "#FFF7DD" }}
                />
              </Grid>
              <Grid item lg={4} md={12} xs={12}>
                <CustomBox
                  color={"#DE9300"}
                  figure={"4.1K"}
                  title={"Clicked View"}
                  img={require("../../assets/navIcons/income.png")}
                  style={{ backgroundColor: "#FFF7DD" }}
                />
              </Grid>
              <Grid item lg={4} md={12} xs={12}>
                <CustomBox
                  color={"#DE9300"}
                  figure={"5.2K"}
                  title={"Total Following"}
                  img={require("../../assets/navIcons/followers.png")}
                  style={{ backgroundColor: "#FFF7DD" }}
                />
              </Grid>
            </Grid>
            <Typography
              sx={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem beatae Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatem beatae
            </Typography>
            <Grid
              md={6}
              xs={12}
              sx={{display:"flex", justifyContent: "center", alignItems: "center", mt: 3 }}
            >
              <CustomButton
                marginTop="10px"
                title={"Close"}
                width={"35%"}
                xsWidth={"100%"}
                mdHeight={"70px"}
                fullWidth
                onClick={handleRemoveImage}
              />
            </Grid>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default ProfileModal;
