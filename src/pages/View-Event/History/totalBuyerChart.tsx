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

  import MAuthApiService from "../../../services/MAuthApiService";
  import {
    monthsName,
    companyReachDifference,
    customerBaseDifference,
    companyEventsDifference,
  } from "../../../services/constant";
  import MRegisterApiService from "../../../services/MRegisterApiService";
  import { WithLayout } from "../../../components/Wrapper/WithLayout";
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
          //@ts-ignore

    const WeekDates = [
      
    ];
    const [eventData, setEventData] = useState<ChartData<"bar", any[], unknown>>({
          //@ts-ignore

      labels: WeekDates,
      datasets: [
        {
          label: "Daily",
          //@ts-ignore
          data: [], // Sample data for the week
          borderColor: "#FAB329",
          backgroundColor: "#FAB329",
          borderRadius: 10,
        },
      ],
    });
    

    const populationLabelPlugin = {
      id: "populationLabelPlugin",
      afterDatasetsDraw: function (chart: any) {
        const ctx = chart.ctx;
        const yAxis = chart.scales.y;
        const xPos = yAxis.left - 50; // Adjust the distance of the label from the y-axis

        ctx.save();
        ctx.textAlign = "right";
        ctx.fillStyle = "#000000"; // Adjust color if needed
        ctx.fillText("Population", xPos, 20); // Adjust yPos as needed
        ctx.restore();
      },
    };
    // mobile or less then 600px
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
        },
        custom: [populationLabelPlugin],
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Population", 
          },
          scaleLabel: {
            display: true,
            labelString: "Population", // Text label for the y-axis data
          },
          //   suggestedMin: -2000, // Minimum value for y-axis
          //   suggestedMax: 2000, // Maximum value for y-axis
        },
      },
    };
    // const handleEventChange = async (newValue: any, actionMeta: any) => {
    //   setEvent(newValue.value);
    //   if (newValue.value == "Select") return;
    //   let access_token = localStorage.getItem("access_token");

    //   const res = await MRegisterApiService.getCustomerBase(
    //     companyEventsDifference[newValue.value]
    //   );
    //   if (newValue.value == "Daily") {
    //     let array = [];
    //     for (let value of Object.values(res.data)) {
    //       array.push(value);
    //     }

    //     setEventData({
    //       labels: WeekDates,
    //       datasets: [
    //         {
    //           label: "Revenue",
    //           //@ts-ignore
    //           data: array,

    //           borderColor: "#FAB329",
    //           backgroundColor: "#FAB329",
    //         },
    //       ],
    //     });
    //   } else if (newValue.value == "Yearly") {
    //     let keysArray = [];
    //     let valuesAarray = [];
    //     for (let [key, value] of Object.entries(res.data)) {
    //       keysArray.push(key);
    //       valuesAarray.push(value);
    //     }
    //     setEventData({
    //       labels: Years,
    //       datasets: [
    //         {
    //           label: "Attending",
    //           //@ts-ignore
    //           data: valuesAarray,

    //           borderColor: "#FAB329",
    //           backgroundColor: "#FAB329",
    //         },
    //       ],
    //     });
    //   } else {
    //     setEventData({
    //       labels: monthsName,
    //       datasets: [
    //         {
    //           label: "Monthly",
    //           //@ts-ignore
    //           data: [],

    //           borderColor: "#FAB329",
    //           backgroundColor: "#FAB329",
    //         },
    //       ],
    //     });
    //   }
    // };
    // const WeekDates = [
    //   "2024-04-30",
    //   "2024-05-07",
    //   "2024-05-14",
    //   "2024-05-17",
    //   "2024-05-20",
    // ];

    const Years = [2020, 2021, 2022, 2023, 2024];

    const handleEventChange = async (newValue: any, actionMeta: any) => {
      setEvent(newValue.value);

      let mockData;
      if (newValue.value == "Select") {
        mockData = {
        
        };
      }

      if (newValue.value == "Daily") {
        mockData = {
         
        };
      } else if (newValue.value == "Yearly") {
        mockData = {
          
        };
      } else {
        mockData = {
          January: 0,
          February: 0,
          March: 0,
        };
      }

      if (newValue.value == "Daily") {
        setEventData({
          //@ts-ignore
          labels: WeekDates,
          datasets: [
            {
              label: "Daily",
              //@ts-ignore
              data: Object.values(mockData),
              borderColor: "#FAB329",
              backgroundColor: "#FAB329",
              borderRadius: 10,

            },
          ],
        });
      }
      if (newValue.value == "Select") {
        setEventData({
          labels: Years,
          datasets: [
            {
              label: "Yearly",
              //@ts-ignore
              data: Object.values(mockData),
              borderColor: "#FAB329",
              backgroundColor: "#FAB329",
              borderRadius: 10,

            },
          ],
        });
      } else if (newValue.value == "Yearly") {
        setEventData({
          labels: Years,
          datasets: [
            {
              label: "Yearly",
              //@ts-ignore
              data: Object.values(mockData),
              borderColor: "#FAB329",
              backgroundColor: "#FAB329",
              borderRadius: 10,

            },
          ],
        });
      } else {
        setEventData({
          labels: monthsName,
          datasets: [
            {
              label: "Monthly",
              //@ts-ignore
              data: Object.values(mockData),
              borderColor: "#FAB329",
              backgroundColor: "#FAB329",
              borderRadius: 10,

            },
          ],
        });
      }
    };

    return (
      <Grid item md={12} xs={12} mt={5}>
      <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack>
                <Typography
                  sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}
                >
                  <h2>Total Buyers Summry</h2>
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
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#FFF7DD",
                  primary: "#FFC000",
                  primary50: "#FFF7DD",
                },
              })}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused ? "#FFC000" : "#FFF7DD",
                  boxShadow: state.menuIsOpen ? "#FFF7DD" : "#FFF7DD",
                  cursor: "pointer",
                  "&:hover": {
                    // borderColor: "yellow",
                  cursor: "pointer",

                  },
                }), 
                menu: (provided) => ({
                  ...provided,
                  boxShadow: "0 0 0 1px #FFC000",
                  cursor: "pointer",

                }),
              }}
              
            />
              </Stack>
            </Stack>
            <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

        <Box
          sx={{
            height: {
              sm: 400,
              xs: 250,
              width: '100%',
            },
          }}
        >
          {_.size(eventData) > 0 && <Bar data={eventData}  
          
          options={options}
          style={{ width: '100%' }}
          />}
        </Box>
      </Box>
    </Grid>
  );
}


  export default Reports;
