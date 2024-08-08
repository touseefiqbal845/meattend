import React, { useState } from "react";
import { Avatar, Typography, Stack, Grid, Rating, Box } from "@mui/material";
import CustomInput from "./Comment-Input";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";

//@ts-ignore
interface ReviewCardProps {
  index: number;
  user: any;
  review: any;
  date: any;
  key: any;
  company_id: any;
  rating_id: any;
  userImg: string;
  rating: any,

}
//@ts-ignore
const ReviewCard: React.FC<ReviewCardProps> = ({
  index,
  user,
  review,
  rating,
  date,
  key,
  userImg,
  company_id,
  rating_id,
}) => {
  const [rating_reply, setRating_Reply] = React.useState<string>("");
  const handleKeyPress = (event: React.KeyboardEvent) => {
    console.log(event);
  };

  const handleReview = async () => {
    try {
      const Response = await MUserDashboardPagesApiService.postReviewReply(
        company_id,
        rating_id,
        rating_reply
      );
      const response = await Response;
      console.log("response from response.", response);
      const responseData = response.data.data;
      // setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ backgroundColor: "white" }}>
        <Grid item xs={10} md={9.5}>
          <Stack
            direction="row"
            alignItems="flex-start"
            spacing={2}
            sx={{ marginBottom: 2 }}
          >
            <Avatar
              alt={user}
              src={`https://staging-resources.meattend.com/MeAttend/posts/${userImg}?w=150&fit=crop&auto=format`}
            />
            <div style={{ maxWidth: "100%", width: "100%" }}>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "14px",
                  fontWeight: 800,
                  lineHeight: "20px",
                  fontFamily: "Mulish",
                  color: "#333333",
                }}
              >
                {user}
              </Typography>

              <Grid container>
                <Grid item xs={5} md={12} lg={12} xl={12}>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid item md={1}>
                      <Typography variant="body2">{rating}</Typography>
                    </Grid>
                    <Grid item md={8}>
                      <Rating
                        value={rating.toString()}
                        precision={0.5}
                        readOnly
                        style={{ fontSize: "15px" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Stack>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
                fontFamily: "Mulish",
                color: "#84858D",
                marginLeft: "10px",
              }}
            >
              {review}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={2.5}>
          <Typography fontSize={12} color={"gray.tertiary"} fontWeight={"bold"}>
            {date}
          </Typography>
        </Grid>
        <Grid item md={12} xs={12} sx={{ margin: "10px" }}>
          <CustomInput
            disabled={false}
            type="text"
            // error={false}
            // title="Address Line 1"
            inputFontSize={14}
            placeholder="Write Review"
            endImg={require("../../assets/icons/send.png")}
            height="1.7vh"
            fontWeight={200}
            fontSize={14}
            showLabel={false}
            // onKeyPress={handleKeyPress}
            onClick={handleReview}
            value={rating_reply}
            onChange={(event) => setRating_Reply(event.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewCard;
