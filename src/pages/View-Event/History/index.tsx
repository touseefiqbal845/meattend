import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid, Paper, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import { WithLayout } from "../../../components/Wrapper/WithLayout";
import MUserDashboardPagesApiService from "../../../services/UserDashboardPagesApiServices";

import Promoters from "./PromotersSection";
import CommentCard from "./Comments";
import ReviewCard from "./Reviews";
import BuyerChart from "./totalBuyerChart";
import Attendes from "./AttendesChart";
import ReviewRatings from "./ReviewsRatingsChart";
import Following from "./FollowingChart";
import CustomizedTicketTables from "./TableTickets";
import BoxesWithAvatars from "./AttendeeAvatorsCards";
import GenderChart from "./GenderChart";

const Index = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const theme = useTheme();
  const [eventHistory, setEventHistory] = useState([]);
  const [eventAnalytics, setEventAnalytics] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  let cols = 5;
  if (isSmallScreen) {
    cols = 2;
  } else if (isMediumScreen) {
    cols = 3;
  } else if (theme.breakpoints.down("lg")) {
    cols = 5;
  }

  const imageWidth = isSmallScreen ? 200 : isMediumScreen ? 250 : 300;
  const imageHeight = isSmallScreen ? 150 : isMediumScreen ? 200 : 250;
  const rowHeight = isSmallScreen ? 170 : isMediumScreen ? 220 : 270;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MUserDashboardPagesApiService.getEventHistory(
          eventId
        );
        console.log("response", response);
        const eventAnalytics = response?.data?.analytics || [];
        const eventHistory = response?.data?.history || [];
        const AllComments = response?.data?.history?.comments || [];
        const Allfeebacks = response?.data?.history?.ratings || [];
        const AllImages = response?.data?.history?.images || [];
        const AllAttendeesNames = response?.data?.history?.attendees.map(
          (attend: any) => ({
            attendID: attend?.id,
            attendName: `${attend?.user?.first_name} ${attend?.user?.last_name}`,
          })
        );
        setEventHistory(eventHistory);
        setEventAnalytics(eventAnalytics);
        setComments(AllComments);
        setReviews(Allfeebacks);
        setImages(AllImages);
        setAttendees(AllAttendeesNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
 

  const getMonthName = (monthIndex: any) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  const formatdate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <React.Fragment>
      <Grid
        container
        sm={12}
        sx={{
          backgroundColor: "white",
          overflow: "hidden",
          padding: {
            xs: 1.5,
            md: 3,
          },
        }}
      >
        <Grid item md={12}>
          <h2>Event History</h2>
        </Grid>

        <Grid container sx={{ marginTop: "20px", bg: "white" }}>
          <Grid item xs={12} md={12} lg={6} paddingRight={1}>
            <Paper
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "10px",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                "& .MuiPaper-root": {
                  boxShadow: "none",
                },
              }}
            >
              <Typography
                sx={{
                  // color: theme.palette.gray.graphTitle,
                  color: "#000315",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  fontFamily: "Mulish",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              >
                All Comments
              </Typography>{" "}
              <Box
                sx={{
                  maxHeight: "600px",
                  minHeight: "500px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "12px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#04CAA5",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#04CAA5",
                  },
                }}
              >
                {comments.map((comment: any, index: any) => (
                  <CommentCard
                    index={index}
                    key={index}
                    user={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    comment={comment?.comment}
                    date={formatdate(comment.created_at)}
                    userImg={comment?.user?.profile_image}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <>
              <Paper
                sx={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "10px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  "& .MuiPaper-root": {
                    boxShadow: "none",
                  },
                }}
              >
                <Typography
                  style={{
                    color: "#000315",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Mulish",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                >
                  All Feedback
                </Typography>
                <Box
                  sx={{
                    // maxHeight: "1054px",
                    maxHeight: "600px",
                    minHeight: "500px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "12px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#04CAA5",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#04CAA5",
                    },
                  }}
                >
                  {reviews.map((review: any, index: any) => (
                    <ReviewCard
                      index={index}
                      key={index}
                      user={`${review?.user?.first_name} ${review?.user?.last_name}`}
                      review={review?.description}
                      date={formatdate(review.created_At)}
                      rating={review?.rating}
                      userImg={review?.user?.profile_image}
                    />
                  ))}
                </Box>
              </Paper>
            </>
          </Grid>
        </Grid>
        <Grid container padding={3} sx={{ backgroundColor: "white" }}>
          <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
            <h2>Event Photos</h2>
          </Typography>
          <Grid item xs={12}>
            <ImageList
              sx={{ width: "100%" }}
              cols={cols}
              rowHeight={rowHeight}
              gap={2}
            >
              {images.map((img: any) => (
                <ImageListItem key={img?.id} sx={{ width: imageWidth }}>
                  <img
                    srcSet={`https://staging-resources.meattend.com/images/events/${img?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`https://staging-resources.meattend.com/images/events/${img?.image}?w=164&h=164&fit=crop&auto=format`}
                    // alt={item.title}
                    alt=""
                    loading="lazy"
                    style={{
                      height: imageHeight,
                      width: imageWidth,
                      objectFit: "cover",
                    }}
                  />
                  <ImageListItemBar
                    title={"By Owner"}
                    subtitle={new Date(img?.created_at).toLocaleDateString()}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
        <Grid container padding={3} sx={{ marginTop: "10px" }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{ backgroundColor: "white", paddingRight: 1 }}
          >
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Ticket Sales</h2>
            </Typography>
            <CustomizedTicketTables />
          </Grid>
          <Grid item xs={12} md={12} lg={6} sx={{ backgroundColor: "white" }}>
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Attendes</h2>
            </Typography>
            <BoxesWithAvatars attendeesNames={attendees} />
          </Grid>
        </Grid>

        <Grid container padding={3}>
          <Grid item md={12}>
            <Promoters />
          </Grid>
        </Grid>
        <BuyerChart />
        <Attendes
        
        eventAnalytics={eventAnalytics}
         />
        <ReviewRatings eventAnalytics={eventAnalytics} />
        <Following eventAnalytics={eventAnalytics} />
        <GenderChart eventAnalytics={eventAnalytics} />
      </Grid>
    </React.Fragment>
  );
};

export default WithLayout(Index);
