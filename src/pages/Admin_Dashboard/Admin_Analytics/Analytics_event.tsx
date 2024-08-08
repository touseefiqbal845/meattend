import React, { useRef, useState } from "react";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Pagination,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Select, { ActionMeta, SingleValue } from "react-select";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import CustomBox from "../../../components/CustomBox/MainCustomBox";
import { listOptions } from "../Admin-Finance/data";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { CustomCategories } from "../../../components/CustomCategoriesRowWise/CustomCategories";
import { Input } from "@material-ui/core";
import ResuableEventStack from "../../../components/EventStack";
import { commentsList, feedbackList } from "./data";
import { useNavigate } from "react-router-dom";
const incomeData = [
  1000, 1500, 1200, 2000, 1800, 2500, 4000, 2800, 3200, 2800, 3500, 3000,
];
const maxIncome = Math.max(...incomeData);

const gData = incomeData.map((value) => Math.max(maxIncome - value, 0));

const data = {
  labels: ["London", "New York", "Sans Francisco", "Tokoyo"],
  datasets: [
    {
      label: "Income",
      backgroundColor: "orange",
      borderColor: "orange",
      borderWidth: 1,
      hoverBackgroundColor: "orange",
      hoverBorderColor: "orange",
      borderRadius: 1,
      data: incomeData,
      stack: "A",
      barPercentage: 0.5, // Reduce bar width for the first dataset
      categoryPercentage: 0.8, // Adjust the space between bars
    },
    // {
    //   label: "third",
    //   backgroundColor: 'white',
    //   borderColor: 'white',
    //   borderWidth: 1,
    //   hoverBackgroundColor: 'white',
    //   hoverBorderColor: 'white',
    //   borderRadius: 10,
    //   marginTop: 10, // Adjust margin top to create a gap
    //   data: gap,
    //   stack: "A",
    //   barPercentage: 0.4, // Reduce bar width for the second dataset
    //   categoryPercentage: 0.8, // Adjust the space between bars
    // },
    {
      label: "",
      backgroundColor: "#E6E8F0",
      borderColor: "#E6E8F0",
      borderWidth: 1,
      hoverBackgroundColor: "#E6E8F0",
      hoverBorderColor: "#E6E8F0",
      borderRadius: 1,
      marginTop: 10, // Adjust margin top to create a gap
      data: gData, // Fill space above 4000 with black bars
      barPercentage: 0.5, // Reduce bar width for the second dataset
      categoryPercentage: 0.8, // Adjust the space between bars
      stack: "A",
      order: 1, // Set the order of the dataset to be between the first and third datasets
    },
  ],
};
function AnalyticsEvent() {
  const navigate = useNavigate();

  const handleEventChange = (
    newValue: SingleValue<{
      label: Event | undefined;
      value: Event | undefined;
    }>,
    actionMeta: ActionMeta<{
      label: Event | undefined;
      value: Event | undefined;
    }>
  ) => {};

  return (
    <Container maxWidth={false}>
      <Grid
        container
        direction={"row"}
        columnSpacing={2}
        rowSpacing={2}
        mt={{ xs: 1 }}
      >
        <Grid item md={6} xs={6}>
          <Typography
            fontSize={{ md: 25, xs: 20 }}
            fontWeight={700}
            color={"gray.graphTitle"}
          >
            Event Details
          </Typography>
        </Grid>
        <Grid item md={6} xs={6} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/analyticaEventHistory");
            }}
            sx={{
              backgroundColor: "#FFC000",
              boxShadow: "none",
              color: "black",
              textTransform: "none",
              borderRadius: "7px",
              fontSize: { xs: 10, md: 12 },
              alignSelf: "center",
              fontWeight: 700,
              width: {
                md: "140px",
                xs: "120px",
              },
              height: { md: "42px", xs: "30px" },
              "&:hover": {
                color: "white",
              },

              // width: { xs: "100px", md: "120px" },
            }}
          >
            View History
          </Button>
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomBox
            color={"#0884E2"}
            figure={"1000"}
            title={"Number Of Reviews"}
            img={require("../../../assets/navIcons/AReviews.png")}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomBox
            color="#10D453"
            figure={"3.6K"}
            title={"Number of Attendies"}
            img={require("../../../assets/navIcons/AAttendies.png")}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomBox
            color={"#FD1F1F"}
            figure={"4.1K"}
            title={"Number of Used Discounts"}
            img={require("../../../assets/navIcons/ADiscount.png")}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2}>
        <Grid item md={7} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={2}
            height={{ md: "55vh", xs: "35vh" }}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 22, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Users Analytics
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                // increase marke point size and width

                elements: {
                  point: {
                    radius: 10,
                    borderWidth: 1,
                  },
                  // and remove inside point color and border width
                  // point: {
                  //   borderWidth: 0,
                  //   backgroundColor: 'red',
                  // },
                },
              }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "18-25",
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "25-35",
                    data: [2, 3, 20, 5, 1, 4],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                ],
              }}
            />
          </Box>
        </Grid>

        <Grid item md={5} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={2}
            height={{ md: "55vh", xs: "35vh" }}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 24, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Number Of Followers
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box
              my={4}
              height={294}
              width={294}
              alignSelf={"center"}
              marginLeft={"auto"}
              marginRight={"auto"}
            >
              <CircularProgressbar
                styles={{
                  path: {
                    // Path color
                    stroke: "#FFC000",
                  },
                }}
                value={60}
                text={"60%"}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={3}
            height={{ md: "55vh", xs: "35vh" }}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 24, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Event Attendes (Gender)
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box
              height={294}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Doughnut
                options={{
                  // before draw
                  plugins: {
                    legend: {
                      position: "top",
                    },

                    tooltip: {
                      enabled: true,
                      callbacks: {},
                    },
                  },
                }}
                data={{
                  labels: ["Male", "Female"],
                  datasets: [
                    {
                      label: "10",
                      data: [12, 19],

                      backgroundColor: ["#0984E2", "#DEF1FF"],
                      borderColor: ["#0984E2", "#DEF1FF"],
                      borderWidth: 1,
                    },
                  ],
                }}
                plugins={[
                  {
                    id: "custom-plugin",
                    beforeDraw: function (chart) {
                      var width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx;
                      ctx.restore();
                      var fontSize = (height / 160).toFixed(2);
                      ctx.font = fontSize + "em sans-serif";
                      ctx.textBaseline = "top";
                      var text = "70%",
                        textX = Math.round(
                          (width - ctx.measureText(text).width) / 2
                        ),
                        textY = height / 2 + 20;
                      ctx.fillText(text, textX, textY);
                      // another text with Total Amount
                      var text1 = "Total Average",
                        textX1 = Math.round(
                          (width - ctx.measureText(text1).width) * 0.9
                        ),
                        textY1 = height / 2;
                      //reduce font size
                      ctx.font = 1 + "em sans-serif";
                      // now show dotted circle inside the doughnut
                      //   ctx.beginPath();
                      //   ctx.setLineDash([5, 5]);
                      //   ctx.arc(width / 2, height / 4, 100, 0, 2 * Math.PI);
                      //   ctx.stroke();
                      //   ctx.closePath();
                      // reduce size of dotted side

                      ctx.fillText(text1, textX1, textY1);

                      ctx.save();
                    },
                  },
                ]}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={3}
            height={{ md: "55vh", xs: "35vh" }}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 24, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Ticket Buyers Summary
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>

            <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

            <Bar
              data={data}
              options={{
                // hide vertical lines and most left vertical line as well i mean very first line
                scales: {
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },

                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    // position: "right" as const,
                  },
                  title: {
                    display: true,
                  },
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item md={12} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={2}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 22, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Users Analytics
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                // increase marke point size and width

                elements: {
                  point: {
                    radius: 10,
                    borderWidth: 1,
                  },
                  // and remove inside point color and border width
                  // point: {
                  //   borderWidth: 0,
                  //   backgroundColor: 'red',
                  // },
                },
              }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "18-25",
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "25-35",
                    data: [2, 3, 20, 5, 1, 4],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                ],
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2} mt={4}>
        <Grid item md={6} xs={12} boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}>
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Comments
          </Typography>
          <Box
            sx={{
              overflowY: "scroll",
              maxHeight: 400,
              mt: 3,

              // keep showing scroll bar not only on hover
              // help me to write code
              "&:before::-webkit-scrollbar": {
                display: "block",
              },

              "&:hover::-webkit-scrollbar": {
                display: "block",
              },
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0.512rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#04CAA5",
                height: "8px",
                borderRadius: "8px",
              },
            }}
          >
            {commentsList.map((item) => {
              return (
                <Stack direction={"row"} columnGap={2}>
                  <Box
                    width={30}
                    height={30}
                    component={"img"}
                    src={item.img}
                  />
                  <Stack>
                    <Typography
                      fontSize={12}
                      color={"gray.graphTitle"}
                      fontWeight={"bold"}
                    >
                      {item.name}
                    </Typography>
                    <Typography fontSize={12} color={"gray.tertiary"}>
                      {item.comment}
                    </Typography>
                    <Typography
                      mt={2}
                      mb={2.5}
                      fontSize={12}
                      color={"gray.tertiary"}
                      fontWeight={"bold"}
                    >
                      {item.date}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Box>
        </Grid>
        <Grid item md={6} xs={12} boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}>
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Feedbacks
          </Typography>
          <Box
            sx={{
              overflowY: "scroll",
              maxHeight: 400,
              mt: 3,
              // keep showing scroll bar not only on hover
              // help me to write code
              "&:before::-webkit-scrollbar": {
                display: "block",
              },

              "&:hover::-webkit-scrollbar": {
                display: "block",
              },
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0.512rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#04CAA5",
                height: "8px",
                borderRadius: "8px",
              },
            }}
          >
            {feedbackList.map((item) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  px={2}
                >
                  <Stack direction={"row"} columnGap={2}>
                    <Box
                      width={30}
                      height={30}
                      component={"img"}
                      src={item.img}
                    />
                    <Stack>
                      <Typography
                        fontSize={12}
                        color={"gray.graphTitle"}
                        fontWeight={"bold"}
                      >
                        {item.name}
                      </Typography>
                      <Rating name="read-only" value={item.rating} readOnly />
                      <Typography
                        fontSize={12}
                        color={"gray.tertiary"}
                        mb={3}
                        mt={1.5}
                      >
                        {item.comment}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    fontSize={12}
                    color={"gray.tertiary"}
                    fontWeight={"bold"}
                  >
                    {item.date}
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
          mt={3}
        >
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Followers
          </Typography>
          <Box>
            {commentsList.map((item) => (
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box
                  bgcolor={"#FBFBFB"}
                  width={"45%"}
                  height={"35%"}
                  py={2}
                  m={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  borderRadius={5}
                >
                  <Box
                    component={"img"}
                    src={item.img}
                    width={30}
                    height={30}
                  />
                  <Typography mt={1} fontSize={12} color={"gray.graphTitle"}>
                    {item.name}
                  </Typography>
                </Box>
                <Box
                  bgcolor={"#FBFBFB"}
                  width={"45%"}
                  height={"35%"}
                  py={2}
                  m={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  borderRadius={5}
                >
                  <Box
                    component={"img"}
                    src={item.img}
                    width={30}
                    height={30}
                  />
                  <Typography mt={1} fontSize={12} color={"gray.graphTitle"}>
                    {item.name}
                  </Typography>
                </Box>
                <Box
                  bgcolor={"#FBFBFB"}
                  width={"45%"}
                  height={"35%"}
                  py={2}
                  m={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  borderRadius={5}
                >
                  <Box
                    component={"img"}
                    src={item.img}
                    width={30}
                    height={30}
                  />
                  <Typography mt={1} fontSize={12} color={"gray.graphTitle"}>
                    {item.name}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          mt={3}
          boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
        >
          <Box mt={3} borderRadius={2} p={2}>
            <Typography
              sx={{
                fontSize: { md: 24, xs: 12 },
                color: "gray.graphTitle",
              }}
            >
              Income
            </Typography>
            <Box
              my={4}
              height={294}
              width={294}
              alignSelf={"center"}
              marginLeft={"auto"}
              marginRight={"auto"}
            >
              <CircularProgressbar
                styles={{
                  path: {
                    // Path color
                    stroke: "#FFC000",
                  },
                }}
                value={60}
                text={"60%"}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
          mt={3}
        >
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Events
          </Typography>
          <Box>
            {commentsList.map((item) => (
              <Stack
                direction={"row"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#FBFBFB"}
                mt={2}
                px={2}
                borderRadius={3}
              >
                <Box width={30} height={30} component={"img"} src={item.img} />
                <Typography fontSize={12} color={"#0884E2"} fontWeight={"bold"}>
                  Friday Night
                </Typography>
                <Typography
                  fontSize={12}
                  color={"gray.tertiary"}
                  mb={3}
                  mt={1.5}
                >
                  London SW7AP
                </Typography>
              </Stack>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WithLayout(AnalyticsEvent);
