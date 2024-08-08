import { Grid, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Switch, { SwitchProps } from "@mui/material/Switch";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CiMenuKebab } from "react-icons/ci";
import MAuthApiService from "../../services/MAuthApiService";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import { Discount } from "../../services/model";
import { DatePickerCSS } from "./../../components/DateTimePickerCSS/DatePickerCSS";
import { useTheme } from "@emotion/react";
import { CustomNoRowsOverlay } from "../../components/DataGridNoRows/DataGridNoRows";
import ResuableEventStack from "../../components/EventStack";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Index = () => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [discountList, setDiscountList] = React.useState<Discount[]>([]);
  const [loading, setLoading] = React.useState(false)
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const [discountData, setDiscountData] = useState<Discount>({
    discount_code: "",
    end_date: dayjs().format("YYYY-MMM-DD HH:mm:ss"),
    gprs_status: 0,
    name: "",
    start_date: dayjs().format("YYYY-MMM-DD HH:mm:ss"),
  });
  const matches = useMediaQuery("(max-width:600px)");
  const isScreenSmall = useMediaQuery("(max-width:1240px)");
  const isScreen1000 = useMediaQuery("(max-width:1000px)");

  // Input Handlers

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const FilterDiscount = (discount: any) => {
    const searchLowerCase = searchText.toLowerCase();
    return discount.toLowerCase().includes(searchLowerCase);
  };

  const applyActiveBarSearchFilter = () => {
    if (searchText === "") {
      return discountList;
    } else {
      return discountList.filter((dis) => FilterDiscount(dis.name));
    }
  };
  const filteredDiscounts= applyActiveBarSearchFilter();


  const changeHandler = (field: string, value: string) => {
    console.log("Event name is clicked:", field, value);

    setDiscountData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiscountData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleDiscountCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDiscountData((prevData) => ({
      ...prevData,
      discount_code: value,
    }));
  };
  const handleFromDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const dateAsDate = newDate.toDate();
      const formattedFromDate = dayjs(dateAsDate).format(
        "YYYY-MMM-DD HH:mm:ss"
      );
      changeHandler("start_date", formattedFromDate);
    }
  };

  const handleToDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const dateAsDate = newDate.toDate(); // Convert Dayjs to Date
      const formattedToDate = dayjs(dateAsDate).format("YYYY-MMM-DD HH:mm:ss");
      changeHandler("end_date", formattedToDate);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetProfile = await MAuthApiService.getProfile();
        if (responseGetProfile.status === 200) {
          const responseAddEvent = await MAuthApiService.getAddeventApi();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Validation

  useEffect(() => {
    const timeout = setTimeout(() => {
      validateFields();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const validateFields = () => {
    const errors: { [key: string]: string } = {};
    const requiredFields: Array<keyof Discount> = [
      "discount_code",
      "end_date",
      "name",
      "start_date",
    ];
    requiredFields.forEach((field) => {
      if (!discountData[field]) {
        errors[field] = "This field is required";
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClose = () => setOpen(false);

  // Grid Data
  const discountColumns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "discount_code", headerName: "Code", width: 150 },
    { field: "start_date", headerName: "Start Date", width: 250 },
    { field: "end_date", headerName: "End Date", width: 250 },
    {
      field: "GPRS Enabled",
      headerName: "GPRS Enabled",
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={false}
          onChange={() => {}}
          inputProps={{ "aria-label": "ant design" }}
          // className="customSwitch"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <a className="custom-button" onClick={() => handleEdit(params.row)}>
            <img
              alt="edit"
              src={require("../../assets/icons/edit.png")}
              style={{ maxHeight: 20 }}
            />
          </a>
          <a className="custom-button" onClick={() => handleDelete(params.row)}>
            <img
              alt="edit"
              src={require("../../assets/icons/bin.png")}
              style={{ maxHeight: 20 }}
            />
          </a>
        </div>
      ),
    },
  ];

  // CRUD Handlers

  const handleDelete = (row: Discount) => {
    setDiscountData({ ...row });
    setOpenDelete(true);
  };

  const handleEdit = (row: Discount) => {
    setDiscountData((prevData) => ({
      ...prevData,
      discount_code: row.discount_code,
      gprs_status: row.gprs_status,
      name: row.name,
      start_date: row.start_date,
      end_date: row.end_date,
      id: row.id,
    }));
    setOpen(true);
  };

  const confirmDelete = () => {
    const idDel = discountList.filter(
      (discount) => discount.id !== discountData.id
    );
    setDiscountList(
      discountList.filter((discount) => discount.id !== discountData.id)
    );
    let access_token = localStorage.getItem("access_token");
    const data = { id: discountData.id };
    console.log("Request payload:", data);
    axios
      .post("https://staging-api.meattend.com/api/delete-discount", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error deleting discount:", error);
        if (error.response && error.response.status === 422) {
          console.error("Validation errors:", error.response.data);
        }
      });
    setOpenDelete(false);
  };

  const addDiscountHandler = () => {
    setDiscountData({
      discount_code: "",
      end_date: "",
      gprs_status: 0,
      name: "",
      start_date: "",
    });
    setOpen(true);
  };

  // APIS Calling
  const fetchData = async () => {
    setLoading(true)

    try {
      let access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        `https://staging-api.meattend.com/api/discount-list?page=${pageNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const paginationlength = response.data?.to ?? paginationLength;
      setPaginationLength(paginationlength);
      console.log("paginationLength", paginationLength);
      setDiscountList(response.data.data);
      console.log("discountlist", discountList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const handleDiscountForm = () => {
    const isValid = validateFields();

    if (!isValid) {
      console.log("Please fill in all required fields.");
      return;
    }

    const access_token = localStorage.getItem("access_token");

    if (discountData.id) {
      axios
        .post(
          "https://staging-api.meattend.com/api/edit-discount",
          discountData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          setDiscountList((prevDiscountList) => {
            const updatedList = prevDiscountList.map((item) =>
              item.id === discountData.id ? { ...item, ...discountData } : item
            );
            return updatedList;
          });

          setOpen(false);
          // setKeyForRerender(prevKey => prevKey + 1);
        });
    } else {
      axios
        .post(
          "https://staging-api.meattend.com/api/add-discount",
          discountData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const data = response.data.data;
          if (data && data.id) {
            setDiscountList((prevDiscountList) => [...prevDiscountList, data]);
          }

          setOpen(false);
          setKeyForRerender((prevKey) => prevKey + 1);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyForRerender, pageNumber]);

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
        padding={5}
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          overflow: "hidden",
          backgroundColor: "#FBFBFB",
          paddingY: { lg: 5, xs: 5 },
          paddding: { lg: 5, xs: 2 },
        }}
      >
        <Grid container>
          <Grid item sm={3} md={2}>
            <Typography
              sx={{
                fontSize: { lg: "30px", md: "25px", xs: "25px" },
                lineHeight: "36px",
                fontWeight: 700,
                color: "black",
                fontFamily: "Mulish",
              }}
            >
              Discount
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={10} mt={{ sm: 0, xs: 3 }}>
            <Grid container xs={12}>
              <Grid
                item
                xs={6}
                sm={6}
                md={isScreenSmall ? 8 : 9}
                lg={9.5}
                xl={10}
                sx={{
                  paddingLeft: { xs: 0, lg: 20, md: 10 },
                  paddingRight: { xs: 1, lg: 15, md: 5 },
                  marginTop: { sm: 0, md: 0 },
                }}
              >
                <CustomInput
                  type="text"
                  error={false}
                  title="Search"
                  inputFontSize={12}
                  placeholder="Search Discounts"
                  endImg={require("../../assets/icons/Search.png")}
                  height="1.7vh"
                  fontWeight={200}
                  fontSize={12}
                  showLabel={false}
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ padding: 1.5 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={isScreenSmall ? 4 : 3}
                lg={2.5}
                xl={2}
                sx={{
                  paddingLeft: { xs: 1, md: 0 },
                  marginTop: { xs: 0, md: 0 },
                }}
              >
                <CustomButton
                  marginLeft="0px"
                  marginTop="0px"
                  notArrow
                  title="Create Discount"
                  XFontSize="16"
                  MFontSize="16"
                  mdFullWidth
                  fullWidth
                  xsHeight={42}
                  xsWidth="100%"
                  onClick={addDiscountHandler}
                >
                  <img src={require("../../assets/icons/add.png")} />
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              backgroundColor: "white",
            }}
          >
            <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
              <DataGrid

                rows={filteredDiscounts}
                columns={discountColumns}
                loading={loading}

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
                }}
                  
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
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
            {discountList.map((item: any, index: any) => (
              <Grid item xs={12} key={index}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack title={"Name"} body={item.name} />
                    <ResuableEventStack
                      title={"Code"}
                      body={item.discount_code}
                    />
                    <ResuableEventStack
                      title={"Start Date"}
                      body={item.start_date}
                    />
                    <ResuableEventStack
                      title={"End Date"}
                      body={item.end_date}
                    />
                    <ResuableEventStack
                      title={"GPRS Enabled"}
                      body={
                        <Switch
                          checked={true}
                          onChange={() => {}}
                          inputProps={{ "aria-label": "ant design" }}
                          // className="customSwitch"
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
        <React.Fragment>
          <IconButton
            sx={{
              position: "absolute",

              top: "6vh",
              right: (theme) => ({
                xl: theme.breakpoints.up("xl") ? "33vw" : "unset",
                lg: theme.breakpoints.up("lg") ? "32vw" : "unset",
                md: theme.breakpoints.up("md") ? "31vw" : "unset",
                sm: theme.breakpoints.up("sm") ? "15vw" : "unset",
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
                md: theme.breakpoints.up("md") ? "50%" : "unset",
                xs: theme.breakpoints.up("xs") ? "50%" : "unset",
              }),
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "25%",
              bgcolor: "white",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              overflow: "auto",
              maxHeight: { xs: "100%", md: "100%" },
              minWidth: { xs: "80%", sm: "50%", md: "20%" },
              "&::-webkit-scrollbar": {
                width: 0,
              },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {discountData.id ? "Update Discount" : "Create Discount"}
            </Typography>
            <hr />
            <Grid container>
              <Grid item md={12} xs={12}>
                <CustomInput
                  type="text"
                  error={false}
                  title="Name"
                  inputFontSize={12}
                  placeholder="Name"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  value={discountData.name}
                  onChange={handleNameChange}
                />
              </Grid>
              {/* </Grid> */}
              {/* <Grid container md={12} > */}
              <Grid item md={12} xs={12}>
                <CustomInput
                  type="text"
                  error={false}
                  title="Discount Code"
                  inputFontSize={14}
                  placeholder="Please Enter Discount Code"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={12}
                  showLabel={true}
                  value={discountData.discount_code}
                  onChange={handleDiscountCodeChange}
                />
              </Grid>
              <Grid item md={12} xs={12} mt={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <text className="Typeography-title-input">
                      Start Date and Time
                    </text>
                  </Grid>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={
                        discountData.start_date
                          ? dayjs(discountData.start_date)
                          : null
                      }
                      onChange={(newDate) => handleFromDateChange(newDate)}
                      sx={DatePickerCSS}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item md={12} xs={12} mt={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <text className="Typeography-title-input">
                      End Date and Time
                    </text>
                  </Grid>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="End Date and Time"
                      value={
                        discountData.end_date
                          ? dayjs(discountData.end_date)
                          : null
                      }
                      onChange={(newDate) => handleToDateChange(newDate)}
                      sx={DatePickerCSS}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
                sx={{ marginTop: 3 }}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <CustomButton
                  // marginLeft="px"
                  marginTop="0px"
                  notArrow
                  title={discountData.id ? "Update" : "Create "}
                  XFontSize="16"
                  MFontSize="16"
                  mdFullWidth
                  fullWidth
                  xsWidth={"100%"}
                  onClick={handleDiscountForm}
                />
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
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
            width: "22%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "80%", md: "100%" },
          }}
        >
          <h3>Are you sure you want to delete this Discount?</h3>
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
