import React, { useRef, useState } from "react";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
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
import { useNavigate } from "react-router-dom";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
const incomeData = [
  1000, 1500, 1200, 2000, 1800, 2500, 4000, 2800, 3200, 2800, 3500, 3000,
];
const maxIncome = Math.max(...incomeData);

const gData = incomeData.map((value) => Math.max(maxIncome - value, 0));

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
function Index() {
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
  const [gridRows, setGridRows] = useState<any[]>([
    {
      id: 1,
      eventName: "Friday Night",
      eventMail: "test@gmail.com",
      industry: "IT",
      Categories: "Tech",
      startDate: "12/12/2021",
      startTime: "12:00",
      location: "Lahore",
    },
  ]);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const columns: GridColDef[] = [
    {
      renderCell: (params) => (
        <Typography
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/analyticalevent")}
          color={"#0884E2"}
        >
          Friday Night
        </Typography>
      ),
      field: "eventName",
      headerName: "Event Name",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
    },
    {
      field: "eventMail",
      headerName: "Event Mail",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "industry",
      headerName: "Industry",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "Categories",
      headerName: "Categories",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
  ];
  const CustomPagination = () => {
    return (
      <Box display="flex" justifyContent="center" flexGrow={1}>
        <Pagination
          count={0}
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPagination-ul": { backgroundColor: "#FFF" },
            "& .MuiPaginationItem-page": {
              color: "#A0A3B5",
              border: "1px solid #A0A3B5",
              borderRadius: 2,
            },
            "& .Mui-selected": {
              backgroundColor: "#FFC000",
              color: "black",
              borderWidth: 0,
              ":hover": {
                backgroundColor: "#FFC000",
              },
            },
            "& .MuiPagination-ul li:last-child": {
              marginLeft: "16px",
            },
            "& .MuiPagination-ul li:last-child button::before": {
              content: "'Next'",
              marginRight: "8px",
              fontWeight: 700,
            },
            "& .MuiPagination-ul li:first-child": {
              marginRight: "16px",
            },
            "& .MuiPagination-ul li:first-child button::after": {
              content: "'Prev'",
              marginLeft: "8px",
              fontWeight: 700,
            },
            "& .MuiPagination-ul > li:first-of-type > button .MuiSvgIcon-root, .MuiPagination-ul > li:last-of-type > button .MuiSvgIcon-root":
              {
                display: "none",
              },
          }}
          //   onChange={handlePageChange}
          //   page={pageNumber}
        />
      </Box>
    );
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ marginLeft: "auto" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <Container maxWidth={false}>
      <Grid container xs={12} md={4} lg={7}>
        <h2>All Events</h2>
      </Grid>
      <Grid container direction={"row"} columnSpacing={2} rowSpacing={2}>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#DE9300"}
            figure={"1.6K"}
            title={"Total Income"}
            img={require("../../../assets/navIcons/Aincome.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#0884E2"
            figure={"1.6K"}
            title={"Total Expenditure"}
            img={require("../../../assets/navIcons/Aexpenditure.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#04CAA5"}
            figure={"4.1K"}
            title={"Total Followers"}
            img={require("../../../assets/navIcons/Afollowers.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#FD1F1F"
            figure={"5.2K"}
            title={"Total Events"}
            img={require("../../../assets/navIcons/Aevents.png")}
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
                Average Income Live Previews Vs Ticket Sales
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
            p={3}
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
                Company Performance
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
                      label: "10",
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
                      var text = "60%",
                        textX = Math.round(
                          (width - ctx.measureText(text).width) / 2
                        ),
                        textY = height / 2;
                      ctx.fillText(text, textX, textY);
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
                  fontSize: { md: 24, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Company Performance
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
        <Grid item md={6} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            py={6.5}
            px={2}
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
        <Grid item md={2} xs={6}>
          <Typography
            mt={{ xs: 4 }}
            fontSize={{ md: 30, xs: 20 }}
            fontWeight={700}
            color={"gray.graphTitle"}
          >
            All Events
          </Typography>
        </Grid>
        <Grid md={3} xs={12} mt={4}>
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              //width
              width: { md: "100%", xs: "90%" },
              marginLeft: { md: 0, xs: 3 },

              ".MuiOutlinedInput-root": {
                borderRadius: 3,
                border: "1px solid #C7CADA",
                position: "unset",
                fontSize: 14,
                fontFamily: "mulish",
              },
              inputContainer: {
                width: "100%",
              },
              img: {
                height: "1.7vh",
                width: "1.7vh",
                marginRight: 1,
              },
            }}
          />
        </Grid>
      </Grid>
      <DataGrid
        slots={{
       
            noRowsOverlay: CustomNoRowsOverlay,
          
          pagination: (data) => {
            return <CustomPagination {...data} />;
          },
          toolbar: CustomToolbar,
        }}
        sx={{
          display: { md: "flex", xs: "none" },
          mt: 4,

          height: "55%",
          border: "1px solid black",
          //change checkbox border color
          "& .MuiCheckbox-root": {
            color: "#A3A3A3",
          },
          // change row border color
          "& ::-webkit-scrollbar": {
            "border-top": "1px solid #e9e9ec",
            height: "7px",
          },
          "& ::-webkit-scrollbar-thumb": {
            "border-radius": "15px",
            "background-color": "#6d6d6dc9",
          },
          ".highlight": {
            color: "grey",
            // "&:hover": {
            //   color: "red",
            // },
          },
          "& .MuiDataGrid-row": {
            border: "1px solid #DCDEE8",
            ":first-child": {
              borderTop: "1.5px solid #DCDEE8",
            },
            ":last-child": {
              borderBottom: "1.5px solid #DCDEE8",
            },
            ":hover": {
              backgroundColor: "#FDF9EC",
            },
          },
          //header
        }}
        rows={gridRows}
        columns={columns}
        
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowClassName={(params) => {
          return params.row.action === "ONGOING" ? "highlight" : "";
        }}
      />
      <Grid
        display={{
          md: "none",
          xs: "flex",
        }}
        container
        direction={"column"}
        alignItems={"center"}
      >
        <div
          ref={ref}
          style={{
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {gridRows.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box alignItems={"center"} borderRadius={3} p={1}>
                <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                  <ResuableEventStack
                    title={"Event Name"}
                    body={item.evenName}
                  />
                  <ResuableEventStack
                    title={"Event Mail"}
                    body={item.eventMail}
                  />
                  <ResuableEventStack title={"Industry"} body={item.industry} />
                  <ResuableEventStack
                    title={"Categories"}
                    body={item.Categories}
                  />
                  <ResuableEventStack
                    title={"Start Date"}
                    body={item.startDate}
                  />
                  <ResuableEventStack
                    title={"Start Time"}
                    body={item.startTime}
                  />
                  <ResuableEventStack title={"Location"} body={item.location} />
                </Box>
              </Box>
            </Grid>
          ))}
        </div>
      </Grid>
    </Container>
  );
}

export default WithLayout(Index);
