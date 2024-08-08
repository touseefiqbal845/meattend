import React from "react";
import {
  Paper,
  Box,
  Stack,
  Rating,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

const Promoters = () => {
  const dummyData = [
    // { name: "Olio" },
    // { name: "william" },
    // { name: "Harry" },
    // { name: "Smith" },
    // { name: "Darwin" },
  ];
  return (
    <React.Fragment>
      {dummyData > 0 ? (
        <Paper
          sx={{
            marginTop: { xs: 0, md: 0 },
            padding: 3,
            borderRadius: "5px",
            backgroundColor: "#FFFFF",
          }}
        >
          <Box
            style={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Promoters</h2>
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {dummyData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Stack direction="column" spacing={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar />
                      <Box>{item.name}</Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      0
                      <Box>
                        <Rating value={4.5} />
                      </Box>
                    </Stack>
                  </Stack>
                  <Box>
                    <img
                      src={
                        "https://www.eventbrite.com/blog/wp-content/uploads/2023/02/Frame-1-3-min-1-3-2048x1152.avif"
                      }
                      alt={item.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Paper
          sx={{
            marginTop: { xs: 0, md: 0 },
            padding: 3,
            borderRadius: "5px",
            backgroundColor: "#FFFFF",
          }}
        >
          <Box
            style={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Promoters</h2>
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography>No promoters Available</Typography>
          </Grid>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Promoters;
