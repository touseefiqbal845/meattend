import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, Pagination, Skeleton } from "@mui/material";
import { Tabs, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import Stack from "@mui/material/Stack";
import "./MUI-ComponentsAndCSS/style.css";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import MAuthApiService from "../../services/MAuthApiService";
import { Event, TabPanelProps } from "../../services/model";
import CustomFilterSelect from "../../components/Custom-Filter-Input-Field/CustomFilterInputField";

const useStyles = makeStyles({
  datePickerRoot: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      height: "0.4375em",
    },
  },
});

//  CustomTabPanel

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Events = ({
  handleOpenModel,
  keyForRerender,
}: {
  handleOpenModel: any;
  keyForRerender: any;
}) => {
  //  UseStates

  const [completedEvents, setCompletedEVents] = React.useState<Event[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [completedpageNumber, setCompletedPageNumber] = useState<number>(1);
  const [activePaginationLength, setActivePaginationLength] =
    useState<number>(0);
  const [completedPaginationLength, setCompletedPaginationLength] =
    useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  //  Different Handlers

  // Change handler for search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  //@ts-ignore
  const filterEvents = (eventName) => {
    const searchLowerCase = searchText.toLowerCase();
    return eventName.toLowerCase().includes(searchLowerCase);
  };

  const applyActiveBarSearchFilter = () => {
    if (searchText === "") {
      return events;
    } else {
      return events.filter((event) => filterEvents(event.event_name));
    }
  };
  const applyCompleteBarSearchFilter = () => {
    if (searchText === "") {
      return completedEvents;
    } else {
      return completedEvents.filter((event) => filterEvents(event.event_name));
    }
  };
  const filteredEvents = applyActiveBarSearchFilter();
  const filteredCompletedEvents = applyCompleteBarSearchFilter();

  // APIS Calling Need During Intital Mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetProfile = await MAuthApiService.getProfile();
        //@ts-ignore
        const Companyname = responseGetProfile.data?.company_name;
        setCompanyName(Companyname);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // Event-List API Call
  // useEffect(() => {
  const fetchData = async () => {
    let access_token = localStorage.getItem("access_token");
    try {
      let response = await axios.post(
        `https://staging-api.meattend.com/api/event-list`,
        { active: "1", page: pageNumber },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      let formattedEvents = response.data?.active?.data.map((event: any) => {
        const fromDate = new Date(event.from_time);
        const toDate = new Date(event.to_time);
        const heldDate = new Date(event.held_date_time);
        const fromTimeFormatted = fromDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const toTimeFormatted = toDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(heldDate);
        const heldDateTimeFormatted = `${monthName} ${heldDate.getDate()}, ${heldDate.getFullYear()} ${fromTimeFormatted}`;
        return {
          ...event,
          from_time_formatted: fromTimeFormatted,
          to_time_formatted: toTimeFormatted,
          held_date_time_formatted: heldDateTimeFormatted,
        };
      });
      setEvents(formattedEvents);
      // onAddEvent(response.data);

      setActivePaginationLength(response.data?.active?.last_page || 1);
      setIsLoading(false);
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchDataSecound = async () => {
    let access_token = localStorage.getItem("access_token");
    try {
      let response1 = await axios.post(
        `https://staging-api.meattend.com/api/event-list`,
        { active: "0", page: completedpageNumber },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let formattedEvents = response1.data?.completed?.data.map(
        (event: any) => {
          const fromDate = new Date(event.from_time);
          const toDate = new Date(event.to_time);
          const heldDate = new Date(event.held_date_time);
          const fromTimeFormatted = fromDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const toTimeFormatted = toDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const monthName = new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(heldDate);
          const heldDateTimeFormatted = `${monthName} ${heldDate.getDate()}, ${heldDate.getFullYear()} ${fromTimeFormatted}`;
          return {
            ...event,
            from_time_formatted: fromTimeFormatted,
            to_time_formatted: toTimeFormatted,
            held_date_time_formatted: heldDateTimeFormatted,
          };
        }
      );
      setCompletedEVents(formattedEvents);
      setCompletedPaginationLength(response1.data?.completed?.last_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetchData();
  // }, [completedpageNumber]);

  console.log();

  useEffect(() => {
    fetchData();
  }, [keyForRerender, pageNumber]);

  useEffect(() => {
    fetchDataSecound();
  }, [keyForRerender, completedpageNumber]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // console.log("🚀 ~ handlePageChange ~ value:", value);
    setPageNumber(value);
  };
  const handlePageChangeComplete = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // console.log("🚀 ~ handlePageChangeComplete ~ value:", value);
    setCompletedPageNumber(value);
  };
  const filterOptions = [
    { value: "1", label: "name" },
    { value: "2", label: "category" },
  ];

  const sortOptions = [
    { value: "1", label: "name" },
    { value: "2", label: "category" },
  ];

  // Event handlers for filter and sort changes
  const handleFilterChange = (event: any) => {
    setFilterValue(event.target.value);
  };

  const handleSortByChange = (event: any) => {
    setSortByValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container padding={3}>
        <Grid item xs={12} md={4} lg={7}>
          <h2>All Events</h2>
        </Grid>
        <Grid item xs={12} md={8} lg={5} sx={{ paddingLeft: { md: 0 } }}>
          <Grid container>
            <Grid item xs={7} md={8}>
              <CustomInput
                type="text"
                error={false}
                title="Search"
                inputFontSize={12}
                placeholder="Search"
                endImg={require("../../assets/icons/Search.png")}
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={false}
                style={{ padding: 1.4 }}
                value={searchText}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={5} md={4}>
              <CustomButton
                marginLeft="12px"
                marginTop="2px"
                notArrow
                mdFullWidth
                title="Create Event"
                // fullWidth
                XFontSize="16"
                MFontSize="16"
                xsHeight={42}
                xsWidth="100%"
                onClick={handleOpenModel}
              >
                <img alt="add" src={require("../../assets/icons/add.png")} />
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: "5px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "#D8DAE7" }}>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              sx={{ marginTop: "5px" }}
            >
              {/* Tabs */}
              <Grid item xs={12} md={8} lg={9} xl={10}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label={`Active Events(${events.length})`}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={`Completed Events(${completedEvents.length})`}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
              </Grid>

              {/* Filters */}
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                xl={2}
                sx={{ mt: { xs: 4, md: 0 } }}
              >
                <Stack
                  direction={{ xs: "row", md: "row" }}
                  spacing={{ xs: 2, md: 2 }}
                >
                  <CustomFilterSelect
                    label="Filter"
                    options={filterOptions}
                    value={filterValue}
                    onChange={handleFilterChange}
                  />
                  <CustomFilterSelect
                    label="Sort By"
                    options={sortOptions}
                    value={sortByValue}
                    onChange={handleSortByChange}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <Grid container padding={0}>
              {isLoading ? (
                [...Array(10)].map((_, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    key={index}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        borderRadius: 2,
                        borderColor: "#D8DAE7",
                      }}
                    >
                      <Card
                        variant="elevation"
                        sx={{
                          boxShadow: "none",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={220}
                        />
                      </Card>
                      <Grid container>
                        <Grid item xs={9}>
                          <Skeleton variant="text" width="80%" />
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: "right" }}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 4 }}>
                        <Grid container>
                          <Grid item xs={9}>
                            <Grid xs={12}>
                              <Skeleton variant="text" width="50%" />
                            </Grid>
                            <Grid container xs={12} sx={{ marginTop: 4 }}>
                              <Grid xs={11}>
                                <Skeleton variant="text" width="100%" />
                              </Grid>
                            </Grid>
                            <Grid container xs={12}>
                              <Grid xs={11}>
                                <Skeleton
                                  variant="text"
                                  width="100%"
                                  sx={{ marginTop: 1 }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={3}>
                            <Skeleton
                              variant="text"
                              width="60%"
                              height={120}
                              sx={{ marginLeft: 2 }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={6}>
                          <Skeleton
                            variant="rectangular"
                            width="90%"
                            height={40}
                            sx={{ marginLeft: 2 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Skeleton
                            variant="rectangular"
                            width="85%"
                            height={40}
                            sx={{ marginLeft: 2 }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : filteredEvents.length > 0 ? (
                // Render cards with real event data
                filteredEvents.map((event) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    key={event?.id}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        borderRadius: 2,
                        borderColor: "#D8DAE7",
                      }}
                    >
                      <Card
                        variant="elevation"
                        sx={{
                          boxShadow: "none",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <img
                          src={
                            typeof event?.event_images?.[0]?.image === "string"
                              ? `https://staging-resources.meattend.com/images/events/${event?.event_images?.[0]?.image}`
                              : require("../../assets/others/eventTestImage.png")
                          }
                          alt="events"
                          style={{
                            width: "100%",
                            maxHeight: 220,
                            minHeight: 220,
                          }}
                        />
                      </Card>
                      <Grid container>
                        <Grid item xs={6}>
                          <strong style={{ fontSize: 12 }}>
                            {event.event_name}
                          </strong>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "right" }}>
                          <img
                            alt="rec"
                            src={require("../../assets/icons/refresh-2.png")}
                            style={{ width: 10, height: 10 }}
                          />
                          <strong style={{ fontSize: 12 }}> Recurring</strong>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 1 }}>
                        <Grid item xs={10}>
                          <Grid container>
                            <Grid xs={12}>
                              <span style={{ color: "#3F435E", fontSize: 13 }}>
                                {companyName}
                              </span>
                              <br />
                            </Grid>
                            <Grid container xs={12} sx={{ marginTop: 1 }}>
                              <Grid
                                xs={1}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <img
                                  alt="loc"
                                  src={require("../../assets/icons/Location.png")}
                                  style={{ height: 15, width: 15 }}
                                />
                              </Grid>
                              <Grid xs={11}>
                                <span
                                  style={{ fontSize: 12, color: "#84858D" }}
                                >
                                  {event.event_address?.substring(0, 30)}...
                                </span>
                              </Grid>
                            </Grid>
                            <Grid container xs={12}>
                              <Grid
                                xs={1}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <img
                                  alt="clock"
                                  src={require("../../assets/icons/Clock.png")}
                                  style={{ height: 15, width: 15 }}
                                />
                              </Grid>
                              <Grid xs={11}>
                                <span
                                  style={{ fontSize: 12, color: "#84858D" }}
                                >
                                  {event.from_time_formatted} -{" "}
                                  {event.to_time_formatted}
                                </span>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={2}>
                          <Card
                            sx={{
                              borderRadius: 2,
                              borderColor: "#D8DAE7",
                              width: "100%",
                              height: "100%",
                              boxShadow: "none",
                              background: "#FFF7DD",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <strong
                                style={{ color: "#FFC000", fontSize: 12 }}
                              >
                                {event.held_date_time_formatted
                                  .split(" ")[0]
                                  .substring(0, 3)}
                              </strong>
                              <br />
                              <strong>
                                {event.held_date_time
                                  .split(" ")[0]
                                  .substring(8, 11)}
                              </strong>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 1 }}>
                        <Grid xs={6}>
                          <CustomButton
                            notArrow
                            title="View"
                            XFontSize="16"
                            MFontSize="16"
                            onClick={() =>
                              navigate(`/event_details/${event?.id}`)
                            }
                          />
                        </Grid>
                        <Grid xs={6}>
                          <CustomButton
                            color="#A0A3B5"
                            borderColor="#A0A3B5"
                            bgColor="#FFF7DD"
                            notArrow
                            title="Cancel"
                            XFontSize="16"
                            MFontSize="16"
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : (
                // Placeholder card when no events available
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  padding={0}
                  style={{ height: "100%" }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80vh",
                    }}
                  >
                    <img
                      src={require("../../assets/icons/EmptyEvents.png")}
                      alt="empty"
                    ></img>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#000000",
                        marginTop: "24px",
                        fontSize: "18px",
                      }}
                    >
                      You don't have any Events
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 400,
                        color: "#3F435E",
                        marginTop: "24px",
                        fontSize: "12px",
                      }}
                    >
                      Please create an new event
                    </Typography>
                    <Grid item md={7}>
                      <CustomButton
                        marginLeft="0px"
                        marginTop="24px"
                        notArrow
                        mdFullWidth
                        title="Create Event"
                        // fullWidth
                        XFontSize="10px"
                        MFontSize="12px"
                        xsHeight={42}
                        xsWidth="100%"
                        onClick={handleOpenModel}
                      ></CustomButton>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              flexGrow={1}
              marginTop={7}
            >
              <Pagination
                count={activePaginationLength}
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
                onChange={handlePageChange}
                page={pageNumber}
              />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container padding={0}>
              {isLoading ? (
                [...Array(10)].map((_, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    key={index}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        borderRadius: 2,
                        borderColor: "#D8DAE7",
                      }}
                    >
                      <Card
                        variant="elevation"
                        sx={{
                          boxShadow: "none",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={220}
                        />
                      </Card>
                      <Grid container>
                        <Grid item xs={9}>
                          <Skeleton variant="text" width="80%" />
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: "right" }}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 4 }}>
                        <Grid container>
                          <Grid item xs={9}>
                            <Grid xs={12}>
                              <Skeleton variant="text" width="50%" />
                            </Grid>
                            <Grid container xs={12} sx={{ marginTop: 4 }}>
                              <Grid xs={11}>
                                <Skeleton variant="text" width="100%" />
                              </Grid>
                            </Grid>
                            <Grid container xs={12}>
                              <Grid xs={11}>
                                <Skeleton
                                  variant="text"
                                  width="100%"
                                  sx={{ marginTop: 1 }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={3}>
                            <Skeleton
                              variant="text"
                              width="60%"
                              height={120}
                              sx={{ marginLeft: 2 }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12}>
                          <Skeleton
                            variant="rectangular"
                            width="90%"
                            height={40}
                            sx={{ marginLeft: 2 }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : filteredCompletedEvents.length > 0 ? (
                filteredCompletedEvents.map((event) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    key={event?.id}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        borderRadius: 2,
                        borderColor: "#D8DAE7",
                      }}
                    >
                      <Card
                        variant="elevation"
                        sx={{
                          boxShadow: "none",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <img
                          alt="event"
                          src={
                            typeof event?.event_images?.[0]?.image === "string"
                              ? `https://staging-resources.meattend.com/images/events/${event?.event_images?.[0]?.image}`
                              : require("../../assets/others/eventTestImage.png")
                          }
                          style={{
                            width: "100%",
                            maxHeight: 220,
                            minHeight: 220,
                          }}
                        />

                        {/* <img
                      src={require("../../assets/icons/CheckboxChecked.png")}
                      style={{ position: "absolute", top: 15, left: 15 }}
                    /> */}
                      </Card>
                      <Grid container>
                        <Grid item xs={6}>
                          <strong style={{ fontSize: 12 }}>
                            {event.event_name}
                          </strong>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "right" }}>
                          <img
                            alt="refresh"
                            src={require("../../assets/icons/refresh-2.png")}
                            style={{ width: 10, height: 10 }}
                          />
                          <strong style={{ fontSize: 12 }}> Recurring</strong>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 1 }}>
                        <Grid item xs={10}>
                          <Grid container>
                            <Grid xs={12}>
                              <span style={{ color: "#3F435E", fontSize: 13 }}>
                              {companyName}
                              </span>
                              <br />
                            </Grid>
                            <Grid container xs={12} sx={{ marginTop: 1 }}>
                              <Grid
                                xs={1}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <img
                                  alt="location"
                                  src={require("../../assets/icons/Location.png")}
                                  style={{ height: 15, width: 15 }}
                                />
                              </Grid>
                              <Grid xs={11}>
                                <span
                                  style={{ fontSize: 12, color: "#84858D" }}
                                >
                                  {event.event_address?.substring(0, 30)}...
                                </span>
                              </Grid>
                            </Grid>
                            <Grid container xs={12}>
                              <Grid
                                xs={1}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <img
                                  alt="time"
                                  src={require("../../assets/icons/Clock.png")}
                                  style={{ height: 15, width: 15 }}
                                />
                              </Grid>
                              <Grid xs={11}>
                                <span
                                  style={{ fontSize: 12, color: "#84858D" }}
                                >
                                  {event.from_time_formatted} -{" "}
                                  {event.to_time_formatted}
                                </span>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={2}>
                          <Card
                            sx={{
                              borderRadius: 2,
                              borderColor: "#D8DAE7",
                              width: "100%",
                              height: "100%",
                              boxShadow: "none",
                              background: "#FFF7DD",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <strong
                                style={{ color: "#FFC000", fontSize: 12 }}
                              >
                                {event.held_date_time_formatted
                                  .split(" ")[0]
                                  .substring(0, 3)}
                              </strong>
                              <br />
                              <strong>
                                {event.held_date_time
                                  .split(" ")[0]
                                  .substring(8, 11)}
                              </strong>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ marginTop: 1 }}>
                        <Grid xs={6} md={12}>
                          <CustomButton
                            className="my-button"
                            notArrow
                            // mdFullWidth
                            title="View"
                            // fullWidth
                            XFontSize="16"
                            MFontSize="16"
                            onClick={() =>
                              navigate(`/event_details/${event?.id}`)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  padding={0}
                  style={{ height: "100%" }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    paddingTop={2}
                    paddingRight={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80vh",
                    }}
                  >
                    <img
                      src={require("../../assets/icons/EmptyEvents.png")}
                      alt="empty"
                    ></img>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#000000",
                        marginTop: "24px",
                        fontSize: "18px",
                      }}
                    >
                      You don't have any Events
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 400,
                        color: "#3F435E",
                        marginTop: "24px",
                        fontSize: "12px",
                      }}
                    >
                      Please create an new event
                    </Typography>

                    <Grid item md={7}>
                      <CustomButton
                        marginLeft="0px"
                        marginTop="24px"
                        notArrow
                        mdFullWidth
                        title="Create Event"
                        // fullWidth  
                        XFontSize="10px"
                        MFontSize="12px"
                        xsHeight={42}
                        xsWidth="100%"
                        onClick={handleOpenModel}
                      ></CustomButton>
                    </Grid>

                  </Grid>
                </Grid>
              )}
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              flexGrow={1}
              marginTop={7}
            >
              <Pagination
                count={completedPaginationLength}
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
                onChange={handlePageChangeComplete}
                page={completedpageNumber}
              />
            </Box>
          </CustomTabPanel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Events;
