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
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import moment from "moment";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import { useNavigate } from "react-router-dom";
import ResuableEventStack from "../../../components/EventStack";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

export const Index = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = React.useState(false);

  const [paginationLength, setPaginationLength] = useState<number>(0);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const [gridRows, setGridRows] = useState<any[]>([
    {
      id: 1,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 2,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 3,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 4,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 5,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 6,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 7,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 8,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 9,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 10,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 11,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 12,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 13,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 14,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },
    {
      id: 15,
      ticketNumber: "1",
      orderNumber: "1",
      ticketName: "Ticket Name",
      ticketPrice: "100",
      ticketDescription: "Ticket Description",
      eventName: "Event Name",
      eventDate: "Event Date",
      eventTime: "Event Time",
      eventAddress: "Event Address",
      ticketAllocated: "Ticket Allocated",
      noTickets: "Number of Tickets",
      ticketCode: "Ticket Qr Code",
      createDate: "Create Date",
      status: "Status",
      companyName: "Company Name",
      action: "ONGOING",
    },

  ]);

  function CustomCategories({
    title,
    bgColor = "FFC000",
    textColor = "black",
  }: {
    title: string;
    bgColor?: string;
    textColor?: string;
  }) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={bgColor}
        borderRadius={1}
        height={21}
        minWidth={35}
        paddingX={0.2}
      >
        <Typography color={textColor} fontSize={8} fontWeight={700}>
          {title}
        </Typography>
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "ticketNumber",
      headerName: "Ticket Number",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
    },
    {
      field: "orderNumber",
      headerName: "Order Number",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "ticketName",
      headerName: "Ticket Name",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "ticketPrice",
      headerName: "Ticket Price",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "ticketDescription",
      headerName: "Ticket Description",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "eventName",
      headerName: "Event Name",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "eventTime",
      headerName: "Event Time",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "eventAddress",
      headerName: "Event Address",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "ticketAllocated",
      headerName: "Ticket Allocated",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "noTickets",
      headerName: "Number of Tickets",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "ticketCode",
      headerName: "Ticket Qr Code",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 140,
      editable: true,
    },

    {
      renderCell: (params) => (
        <Stack direction={"row"} spacing={1}>
          <CustomCategories title={"Cancel"} />
          <CustomCategories title={"Active"} />
        </Stack>
      ),
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      headerClassName: "super-app-theme--header",
      type: "string",
      width: 160,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };




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
    <Container maxWidth={false} 
    sx={{
      width: "100%",
      maxWidth: "100%",
      margin: "0 auto",
      overflow: "hidden",
      backgroundColor: "#FBFBFB",
    }}
    >
      <Grid container pb={2} 
       
      >
        <Grid item md={10.5} xs={6}>
          <Typography
            mt={{ xs: 3 }}
            fontSize={{ md: 30, xs: 20 }}
            fontWeight={700}
            color={"gray.graphTitle"}
          >
            Ticket Details
          </Typography>
        </Grid>
        <Grid item md={1.5} xs={6} display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            onClick={() => navigate("/createTicket")}
            sx={{
              backgroundColor: "#FFC000",
              boxShadow: "none",
              color: "black",
              textTransform: "none",
              borderRadius: "7px",
              fontSize: { xs: 10, md: 12 },
              alignSelf: "center",
              fontWeight: 700,
              mt: 3,
              width: {
                md: "140px",
                xs: "120px",
              },
              height: { md: "42px", xs: "30px" },
              "&:hover": {
                color: "white",
              },

              // width: { xs: "100px", md: "120px" },
            }}
          >
            Create Ticket
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        checkboxSelection
        loading={loading}
        slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          toolbar: CustomToolbar,
          pagination: (data) => {
            return (
              <CustomPagination
                paginationLength={3}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            );
          },
        }}
        sx={{
          display: { md: "flex", xs: "none" },

          height: "55%",
          border: "1px solid black",
          //change checkbox border color
          "& .MuiCheckbox-root": {
            color: "#A3A3A3",
          },
          // change row border color
          "& ::-webkit-scrollbar": {
            "border-top": "1px solid #e9e9ec",
            height: "7px",
          },
          "& ::-webkit-scrollbar-thumb": {
            "border-radius": "15px",
            "background-color": "#6d6d6dc9",
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
                    title={"Ticket Number"}
                    body={item.ticketNumber}
                  />
                  <ResuableEventStack
                    title={"Order Number"}
                    body={item.orderNumber}
                  />
                  <ResuableEventStack
                    title={"Ticket Name"}
                    body={item.ticketName}
                  />
                  <ResuableEventStack
                    title={"Ticket Price"}
                    body={item.ticketPrice}
                  />
                  <ResuableEventStack
                    title={"Ticket Description"}
                    body={item.ticketDescription}
                  />
                  <ResuableEventStack
                    title={"Event Name"}
                    body={item.eventName}
                  />
                  <ResuableEventStack
                    title={"Event Date"}
                    body={item.eventDate}
                  />
                  <ResuableEventStack
                    title={"Event Time"}
                    body={item.eventTime}
                  />
                  <ResuableEventStack
                    title={"Event Address"}
                    body={item.eventAddress}
                  />
                  <ResuableEventStack
                    title={"Ticket Allocated"}
                    body={item.ticketAllocated}
                  />
                  <ResuableEventStack
                    title={"Number of Tickets"}
                    body={item.noTickets}
                  />
                  <ResuableEventStack
                    title={"Ticket Qr Code"}
                    body={item.ticketCode}
                  />
                  <ResuableEventStack
                    title={"Create Date"}
                    body={item.createDate}
                  />
                  <ResuableEventStack
                    title={"Status"}
                    body={
                      <Stack direction={"row"} spacing={1}>
                        <CustomCategories
                          textColor="#039A36"
                          bgColor="#CEF9EC"
                          title={"Cancel"}
                        />
                        <CustomCategories
                          textColor="#F30E0E"
                          bgColor="#FFDBDB"
                          title={"Active"}
                        />
                      </Stack>
                    }
                  />
                  <ResuableEventStack
                    title={"Company Name"}
                    body={item.companyName}
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

export default WithLayout(Index);
