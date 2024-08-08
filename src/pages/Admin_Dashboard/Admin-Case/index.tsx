import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ChangeEvent } from "react";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import CaseModal from "./CaseModal";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";

function Index() {
  const [open, setOpen] = React.useState(false);

  const CustomPagination = () => {
    function handlePageChange(event: ChangeEvent<unknown>, page: number): void {
      console.log(page);
    }

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
          onChange={handlePageChange}
          page={1}
        />
      </Box>
    );
  };

  function CustomCategories({ title }: { title: string }) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"#FFC000"}
        borderRadius={1}
        height={21}
        minWidth={35}
        paddingX={0.2}
      >
        <Typography color={"black"} fontSize={8} fontWeight={700}>
          {title}
        </Typography>
      </Box>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "refNumber",
      headerName: "Ref number",
      type: "string",
      width: 230,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 300,
      editable: true,
    },
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
              src={params.row.eventImage}
            />
            <Typography fontSize={14} color={"#84858D"}>
              {params.row.eventName}
            </Typography>
          </Stack>
        );
      },
      field: "event",
      headerName: "Event",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      renderCell: (params) => {
        return (
          <Stack
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={1}
          >
            <Avatar
              sizes="small"
              sx={
                {
                  // width: "50%",
                  // height: "50%",
                }
              }
              src={params.row.image}
            />
            <Typography fontSize={14} color={"#84858D"}>
              {params.row.eventName}
            </Typography>
          </Stack>
        );
      },
      field: "user",
      headerName: "User",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => <CustomCategories title={"Open"} />,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "closeDate",
      headerName: "Close Date",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      renderCell: (params) => (
        <Button
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            border: "none",
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          <Typography
            fontSize={14}
            fontWeight={700}
            color={"primary"}
            textTransform={"capitalize"}
          >
            View
          </Typography>
        </Button>
      ),
      field: "action",
      headerName: "Action",
      type: "string",
      width: 110,
      editable: true,
    },
  ];

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Box mb={3}>
          <Typography
            mt={{ xs: 5 }}
            fontSize={30}
            fontWeight={700}
            color={"#000315"}
          >
            Case
          </Typography>
          <Typography></Typography>
        </Box>
        <DataGrid
          slots={{
        
              noRowsOverlay: CustomNoRowsOverlay,
         
            pagination: (data) => {
              return <CustomPagination {...data} />;
            },
            toolbar: Toolbar,
          }}
          sx={{
            // height: "55%",
            borderWidth: 0,
            ".highlight": {
              color: "grey",
              // "&:hover": {
              //   color: "red",
              // },
            },
          }}
          rows={[
            {
              id: 1,
              refNumber: "1",
              description: "Good Event",
              eventName: "Event1",
              eventImage: "https://via.placeholder.com/150",
              userImage: "https://via.placeholder.com/150",
              userName: "Test",
              status: "Open",
              createDate: "2021-10-10",
              closeDate: "2021-10-10",
              action: "ONGOING",
            },
            
          ]}
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
        <CaseModal open={open} handleClose={handleCloseModal} />
      </Container>
    </React.Fragment>
  );
}

export default WithLayout_AdminDashboard(Index);
