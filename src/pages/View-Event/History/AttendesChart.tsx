import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
//@ts-ignore
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";
import _ from "lodash";
import { monthsName, WeekDays, Years } from "../../../services/constant";
import { eventOptions } from "./data";
import MUserDashboardPagesApiService from "../../../services/UserDashboardPagesApiServices";
import { useParams } from "react-router-dom";
//@ts-ignore
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

function Attendes(eventAnalytics: any) {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventAnalyticByMontlhy, setEventAnalyticByMontlhy] = useState([]);
  const [eventAnalyticByDaily, setEventAnalyticByDaily] = useState([]);
  const [eventAnalyticByWeekly, setEventAnalyticByWeekly] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [weeksDates, setWeeksDates] = useState([]);

  const [event, setEvent] = useState<string>("Daily");

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
        const eventAnalytics = response?.data?.analytics?.attendees || [];
        console.log("setEventAnalyticByMontlhy", eventAnalytics);
        setEventAnalyticByMontlhy(eventAnalytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [eventId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MUserDashboardPagesApiService.getEventHistory(
          eventId,
          "WEEKLY",
          "WEEKLY",
          "WEEKLY",
          "WEEKLY"
        );
        const eventAnalytics = response?.data?.analytics?.attendees || [];
        console.log("eventAnalytics", eventAnalytics);
        const datesArray = Object.keys(eventAnalytics).map((date) =>
          date.toString()
        );
        //@ts-ignore
        setEventDates(datesArray);

        setEventAnalyticByWeekly(eventAnalytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [eventId]);

  //@ts-ignore
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
          "DAY",
          "DAY",
          "DAY",
          "DAY"
        );
        const eventAnalytics = response?.data?.analytics?.attendees || {};
        const datesArray = Object.keys(eventAnalytics).map((date) =>
          date.toString()
        );
        //@ts-ignore
        setEventDates(datesArray);
        setEventAnalyticByDaily(eventAnalytics);

        let ChartData = datesArray.reduce((acc, day) => {
          //@ts-ignore
          acc[day] = 0;
          return acc;
        }, {});

        for (const day in eventAnalytics) {
          if (eventAnalytics.hasOwnProperty(day)) {
            const attendeesCount = eventAnalytics[day].length;
            //@ts-ignore
            ChartData[day] = attendeesCount;
          }
        }
        setEventData({
          labels: datesArray,
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [eventId]);


  useEffect(() => {
    let ChartData = {};
    if (event === "Daily") {
      ChartData = eventDates.reduce((acc, day) => {
        //@ts-ignore
        acc[day] = 0;
        return acc;
      }, {});

      const attendeesByDaily = eventAnalyticByDaily;

      for (const day in attendeesByDaily) {
        if (attendeesByDaily.hasOwnProperty(day)) {
          //@ts-ignore
          const attendeesCount = attendeesByDaily[day].length;
          //@ts-ignore
          ChartData[day] = attendeesCount;
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
    } else if (event === "Weekly") {
      let ChartData = weeksDates.reduce((acc, month) => {
        //@ts-ignore
        acc[month] = 0;
        return acc;
      }, {});

      for (const month in eventAnalyticByWeekly) {
        if (eventAnalyticByWeekly.hasOwnProperty(month)) {
          //@ts-ignore
          const attendeesCount = eventAnalyticByWeekly[month].length;
          //@ts-ignore
          ChartData[month] = attendeesCount;
        }
      }

      setEventData({
        labels: weeksDates,
        datasets: [
          {
            label: "Weekly",
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } else if (event === "Monthly") {
      let ChartData = monthsName.reduce((acc, month) => {
        //@ts-ignore
        acc[month] = 0;
        return acc;
      }, {});

      for (const month in eventAnalyticByMontlhy) {
        if (eventAnalyticByMontlhy.hasOwnProperty(month)) {
          //@ts-ignore
          const attendeesCount = eventAnalyticByMontlhy[month].length;
          //@ts-ignore
          ChartData[month] = attendeesCount;
        }
      }

      setEventData({
        labels: monthsName,
        datasets: [
          {
            label: "Monthly",
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } else if (event === "Yearly") {
      let ChartData = Years.reduce((acc, year) => {
        //@ts-ignore
        acc[year] = 0;
        return acc;
      }, {});
      const attendeesByYear = eventAnalytics?.eventAnalytics?.attendees;
      for (const year in attendeesByYear) {
        if (attendeesByYear.hasOwnProperty(year)) {
          const attendeesCount = attendeesByYear[year].length;
          //@ts-ignore
          ChartData[year] = attendeesCount;
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
  }, [event,eventAnalyticByMontlhy, eventAnalyticByDaily,eventAnalyticByWeekly, eventAnalytics]);


  const handleEventChange = async (newValue: any, actionMeta: any) => {
    setEvent(newValue.value);

    if (newValue.value === "Daily") {
      let ChartData = eventDates.reduce((acc, week) => {
        //@ts-ignore
        acc[week] = 0;
        return acc;
      }, {});
      for (const day in eventAnalyticByDaily) {
        if (eventAnalyticByDaily.hasOwnProperty(day)) {
          //@ts-ignore
          const attendeesCount = eventAnalyticByDaily[day].length;
          //@ts-ignore
          ChartData[day] = attendeesCount;
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
    } else if (newValue.value === "Weekly") {
      let ChartData = weeksDates.reduce((acc, month) => {
        //@ts-ignore
        acc[month] = 0;
        return acc;
      }, {});

      for (const week in eventAnalyticByWeekly) {
        if (eventAnalyticByWeekly.hasOwnProperty(week)) {
          //@ts-ignore
          const attendeesCount = eventAnalyticByWeekly[week].length;
          //@ts-ignore
          ChartData[week] = attendeesCount;
        }
      }

      setEventData({
        labels: weeksDates,
        datasets: [
          {
            label: "Weekly",
            data: Object.values(ChartData),
            borderColor: "#FAB329",
            backgroundColor: "#FAB329",
            borderRadius: 10,
          },
        ],
      });
    } else if (newValue.value === "Monthly") {
      let ChartData = monthsName.reduce((acc, month) => {
        //@ts-ignore
        acc[month] = 0;
        return acc;
      }, {});
      for (const month in eventAnalyticByMontlhy) {
        if (eventAnalyticByMontlhy.hasOwnProperty(month)) {
          //@ts-ignore
          const attendeesCount = eventAnalyticByMontlhy[month].length;
          //@ts-ignore
          ChartData[month] = attendeesCount;
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
      const attendeesByYear = eventAnalytics?.eventAnalytics?.attendees;
      for (const year in attendeesByYear) {
        if (attendeesByYear.hasOwnProperty(year)) {
          const attendeesCount = attendeesByYear[year].length;
          //@ts-ignore
          ChartData[year] = attendeesCount;
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
      },
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
              <h2>Attendes</h2>
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
          {_.size(eventData) > 0 && (
            <Bar data={eventData} options={options} style={{ width: "100%" }} />
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default Attendes;
