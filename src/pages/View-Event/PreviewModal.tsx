import React from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Grid,
  Modal,
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

import { CustomCategories } from "../../components/CustomCategoriesRowWise/CustomCategories";
import { ParticularEvent } from "../../services/model";
import CustomButton from "../../components/button/CustomButton";

//@ts-ignore
import ReviewCard from "./Reviews";
import CommentCard from "./Comments";
import WhiteCustomButton from "../../components/button/WhiteCustomButton";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  dateTime: ParticularEvent | null;
  geolocation: any;
  event: ParticularEvent | null;
  company_id: number;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  open,
  onClose,
  dateTime,
  geolocation,
  event,
  company_id,
}) => {
  const handleRemoveImage = () => {
    onClose();
  };
  //@ts-ignore
  const handleUpload = (file: Blob, fileType: string, action: string) => {
    console.log("image uplaoding successfully");
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 245, color: "white" }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "65%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "80%", md: "100%" },
            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Grid container sm={12}>
            <Grid item md={12}>
              <Grid item xs={12} md={12} sx={{ marginTop: { xs: 0, md: 0 } }}>
                <Paper
                  sx={{
                    marginTop: { xs: 0, md: 0 },
                    backgroundColor: "white",
                    boxShadow: "none !important",
                  }}
                >
                  <img
                    alt="location"
                    src={require("../../assets/icons/LocationImg.png")}
                    style={{
                      marginTop: "15px",
                      maxHeight: "100%",
                      width: "100%",
                    }}
                  />
                  <Grid container direction="row" spacing={2} marginTop="0px">
                    <Grid item md={5}>
                      <h1
                        style={{
                          //   color: theme.palette.gray.graphTitle,
                          color: "black",
                          fontWeight: 700,
                          margin: "0px",
                        }}
                      >
                        {event?.event_name}
                      </h1>
                    </Grid>
                    <Grid item md={7}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item md={6} lg={6}>
                          <CustomButton
                            marginLeft="1px"
                            marginTop="2px"
                            notArrow
                            // mdFullWidtha
                            title={"Attend"}
                            // fullWidth
                            XFontSize="16"
                            MFontSize="16"
                            // onClick={handle}
                          />
                        </Grid>
                        <Grid item md={6} lg={6}>
                          <WhiteCustomButton
                            marginLeft="1px"
                            marginTop="2px"
                            notArrow
                            // mdFullWidtha
                            title={"Follow"}
                            // fullWidth
                            XFontSize="16"
                            MFontSize="16"
                            // onClick={handle}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      marginTop: "5px",
                      color: "gray",
                      lineHeight: "24px",
                    }}
                  >
                    District Sky Longe
                  </Typography>

                  <Grid
                    container
                    xs={1}
                    md={12}
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <Grid item md={6}>
                      <Grid container xs={12}>
                        <Grid
                          xs={1}
                          direction="row"
                          spacing={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="loc"
                            src={require("../../assets/icons/Location.png")}
                            style={{ height: 15, width: 15 }}
                          />
                        </Grid>
                        <Grid xs={11}>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "14px",
                              color: "#84858D",
                              fontWeight: 400,
                            }}
                          >
                            {event?.event_address}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={6}>
                      <Grid container xs={12}>
                        <Grid
                          xs={1}
                          direction="row"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="loc"
                            src={require("../../assets/icons/Location.png")}
                            style={{ height: 15, width: 15 }}
                          />
                        </Grid>
                        <Grid xs={11}>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "14px",
                              color: "#84858D",
                              fontWeight: 400,
                            }}
                          >
                            Geolocation:{geolocation}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    xs={1}
                    md={12}
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <Grid item md={3}>
                      <Grid container alignItems="center" xs={12}>
                        <Grid
                          xs={1}
                          direction="row"
                          spacing={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="loc"
                            src={require("../../assets/icons/Clock.png")}
                            style={{ height: 15, width: 15 }}
                          />
                        </Grid>
                        <Grid xs={11}>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "14px",
                              color: "#84858D",
                              fontWeight: 400,
                              marginLeft: "15px",
                            }}
                          >
                            {dateTime && dateTime.from_time_formatted} -{" "}
                            {dateTime && dateTime.to_time_formatted}
                            {/* 10:00 AM - 11:00 PM */}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={3}>
                      <Grid container alignItems="center" xs={12}>
                        <Grid
                          xs={1}
                          direction="row"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="loc"
                            src={require("../../assets/icons/phone.png")}
                            style={{ height: 15, width: 15 }}
                          />
                        </Grid>
                        <Grid xs={11}>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "14px",
                              color: "#84858D",
                              fontWeight: 400,
                              marginLeft: "15px",
                            }}
                          >
                            977357222
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={3}>
                      <Grid container alignItems="center" xs={12}>
                        <Grid
                          xs={1}
                          direction="row"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="loc"
                            src={require("../../assets/icons/mail.png")}
                            style={{ height: 15, width: 15 }}
                          />
                        </Grid>
                        <Grid xs={11}>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "14px",
                              color: "#84858D",
                              fontWeight: 400,
                              marginLeft: "15px",
                            }}
                          >
                            {event?.contact}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ marginTop: "15px", alignItems: "center" }}
                  >
                    <Grid item md={4}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ flexBasis: "25%" }}>
                          <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>Industries</li>
                          </ul>
                        </Box>

                        <Box sx={{ flexBasis: "75%" }}>
                          <ul
                            style={{
                              listStyleType: "none",
                              padding: 0,
                              marginLeft: "5px",
                            }}
                          >
                            <li>
                              <Stack direction="row" spacing={1}>
                                {event?.categories.map((categoryObj, index) => {
                                  const parsedCategories = JSON.parse(
                                    categoryObj.category
                                  );

                                  return parsedCategories.map(
                                    (category: string, idx: number) => (
                                      <CustomCategories
                                        key={index + idx}
                                        title={category}
                                      />
                                    )
                                  );
                                })}
                              </Stack>
                            </li>
                          </ul>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      Date: {event?.date_time}
                    </Grid>
                    <Grid item md={4}>
                      Attending: {event?.attendees}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
                  <Box
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        // color: theme.palette.gray.graphTitle,
                        color: "#000315",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        fontFamily: "Mulish",
                      }}
                    >
                      Description
                    </Typography>{" "}
                  </Box>
                  <Grid container sx={{ marginTop: "15px" }}>
                    <Grid item sx={{ marginTop: "15px" }}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            fontFamily: "Mulish",
                            color: "#84858D",
                          }}
                        >
                          {event?.description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        // color: theme.palette.gray.graphTitle,
                        color: "#000315",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        fontFamily: "Mulish",
                      }}
                    >
                      Public Photos
                    </Typography>{" "}
                  </Box>
                  <Grid
                    container
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Grid item md={12}>
                      {event?.images.map((img, index) => (
                        <img
                          key={index}
                          alt={"event_img"}
                          //@ts-ignore
                          src={`https://staging-resources.meattend.com/images/events/${img?.image}`}
                          style={{ height: 100, width: 80 }}
                        />
                      ))}
                    </Grid>
                  </Grid>

                  <Box
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        // color: theme.palette.gray.graphTitle,
                        color: "#000315",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        fontFamily: "Mulish",
                      }}
                    >
                      Comments
                    </Typography>{" "}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      {event?.comments.map((comment, index) => (
                        <CommentCard
                          index={index}
                          key={index}
                          user={comment?.user?.first_name}
                          comment={comment?.comment}
                          time={comment?.created_at}
                          company_id={company_id}
                          comment_id={comment?.id}
                          userImg={comment?.user?.profile_image}
                        />
                      ))}
                    </Grid>
                  </Grid>
                  <Box
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        // color: theme.palette.gray.graphTitle,
                        color: "#000315",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        fontFamily: "Mulish",
                      }}
                    >
                      Reviews
                    </Typography>{" "}
                  </Box>
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {event?.reviews.map((review, index) => (
                          <ReviewCard
                            index={index}
                            key={index}
                            user={review?.user?.first_name}
                            review={review?.description}
                            date={review.created_at}
                            rating={review?.rating}
                            userImg={review?.user?.profile_image}
                            company_id={company_id}
                            rating_id={review?.id}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </>
                  <Box
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        // color: theme.palette.gray.graphTitle,
                        color: "#000315",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        fontFamily: "Mulish",
                      }}
                    >
                      Menu
                    </Typography>{" "}
                  </Box>
                  <Grid container sx={{ marginTop: "15px" }}>
                    <Grid item>
                      <Grid
                        container
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Grid item md={12}>
                          {event?.menus.map((menu, index) => (
                            <img
                              key={index}
                              alt={"menu_img"}
                              //@ts-ignore
                              src={`https://staging-resources.meattend.com/MeAttend/menus/${menu.menu_image}`}
                              style={{ height: 100, width: 80 }}
                            />
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={8}>
                <Grid
                  container
                  direction="column"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item md={6} lg={6}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "30px",
                        fontFamily: "Mulish",
                        color: "#000315",
                      }}
                    >
                      Your Entry Token
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        fontFamily: "Mulish",
                        color: "#84858D",
                      }}
                    >
                      Get 10% off by scanning this QR upon entry
                    </Typography>
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <img
                      alt="qr"
                      src={require("../../assets/icons/qr.png")}
                    ></img>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container sx={{ marginBottom: "120px" }}>
              <Grid item md={6}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item md={6} lg={6}>
                    <CustomButton
                      marginLeft="1px"
                      marginTop="2px"
                      notArrow
                      // mdFullWidtha
                      title={"Promote"}
                      // fullWidth
                      XFontSize="16"
                      MFontSize="16"
                      // onClick={handle}
                    />
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <WhiteCustomButton
                      marginLeft="1px"
                      marginTop="2px"
                      notArrow
                      // mdFullWidtha
                      title={"Directions"}
                      // fullWidth
                      XFontSize="16"
                      MFontSize="16"
                      // onClick={handle}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    </Modal>
  );
};

export default PreviewModal;
