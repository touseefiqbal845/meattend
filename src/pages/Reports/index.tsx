import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Select from "react-select";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  BarElement,
} from "chart.js";
import { useState } from "react";
import _ from "lodash";

import MAuthApiService from "../../services/MAuthApiService";
import {
  monthsName,
  companyReachDifference,
  customerBaseDifference,
  companyEventsDifference,
} from "../../services/constant";
import MRegisterApiService from "../../services/MRegisterApiService";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import { customerOptions, eventOptions, reachOptions } from "./data";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement
);

function Reports(props: any) {
  const [customerBase, setCustomerBase] = useState("Select");
  const [event, setEvent] = useState<string>("Select");
  const [reach, setReach] = useState<string>("Select");

  const [customerBaseData, setCustomerBaseData] = useState<
    ChartData<"doughnut", any[], unknown>
  >({} as ChartData<"doughnut", any[], unknown>);

  const [reachData, setReachData] = useState<ChartData<"line", any[], unknown>>(
    {} as ChartData<"line", any[], unknown>
  );
  const [eventData, setEventData] = useState<ChartData<"bar", any[], unknown>>(
    {} as ChartData<"bar", any[], unknown>
  );

  // mobile or less then 600px
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    // scales: {
    //   y: {
    //     suggestedMin: -2000, // Minimum value for y-axis
    //     suggestedMax: 2000, // Maximum value for y-axis
    //   },
    // },
  };
  const handleEventChange = async (newValue: any, actionMeta: any) => {
    setEvent(newValue.value);
    if (newValue.value == "Select") return;
    let access_token = localStorage.getItem("access_token");

    const res = await MRegisterApiService.getCustomerBase(
      companyEventsDifference[newValue.value]
    );
    if (newValue.value == "Revenue") {
      let array = [];
      for (let value of Object.values(res.data)) {
        array.push(value);
      }

      setEventData({
        labels: monthsName,
        datasets: [
          {
            label: "Revenue",
            //@ts-ignore
            data: array,

            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
          },
        ],
      });
    } else if (newValue.value == "Attending") {
      let keysArray = [];
      let valuesAarray = [];
      for (let [key, value] of Object.entries(res.data)) {
        keysArray.push(key);
        valuesAarray.push(value);
      }
      setEventData({
        labels: keysArray,
        datasets: [
          {
            label: "Attending",
            //@ts-ignore
            data: valuesAarray,

            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
          },
        ],
      });
    } else {
      setEventData({
        labels: monthsName,
        datasets: [
          {
            label: "Discounts",
            //@ts-ignore
            data: [],

            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
          },
        ],
      });
    }
  };

  // Add the missing import for 'IsMulti'

  const handleReachChange = async (newValue: any, actionMeta: any) => {
    setReach(newValue?.value);
    // if (event.target.value == "Select") return;

    const res = await MRegisterApiService.getCustomerBase(
      companyReachDifference[newValue?.value]
    );
    console.log(
      res,
      MRegisterApiService.getCustomerBase(
        companyReachDifference[newValue?.value]
      )
    );

    if (newValue?.value == "Company") {
      let array = [];
      for (let value of Object.values(res.data)) {
        array.push(value);
      }

      setReachData({
        labels: monthsName,
        datasets: [
          {
            label: "Company Followers",
            //@ts-ignore
            data: array,

            borderColor: "#DE9300",
            backgroundColor: "#DE9300",
          },
        ],
      });
    } else if (newValue.value == "Events") {
      console.log(res.data);
      let followersArray = [];
      let attendersArray = [];
      //@ts-ignore
      for (let value of Object.values(res.data.event_followers)) {
        followersArray.push(value);
      }
      //@ts-ignore
      for (let value of Object.values(res.data.event_attenders)) {
        attendersArray.push(value);
      }

      setReachData({
        labels: monthsName,
        datasets: [
          {
            label: "Event Followers",
            //@ts-ignore
            data: followersArray,

            borderColor: "#DE9300",
            backgroundColor: "#DE9300",
          },
          {
            label: "Event Attenders",
            //@ts-ignore
            data: attendersArray,

            borderColor: "#04CAA5",
            backgroundColor: "#04CAA5",
          },
        ],
      });
    } else {
      setReachData({
        labels: monthsName,
        datasets: [
          {
            label: "Company Followers",
            //@ts-ignore
            data: [Object.values(res.data[""].followers_count)],

            borderColor: "#DE9300",
            backgroundColor: "#DE9300",
          },
          {
            label: "Event Followers",
            //@ts-ignore
            data: [Object.values(res.data[""].users_count)],
            borderColor: "#04CAA5",
            backgroundColor: "#04CAA5",
          },
        ],
      });
    }
  };
  const handleCustomerBase = async (newValue: any, actionMeta: any) => {
    setCustomerBase(newValue?.value);
    if (newValue?.value == "Select") return;

    let access_token = localStorage.getItem("access_token");

    const res = await MRegisterApiService.getCustomerBase(
      customerBaseDifference[newValue?.value]
    );
    if (res.data) {
      const data = res.data;
      //@ts-ignore
      if (newValue?.value == "Age") {
        setCustomerBaseData({
          labels: ["Below 18", "18-25", "25-35", "Above 40"],
          datasets: [
            {
              label: "Age",
              data: [
                data.data["18_below_years"],
                data.data["19_25_years"],
                data.data["26_40_years"],
                data.data["40_more_years"],
              ],
              backgroundColor: ["#41B883", "#DE9300", "#04CAA5", "#FD1F1F"],
              borderColor: ["#41B883", "#DE9300", "#04CAA5", "#FD1F1F"],
              borderWidth: 1,
            },
          ],
        });
      } else if (newValue?.value == "Gender") {
        setCustomerBaseData({
          labels: ["Male", "Female", "Others"],
          datasets: [
            {
              label: "Gender",
              data: [data.data.female, data.data.male, data.data.others],
              backgroundColor: ["#41B883", "#DE9300", "#04CAA5"],
              borderColor: ["#41B883", "#DE9300", "#04CAA5"],
              borderWidth: 1,
            },
          ],
        });
      } else if (newValue?.value == "City") {
        setCustomerBaseData({
          labels: ["London", "Manchester", "Birmingham"],
          datasets: [
            {
              label: "City",
              data: [1, data.data.Manchester, data.data.Birmingham],
              backgroundColor: ["#41B883", "#DE9300", "#04CAA5"],
              borderColor: ["#41B883", "#DE9300", "#04CAA5"],
              borderWidth: 1,
            },
          ],
        });
      }
    }
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0, margin: 0 }}>
      <Grid container bgcolor={"white"} columnSpacing={4}>
        <Grid item xs={12} md={8}>
          <Typography
            fontSize={24}
            fontWeight={600}
            color={"#000000"}
            sx={{
              marginX: { xs: 2, md: 0 },
              my: { xs: 2, md: 0 },
            }}
          >
            Reports
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack>
                <Typography sx={{ fontSize: { md: 16, xs: 12 } }}>
                  Reach
                </Typography>
              </Stack>
              {/* <Stack
                direction={"row"}
                flexDirection={"row"}
                alignItems={"center"}
                spacing={3}
              > */}
              {/* <Stack flexDirection={"row"} alignItems={"center"}>
                    <Box
                      width={10}
                      height={10}
                      borderRadius={10}
                      color={"#DE9300"}
                      component={"span"}
                      bgcolor={"#DE9300"}
                      mr={1}
                    />
                    <Typography
                      sx={{ fontSize: { md: 16, xs: 12 } }}
                      color={"#84858D"}
                    >
                      Revenue
                    </Typography>
                  </Stack> */}
              {/* <Stack flexDirection={"row"} alignItems={"center"}>
                    <Box
                      width={10}
                      height={10}
                      borderRadius={10}
                      color={"#DE9300"}
                      component={"span"}
                      bgcolor={"#04CAA5"}
                      mr={1}
                    />
                    <Typography
                      sx={{ fontSize: { md: 16, xs: 12 } }}
                      color={"#84858D"}
                    >
                      Earnings
                    </Typography>
                  </Stack> */}

              <Select
                value={{
                  label: reach,
                  value: reach,
                }}
                onChange={handleReachChange}
                //@ts-ignore
                options={reachOptions}
              />
            </Stack>
            <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

            {_.size(reachData) > 0 && (
              <Line
                data={reachData}
                options={{
                  ...options,
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item md={6} xs={12} mt={{ md: 0, xs: 4 }}>
          <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack>
                <Typography sx={{ fontSize: { md: 16, xs: 12 } }}>
                  Events
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                flexDirection={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <Select
                  value={{
                    label: event,
                    value: event,
                  }}
                  onChange={handleEventChange}
                  //@ts-ignore
                  options={eventOptions}
                />
              </Stack>
            </Stack>

            <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
            {_.size(eventData) > 0 && <Bar data={eventData} />}
          </Box>
        </Grid>
        <Grid item md={6} xs={12} mt={{ md: 0, xs: 4 }}>
          <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack>
                <Typography sx={{ fontSize: { md: 16, xs: 12 } }}>
                  Customer base
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                flexDirection={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <Select
                  value={{
                    label: customerBase,
                    value: customerBase,
                  }}
                  onChange={handleCustomerBase}
                  //@ts-ignore
                  options={customerOptions}
                />
              </Stack>
            </Stack>
            <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
            <Box height={400}>
              {_.size(customerBaseData.datasets) && (
                <Doughnut data={customerBaseData} />
              )}
            </Box>
          </Box>
        </Grid>
        {/* <Grid item md={6} xs={12} mt={4}>
            <Box
              borderRadius={2}
              border={"1px solid #D8DAE7"}
              p={2}
              height={"50vh"}
            >
              <Stack
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack>
                  <Typography sx={{ fontSize: { md: 16, xs: 12 } }}>
                    Events
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  spacing={3}
                >
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      {customerBase}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={customerBase}
                      label="city"
                      onChange={handleChange}
                      sx={{
                        width: { md: "9rem", xs: "6rem" },
                        border: "none",
                        ".MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #C7CADA",
                        },
                      }}
                    >
                      <MenuItem value={10}>London</MenuItem>
                      <MenuItem value={20}>Manchester</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <BarChart
                width={mobileView ? 350 : 600}
                height={300}
                data={StackBardata}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#FAB329" />
                <Bar dataKey="uv" stackId="a" fill="#FFDB95" />
              </BarChart>
            </Box>
          </Grid> */}
      </Grid>
    </Container>
  );
}

export default WithLayout(Reports);
