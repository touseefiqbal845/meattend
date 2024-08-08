import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Select from "react-select";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { eventOptions } from "./data";
import MUserDashboardPagesApiService from "../../../services/UserDashboardPagesApiServices";

function GenderChart(eventAnalytics: any) {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventAnalyticByDaily, setEventAnalyticByDaily] = useState([]);
  const [eventAnalyticByMontlhy, setEventAnalyticByMontlhy] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [event, setEvent] = useState<string>("Daily");
  const [eventData, setEventData] = useState<any>({
    series: [
      { data: [0, 0, 0], stack: "A", label: "Female" },
      { data: [0, 0, 0], stack: "B", label: "Male" },
      { data: [0, 0, 0], label: "Other" },
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
        const eventAnalytics =
          response?.data?.analytics?.attendees_by_gender || [];
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
        const eventAnalytics =
          response?.data?.analytics?.attendees_by_gender || [];
        console.log("eventAnalyticsdaily", eventAnalytics);
        const datesArray = Object.keys(eventAnalytics).map((date) =>
          date.toString()
        );
        //@ts-ignore
        setEventDates(datesArray);

        setEventAnalyticByDaily(eventAnalytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEventChange = async (newValue: any, actionMeta: any) => {
    setEvent(newValue.value);

    if (newValue.value === "Daily") {
      const femaleData: number[] = [];
      const maleData: number[] = [];
      const otherData: number[] = [];

      Object.keys(eventAnalyticByDaily).forEach((date) => {
        //@ts-ignore
        const attendees = eventAnalyticByDaily[date];
        femaleData.push(attendees?.female || 0);
        maleData.push(attendees?.male || 0);
        otherData.push(attendees?.other || 0);
      });

      setEventData({
        // xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]},
        series: [
          { data: femaleData, stack: "A", label: "Female" },
          { data: maleData, stack: "B", label: "Male" },
          { data: otherData, label: "Other" },
        ],
      });
    } else if (newValue.value === "Yearly") {
      const femaleData: number[] = [];
      const maleData: number[] = [];
      const otherData: number[] = [];

      Object.keys(eventAnalytics?.eventAnalytics?.attendees_by_gender).forEach(
        (date) => {
          const attendees =
            eventAnalytics?.eventAnalytics?.attendees_by_gender[date];
          femaleData.push(attendees?.female || 0);
          maleData.push(attendees?.male || 0);
          otherData.push(attendees?.other || 0);
        }
      );
      setEventData({
        series: [
          { data: femaleData, stack: "A", label: "Female" },
          { data: maleData, stack: "B", label: "Male" },
          { data: otherData, label: "Other" },
        ],
      });
    }
  };

  return (
    <Grid item md={12} xs={12} mt={5}>
      <Box borderRadius={2} border={"1px solid #D8DAE7"} p={2}>
        {" "}
        <Stack
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Typography sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}>
              <h2>Gender</h2>
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
            <BarChart
              series={eventData.series}
              // xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              // margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              slotProps={{
                bar: {
                  clipPath: `inset(0px round 10px 10px 0px 0px)`,
                },
              }}
              // width={600}
              // height={350}
            />
          )}
        </Box>
      </Box>
    </Grid>
  );
}
export default GenderChart;
