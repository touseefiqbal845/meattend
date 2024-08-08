import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import CustomButton from "../../../components/button/CustomButton";
import "./style.css";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import CustomFilterSelect from "../../../components/Custom-Filter-Input-Field/CustomFilterInputField";
import { lightTheme } from "../../../theme";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
import ResuableEventStack from "../../../components/EventStack";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

const { DataGrid_Design_ToolKit } = lightTheme.palette;
const { Page_Header, DataGrid_Header } = DataGrid_Design_ToolKit;
//@ts-ignore
const useStyles = makeStyles(() => ({
  customHeader: {
    color: DataGrid_Header.color,
    fontWeight: DataGrid_Header.fontWeight,
    fontSize: DataGrid_Header.fontSize,
    lineHeight: DataGrid_Header.lineHeight,
  },
}));

const Index: React.FC = () => {
  const [openmodelone, setOpenModelOne] = useState<boolean>(false);
  const [openmodelsecound, setOpenModelSecound] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(0);

  const [selectedValuefilter, setSelectedValueFilter] = useState<string>("");
  const [selectedValuesort, setSelectedValueSort] = useState<string>("");

  const theme = useTheme();
  const classes: any = useStyles();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "Name",
      width: 210,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Avatar src={params.value.avatar} />
      //       {params.value.username}
      //     </>
      //   );
      // },
    },
    { field: "currentlocation", headerName: "Locations", width: 230 },
    { field: "phone", headerName: "Phone", width: 230 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <CustomButton
            marginLeft="px"
            marginTop="px"
            notArrow
            title="View"
            XFontSize="16"
            // MFontSize="16"
            //    onClick={handleLocationForm}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await AdminAuthApiService.getUserListAdminDashboard(
          //@ts-ignore
          pageNumber
        );
        console.log("usersList", response.data);
        const users = response.data.message.users?.all_list || [];
        console.log("users", users);
        const formattedRows = users.map((user: any) => ({
          id: user.id,
          user: `${user.first_name} ${user.last_name}`,
          currentlocation: user?.country || null,
          phone: user.mobile_number || null,
          email: user.email_id,
        }));
        const Pagination = response.data.message.users?.all_list || [];
        const paginationlength = Pagination?.to ?? paginationLength;
        setPaginationLength(paginationlength);
        setRows(formattedRows);

        console.log(":formattedRows", formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [pageNumber]);

  const handleChangeFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValueFilter(event.target.value as string);
  };
  const handleChangeSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValueSort(event.target.value as string);
  };
  const options = [
    { value: "option1", label: "Name" },
    { value: "option2", label: "Plan" },
  ];

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
          backgroundColor: theme.palette.DataGrid_Design_ToolKit.bg_color,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
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
              Manage Users
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            md={2}
            lg={1.5}
            xl={1.5}
            sx={{
              marginTop: { xs: 2, md: 5 },
              marginBottom: { xs: 2, md: 0 },

              paddingRight: {
                xs: 1,
                md: "16px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            <CustomFilterSelect
              label="Filter By"
              options={options}
              value={selectedValuefilter}
              onChange={handleChangeFilter}
            />
          </Grid>

          <Grid
            item
            xs={4}
            md={2}
            lg={1.5}
            xl={1.5}
            sx={{
              marginTop: { xs: 2, md: 5 },
              paddingRight: {
                xs: 1,
                md: "16px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            <CustomFilterSelect
              label="Sort By"
              options={options}
              value={selectedValuesort}
              onChange={handleChangeSort}
            />
          </Grid>

          <Grid
            item
            xs={4}
            md={2}
            lg={1}
            xl={1}
            sx={{
              marginTop: { xs: 2, md: 5 },
            }}
          >
            <CustomButton
              marginLeft="4px"
              marginTop="2px"
              notArrow
              title="Print"
              XFontSize="16"
              MFontSize="16"
              xsHeight={42}
              xsWidth="100%"
              // onClick={addStaffHandler}
            >
              <PrintOutlinedIcon
                style={{ height: "18px", width: "24px", color: "#3F435E" }}
              />
            </CustomButton>
          </Grid>
        </Grid>
        <Grid container sx={{ backgroundColor: "white", borderRadius: "6px" }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
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
                        paginationLength={10}
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
            {rows.map((item: any, index: any) => (
              <Grid item xs={12} key={item?.id}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack body={item.id} title="ID" />
                    <ResuableEventStack body={item.user} title="Name" />

                    <ResuableEventStack
                      body={item.currentlocation}
                      title="Location"
                    />
                    <ResuableEventStack body={item.phone} title="Phone" />
                    <ResuableEventStack body={item.email} title="Email" />

                    <ResuableEventStack
                      body={
                        <Typography fontSize={14} fontWeight={700}>
                          <div>
                            <CustomButton
                              marginLeft="px"
                              marginTop="px"
                              notArrow
                              title="View"
                              XFontSize="16"
                              // MFontSize="16"
                              //    onClick={handleLocationForm}
                            />
                          </div>
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
    </React.Fragment>
  );
};

export default WithLayout_AdminDashboard(Index);
