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
import { useEffect, useState } from "react";
import { EventRowI, EventsResponse } from "../../../services/model";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { IMAGE_URL } from "../../../constant/env";
import moment from "moment";
import MRegisterApiService from "../../../services/MRegisterApiService";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
const VISIBLE_FIELDS = [
  "Event Name",
  "rating",
  "country",
  "dateCreated",
  "isAdmin",
];

export const Main = () => {
  const [allEvents, setAllEvents] = useState<EventsResponse>(
    {} as EventsResponse
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [gridRows, setGridRows] = useState<EventRowI[]>([]);
  const [paginationLength, setPaginationLength] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const completedEventObj = {
        active: "0",
        page: pageNumber,
      };
      const activeEventObj = {
        ...completedEventObj,
        active: "1",
      };
      try {
        const [activeEvents, completedEvents] = await axios.all<AxiosResponse>([
          MRegisterApiService.getEvents(JSON.stringify(activeEventObj)),
          MRegisterApiService.getEvents(JSON.stringify(completedEventObj)),
        ]);
        const allEvents = [
          ...(activeEvents.data!.active?.data ?? []),
          ...(completedEvents.data!.completed?.data ?? []),
        ];

        const rowsData = allEvents.map((item) => ({
          id: item.id,
          image:
            _.size(item.event_images) > 0
              ? `${IMAGE_URL}${item.event_images[0].image}`
              : "",
          eventName: item.event_name,
          eventAddress: item.event_address,
          dateAndTime:
            moment(item.from_time).format("DD MMM") +
            " - " +
            moment(item.to_time).format("DD MMM"),
          categories: item.category_id!,
          attending: 35,
          action: "ONGOING",
        }));
        setPaginationLength(
          completedEvents.data?.completed?.to ?? paginationLength
        );
        setGridRows(rowsData!);
        setAllEvents({ ...activeEvents.data, ...completedEvents.data });
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [pageNumber]);

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
              src={params.row.image}
            />
            <Typography fontSize={14} color={"#84858D"}>
              {params.row.eventName}
            </Typography>
          </Stack>
        );
      },
      field: "eventName",
      headerName: "Event Name",
      type: "string",
      width: 230,
    },
    {
      field: "eventAddress",
      headerName: "Event Address",
      type: "string",
      width: 300,
      editable: true,
    },
    {
      field: "dateAndTime",
      headerName: "Date And Time",
      type: "string",
      width: 140,
      editable: true,
    },
    {
      renderCell: (params) => (
        <Stack direction={"row"} spacing={1}>
          <CustomCategories title={"Music"} />
          <CustomCategories title={"Cubbing"} />
          <CustomCategories title={"Rnb"} />
        </Stack>
      ),
      field: "categories",
      headerName: "Categories",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "attending",
      headerName: "Attending",
      type: "number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      renderCell: (params) => (
        <>
          <Typography
            fontSize={14}
            fontWeight={700}
            color={
              params.row.action === "ONGOING"
                ? "#04CAA5"
                : params.row.action === "COMPLETE"
                ? "#DE9300"
                : "#FD1F1F"
            }
          >
            {params.row.action}
          </Typography>
        </>
      ),
      field: "action",
      headerName: "Action",
      type: "string",
      width: 110,
      editable: true,
    },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("🚀 ~ handlePageChange ~ value:", value);
    setPageNumber(value);
  };

  const CustomBox = ({
    figure,
    title,
    img,
    color,
  }: {
    figure: string;
    title: string;
    img: string;
    color: string;
  }) => {
    return (
      <Box
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
        display={"flex"}
        alignItems={"center"}
        borderRadius={3}
        py={1}
      >
        <Box width={50} height={50} component={"img"} src={img} padding={2} />
        <Box>
          <Typography fontSize={30} fontWeight={800} color={color}>
            {figure}
          </Typography>
          <Typography color={"#3F435E"} fontWeight={500} fontSize={12}>
            {title}
          </Typography>
        </Box>
      </Box>
    );
  };

  const CustomPagination = () => {
    return (
      <Box display="flex" justifyContent="center" flexGrow={1}>
        <Pagination
          count={paginationLength}
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
    );
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
    <Container maxWidth={false}>
      <Grid container direction={"row"} columnSpacing={2} rowSpacing={2}>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#DE9300"}
            figure={String(
              allEvents.active?.total! + allEvents.completed?.total! ?? 0
            )}
            title={"Total Events"}
            img={require("../../../assets/navIcons/events.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#04CAA5"}
            figure={"1.6K"}
            title={"Total Location"}
            img={require("../../../assets/navIcons/locations.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#0884E2"
            figure={"4.1K"}
            title={"Total Income"}
            img={require("../../../assets/navIcons/income.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#FD1F1F"
            figure={"5.2K"}
            title={"Total Followers"}
            img={require("../../../assets/navIcons/followers.png")}
          />
        </Grid>
      </Grid>
      <Box mb={3}>
        <Typography
          mt={{ xs: 5 }}
          fontSize={30}
          fontWeight={700}
          color={"#000315"}
        >
          Total Events
        </Typography>
        <Typography></Typography>
      </Box>
      <DataGrid
        slots={{
         
            noRowsOverlay: CustomNoRowsOverlay,
         
          pagination: (data) => {
            return <CustomPagination {...data} />;
          },
          toolbar: CustomToolbar,
        }}
        sx={{
          height: "55%",
          borderWidth: 0,
          ".highlight": {
            color: "grey",
            // "&:hover": {
            //   color: "red",
            // },
          },
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
    </Container>
  );
};

export default WithLayout(Main);
