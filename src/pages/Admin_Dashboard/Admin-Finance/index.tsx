import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Select, { ActionMeta, SingleValue } from "react-select";

import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";

import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { listOptions } from "./data";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  // reduce width of the bar
  barPercentage: 0.8,
  // reduce gap between the bars
  categoryPercentage: 0.4,

  // scales: {
  //   y: {
  //     suggestedMin: -2000, // Minimum value for y-axis
  //     suggestedMax: 2000, // Maximum value for y-axis
  //   },
  // },
};
const incomeData = [
  1000, 1500, 1200, 2000, 1800, 2500, 4000, 2800, 3200, 2800, 3500, 3000,
];
const maxIncome = Math.max(...incomeData);

const gData = incomeData.map((value) => Math.max(maxIncome - value, 0));

const gap = [];
for (let i = 0; i < incomeData.length; i++) {
  if (incomeData[i] !== maxIncome) {
    gap.push(100);
  } else {
    gap.push(0);
  }
}

const data = {
  labels: ["Paypal", "Facebook", "Visa", "Microsoft", "Intel"],
  datasets: [
    {
      label: "Income",
      backgroundColor: "orange",
      borderColor: "orange",
      borderWidth: 1,
      hoverBackgroundColor: "orange",
      hoverBorderColor: "orange",
      borderRadius: 10,
      data: incomeData,
      stack: "A",
      barPercentage: 0.3, // Reduce bar width for the first dataset
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
      borderRadius: 10,
      marginTop: 10, // Adjust margin top to create a gap
      data: gData, // Fill space above 4000 with black bars
      barPercentage: 0.3, // Reduce bar width for the second dataset
      categoryPercentage: 0.8, // Adjust the space between bars
      stack: "A",
      order: 1, // Set the order of the dataset to be between the first and third datasets
    },
  ],
};

function Index() {
  const handleEventChange = (
    newValue: SingleValue<{
      label: Event | undefined;
      value: Event | undefined;
    }>,
    actionMeta: ActionMeta<{
      label: Event | undefined;
      value: Event | undefined;
    }>
  ) => {
    console.log(newValue?.value);
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0, margin: 0 }}>
      <Grid container bgcolor={"white"} columnSpacing={4}>
        <Grid item xs={12} md={8}>
          <h2>Finance</h2>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Revenue
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
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "2021",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: "#FFE699",
                    borderColor: "#FFE699",
                    borderWidth: 1,
                  },
                  {
                    label: "2022",
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: "#DE9300",
                    borderColor: "#DE9300",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                ...options,
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Mobile users
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
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "2021",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: "#04CAA5",
                    borderColor: "#04CAA5",
                    borderWidth: 1,
                  },
                  {
                    label: "2022",
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: "#FED222",
                    borderColor: "#FED222",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                ...options,
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Companies
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
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "2021",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: "#FFC000",
                    borderColor: "#FFC000",
                    borderWidth: 1,
                  },
                  {
                    label: "2022",
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: "#F2970F",
                    borderColor: "#F2970F",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                ...options,
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Revenue best companies
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
                indexAxis: "y" as const,
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                  title: {
                    display: true,
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Revenue best users
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
                indexAxis: "y" as const,
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                  title: {
                    display: true,
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Revenue best location
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
                indexAxis: "y" as const,
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                  title: {
                    display: true,
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid sx={{}} item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Attending
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
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Income for companies
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
            <Box
              height={294}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Doughnut
                options={{
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context: any) {
                          var label = context.dataset.label || "";

                          if (context.parsed.y !== 0) {
                            label += ": " + context.parsed + " $";
                          }

                          return label;
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: [
                    "Paypal",
                    "Facebook",
                    "Visa",
                    "Microsoft",
                    "Intel",
                    "Google",
                  ],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Income for industries
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
            <Box
              height={294}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Doughnut
                options={{
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
                data={{
                  labels: [
                    "Paypal",
                    "Facebook",
                    "Visa",
                    "Microsoft",
                    "Intel",
                    "Google",
                  ],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Income for phone devices
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
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "2021",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: "#04CAA5",
                    borderColor: "#04CAA5",
                    borderWidth: 1,
                  },
                  {
                    label: "2022",
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: "#FED222",
                    borderColor: "#FED222",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                ...options,
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box mt={3} borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
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
                Attending
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
    </Container>
  );
}

export default WithLayout_AdminDashboard(Index);
