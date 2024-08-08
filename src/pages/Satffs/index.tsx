import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Grid,
  Button,
  Avatar,
  FormLabel,
  styled,
  Pagination,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import WhiteCustomButton from "../../components/button/WhiteCustomButton";
import UploadImages from "../../components/Input/UploadImages";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillInfoCircle } from "react-icons/ai";
import axios from "axios";
import "./style.css";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import { StaffData } from "../../services/model";
import CustomSelect from "../../components/Input/CustomSelect";
import MultiSelectCheckbox from "../../components/Input/MutliSelectCheckbox";
import MenuItemsPopover from "../../components/Popover/MenuPopover";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@emotion/react";
import { CustomNoRowsOverlay } from "../../components/DataGridNoRows/DataGridNoRows";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ResuableEventStack from "../../components/EventStack";
import { CustomCategories } from "../../components/CustomCategoriesRowWise/CustomCategories";
import { useNavigate } from "react-router-dom";
import MAuthApiService from "../../services/MAuthApiService";

const Index: React.FC = () => {
  const theme = useTheme();
  const navigate= useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [createdid, setCreatedID] = useState<number>(0);

  const [profImage, setProfImage] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [staffLength, setStaffLength] = useState<number>(0);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [image1, setImage1] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openupgrade, setOpenUpgrade] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({
    first_name: false,
    last_name: false,
    email_address: false,
    password: false,
    role: false,
    profile_image: false,
  });
  const [staffData, setStaffData] = useState<StaffData>({
    company_id: createdid,
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    role: "",
    role_id: 1,
    profile_image: "",
  });

  const matches = useMediaQuery("(max-width:600px)");
  const isScreen1400 = useMediaQuery("(max-width:1450px)");
  const isScreen1200 = useMediaQuery("(max-width:1200px)");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const FilterStaff = (staff: any) => {
    const searchLowerCase = searchText.toLowerCase();
    return staff.toLowerCase().includes(searchLowerCase);
  };

  const applyActiveBarSearchFilter = () => {
    if (searchText === "") {
      return rows;
    } else {
      return rows.filter((stf) => FilterStaff(stf.name));
    }
  };
  const filteredStaffs = applyActiveBarSearchFilter();

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: "name", headerName: "User", width: 250 },

    { field: "email_address", headerName: "Email", width: 250 },
    {
      field: "maskedPassword",
      headerName: "Password",
      width: 250,
      renderCell: (params) => {
        const dotStyle = {
          color: "#84858D",
          fontSize: "16px",
        };
        const maskedPassword = "●".repeat(params.value.length);
        return <span style={dotStyle}>{maskedPassword}</span>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            borderRadius: "8px",
            backgroundColor:
              params.value === "Admin"
                ? "#FFF7DD"
                : params.value === "Manager"
                ? "#FFDBDB"
                : params.value === "Supervisor"
                ? "#DCFBF5"
                : "transparent",
            color:
              params.value === "Admin"
                ? "#DE9300"
                : params.value === "Manager"
                ? "#FD1F1F"
                : params.value === "Supervisor"
                ? "#04CAA5"
                : "transparent",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <MenuItemsPopover
          icon={<CiMenuKebab />}
          items={[
            {
              name: "Edit",
              icon: (
                <img
                  style={{ width: "20px", height: "20px" }}
                  alt="edit"
                  src={require("../../assets/icons/edit.png")}
                />
              ),
            },
            {
              name: "Delete",
              icon: (
                <img
                  style={{ width: "20px", height: "20px" }}
                  alt="bin"
                  src={require("../../assets/icons/bin.png")}
                />
              ),
            },
          ]}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  const validateFields = () => {
    const errors: { [key: string]: boolean } = {};
    const requiredFields: (keyof StaffData)[] = [
      "first_name",
      "last_name",
      "email_address",
      "password",
      "role",
      "profile_image",
    ];
    requiredFields.forEach((field) => {
      if (!staffData[field]) {
        errors[field] = true;
      } else {
        errors[field] = false;
      }
    });
    setFieldErrors(errors);
    return Object.values(errors).every((value) => !value);
  };

  const changeHandler = (field: string, value: string) => {
    let roleId: number;
    if (field === "role") {
      switch (value) {
        case "Admin":
          roleId = 1;
          break;
        case "User":
          roleId = 2;
          break;
        default:
          roleId = 0;
          break;
      }
      setStaffData((prevData) => ({
        ...prevData,
        role: value,
        role_id: roleId,
      }));
    } else {
      setStaffData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };
  const fetchData = async () => {
    setLoading(true);

    try {
      const responseGetProfile = await MAuthApiService.getProfile();
        const CompanyId = responseGetProfile.data?.id;
        setCreatedID(CompanyId);
      const responseGetStaff =
        await MUserDashboardPagesApiService.getStaffUsers(pageNumber);
      console.log("my-responseGetStaff", responseGetStaff.data);

      let users = responseGetStaff.data?.users?.data || [];
      if (!Array.isArray(users)) {
        users = Object.values(users);
      }
      const userLength = users.length;
      setStaffLength(userLength);

      const paginationlength =
        responseGetStaff.data?.users?.to ?? paginationLength;
      setPaginationLength(paginationlength);
      
      const formattedRows = users.map((user: any, index: number) => ({
        id: user?.id,
        email_address: user.email_address,
        maskedPassword: user.password,
        role:
          user.role_id === 1
            ? "Admin"
            : user.role_id === 2
            ? "Manager"
            : "Supervisor",
        name: `${user.first_name} ${user.last_name}`,
      }));

      console.log("rows", formattedRows);
      setRows(formattedRows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyForRerender, pageNumber]);

  const handleStaffForm = async () => {

    setOpenUpgrade(false);
    const isValid = validateFields();

    if (!isValid) {
      console.log("Please fill in all required fields.");
      return;
    }
    const access_token = localStorage.getItem("access_token");
    try {
      const ResponseCreateStaffUser =
        await MUserDashboardPagesApiService.craeteStaffUser(staffData);
      const response = await ResponseCreateStaffUser;
      console.log("response from ResponseCreateStaffUser.", response);
      //@ts-ignore
      const responseData = response.data.data;
      setKeyForRerender((prevKey) => prevKey + 1);
      setOpen(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyForRerender, pageNumber]);

  const handleDelete = (row: any) => {
    setStaffData({ ...row });
    setOpenDelete(true);
  };
  const sortModel: GridSortModel = [{ field: "id", sort: "asc" }];
  const handleClose = () => setOpen(false);

  const handleCloseUpgrade = () => setOpenUpgrade(false);
 const  handleOpenCreateModal= () => {
     
}
  const addStaffHandler = () => {
    setFieldErrors({
      first_name: false,
      last_name: false,
      email_address: false,
      password: false,
      role: false,
      profile_image: false,
    });
    setImage1(null);
    setStaffData({
      company_id: createdid,
      first_name: "",
      last_name: "",
      email_address: "",
      password: "",
      role: "",
      role_id: 1,
      profile_image: "",
    });
    if(staffLength<5){
      setOpen(true)
   }
   else{
     setOpenUpgrade(true)
   }
  };
  const confirmDelete = async (row: any) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const url = `https://staging-api.meattend.com/api/deleteStaffUser?id=${row.id}`;
      console.log("Request payload:", row.id);
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("Delete response:", response);
      setOpenDelete(false);
      setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting staff user:", error);
    }
  };

  const handleFileUpload = (
    file: Blob,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (e && e.target && e.target.result) {
        const base64String = e.target.result as string;
        setStaffData((prevData) => ({
          ...prevData,
          profile_image: base64String,
        }));
        setImage(base64String);
        setIsImageSelected(true);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImage1(null);
    setStaffData((prevData) => ({
      ...prevData,
      profile_image: "",
    }));
    setIsImageSelected(false);
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
          <Grid item xs={12} md={12} sx={{ marginTop: { xs: 5, md: 1 } }}>
            <h2>
              Package Name:- Basic Package - Maximum 5 Default Staff Users
            </h2>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: { xs: 5, md: 1 } }}>
            <h2>User Roles</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={3}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        color: "#FFC000",
                        fontWeight: 700,
                      }}
                    >
                      Admin
                      <AiFillInfoCircle style={{ marginLeft: "5px" }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={9}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ marginLeft: "0px" }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 3,
                          bgcolor: "#FFF7DD",
                          borderRadius: "20px",
                        }}
                      >
                        <Box
                          width={54}
                          height={54}
                          component={"img"}
                          src={require("../../assets/navIcons/followers.png")}
                          padding={2}
                        />

                        <Typography
                          variant="body1"
                          align="center"
                          gutterBottom
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "black",
                          }}
                        >
                          Admin Staff
                        </Typography>
                        <Typography variant="body2" align="center" gutterBottom>
                          Admins can see on see the dashboard, events, basic
                          reports, find promoters, scanner, tickets, orders and
                          discounts tabs.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} lg={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        color: "#04CAA5",
                        fontWeight: 700,
                      }}
                    >
                      Supervisor
                      <AiFillInfoCircle style={{ marginLeft: "5px" }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={8}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ marginLeft: "0px" }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 3,
                          bgcolor: "#FFF7DD",
                          borderRadius: "20px",
                        }}
                      >
                        <Box
                          width={54}
                          height={54}
                          component={"img"}
                          src={require("../../assets/navIcons/followers.png")}
                          padding={2}
                        />

                        <Typography
                          variant="body1"
                          align="center"
                          gutterBottom
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "black",
                          }}
                        >
                          Supervisor Staff
                        </Typography>
                        <Typography variant="body2" align="center" gutterBottom>
                          Supervisors can see all tabs except billing tab.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={3}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        color: "#F25741",
                        fontWeight: 700,
                      }}
                    >
                      Manger
                      <AiFillInfoCircle style={{ marginLeft: "5px" }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={9}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ marginLeft: "0px" }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 3,
                          bgcolor: "#FFF7DD",
                          borderRadius: "20px",
                        }}
                      >
                        <Box
                          width={54}
                          height={54}
                          component={"img"}
                          src={require("../../assets/navIcons/followers.png")}
                          padding={2}
                        />

                        <Typography
                          variant="body1"
                          align="center"
                          gutterBottom
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "black",
                          }}
                        >
                          Manger Staff
                        </Typography>
                        <Typography variant="body2" align="center" gutterBottom>
                          Managers can see all tabs and has access to all data.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* #FFC000 */}
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: { xs: 5, md: 1 } }}>
            <h2>Allocated Staff</h2>
            <Typography
              sx={{ fontSize: "16px", color: "#04CAA5", fontWeight: 700 }}
            >
              Superviser
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          lg={isScreen1400 ? 5.5 : 5}
          md={4}
          sx={{ marginTop: { xs: 5, md: 0 } }}
        >
          <Typography
            // mt={{ xs: 3 }}
            fontSize={{ lg: 25, md: 20 }}
            fontWeight={700}
            color={"gray.graphTitle"}
          >
            MeAttend Staff- Service Package Users
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={isScreen1400 ? 6.5 : 7}
          md={8}
          sx={{ marginTop: { xs: 7, md: 0 } }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              lg={5.5}
              md={4}
              sx={{
                paddingRight: 1,
              }}
            >
              <CustomInput
                type="text"
                error={false}
                title="Search"
                inputFontSize={12}
                placeholder="Search"
                endImg={require("../../assets/icons/Search.png")}
                height="2.0vh"
                fontWeight={400}
                fontSize={14}
                style={{ padding: 1.4 }}
                value={searchText}
                onChange={handleSearchChange}
                showLabel={false}
              />
            </Grid>
            <Grid
              item
              xs={6}
              lg={3.5}
              md={4}
              sx={{
                mt: { xs: 2, md: 0 },
                mb: { xs: 2, md: 0 },
                px: { xs: 1, md: 0 },
              }}
            >
              <WhiteCustomButton
                marginLeft="0px"
                marginTop="0px"
                notArrow
                title="Apply to role"
                XFontSize="16"
                MFontSize="12px"
                xsHeight={42}
                xsWidth="100%"
                onClick={addStaffHandler}
              >
                <img alt="add" src={require("../../assets/icons/add.png")} />
              </WhiteCustomButton>
            </Grid>
            <Grid
              item
              xs={6}
              lg={3}
              md={4}
              sx={{
                mt: { xs: 2, md: 0 },
                mb: { xs: 2, md: 0 },
                // paddingLeft: 1,
              }}
            >
              <CustomButton
                marginLeft="0px"
                marginTop="0px"
                notArrow
                title="Add Staff"
                XFontSize="16"
                MFontSize="16"
                xsHeight={42}
                xsWidth="100%"
                onClick={addStaffHandler}
              >
                <img src={require("../../assets/icons/add.png")} />
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ backgroundColor: "white", borderRadius: "6px" }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
              <DataGrid
                rows={filteredStaffs}
                columns={columns}
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
                    paginationModel: { pageSize: 10 },
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
              {rows.map((item: any, index: any) => (
                <Grid item xs={12} key={item?.id}>
                  <Box alignItems={"center"} borderRadius={3} p={1}>
                    <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                      <ResuableEventStack title={"User"} body={item.name} />
                      <ResuableEventStack
                        title={"Email"}
                        body={item.email_address}
                      />
                      <ResuableEventStack title={"Password"} body={"*******"} />
                      <ResuableEventStack
                        title={"Role"}
                        body={
                          <CustomCategories
                            textColor="#F30E0E"
                            bgColor="#FFDBDB"
                            title={"Admin"}
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
        <Grid container>
          <Grid
            item
            xs={9}
            md={10}
            lg={10.5}
            sx={{ marginTop: { xs: 1, md: 3 } }}
          >
            <Typography
              // mt={{ xs: 3 }}
              fontSize={{ lg: 25, md: 20 }}
              fontWeight={700}
              color={"gray.graphTitle"}
            >
              Additional Staff
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            md={2}
            lg={1.5}
            sx={{
              marginTop: { xs: 1, md: 0 },
              display: "flex",
              justifyContent: "center",
              paddingLeft: 0,
            }}
          >
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              title="Add Staff"
              XFontSize="16"
              MFontSize="16"
              xsHeight={42}
              xsWidth="100%"
              onClick={addStaffHandler}
            >
              <img src={require("../../assets/icons/add.png")} />
            </CustomButton>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 3 }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
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
              {rows.map((item: any, index: any) => (
                <Grid item xs={12} key={item?.id}>
                  <Box alignItems={"center"} borderRadius={3} p={1}>
                    <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                      <ResuableEventStack title={"User"} body={item.name} />
                      <ResuableEventStack
                        title={"Email"}
                        body={item.email_address}
                      />
                      <ResuableEventStack title={"Password"} body={"*******"} />
                      <ResuableEventStack
                        title={"Role"}
                        body={
                          <CustomCategories
                            textColor="#F30E0E"
                            bgColor="#FFDBDB"
                            title={"Admin"}
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
              top: 8,
              right: (theme) => ({
                lg: "290px",
                md: theme.breakpoints.up("md") ? "50px" : "unset",
                xs: theme.breakpoints.up("xs") ? "50px" : "unset",
              }),
              color: "white",
            }}
            onClick={handleClose}
          >
            <ClearIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "60%",
              left: (theme) => ({
                lg: "50%",
                md: theme.breakpoints.up("md") ? "60%" : "unset",
                xs: theme.breakpoints.up("xs") ? "50%" : "unset",
              }),
              transform: "translate(-50%, -50%)",
              width: "45%",
              bgcolor: "white",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              overflow: "auto",
              maxHeight: { xs: "80%", md: "100%" },
              minWidth: { xs: "80%", md: "30%" },
              "&::-webkit-scrollbar": {
                width: 0,
              },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{
                fontSize: "32px",
                fontWeight: 400,
                fontFamily: "#000315",
                color: "#000315",
              }}
            >
              Create Staff
            </Typography>
            <hr />
            <Grid container>
              <Grid item md={6} xs={12} sx={{ marginTop: 0, paddingRight: 1 }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["first_name"]}
                  title="First Name"
                  inputFontSize={12}
                  placeholder="Name"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  img={require("../../assets/icons/profile.png")}
                  value={staffData.first_name}
                  onChange={(event) =>
                    changeHandler("first_name", event.target.value)
                  }
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ marginTop: 0 }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["last_name"]}
                  title="Last Name"
                  inputFontSize={12}
                  placeholder="Last Name"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  img={require("../../assets/icons/profile.png")}
                  value={staffData.last_name}
                  onChange={(event) =>
                    changeHandler("last_name", event.target.value)
                  }
                />
              </Grid>
              <Grid item md={12} xs={12} sx={{ marginTop: 0 }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["email_address"]}
                  title="Email Address"
                  inputFontSize={12}
                  placeholder="Email Address"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  img={require("../../assets/icons/email.png")}
                  value={staffData.email_address}
                  onChange={(event) =>
                    changeHandler("email_address", event.target.value)
                  }
                />
              </Grid>
              <Grid item md={12} xs={12} sx={{ marginTop: 0 }}>
                <CustomInput
                  type="text"
                  error={fieldErrors["password"]}
                  title="Password"
                  inputFontSize={12}
                  placeholder="Enter your Password"
                  img={require("../../assets/icons/Lock.png")}
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  height="1.7vh"
                  value={staffData.password}
                  onChange={(event) =>
                    changeHandler("password", event.target.value)
                  }
                />
              </Grid>

              <Grid item md={12} xs={12} sx={{ marginTop: 0 }}>
                <CustomSelect
                  title="Role"
                  startImg={require("../../assets/icons/profile.png")}
                  value={staffData.role}
                  onChange={(event) =>
                    changeHandler("role", event.target.value)
                  }
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Supervisor", value: "Supervisor" },
                  ]}
                />
              </Grid>

              <Grid item md={6} xs={12} sx={{ marginTop: 2 }}>
                <p>Upload Your Image</p>
                <Box position="relative" sx={{ width: "100%" }}>
                  {image1 ? (
                    <React.Fragment>
                      <img
                        src={image1}
                        alt="Uploaded"
                        style={{
                          maxHeight: "100%",
                          width: "100%",
                          maxWidth: "100%",
                          marginTop: "0px",
                          height: "120px",
                        }}
                      />
                      {isImageSelected && (
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: (theme) => ({
                              xlg: theme.breakpoints.up("xl") ? 5 : "unset",
                              lg: theme.breakpoints.up("lg") ? 5 : "unset",
                              md: theme.breakpoints.up("md") ? 5 : "unset",
                              sm: theme.breakpoints.up("sm") ? 5 : "unset",
                              xs: theme.breakpoints.up("xs") ? 2 : "unset",
                            }),
                            color: "white",
                          }}
                          onClick={handleRemoveImage}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </React.Fragment>
                  ) : (
                    <UploadImages
                      onFileUpload={handleFileUpload}
                      setImage={setImage1}
                      fontWeight={700}
                      fontSize={14}
                      title=""
                      value={staffData.profile_image}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        changeHandler("profile_image", event.target.value)
                      }
                    />
                  )}
                </Box>
              </Grid>

              {staffLength > 5 ? (
                <>
                  <Grid
                  item
                  md={12}      
                  xs={12}
                  padding={5}
                  sx={{ marginTop: "20px" }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: "32px",
                      fontWeight: 400,
                      fontFamily: "#000315",
                      color: "#000315",
                    }}
                  >
                    New Staff Member
                  </Typography>
                  <hr />
                  <Grid container spacing={3}>
                    <Grid item md={12} lg={7.5}>
                      <Typography
                        gutterBottom
                        sx={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#000315",
                        }}
                      >
                        New Staff member
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "10px", fontWeight: 500 }}
                      >
                        Ligula molestie non ac eget fringilla. Arcu rutrum proin
                        lacus eget purus ligula molestie non ac eget fringilla.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4.5}>
                      <CustomButton
                        marginLeft="0px"
                        marginTop="0px"
                        notArrow
                        mdFullWidth
                        title="£10 pcm-Additional per Calendar Month"
                        fullWidth
                        xsHeight="45px"
                        XFontSize="12px"
                        MFontSize="12px"
                        // onClick={confirmDelete}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                   <Grid
                   item
                   md={12}
                   xs={12}
                   padding={5}
                   sx={{ marginTop: "0px" }}
                 >
               <Typography
                 variant="body1"
                 sx={{
                   fontFamily: "Mulish",
                   fontSize: "16px",
                   fontWeight: 500,
                   lineHeight: "20px",
                   letterSpacing: "0em",
                   textAlign: "left",
                   color: "#84858D",
                   marginTop: "20px",
                 }}
               >
                 Payment Subscription
               </Typography>
 
               <Box
                 component={"div"}
                 style={{
                   display: "flex",
                   alignItems: "center",
                   marginTop: "20px",
                 }}
               >
                 <input
                   type="checkbox"
                   style={{ marginRight: "5px", color: "#FFC000" }}
                 />
                 <Typography
                   variant="body1"
                   sx={{
                     fontFamily: "Mulish",
                     fontSize: "14px",
                     fontWeight: 500,
                     lineHeight: "30px",
                     letterSpacing: "0em",
                     textAlign: "left",
                     color: "#262A45",
                   }}
                 >
                   Please Confirm Your Subscription!
                 </Typography>
               </Box>
 
               <Grid xs={12} md={12}>
                 <CustomButton
                   marginLeft="0px"
                   marginTop="20px"
                   marginBottom="80px"
                   notArrow
                   mdFullWidth
                   title="Pay Now"
                   fullWidth
                   xsHeight="52px"
                   mdHeight="52px"
                   XFontSize="16px"
                   MFontSize="16px"
                  //  onClick={() => navigate('/payment')}
                  onClick={handleStaffForm}

                 />
               </Grid>
               </Grid>
                </>
              
              ) : (
               <Grid item md={12} xs={12} sx={{ marginTop: 4,marginBottom:15 }}>
                <CustomButton
                  marginLeft="px"
                  marginTop="0px"
                  notArrow
                  title="Create "
                  XFontSize="16"
                  onClick={handleStaffForm}
                />
              </Grid> 
              )}
           

             
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
            width: "30%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "80%", md: "100%" },
          }}
        >
          <h3>Are you sure you want to delete this Staff?</h3>
          <Grid container>
            <Grid item xs={12} md={3}>
              <CustomButton
                marginLeft="1px"
                marginTop="2px"
                notArrow
                color="#A0A3B5"
                borderColor="#A0A3B5"
                bgColor="white"
                title="Cancel"
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
                title="Confirm"
                XFontSize="16"
                MFontSize="16"
                onClick={() => confirmDelete(staffData)}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openupgrade}
        onClose={handleCloseUpgrade}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: (theme) => ({
              lg: "50%",
              md: theme.breakpoints.up("md") ? "60%" : "unset",
              xs: theme.breakpoints.up("xs") ? "50%" : "unset",
            }),
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "100%", md: "100%" },
            minWidth: { xs: "80%", sm: "50%", md: "30%" },
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 2,
              color: "black",
            }}
            onClick={handleCloseUpgrade}
          >
            <ClearIcon />
          </IconButton>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                width={100}
                height={100}
                component={"img"}
                src={require("../../assets/navIcons/followers.png")}
                padding={2}
              />

              <Typography
                variant="body1"
                align="center"
                gutterBottom
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Add Staff
              </Typography>
              <Typography variant="body2" align="center" gutterBottom>
                MeAttend is for arranging events and serve you. We provide wide
                range of facilities regarding your business boom
              </Typography>
            </Grid>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <CustomButton
                  marginLeft="1px"
                  marginTop="2px"
                  notArrow
                  title="Upgrade"
                  XFontSize="16"
                  xsWidth="100%"
                  MFontSize="12px"
                  onClick={() => setOpen(true)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomButton
                  marginLeft="1px"
                  marginTop="2px"
                  notArrow
                  title="Purchase New Staff User"
                  xsWidth="100%"
                  XFontSize="12px"
                  MFontSize="12px"
                  // onClick={handleStaffForm}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default WithLayout(Index);
