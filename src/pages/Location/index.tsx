import { Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./style.css";
import { useToasts } from 'react-toast-notifications';
import { WithLayout } from "../../components/Wrapper/WithLayout";
import MAuthApiService from "../../services/MAuthApiService";
import { Location } from "../../services/model";
import { CustomNoRowsOverlay } from "../../components/DataGridNoRows/DataGridNoRows";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ResuableEventStack from "../../components/EventStack";
import { CustomCategories } from "../../components/CustomCategoriesRowWise/CustomCategories";

const Index = () => {
  const { addToast } = useToasts();
  const [locations, setLocations] = useState<Location[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [companyId, setCompanyId] = useState<string>("");
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const [newLocation, setNewLocation] = useState<Location>({
    address_1: "",
    address_2: "",
    address_3: "",
    district: "",
    city: "",
    country: "",
    postal_code: "",
    is_active: 1,
    company_id: companyId,
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({
    address_1: false,
    address_2: false,
    address_3: false,
    district: false,
    city: false,
    country: false,
    postal_code: false,
  });

  // Change handler for search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  //@ts-ignore
  const filterLocations = (locationName) => {
    const searchLowerCase = searchText.toLowerCase();
    if (locationName === null || locationName === undefined) {
      return false;
    }
    return locationName.toLowerCase().includes(searchLowerCase);
  };

  const applySearchFilter = () => {
    if (searchText === "") {
      return locations;
    } else {
      return locations.filter(
        (locat) =>
          filterLocations(locat.address_1) ||
          filterLocations(locat.address_2) ||
          filterLocations(locat.address_3)
      );
    }
  };

  const filteredLocations = applySearchFilter();
  console.log("filteredLocations", filteredLocations);

  const validateFields = () => {
    const errors: { [key: string]: boolean } = {};
    const requiredFields: (keyof Location)[] = [
      "address_1",
      "address_2",
      "address_3",
      "city",
      "district",
      "country",
      "postal_code",
    ];

    requiredFields.forEach((field) => {
      if (!newLocation[field]) {
        errors[field] = true;
      } else {
        errors[field] = false;
      }
    });

    setFieldErrors(errors);

    return Object.values(errors).every((value) => !value);
  };
  const handleClose = () => setOpen(false);
  const addLocationHandler = () => {
    setNewLocation({
      address_1: "",
      address_2: "",
      address_3: "",
      district: "",
      country: "",
      city: "",
      postal_code: "",
      is_active: 1,
      company_id: companyId,
    });
    setOpen(true);
  };

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const responseGetProfile = await MAuthApiService.getProfile();
          console.log("my-profile", responseGetProfile.data);

          const CompanyId = responseGetProfile.data?.id || "";
          console.log(CompanyId);
          setCompanyId(CompanyId.toString());
          console.log("hh", companyId);

          if (CompanyId != null) {
            let access_token = localStorage.getItem("access_token");

            const response = await axios.get(
              `https://staging-api.meattend.com/api/getCompanyLocations?company_id=${CompanyId}&is_active=1`,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );

            setLocations(response.data.data);
          } else {
            console.error("Company ID is null or undefined");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        finally{
          setLoading(false)
        }
      };

      fetchData();
    }, [pageNumber]);
  const handleLocationForm = () => {
    const isValid = validateFields();

    if (!isValid) {
      console.log("Please fill in all required fields.");
      return;
    }
    let access_token = localStorage.getItem("access_token");
    if (newLocation.id) {
      axios
        .put(
          "https://staging-api.meattend.com/api/updateCompanyLocation",
          newLocation,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {});
      let locations1 = [...locations];
      let index = locations1.findIndex((loc) => loc.id == newLocation.id);
      locations1[index] = { ...newLocation };
      setLocations([...locations1]);
      addToast('Saved Successfully', { appearance: 'success' });
    } else {
      axios
        .post(
          "https://staging-api.meattend.com/api/addCompanyLocation",
          newLocation,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          let data = response.data.data;
          if (data && data.id) {
            setLocations((prevLocations) => [...prevLocations, data]);
          }
        });
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "address_1", headerName: "Address Line 1", width: 180 },
    { field: "address_2", headerName: "Address Line 2", width: 180 },
    { field: "address_3", headerName: "Address Line 3", width: 180 },
    { field: "country", headerName: "Country", width: 180 },
    { field: "district", headerName: "City", width: 130 },
    { field: "postal_code", headerName: "Zip Code", width: 130 },
    {
      field: "is_active",
      headerName: "Status",
      width: 80,
      renderCell: (params) => {
        let styles =
          params.row.is_active == 1
            ? { backgroundColor: "#CEF9EC", color: "#039A36" }
            : { backgroundColor: "#FFDBDB", color: "#F30E0E" };
        return (
          <Chip
            label={params.row.is_active == 1 ? "Active" : "Inactive"}
            color="success"
            sx={{
              fontSize: 12,
              height: "25px",
              fontWeight: "bolder",
              ...styles,
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <a className="custom-button" onClick={() => handleEdit(params.row)}>
            <img
              src={require("../../assets/icons/edit.png")}
              style={{ maxHeight: 20 }}
              alt="edit"
            />
          </a>
          <a className="custom-button" onClick={() => handleDelete(params.row)}>
            <img
              src={require("../../assets/icons/bin.png")}
              style={{ maxHeight: 20 }}
              alt="bin"
            />
          </a>
        </div>
      ),
    },
  ];

  const handleDelete = (row: Location) => {
    setNewLocation({ ...row });
    setOpenDelete(true);

  };

  const confirmDelete = () => {
    setLocations(locations.filter((location) => location.id != newLocation.id));
    let access_token = localStorage.getItem("access_token");
    const data = { id: newLocation.id, company_id: companyId, is_active: 0 };
    axios
      .put("https://staging-api.meattend.com/api/updateCompanyLocation", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {});
    setOpenDelete(false);
    addToast('Saved Successfully', { appearance: 'success' });

  };

  const handleEdit = (row: Location) => {
    setNewLocation({ ...row });
    setOpen(true);
  };

  useEffect(() => {
    console.log("Updated newLocation:", newLocation);
    console.log("hh", companyId);
  }, [newLocation]);

  const changeHandler = (value: string, target: string) => {
    setNewLocation((prevLocation) => ({
      ...prevLocation,
      [target]: value,
    }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("🚀 ~ handlePageChange ~ value:", value);
    setPageNumber(value);
    console.log("pageNumber", pageNumber);
  };
  return (
    <React.Fragment>
      <Grid
        container
        padding={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          overflow: "hidden",
          backgroundColor: "#FBFBFB",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={3}
            sm={4}
            md={5}
            lg={7}
            xl={8}
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
              Location
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            lg={3}
            xl={2.5}
            sx={{
              marginTop: { xs: 5, md: 5 },
              paddingRight: 2,
            }}
          >
            <CustomInput
              type="text"
              error={false}
              title="Search"
              inputFontSize={12}
              placeholder="Search"
              endImg={require("../../assets/icons/Search.png")}
              height="1.7vh"
              fontWeight={400}
              fontSize={14}
              showLabel={false}
              style={{ padding: 1.5 }}
              value={searchText}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={2}
            xl={1.5}
            sx={{
              marginTop: { xs: 5, md: 5 },
            }}
          >
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              mdFullWidth
              title="Add Location"
              fullWidth
              XFontSize="7px"
              MFontSize="16"
              xsHeight={42}
              xsWidth="100%"
              onClick={addLocationHandler}
            >
              <img src={require("../../assets/icons/add.png")} />
            </CustomButton>
          </Grid>
          <Grid container sx={{ backgroundColor: "white" }}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ display: { xs: "", md: "block", marginBottom: "0vh" } }}
            >
              <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
                <DataGrid
                  rows={filteredLocations}
                  columns={columns}
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                    pagination: (data) => {
                      return (
                        <CustomPagination
                          paginationLength={1}
                          pageNumber={pageNumber}
                          handlePageChange={handlePageChange}
                        />
                      );
                    },
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 30 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  loading={loading}
                  sx={{
                    display: { md: "flex", xs: "none" },

                    "& .MuiDataGrid-sortIcon": {
                      opacity: "0.5 !important",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: 900,
                      color: "balck",
                    },
                    border: "1px solid black",
                    // change row border color

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
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
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
            {filteredLocations.map((item: any, index: any) => (
              <Grid item xs={12} key={index}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack
                      title={"Address Line 1"}
                      body={item.address_1}
                    />
                    <ResuableEventStack
                      title={"Address Line 2"}
                      body={item.address_2}
                    />
                    <ResuableEventStack
                      title={"Address Line 3"}
                      body={item.address_3}
                    />
                    <ResuableEventStack title={"Country"} body={item.country} />
                    <ResuableEventStack title={"City"} body={item.city} />
                    <ResuableEventStack title={"Zip Code"} body={item.postal_code} />

                    <ResuableEventStack
                      title={"Status"}
                      body={
                        <CustomCategories
                          textColor="#F30E0E"
                          bgColor="#FFDBDB"
                          title={"Active"}
                        />
                      }
                    />
                    <ResuableEventStack
                      body={
                        <div>
                          <a className="custom-button">
                            <img
                              src={require("../../assets/icons/edit.png")}
                              style={{ maxHeight: 20 }}
                              alt="edit"
                            />
                          </a>
                          <a className="custom-button">
                            <img
                              src={require("../../assets/icons/bin.png")}
                              style={{ maxHeight: 20 }}
                              alt="bin"
                            />
                          </a>
                        </div>
                      }
                      title="Action"
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </div>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <IconButton
            sx={{
              position: "absolute",

              top: "10vh",
              right: (theme) => ({
                lg: theme.breakpoints.up("lg") ? "20vw" : "unset",
                md: theme.breakpoints.up("md") ? "18vw" : "unset",
                sm: theme.breakpoints.up("sm") ? "16vw" : "unset",
                xs: theme.breakpoints.up("xs") ? "1vw" : "unset",
              }),
              color: "white",
            }}
            onClick={handleClose}
          >
            <ClearIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              top: (theme) => ({
                md: theme.breakpoints.up("md") ? "70%" : "unset",
                xs: theme.breakpoints.up("xs") ? "70%" : "unset",
              }),
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "white",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              overflow: "auto",
              maxHeight: { xs: "100%", md: "100%" },
              minWidth: { xs: "80%", sm: "50%", md: "50%" },
              "&::-webkit-scrollbar": {
                width: 0,
              },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {newLocation.id ? "Update Location" : "Add New Location"}
            </Typography>
            <hr />
            <Grid container>
              <Grid item md={6} xs={12} sx={{ paddingRight: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["address_1"]}
                  title="Address Line 1"
                  inputFontSize={14}
                  placeholder="Address Line 1"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  value={newLocation.address_1}
                  onChange={(event) =>
                    changeHandler(event.target.value, "address_1")
                  }
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["address_2"]}
                  title="Address Line 2"
                  inputFontSize={14}
                  placeholder="Address Line 2"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  value={newLocation.address_2}
                  onChange={(event) =>
                    changeHandler(event.target.value, "address_2")
                  }
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ paddingRight: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["address_3"]}
                  title="Address Line 3"
                  inputFontSize={14}
                  placeholder="Address Line 3"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  onChange={(event) =>
                    changeHandler(event.target.value, "address_3")
                  }
                  value={newLocation.address_3}
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["district"]}
                  title="District/State"
                  inputFontSize={14}
                  placeholder="State"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  onChange={(event) =>
                    changeHandler(event.target.value, "district")
                  }
                  value={newLocation.district}
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ paddingRight: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["country"]}
                  title="City"
                  inputFontSize={14}
                  placeholder="City"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  onChange={(event) =>
                    changeHandler(event.target.value, "city")
                  }
                  value={newLocation.city}
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 3 } }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["country"]}
                  title="Country"
                  inputFontSize={14}
                  placeholder="Country"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  onChange={(event) =>
                    changeHandler(event.target.value, "country")
                  }
                  value={newLocation.country}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <CustomInput
                  type="text"
                  error={fieldErrors["postal_code"]}
                  title="Zip Code"
                  inputFontSize={14}
                  placeholder="Zip Code"
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={14}
                  showLabel={true}
                  onChange={(event) =>
                    changeHandler(event.target.value, "postal_code")
                  }
                  value={newLocation.postal_code}
                />
              </Grid>
              <Grid
                container
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0 auto",
                  overflow: "hidden",
                  backgroundColor: "#FBFBFB",
                }}
              >
                <Grid item md={12} xs={12} sx={{ overflow: "hidden" }}>
                  <img
                    src={require("../../assets/icons/LocationImg.png")}
                    style={{
                      marginTop: "15px",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    alt="Location"
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ marginTop: 3, marginBottom: "25vh" }}>
                <Grid item md={3} xs={12}>
                  <CustomButton
                    marginTop="0px"
                    marginBottom="0px"
                    notArrow
                    title="Cancel"
                    color="#A0A3B5"
                    borderColor="#A0A3B5"
                    bgColor="white"
                    XFontSize="16"
                    MFontSize="16"
                    xsWidth={"100%"}
                    onClick={() => setOpen(false)}
                  />
                </Grid>
                <Grid item md={3} xs={12} sx={{ mt: { md: 0, xs: 1 } }}>
                  <CustomButton
                    marginLeft="0px"
                    marginTop="0px"
                    notArrow
                    // mdFullWidth
                    title={newLocation.id ? "Update" : "Add"}
                    // fullWidth
                    XFontSize="16"
                    MFontSize="16"
                    xsWidth={"100%"}
                    onClick={handleLocationForm}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "80%", md: "100%" },
          }}
        >
          <h3>Are you sure you want to delete this Location?</h3>
          <Grid container>
            <Grid item xs={12} md={3}>
              <CustomButton
                marginLeft="1px"
                marginTop="2px"
                notArrow
                color="#A0A3B5"
                borderColor="#A0A3B5"
                bgColor="white"
                // mdFullWidth
                title="Cancel"
                // fullWidth
                XFontSize="16"
                MFontSize="16"
                onClick={() => setOpenDelete(false)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomButton
                marginLeft="1px"
                marginTop="2px"
                notArrow
                // mdFullWidth
                title="Confirm"
                // fullWidth
                XFontSize="16"
                MFontSize="16"
                onClick={confirmDelete}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default WithLayout(Index);
