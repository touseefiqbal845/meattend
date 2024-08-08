import React from "react";
import { Avatar, Typography, Stack, Grid, Rating, Box } from "@mui/material";

//@ts-ignore
const ReviewCard = ({ index, user, review, rating, date, key, userImg }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ backgroundColor: "white" }}>
        <Grid item xs={10} md={9}>
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
        <Grid item md={3}>
          <Typography fontSize={12} color={"gray.tertiary"} fontWeight={"bold"}>
            {date}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewCard;
