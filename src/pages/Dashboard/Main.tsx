import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { UsePaginationItem } from "@mui/material/usePagination/usePagination";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  DataGridProps,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import React,{ useEffect, useRef, useState } from "react";
import { EventRowI, EventsResponse } from "../../services/model";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { IMAGE_URL } from "../../constant/env";
import moment from "moment";
import dayjs from "dayjs";
import MRegisterApiService from "../../services/MRegisterApiService";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import ResuableEventStack from "../../components/EventStack";
import CustomBox from "../../components/CustomBox/MainCustomBox";
import { getCompanyInfo, saveCompanyInfo } from "../../services/cacheFunc";
import { CustomNoRowsOverlay } from "./../../components/DataGridNoRows/DataGridNoRows";
import { CustomCategories } from "../../components/CustomCategoriesRowWise/CustomCategories";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const VISIBLE_FIELDS = [
  "Event Name",
  "rating",
  "country",
  "dateCreated",
  "isAdmin",
];

export const Main = () => {
  const [allEvents, setAllEvents] = useState<EventsResponse>(
    {} as EventsResponse
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = React.useState(false);

  const [gridRows, setGridRows] = useState<EventRowI[]>([]);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    (() => {
      MRegisterApiService.getCompanyProfile().then((res) => {
        saveCompanyInfo(res.data);
      });
    })();
  }, []);
  console.log("getCompanyProfile", getCompanyInfo());
  useEffect(() => {
    // check if not mobile device
    // if (window.innerWidth <= 600 && pageNumber > 1) {
    //   return;
    // }

    (async () => {
      const completedEventObj = {
        active: "0",
        page: pageNumber,
      };
      const activeEventObj = {
        ...completedEventObj,
        active: "1",
      };
      setLoading(true)
      try {
        const [activeEvents, completedEvents] = await axios.all<AxiosResponse>([
          MRegisterApiService.getEvents(JSON.stringify(activeEventObj)),
          MRegisterApiService.getEvents(JSON.stringify(completedEventObj)),
        ]);

        const allEvents = [
          ...(activeEvents.data!.active?.data ?? []),
          ...(completedEvents.data!.completed?.data ?? []),
        ];

        const rowsData = allEvents.map((item) => ({
          id: item.id,
          image:
            _.size(item.event_images) > 0
              ? `${IMAGE_URL}${item.event_images[0].image}`
              : "",
          eventName: item.event_name,
          eventAddress: item.event_address,
          dateAndTime:
            moment(item.from_time).format("DD MMM") +
            " - " +
            moment(item.to_time).format("DD MMM"),
          held_date_time: item?.held_date_time,
          categories: item.category_id!,
          event_category_new: item?.event_category_new || [],
          attending: item?.attendees_count,
          action: "ONGOING",
        }));
        setPaginationLength(
          completedEvents.data?.completed?.to ?? paginationLength
        );
        console.log("paginationLength", paginationLength);
        //@ts-ignore
        setGridRows(rowsData!);
        setAllEvents({ ...activeEvents.data, ...completedEvents.data });
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
      finally{
        setLoading(false)
      }
    })();
  }, [pageNumber]);

  // useEffect(() => {
  //   const handleScroll = async () => {
  //     if (ref.current) {
  //       // check if the user has scrolled to the bottom of the page
  //       if (
  //         window.innerHeight + window.scrollY >=
  //         ref.current.getBoundingClientRect().bottom
  //       ) {
  //         const completedEventObj = {
  //           active: "0",
  //           page: pageNumber,
  //         };
  //         const activeEventObj = {
  //           ...completedEventObj,
  //           active: "1",
  //         };
  //         try {
  //           const [activeEvents, completedEvents] =
  //             await axios.all<AxiosResponse>([
  //               MRegisterApiService.getEvents(JSON.stringify(activeEventObj)),
  //               MRegisterApiService.getEvents(
  //                 JSON.stringify(completedEventObj)
  //               ),
  //             ]);

  //           const allEvents = [
  //             ...(activeEvents.data!.active?.data ?? []),
  //             ...(completedEvents.data!.completed?.data ?? []),
  //           ];

  //           const rowsData = allEvents.map((item) => ({
  //             id: item.id,
  //             image:
  //               _.size(item.event_images) > 0
  //                 ? `${IMAGE_URL}${item.event_images[0].image}`
  //                 : "",
  //             eventName: item.event_name,
  //             eventAddress: item.event_address,
  //             dateAndTime:
  //               moment(item.from_time).format("DD MMM") +
  //               " - " +
  //               moment(item.to_time).format("DD MMM"),
  //             categories: item.category_id!,
  //             attending: 35,
  //             action: "ONGOING",
  //           }));
  //           // keep previous events + new events
  //           setGridRows((prev) => [...prev, ...rowsData]);
  //         } catch (error) {
  //           console.log("🚀 ~ error:", error);
  //         }

  //         setPageNumber((prev) => prev + 1);
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const today = dayjs();
  const formatDate = (date: any) => dayjs(date).format("ddd, DD");

  const calculateStatus = (heldDateTime: any) => {
    console.log(heldDateTime);

    const eventDate = dayjs(heldDateTime);
    if (eventDate.isBefore(today, "day")) {
      return { text: "COMPLETE", color: "#DE9300" };
    } else if (eventDate.isSame(today, "day")) {
      return { text: "ONGOING", color: "#04CAA5" };
    } else {
      return { text: formatDate(heldDateTime), color: "#FD1F1F" };
    }
  };

  // function CustomCategories({ title }: { title: string }) {
  //   return (
  //     <Box
  //       display={"flex"}
  //       justifyContent={"center"}
  //       alignItems={"center"}
  //       bgcolor={"#FFC000"}
  //       borderRadius={1}
  //       height={21}
  //       minWidth={35}
  //       paddingX={0.2}
  //     >
  //       <Typography color={"black"} fontSize={8} fontWeight={700}>
  //         {title}
  //       </Typography>
  //     </Box>
  //   );
  // }

  const columns: GridColDef[] = [
    {
      renderCell: (params) => {
        return (
          <Stack
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={1}
          >
            <Box
              component="img"
              sx={{ height: 30, width: 40, borderRadius: 1 }}
              src={params.row.image}
            />
            <Typography fontSize={14} color={"#84858D"}>
              {params.row.eventName}
            </Typography>
          </Stack>
        );
      },
      field: "eventName",
      headerName: "Event Name",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 230,
    },
    {
      field: "eventAddress",
      headerName: "Event Address",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 300,
      editable: true,
    },
    {
      field: "dateAndTime",
      headerName: "Date And Time",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      headerClassName: 'super-app-theme--header',
      type: 'string',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.event_category_new.map((categoryObj: any, index: any) => {
            const parsedCategories = JSON.parse(categoryObj.category);
            return parsedCategories.map((category: any, idx: any) => (
              <Grid item key={`${index}-${idx}`}>
                <CustomCategories title={category} bgColor="#FFC000" />
              </Grid>
            ));
          })}
        </Stack>
      ),
    },
    {
      field: "attending", 
      headerName: "Attending",
      headerClassName: "super-app-theme--header",
      type: "number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.attending}`,
    },
    {
      field: "action",
      headerName: "Action",
      type: "string",
      width: 150,
      editable: true,
      renderCell: (params) => {
        const status = calculateStatus(params.row.held_date_time);
        return (
          <Typography fontSize={14} fontWeight={700} color={status.color}>
            {status.text}
          </Typography>
        );
      },
    },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("🚀 ~ handlePageChange ~ value:", value);
    setPageNumber(value);
  };

  // const CustomPagination = () => {
  //   return (
  //     <Box display="flex" justifyContent="center" flexGrow={1}>
  //       <Pagination
  //         count={paginationLength}
  //         shape="rounded"
  //         color="primary"
  //         sx={{
  //           "& .MuiPagination-ul": { backgroundColor: "#FFF" },
  //           "& .MuiPaginationItem-page": {
  //             color: "#A0A3B5",
  //             border: "1px solid #A0A3B5",
  //             borderRadius: 2,
  //           },
  //           "& .Mui-selected": {
  //             backgroundColor: "#FFC000",
  //             color: "black",
  //             borderWidth: 0,
  //             ":hover": {
  //               backgroundColor: "#FFC000",
  //             },
  //           },
  //           "& .MuiPagination-ul li:last-child": {
  //             marginLeft: "16px",
  //           },
  //           "& .MuiPagination-ul li:last-child button::before": {
  //             content: "'Next'",
  //             marginRight: "8px",
  //             fontWeight: 700,
  //           },
  //           "& .MuiPagination-ul li:first-child": {
  //             marginRight: "16px",
  //           },
  //           "& .MuiPagination-ul li:first-child button::after": {
  //             content: "'Prev'",
  //             marginLeft: "8px",
  //             fontWeight: 700,
  //           },
  //           "& .MuiPagination-ul > li:first-of-type > button .MuiSvgIcon-root, .MuiPagination-ul > li:last-of-type > button .MuiSvgIcon-root":
  //             {
  //               display: "none",
  //             },
  //         }}
  //         onChange={handlePageChange}
  //         page={pageNumber}
  //       />
  //     </Box>
  //   );
  // };
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
      <Grid container direction={"row"} columnSpacing={2} rowSpacing={2}>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#DE9300"}
            figure={getCompanyInfo()?.allEvents}
            title={"Total Events"}
            img={require("../../assets/navIcons/events.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#04CAA5"}
            figure={getCompanyInfo()?.allLocations}
            title={"Total Location"}
            img={require("../../assets/navIcons/locations.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#0884E2"
            figure={getCompanyInfo()?.totalIncome}
            title={"Total Income"}
            img={require("../../assets/navIcons/income.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#FD1F1F"
            figure={getCompanyInfo()?.totalFollowers}
            title={"Total Followers"}
            img={require("../../assets/navIcons/followers.png")}
          />
        </Grid>
      </Grid>
      <Box
        my={3}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        
        <Typography
          fontSize={{ md: 30, xs: 20 }}
          fontWeight={700}
          color={"#000315"}
          mt={2}
        >
          Total Events
        </Typography>
        {/* <Stack direction={"row"} spacing={2} mt={2}>
          <Button
            sx={{
              height: 20,
              width: 10,
              fontSize: 10,
            }}
            variant={"contained"}
            color={"primary"}
            onClick={() => {
              
              
            }}
          >
            Filter
          </Button>
          <Button
            sx={{
              height: 20,
              width: 10,
              fontSize: 10,
            }}
            variant={"outlined"}
            color={"primary"}
          >
            Sort
          </Button>
          <Button
            sx={{
              height: 20,
              width: 10,
              fontSize: 10,
            }}
            variant={"outlined"}
            color={"primary"}
          >
            Export
          </Button>
        </Stack> */}
      </Box>
      <DataGrid
      
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,

          pagination: (data) => {
            return (
              <CustomPagination
                paginationLength={paginationLength}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            );
          },
          toolbar: CustomToolbar,
        }}
        sx={{
          height: "55%",
          border: "1px solid black",
          display: { md: "flex", xs: "none" },
          // change row border color

          "& .MuiDataGrid-sortIcon": {
            opacity: "0.5 !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 900,
            color: "balck",
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
        loading={loading}
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
      {/* for mobile view we need card in card we will have event name,event addess, action,caregories  */}
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
                    body={item.eventName}
                    title="Event Name"
                    img={item.image}
                  />
                  <ResuableEventStack
                    body={
                      item.eventAddress.length > 25
                        ? item.eventAddress.slice(0, 25) + "..."
                        : item.eventAddress
                    }
                    title="Event Address"
                  />
                  <ResuableEventStack
                    body={item.dateAndTime}
                    title="Date & Time"
                  />
                  <ResuableEventStack
                    title="Categories"
                    body={
                      <Stack direction={"row"} spacing={1}>
                        <CustomCategories title={"Music"} />
                        <CustomCategories title={"Cubbing"} />
                        <CustomCategories title={"Rnb"} />
                      </Stack>
                    }
                  />
                  <ResuableEventStack body={item.attending} title="Attending" />
                  <ResuableEventStack
                    body={
                      <Typography fontSize={14} fontWeight={700}>
                        {
                          <Typography
                            fontSize={14}
                            fontWeight={700}
                            color={
                              item.action === "ONGOING"
                                ? "#04CAA5"
                                : item.action === "COMPLETE"
                                ? "#DE9300"
                                : "#FD1F1F"
                            }
                          >
                            {item.action}
                          </Typography>
                        }
                      </Typography>
                    }
                    title="Action"
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </div>
      </Grid>
    </Container>
  );
};

export default WithLayout(Main);
