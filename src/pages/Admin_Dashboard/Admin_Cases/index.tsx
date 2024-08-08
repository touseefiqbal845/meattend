import React, { useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Grid, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./style.css";
import Avatar from "@mui/material/Avatar";
import { CiMenuKebab } from "react-icons/ci";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import { Admin_Cases_RowData } from "../admin-helpers/TypescriptInterface";
import CreateCase from "./CreateCase";
import CustomButton from "../../../components/button/CustomButton";
import ResuableEventStack from "../../../components/EventStack";
import { CustomCategories } from "../../../components/CustomCategoriesRowWise/CustomCategories";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

const Index: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = React.useState(false);

  const [paginationLength, setPaginationLength] = useState<number>(0);

  const columns: GridColDef[] = [
    { field: "refId", headerName: "Ref No", width: 100 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "events",
      headerName: "Event",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value.avatar} />
            {params.value.username}
          </>
        );
      },
    },
    {
      field: "reporter",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value.avatar} />
            {params.value.username}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        let styles =
          params.row.is_active == 1
            ? { backgroundColor: "#CEF9EC", color: "#039A36" }
            : { backgroundColor: "#FFDBDB", color: "#F30E0E" };
        return (
          <Chip
            label={params.row.is_active == 1 ? "Close" : "Open"}
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
    { field: "created_date", headerName: "Created Date", width: 120 },
    { field: "closed_date", headerName: "Closed Date", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 70,

      renderCell: (params) => (
        <div>
          <CiMenuKebab />
        </div>
      ),
    },
  ];

  const generateUser = (
    id: number,
    refId: number,
    username: string,
    description: string,
    created_date: string,
    closed_date: string,
    avatar: string
  ) => ({
    id,
    refId,
    events: {
      username,
      avatar,
    },
    reporter: {
      username,
      avatar,
    },
    description,
    created_date,
    closed_date,
  });

  const rows: Admin_Cases_RowData[] = [
    generateUser(
      1,
      27912,
      "William",
      "meAttend is for attending events,",
      "12 Nov 2024",
      "12 Nov 2024",
      "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    ),
    generateUser(
      2,
      53912,
      "William",
      "meAttend is for attending events,",
      "12 Nov 2024",
      "12 Nov 2024",
      "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    ),
    generateUser(
      3,
      83912,
      "William",
      "meAttend is for attending events,",
      "12 Nov 2024",
      "12 Nov 2024",
      "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    ),
    generateUser(
      4,
      73912,
      "William",
      "meAttend is for attending events,",
      "12 Nov 2024",
      "12 Nov 2024",
      "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    ),
    generateUser(
      5,
      13912,
      "William",
      "meAttend is for attending events,",
      "12 Nov 2024",
      "12 Nov 2024",
      "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    ),
  ];

  const handleClose = () => setOpen(false);
  const sortModel: GridSortModel = [{ field: "id", sort: "asc" }];

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
          <Grid item xs={12} md={10} sx={{ marginTop: { xs: 0, md: 0 } }}>
            <Typography
              sx={{
                fontSize: "30px",
                lineHeight: "36px",
                fontWeight: 700,
                color: "black",
                fontFamily: "Mulish",
              }}
            >
              Case
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{ marginTop: { xs: 2, md: 0 }, marginBottom: { xs: 2, md: 0 } }}
          >
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              title="Create Case"
              XFontSize="16px"
              MFontSize="16px"
              xsHeight={42}
              xsWidth="100%"
              onClick={() => setOpen(true)}
            >
              <img src={require("../../../assets/icons/add.png")} />
            </CustomButton>
          </Grid>
        </Grid>
        <Grid container sx={{ backgroundColor: "white" }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                  pagination: (data) => {
                    return (
                      <CustomPagination
                        paginationLength={10}
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
            </div>
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
                    <ResuableEventStack body={item.refId} title="Ref no" />
                    <ResuableEventStack
                      body={item.description}
                      title="Description"
                    />
                    <ResuableEventStack
                      body={
                        <CustomCategories
                        //@ts-ignore
                          textColor="#039A36"
                          bgColor="#CEF9EC"
                          title={"Open"}
                        />
                      }
                      title="Status"
                    />
                    <ResuableEventStack
                      body={item.created_date}
                      title="Created Date"
                    />
                    <ResuableEventStack
                      body={item.closed_date}
                      title="Closed Date"
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

      <CreateCase open={open} onClose={handleClose} />
      
    </React.Fragment>
  );
};

export default WithLayout_AdminDashboard(Index);
