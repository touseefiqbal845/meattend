import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import CustomButton from "../../../components/button/CustomButton";
import { Avatar, Stack } from "@mui/material";
import Popover from "@mui/material/Popover";
import { FaEye } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { IoPauseCircleOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import ReportModal from "./ReportsModels";
import CreateCase from "../Admin_Cases/CreateCase";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ResuableEventStack from "../../../components/EventStack";
import { CustomCategories } from "../../../components/CustomCategoriesRowWise/CustomCategories";


const Index: React.FC = () => {
  const [openmodelone, setOpenModelOne] = useState<boolean>(false);
  const [createcase, setCreateCase] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [actionClicked, setActionClicked] = useState<{ [key: number]: string }>(
    {}
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);

  // Handle actions like pause and block
  const handleAction = async (action: string, row: any) => {
    try {
      const rowId = row?.id || null;
      const Pausedata = { id: rowId, block_status: 0 };
      const Blockeddata = { id: rowId, block_status: 1 };

      if (action === "Pause") {
        const response =
          await AdminAuthApiService.AdminDashboard_Reports_action_Pause_company(
            Pausedata
          );
      } else if (action === "Block") {
        const response =
          await AdminAuthApiService.AdminDashboard_Reports_action_Block_company(
            Blockeddata
          );
      }
      setSelectedItemId(rowId);
      setAnchorEl(null);
      setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  // Handle click event to open popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle opening the modal
  const handleOpenModel = (rowId: number) => {
    setOpenModelOne(true);
    setSelectedItemId(rowId);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Columns configuration for DataGrid
  const columns: GridColDef[] = [
    {
      field: "issueId",
      headerName: "Issue ID",
      width: 50,
      minWidth: 50,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        let styles =
          params.row.status == 1
            ? { backgroundColor: "#CEF9EC", color: "#039A36" }
            : { backgroundColor: "#CEF9EC", color: "#039A36" };
        return (
          <Chip
            label={params.row.status == 1 ? "Blocked" : "UnBlocked"}
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
    { field: "summry", headerName: "Summary", minWidth: 200, flex: 1 },
    {
      field: "reporter",
      headerName: "Reported By",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={params.value.avatar} />
            <Typography
              sx={{
                fontFamily: "Mulish",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "19px",
                letterSpacing: "0.5px",
                color: "black",
              }}
            >
              {params.value.username}
            </Typography>
          </Stack>
        );
      },
    },
    { field: "due_date", headerName: "Due Date", minWidth: 200, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: any) => (
        <div>
          {!actionClicked[params.row.id] && (
            <CiMenuKebab
              aria-describedby={params.id}
              onClick={(e) => {
                handleAction("", params.row);
                //@ts-ignore
                handleClick(e);
              }}
            >
              Open Popover
            </CiMenuKebab>
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
                onClick={() => handleOpenModel(params.row?.id)}
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
                onClick={() => handleAction("Pause", params.row)}
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
                  Unblock
                </Typography>
              </Box>
              <Box
                component="div"
                onClick={() => handleAction("Block", params.row)}
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
                  Block
                </Typography>
              </Box>
            </Box>
          </Popover>
        </div>
      ),
    },
  ];

  // Fetch getAdminDashboardReports
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await AdminAuthApiService.getAdminDashboardReports(
          358
        );
        const ReportedData = response?.data?.reported_events?.data || [];
        const formattedRows = ReportedData.map((report: any) => ({
          id: report?.id || null,
          issueId: report?.report_id.toString() || "",
          status: report?.block_status || null,
          summry: report?.report?.report_title || "",
          reporter: {
            username: `${report?.user?.first_name || ""} ${
              report?.user?.last_name || ""
            }`,
            avator: report?.user?.profile_image || "",
          },
          due_date: report?.blocked_at || "",
        }));
        const Pagination = response?.data?.reported_events || [];
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
  }, [keyForRerender,pageNumber]);

  const handleCloseModelOne = () => setOpenModelOne(false);
  const handleCloseCreateCase = () => setCreateCase(false);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
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
            md={10}
            lg={10}
            xl={10}
            sx={{
              marginTop: { xs: 5, md: 1 },
              marginBottom: { xs: 2, md: 0 },
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
              Reports
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{ paddingLeft: { xs: 0, md: 0 }, marginTop: { xs: 2, md: 1 } }}
          >
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              title="Create Case"
              XFontSize="16"
              MFontSize="16"
              xsHeight={42}
              xsWidth="100%"
              onClick={() => setCreateCase(true)}
            >
              <img alt="case" src={require("../../../assets/icons/add.png")} />
            </CustomButton>
          </Grid>
        </Grid>
        <Grid container sx={{ backgroundColor: "white", borderRadius: "6px" }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ height:{md: 400,xs:0} , padding: 4 }}>
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
                    paginationModel: { pageSize: 30 },
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
            // ref={ref}
            style={{
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {rows.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack body={item.issueId} title="Issue ID" />
                    <ResuableEventStack
                      body={item.summry}
                      title="Summary"
                    />
                    <ResuableEventStack
                      body={
                        <CustomCategories
                        //@ts-ignore
                          textColor="#039A36"
                          bgColor="#CEF9EC"
                          title={"Unblocked"}
                        />
                      }
                      title="Status"
                    />
                    <ResuableEventStack
                      body={item.reporter?.username}
                      title="Reported By"
                    />
                    <ResuableEventStack
                      body={item.due_date}
                      title="Due Date"
                    />

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
      <CreateCase open={createcase} onClose={handleCloseCreateCase} />

      <ReportModal open={openmodelone} onClose={handleCloseModelOne} />
    </React.Fragment>
  );
};

export default WithLayout_AdminDashboard(Index);
