import React, { useState } from "react";
import { Grid, Typography, Box, Divider, Stack } from "@mui/material";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { listOptions } from "./chartData";

const TicketBuyersChart = () => {
  const [interval, setInterval] = useState("Yearly");

  const yearlyData = [
    { name: "", peopleInCity: 0, peoplePayingForTicket: 0 },
   
  ];
  
  const monthlyData = [
    { name: "", peopleInCity: 0, peoplePayingForTicket: 0 },
  
  ];
  const lineColors = ["#FFA500", "#1BE7C1"];

  const handleChangeInterval = (selectedOption: any) => {
    if (selectedOption) {
      setInterval(selectedOption.value);
    }
  };

  const chartData = interval === "Yearly" ? yearlyData : monthlyData;

  return (
    <Grid item md={12} xs={12}>
      <Box
        mt={3}
        borderRadius={2}
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
        p={2}
      >
        {" "}
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
            Ticket Buyers Summary
          </Typography>
          <Select
            value={{ value: interval, label: interval }}
            onChange={handleChangeInterval}
            options={listOptions}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#D8DAE7",
                primary: "#FFC000",
              },
            })}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? "#FFC000" : "gray",
                boxShadow: state.menuIsOpen ? "blue" : "white",
                "&:hover": {
                  // borderColor: "yellow",
                },
              }),
            }}
          />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="peopleInCity"
              name="People In City"
              stroke={lineColors[0]}
              dot={<CustomDot />}
            />
            <Line
              type="monotone"
              dataKey="peoplePayingForTicket"
              name="People Paying For A Ticket"
              stroke={lineColors[1]}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Grid>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, stroke, payload } = props;

  return <Dot cx={cx} cy={cy} r={4} stroke={stroke} fill={stroke} />;
};

export default TicketBuyersChart;
