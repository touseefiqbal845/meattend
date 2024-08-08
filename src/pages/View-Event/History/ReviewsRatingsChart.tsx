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
import { useEffect, useState } from "react";
import _ from "lodash";
import { monthsName, Years } from "../../../services/constant";
import { eventOptions } from "./data";
import MUserDashboardPagesApiService from "../../../services/UserDashboardPagesApiServices";
import { useParams } from "react-router-dom";
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

function ReviewRatings(eventAnalytics: any) {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<string>("Daily");
  const [eventDates, setEventDates] = useState([]);
  const [eventAnalyticByMontlhy, setEventAnalyticByMontlhy] = useState([]);
  const [eventAnalyticByDaily, setEventAnalyticByDaily] = useState([]);

  let ChartData = eventDates.reduce((acc: any, week: any) => {
    //@ts-ignore
    acc[week] = 0;
    return acc;
  }, {});
  for (const day in eventAnalyticByDaily) {
    if (eventAnalyticByDaily.hasOwnProperty(day)) {
      //@ts-ignore
      const RatingsCount = eventAnalyticByDaily[day].length;
      //@ts-ignore
      ChartData[day] = RatingsCount;
    }
  }
  const [eventData, setEventData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Daily",
        data: [],
        borderColor: "#FAB329",
        backgroundColor: "#FAB329",
        borderRadius: 10,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MUserDashboardPagesApiService.getEventHistory(
          eventId,
          "MONTHLY",
          "MONTHLY",
          "MONTHLY",
          "MONTHLY"
        );
        const eventAnalytics = response?.data?.analytics?.ratings || [];
        console.log("setEventAnalyticByMontlhy", eventAnalytics);
        setEventAnalyticByMontlhy(eventAnalytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MUserDashboardPagesApiService.getEventHistory(
          eventId,
          "DAY",
          "DAY",
          "DAY",
          "DAY"
        );
        const eventAnalytics = response?.data?.analytics?.ratings || [];
        console.log("eventAnalytics", eventAnalytics);
        const datesArray = Object.keys(eventAnalytics).map((date) =>
          date.toString()
        );
        console.log("datesArray", datesArray);

        //@ts-ignore
        setEventDates(datesArray);
        setEventAnalyticByDaily(eventAnalytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {

  //     if (eventDates.length > 0 && eventAnalyticByDaily) {
  //       let ChartData = await eventDates.reduce((acc: any, week: any) => {
  //         acc[week] = 0;
  //         return acc;
  //       }, {});

  //       for (const day in eventAnalyticByDaily) {
  //         if (eventAnalyticByDaily.hasOwnProperty(day)) {
  //           const RatingsCount = eventAnalyticByDaily[day].length;
  //           ChartData[day] = RatingsCount;
  //         }
  //       }

  //       setEventData({
  //         labels: eventDates,
  //         datasets: [
  //           {
  //             label: "Daily",
  //             data: Object.values(ChartData),
  //             borderColor: "#FAB329",
  //             backgroundColor: "#FAB329",
  //             borderRadius: 10,
  //           },
  //         ],
  //       });
  //     }
  // };
  // fetchData();

  // }, [eventDates, eventAnalyticByDaily]);

  const handleEventChange = async (newValue: any, actionMeta: any) => {
    setEvent(newValue.value);  

    if (newValue.value === "Daily") {
      let ChartData = eventDates.reduce((acc: any, week: any) => {
        //@ts-ignore
        acc[week] = 0;
        return acc;
      }, {});
      for (const day in eventAnalyticByDaily) {
        if (eventAnalyticByDaily.hasOwnProperty(day)) {
          //@ts-ignore
          const RatingsCount = eventAnalyticByDaily[day].length;
          //@ts-ignore
          ChartData[day] = RatingsCount;
        }
      }
      setEventData({
        labels: eventDates,
        datasets: [
          {
            label: "Daily",
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } 
    else if (newValue.value === "Weekly") {
      
      setEventData({
        labels: [],
        datasets: [
          {
            label: "Weekly",
            //@ts-ignore
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } 
    else if (newValue.value === "Monthly") {
      let ChartData = monthsName.reduce((acc, month) => {
        //@ts-ignore
        acc[month] = 0;
        return acc;
      }, {});
      for (const month in eventAnalyticByMontlhy) {
        if (eventAnalyticByMontlhy.hasOwnProperty(month)) {
          //@ts-ignore
          const RatingsCount = eventAnalyticByMontlhy[month].length;
          //@ts-ignore
          ChartData[month] = RatingsCount;
        }
      }
      setEventData({
        labels: monthsName,
        datasets: [
          {
            label: "Monthly",
            //@ts-ignore
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } else if (newValue.value === "Yearly") {
      let ChartData = Years.reduce((acc, year) => {
        //@ts-ignore
        acc[year] = 0;
        return acc;
      }, {});
      const RatingsByYear = eventAnalytics?.eventAnalytics?.ratings;
      for (const year in RatingsByYear) {
        if (RatingsByYear.hasOwnProperty(year)) {
          const RatingsCount = RatingsByYear[year].length;
          //@ts-ignore
          ChartData[year] = RatingsCount;
        }
      }
      setEventData({
        labels: Years,
        datasets: [
          {
            label: "Yearly",
            //@ts-ignore
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    }
  };

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
          labelString: "Population",
        },
        //   suggestedMin: -2000, // Minimum value for y-axis
        //   suggestedMax: 2000, // Maximum value for y-axis
      },
    },
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
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Review Ratings</h2>
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
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  boxShadow: "0 0 0 1px #FFC000",
                }),
              }}
            />
          </Stack>
        </Stack>
        <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

        <Box
          sx={{
            height: {
              sm: 450,
              xs: 250,
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

export default ReviewRatings;
