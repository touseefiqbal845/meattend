import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import "./style.css";
import { CiMenuKebab } from "react-icons/ci";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import Popover from "@mui/material/Popover";
import BorderImage from "../../../assets/icons/borderImage.png";
import RejectModelComponent from "./RejectModal";
import CompanyDetailsModal from "./ApproveModal";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
import ResuableEventStack from "../../../components/EventStack";
import { CustomCategories } from "../../../components/CustomCategoriesRowWise/CustomCategories";

interface RejectModalParentProps {
  selectedItemIdProps: number | null;
  handleActionProps: (action: string, rowId: number) => void;
  setOpenModelRejectProps: (value: boolean) => void;
}

const Index: React.FC<RejectModalParentProps> = ({
  selectedItemIdProps,
  handleActionProps,
  setOpenModelRejectProps,
}) => {
  const [openmodel, setOpenModel] = useState<boolean>(false);
  const [openmodelreject, setOpenModelReject] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [actionClicked, setActionClicked] = useState<{ [key: number]: string }>(
    {}
  );
  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const matches = useMediaQuery("(max-width:600px)");
  const isScreenLarge = useMediaQuery("(max-width:1536px)");
  const isScreen900 = useMediaQuery("(max-width:950px)");
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const columns: GridColDef[] = [
    { field: "company", headerName: "Name", minWidth: isScreenLarge? 200: 200, flex: 1 },
    { field: "email", headerName: "Email", minWidth: isScreenLarge ?250 :250, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth:isScreenLarge ? 80 :80, flex: 1 },
    { field: "plan", headerName: "Plan", minWidth: isScreenLarge ? 80 :80, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: isScreenLarge ?80 :80 ,
      flex: 1,
      renderCell: (params: any) => (
        <div>
          {/* {actionClicked[params.row.id] === "Approve" && (
            <span style={{ color: "#DE9300" }}>Approve</span>
          )}
          {actionClicked[params.row.id] === "Reject" && (
            <span style={{ color: "#FD1F1F" }}>Reject</span>
          )} */}
          {!actionClicked[params.row.id] && (
            <IconButton
              aria-describedby={params.id}
              onClick={(e) => {
                handleAction("", params.row.id);
                //@ts-ignore
                handleClick(e);
              }}
            >
              <CiMenuKebab>Open Popover</CiMenuKebab>
            </IconButton>
          )}

          <Popover
            id={id}
            open={selectedItemId === params.row.id && open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "150px",
                borderRadius: "6px",
                borderTop: "2px solid #DE9300",
              }}
            >
              <Box
                component="div"
                onClick={() => handleOpenModel(params)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#84858D",
                  "&:hover": {
                    bgcolor: "#FFF7DD",
                    color: "#DE9300",
                  },
                  marginTop: "8px",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                {" "}
                <img
                  style={{ width: "20px", height: "20px" }}
                  alt="view"
                  src={require("../../../assets/popover admin icons/Eye.png")}
                />
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#84858D",
                  }}
                >
                  View
                </Typography>
              </Box>
              <Box
                component="div"
                onClick={() => handleAction("Approve", params.row.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#84858D",
                  "&:hover": {
                    bgcolor: "#FFF7DD",
                    color: "#DE9300",
                  },
                  // marginTop:"8px",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <img
                  style={{ width: "20px", height: "20px" }}
                  alt="edit"
                  src={require("../../../assets/popover admin icons/Check.png")}
                />
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#84858D",
                  }}
                >
                  Approve
                </Typography>
              </Box>
              <Box
                component="div"
                // onClick={() => handleAction("Reject", params.row.id)}
                onClick={handleOpenModelReject}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#84858D",
                  "&:hover": {
                    bgcolor: "#FFF7DD",
                    color: "#DE9300",
                  },
                  // marginTop:"8px",
                  marginBottom: "8px",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <img
                  style={{ width: "18px", height: "18px" }}
                  alt="reject"
                  src={require("../../../assets/popover admin icons/reject.png")}
                />
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: "#84858D",
                  }}
                >
                  Rejected
                </Typography>
              </Box>
            </Box>
          </Popover>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response =
          await AdminAuthApiService.getNewCompaniesListAdminDashboard(
            pageNumber
          );
        const Newcomapnies =
          response.data.message.companies?.list_user?.data || [];
        const formattedRows = Newcomapnies.map((company: any) => ({
          id: company.id,
          company: company.company_name || null,
          plan: company?.company_subscription?.package_name || null,
          phone: company.company_government_number || null,
          email: company.email || null,
          address_proof_image: company?.address_proof_image,
          directorsName: company.directors_name,
          directorsemail: company.email,
          description: company.description,

        }));
        const Pagination = response.data.message.companies?.list_user || [];
        const paginationlength = Pagination?.to ?? paginationLength;
        setPaginationLength(paginationlength);
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [keyForRerender]);

  const handleAction = async (action: string, rowId: number) => {
    try {
      if (action === "Approve") {
        console.log(rowId);
        const response =
          await AdminAuthApiService.getapproveCompanyAdminDashboard(rowId);
      } else if (action === "Reject") {
        const response =
          await AdminAuthApiService.getrejectCompanyAdminDashboard(rowId);
      }
      // setActionClicked((prev) => ({
      //   ...prev,
      //   [rowId]: action,
      // }));
      setSelectedItemId(rowId);
      setAnchorEl(null);
      setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModel = (params: any) => {
    setOpenModel(true);
    setSelectedItemId(params.row.id);
  };
  const handleOpenModelReject = () => {
    setOpenModelReject(true);
    setOpenModel(false);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setOpenModelReject(false);
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
            xs={12}
            md={4.5}
            lg={4.5}
            xl={4.5}
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
              Request New Companies
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 5 }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ maxHeight: "450px" }}
          >
            <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
              <DataGrid
                rows={rows}
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
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{
                  display: { md: "flex", xs: "none" },

                  "& .MuiDataGrid-sortIcon": {
                    opacity: "0.5 !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 900,
                    color: "balck",
                  },
                  height: "55%",
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
              <Grid item xs={12} key={id}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack title={"Name"} body={item.company} />
                    <ResuableEventStack title={"Email"} body={item.email} />
                    <ResuableEventStack title={"Phone"} body={item.phone} />
                    <ResuableEventStack title={"Plan"} body={item.plan} />
                    <ResuableEventStack
                      body={
                        <Typography fontSize={14} fontWeight={700}>
                          {<CiMenuKebab />}
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
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4.5}
            lg={4.5}
            xl={4.5}
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
              History
            </Typography>
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
            {rows.map((item: any, index: any) => (
              <Grid item xs={12} key={id}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack title={"Name"} body={item.company} />
                    <ResuableEventStack title={"Email"} body={item.email} />
                    <ResuableEventStack title={"Phone"} body={item.phone} />
                    <ResuableEventStack title={"Plan"} body={item.plan} />
                    <ResuableEventStack
                      body={
                        <Typography fontSize={14} fontWeight={700}>
                          {<CiMenuKebab />}
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
        <Grid
          container
          sx={{ backgroundColor: "white", borderRadius: "6px", mt: 5 }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ maxHeight: "450px" }}
          >
            <Box sx={{ height: { md: 400, xs: 0 }, padding: 4 }}>
              <DataGrid
                rows={rows}
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
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{
                  display: { md: "flex", xs: "none" },

                  "& .MuiDataGrid-sortIcon": {
                    opacity: "0.5 !important",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 900,
                    color: "balck",
                  },
                  height: "55%",
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

      <CompanyDetailsModal
        open={openmodel}
        onClose={handleCloseModel}
        selectedItemIdProps={selectedItemId}
        handleOpenModelReject={handleOpenModelReject}
        handleAction={handleAction}
        pageNumber={pageNumber}
        rows={rows}
      />

      <RejectModelComponent
        selectedItemIdProps={selectedItemId}
        handleActionProps={handleAction}
        setOpenModelRejectProps={setOpenModelReject}
        open={openmodelreject}
        onClose={handleCloseModel}
      />
    </React.Fragment>
  );
};

export default WithLayout_AdminDashboard(Index);
