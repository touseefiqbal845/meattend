import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Grid,
  Divider,
  Stack,
  Container,
  useMediaQuery,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { CiMenuKebab } from "react-icons/ci";
import { BallTriangle, MagnifyingGlass } from "react-loader-spinner";

import { WithLayout } from "../../components/Wrapper/WithLayout";
import CustomButton from "../../components/button/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CustomFilterSelect from "../../components/Custom-Filter-Input-Field/CustomFilterwithHeading";
import ProfileModal from "./ProfileModal";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import { CustomNoRowsOverlay } from "../../components/DataGridNoRows/DataGridNoRows";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CustomSingleSelect from "../../components/Input/SingleSelecter";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const mobileView = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState<boolean>(false);
  const [suggestedPromoters, setSuggestedPromoters] = useState<any>([]);
  const [linkedPromoters, setLinkedPromoters] = useState<any>([]);
  const [activePromotions, setActivePromotions] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [currentPageLinked, setCurrentPageLinked] = useState<number>(1);
  const [lastPageLinked, setLastPageLinked] = useState<number>(1);
  const [currentPageActive, setCurrentPageActive] = useState<number>(1);
  const [lastPageActive, setLastPageActive] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [promoters, setPromoters] = useState<any>([]);
  const [companyId, setCompanyId] = useState("");
  const [promoterId, setPromoterId] = useState("");
  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [eventId, setEventId] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [searchPromoter, setSearchPromoter] = useState<string>("");
  const [selectedPromoter, setSelectedPromoter] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const [countryselelcted, setCountrySelected] = useState<any>(null);
  const [cityselected, setCitySelected] = useState<any>(null);
  const [ageselected, setAgeSelected] = useState<any>(null);
  const [ratingselected, setRatingSelected] = useState<string>("");
  const [genderselected, setGenderSelected] = useState<any>(null);

  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          company_id: companyId,
          promoter_id: promoterId,
          status: status,
          budget: budget,
          message: message,
          event_id: eventId,
        };
        const response = await MUserDashboardPagesApiService.requestPromoter(
          data
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getActivePromotions = async () => {
    try {
      setLoading(true);

      const response =
        await MUserDashboardPagesApiService.getActivePromotions();
      if (response.status == 200) {
        // setCurrentPageActive(response?.data?.promotions?.current_page);
        // setLastPage(response?.data?.promotions?.last_page);
        setActivePromotions(response?.data?.promotions?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCountriesList = async () => {
    try {
      setLoading(true);
      const response = await MUserDashboardPagesApiService.getCountriesList();
      if (response.status == 200) {
        setCountries(response?.data?.value);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getCityList = async () => {
    try {
      setLoading(true);
      const response = await MUserDashboardPagesApiService.getCityList(
        countryselelcted
      );
      if (response.status == 200) {
        setCities(response?.data?.value);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestedPromoters = async () => {
    try {
      setLoading(true);
      const response =
        await MUserDashboardPagesApiService.getSuggestedPromoters();
      if (response.status == 200) {
        setCurrentPage(response?.data?.current_page);
        setLastPage(response?.data?.last_page);
        setSuggestedPromoters(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getAllEvents = async () => {
    try {
      setLoading(true);
      const response = await MUserDashboardPagesApiService.getEventsByCompany();
      if (response.status == 200) {
        setEvents(response?.data?.events);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLinkedPromoters = async () => {
    try {
      let access_token = localStorage.getItem("access_token");
      setLoading(true);
      const response = await MUserDashboardPagesApiService.getLinkedPromoters(
        {}
      );
      if (response.status === 200) {
        setLinkedPromoters(response?.data?.linked_promoters?.data || []);
        setCurrentPageLinked(response?.data?.linked_promoters?.current_page);
        setLastPageLinked(response?.data?.linked_promoters?.last_page);
        const linkedPromotersData = response.data?.linked_promoters?.data[0];
        if (linkedPromotersData) {
          setCompanyId(linkedPromotersData.company_id);
          setPromoterId(linkedPromotersData.promoter_id);
          setStatus(linkedPromotersData.status);
          setBudget(linkedPromotersData.budget);
          setMessage(linkedPromotersData.message);
          setEventId(linkedPromotersData.event_id);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPromotersList = async () => {
    try {
      setSearchInitiated(true);
      setIsLoading(true);
      const response = await MUserDashboardPagesApiService.getPromotersList(
        genderselected,
        ageselected,
        searchPromoter,
        cityselected
      );
      if (response.status == 200) {
        setPromoters(response?.data?.search_result?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSuggestedPromoters();
    getLinkedPromoters();
    getActivePromotions();
    getCountriesList();
    getAllEvents();
  }, []);

  useEffect(() => {
    getCityList();
  }, [countryselelcted]);

  // useEffect(() => {
  //   if (open) {
  //     getAllEvents();
  //   }
  // }, [open]);

  const promoterLinkedcolumns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Box flexDirection="row" display="flex">
              <Avatar
                src={params.row.profile_image}
                sx={{ width: 45, height: 45, marginRight: 1 }}
              />
              <Box flexDirection="column">
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                  }}
                >
                  {`${params.row.users.first_name} ${params.row.users.last_name}`}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  10000K Followers
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      field: "email_id",
      headerName: "Email Address",
      width: 150,
      valueGetter: (params) => `${params.row.users.email_id}`,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      valueGetter: (params) => `${params.row.users.country}`,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      valueGetter: (params) => `${params.row.users.city}`,
    },
    {
      field: "district",
      headerName: "State",
      width: 150,
      valueGetter: (params) => `${params.row.users.district}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 320,

      renderCell: (params) => (
        <div>
          <Stack direction="row" spacing={2}>
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              // mdFullWidth
              title={"Remove Promoter"}
              // fullWidth
              XFontSize="14px"
              MFontSize="14px"
              width={mobileView ? "100%" : "146px"}
              //@ts-ignore
              // onClick={handleSubmit}
            />
            <CustomButton
              marginLeft="1px"
              marginTop="0px"
              notArrow
              bgColor="#FFF7DD"
              // mdFullWidth
              title={"Profile"}
              // fullWidth
              XFontSize="14px"
              MFontSize="14px"
              width={mobileView ? "100%" : "84px"}
              //@ts-ignore
              // onClick={handleSubmit}
            />
          </Stack>
        </div>
      ),
    },
  ];
  const sugestedColumn: GridColDef[] = [
    {
      field: "first_name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={params.row.profile_image}
            sx={{ width: 30, height: 30, marginRight: 1 }}
          />
          <Typography variant="body2">
            {`${params.row.first_name} ${params.row.last_name}`}
          </Typography>
        </div>
      ),
    },

    { field: "email", headerName: "Email Address", width: 200 },
    {
      field: "country",
      headerName: "Country",
      width: 200,
    },
    {
      field: "state",
      headerName: "State",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,

      renderCell: (params) => (
        <div>
          <CiMenuKebab />
        </div>
      ),
    },
  ];

  const promoterPostReviews: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Box flexDirection="row" display="flex">
              <Avatar
                src={params.row.profile_image}
                sx={{ width: 45, height: 45, marginRight: 1 }}
              />
              <Box flexDirection="column">
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                  }}
                >
                  {`${params.row.users.first_name} ${params.row.users.last_name}`}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  10000K Followers
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
    },

    {
      field: "event",
      headerName: "Event Name",
      width: 200,
      valueGetter: (params) => `${params.row.event.event_name}`,
    },
    {
      field: "post_detail",
      headerName: "Post",
      flex: 150,
      valueGetter: (params) => `${params.row.posts[0].post_description}`,
      renderCell: (params) => (
        <div
          style={{
            textDecoration:
              hoveredRowIndex === params.row.id ? "underline" : "none",
            color: hoveredRowIndex === params.row.id ? "#DE9300" : "#000000",
            cursor: "pointer",
          }}
          onClick={() => {
            // console.log("Clicked on post:", params.value);
          }}
          onMouseEnter={() => setHoveredRowIndex(params.row.id)}
          onMouseLeave={() => setHoveredRowIndex(null)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "event_address",
      headerName: "Event Address",
      flex: 150,
      valueGetter: (params) => `${params.row.event.event_address}`,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 250,
      renderHeader: (params) => (
        <div style={{ justifyContent: "center", alignSelf: "center" }}>
          Action
        </div>
      ),
      renderCell: (params) => {
        const status = params.row.status;

        let color;
        let text;
        if (status === 0) {
          color = "#FFF7DD";
          text = "Requested";
        }
        if (status === 1) {
          color = "#FFF7DD";
          text = "Requested";
        } else if (status === 2) {
          color = "#DCFBF5";
          text = "Accepted";
        } else if (status === 3) {
          color = "#A0A3B5";
          text = "Rejected";
        } else if (status === 5) {
          color = "#FFC000";
          text = "Promoted";
        } else if (status === 7) {
          color = "#FFDBDB";
          text = "Missed & Refund";
        }

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="text"
              color="secondary"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 16px",
                color: "#000000",
                fontWeight: 600,
                marginRight: "5px",
                gap: "6px",
                width: "146px",
                height: "36px",
                background: color,
                textTransform: "none",
                borderRadius: "8px",
                flex: "none",
                order: 0,
                flexGrow: 0,
              }}
            >
              {text}
            </Button>
          </div>
        );
      },
    },
  ];
  const handleProfileModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const generateAgeOptions = () => {
    const options = [];
    for (let i = 1; i <= 80; i++) {
      options.push({ label: `${i}`, value: i });
    }
    return options;
  };

  const ageOptions = generateAgeOptions();

  const handleChangeAge = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string; value: any } | null
  ) => {
    setAgeSelected(newValue?.value);
  };
  const handleChangeRating = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRatingSelected(event.target.value as string);
  };
  const handleChangeGender = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenderSelected(event.target.value as string);
  };
  const handleCountryChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string; value: any } | null
  ) => {
    setCountrySelected(newValue);
  };
  const handlePromoterSearch = (event: any) => {
    setSearchPromoter(event.target.value);
  };
  const handleCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string; value: any } | null
  ) => {
    setCitySelected(newValue?.label);
  };

  const handlePromoterRequest = () => {
    // Navigate to the "/promoter-request" page and pass events and linkedPromoters as state
    navigate("/promoter-request", { state: { events, linkedPromoters } });
  };

  const countryOptions = countries.map((country: any) => ({
    value: country.country_id,
    label: country.country,
  }));

  const cityOptions = cities.map((city: any) => {
    return {
      value: city?.city_id,
      label: city?.city,
    };
  });

  const popularityOptions = [
    { value: "option1", label: "0-3" },
    { value: "option2", label: "5-10" },
  ];
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          margin: "0 auto",
          overflow: "hidden",
          backgroundColor: "#FBFBFB",
          padding: { sm: 5, xs: 2 },
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "black",
            fontFamily: "Mulish",
          }}
        >
          Find Promoter
        </Typography>
        <Grid
          container
          display={"flex"}
          flexDirection={{ xs: "row", md: "row" }}
          direction={{ xs: "column", md: "row" }}
          sx={{ marginTop: "40px", backgroundColor: "white" }}
        >
          <Grid item xs={12} md={12} lg={5.9} sx={{ padding: 4 }}>
            <Grid container columnSpacing={4}>
              <Grid item md={4} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    mb: 1,
                  }}
                >
                  Search
                </Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <CustomInput
                  type="text"
                  error={false}
                  title="Search"
                  inputFontSize={12}
                  placeholder="Search Promoter"
                  endImg={require("../../assets/icons/Search.png")}
                  height="40px"
                  fontWeight={200}
                  fontSize={12}
                  showLabel={false}
                  style={{ padding: 1.4 }}
                  value={searchPromoter}
                  onChange={handlePromoterSearch}
                />
              </Grid>
            </Grid>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
                mt: 2,
              }}
            >
              Filters
            </Typography>
            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={12} xs={12}>
                <Stack direction={{ md: "row", sm: "column" }} spacing={2}>
                  <CustomSingleSelect
                    label="Country"
                    options={countryOptions}
                    value={countryselelcted}
                    onChange={handleCountryChange}
                    icon={require("../../assets/icons/flag-2.png")}
                    placeholder="Country"
                    iconProps={{ color: "#ff0000" }}
                    inputProps={{ style: { fontSize: 16 } }}
                  />
                  <CustomSingleSelect
                    label="City"
                    options={cityOptions}
                    value={cityselected}
                    onChange={handleCityChange}
                    icon={require("../../assets/icons/building.png")}
                    placeholder="City"
                    iconProps={{ color: "#ff0000" }}
                    inputProps={{ style: { fontSize: 16 } }}
                  />

                  <CustomSingleSelect
                    label="Age Range"
                    options={ageOptions}
                    value={ageselected}
                    onChange={handleChangeAge}
                    icon={require("../../assets/icons/shop.png")}
                    placeholder="Age"
                    iconProps={{ color: "#ff0000" }}
                    inputProps={{ style: { fontSize: 16 } }}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} mt={3}>
              {/* <Grid item md={12} xs={12}>
                <CustomFilterSelect
                  label="Popularity"
                  options={popularityOptions}
                  value={ratingselected}
                  onChange={handleChangeRating}
                  placeholder="Rating Range"
                />

              </Grid> */}
              <Grid item md={12} xs={12}>
                <CustomFilterSelect
                  label="Gender"
                  options={genderOptions}
                  value={genderselected}
                  //@ts-ignore
                  onChange={handleChangeGender}
                  placeholder="Gender"
                />
              </Grid>
            </Grid>
            <CustomButton
              marginLeft="1px"
              marginTop="40px"
              notArrow
              // mdFullWidth
              title={"Apply"}
              // fullWidth
              XFontSize="16"
              MFontSize="16"
              width={mobileView ? "100%" : "120px"}
              //@ts-ignore
              onClick={getPromotersList}
            />
          </Grid>
          <Grid item display={{ md: "flex", xs: "none" }} xs={0.2} md={0.2}>
            <Divider
              orientation="vertical"
              sx={{
                // my: 2,
                // mx: 3,
                borderWidth: 0,
                borderLeft: "1px solid #C7CADA",
                borderColor: "divider",
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={5.9} sx={{ padding: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
              }}
            >
              Search Results
            </Typography>
            <Grid container direction="column" spacing={2} mt={2.5}>
              {!searchInitiated ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  No Results
                </Typography>
              ) : isLoading ? (
                <div className="loader-search-promoter">
                  <MagnifyingGlass
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                  />
                </div>
              ) : promoters.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  No Promoters found !
                </Typography>
              ) : (
                promoters.map((promoter: any, index: any) => (
                  <Grid item key={index}>
                    <Grid
                      container
                      direction={{ xs: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <Grid item xs={12} md={6}>
                        <Box flexDirection="row" display="flex">
                          <Avatar
                            src={promoter.avatar || ""}
                            sx={{ width: 45, height: 45, marginRight: 1 }}
                          />
                          <Box flexDirection="column">
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 800,
                                fontSize: "14px",
                                color: "#000315",
                                flex: "none",
                                order: 0,
                              }}
                            >
                              {promoter.first_name} {promoter.last_name} :
                              Rating {promoter.rating}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "#000315",
                                flex: "none",
                                order: 0,
                                flexGrow: 0,
                              }}
                            >
                              {promoter.user_profile_follower.length} Followers
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6} mt={{ md: 0, xs: 5 }}>
                        <Stack direction="row" spacing={2}>
                          <CustomButton
                            marginLeft="0px"
                            marginTop="0px"
                            notArrow
                            title={"Request"}
                            XFontSize="14px"
                            MFontSize="14px"
                            width="100%" // Adjust width as needed
                            onClick={handlePromoterRequest}
                          />
                          <CustomButton
                            marginLeft="1px"
                            marginTop="0px"
                            notArrow
                            bgColor="#FFF7DD"
                            title={"Profile"}
                            XFontSize="14px"
                            MFontSize="14px"
                            width="100%"
                            onClick={handleProfileModal}
                          />
                        </Stack>
                      </Grid>
                      <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              marginTop: { xs: 5, md: 5 },
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                lineHeight: "36px",
                fontWeight: 700,
                color: "black",
                fontFamily: "Mulish",
              }}
            >
              Linked Promoter
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 5 }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: 400, padding: 4 }}>
              <DataGrid
                rows={linkedPromoters}
                columns={promoterLinkedcolumns}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: currentPageLinked, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                  "& .MuiDataGrid-sortIcon": {
                    opacity: "0.5 !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 900,
                    color: "balck",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              marginTop: { xs: 5, md: 5 },
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                lineHeight: "36px",
                fontWeight: 700,
                color: "black",
                fontFamily: "Mulish",
              }}
            >
              Suggested Promoters
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              marginTop: { xs: 5, md: 5 },
              paddingRight: {
                xs: 0,
                md: "16px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            <CustomInput
              type="text"
              error={false}
              title="Search"
              inputFontSize={12}
              placeholder="Search Promoter"
              endImg={require("../../assets/icons/Search.png")}
              height="40px"
              fontWeight={200}
              fontSize={12}
              showLabel={false}
              style={{ padding: 1.4 }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 5 }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: 400, padding: 4 }}>
              <DataGrid
                rows={suggestedPromoters}
                columns={sugestedColumn}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: currentPage, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                  "& .MuiDataGrid-sortIcon": {
                    opacity: "0.5 !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 900,
                    color: "balck",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              marginTop: { xs: 5, md: 5 },
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                lineHeight: "36px",
                fontWeight: 700,
                color: "black",
                fontFamily: "Mulish",
              }}
            >
              Promoter Post Reviews
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              marginTop: { xs: 5, md: 5 },
              paddingRight: {
                xs: 0,
                md: "16px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            <CustomInput
              type="text"
              error={false}
              title="Search"
              inputFontSize={12}
              placeholder="Search Promoter"
              endImg={require("../../assets/icons/Search.png")}
              height="40px"
              fontWeight={200}
              fontSize={12}
              showLabel={false}
              style={{ padding: 1.4 }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 5 }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: 400, padding: 4 }}>
              <DataGrid
                rows={activePromotions}
                columns={promoterPostReviews}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: currentPageActive, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                  "& .MuiDataGrid-sortIcon": {
                    opacity: "0.5 !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 900,
                    color: "balck",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <ProfileModal
        data={selectedPromoter}
        open={open}
        onClose={handleCloseModal}
        event={events}
      />
    </React.Fragment>
  );
};

export default WithLayout(Index);
