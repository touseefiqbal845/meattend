import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridSortModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Select, FormControl, InputLabel } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import CustomInput from "../../../components/Input/CustomInput";
import CustomButton from "../../../components/button/CustomButton";
import "./style.css";
import moment from "moment";
import Popover from "@mui/material/Popover";
import { CiMenuKebab } from "react-icons/ci";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import { RowDataExistingCompany } from "../admin-helpers/TypescriptInterface";
import ChartModal from "./Existing-Chart-Modal";
import UpdateModelComponent from "./Update-ExComp-Modal";
import CustomFilterSelect from "../../../components/Custom-Filter-Input-Field/CustomFilterInputField";
import ResuableEventStack from "../../../components/EventStack";
import { CustomCategories } from "../../../components/CustomCategoriesRowWise/CustomCategories";
import { lightTheme } from "../../../theme";
import { CustomNoRowsOverlay } from "../../../components/DataGridNoRows/DataGridNoRows";
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
  const [rows, setRows] = useState<RowDataExistingCompany[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [actionClicked, setActionClicked] = useState<{ [key: number]: string }>(
    {}
  );
  const [searchText, setSearchText] = useState("");

  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = React.useState(false);

  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [selectedValuefilter, setSelectedValueFilter] = useState<string>("");
  const [selectedValuesort, setSelectedValueSort] = useState<string>("");

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const theme = useTheme();
  const classes: any = useStyles();
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const handleAction = async (action: string, row: any) => {
    try {
      const rowId = row?.id || null;
      console.log("row", row);
      if (action === "Pause") {
        // const response =
        //   await AdminAuthApiService.AdminDashboard_Reports_action_Pause_company(
        //     Pausedata
        //   );
      } else if (action === "Block") {
        const response = await AdminAuthApiService.Block_ExistingCompany(rowId);
      }
      setSelectedItemId(rowId);
      setAnchorEl(null);
      setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const FilterCompanies = (company: any) => {
    const searchLowerCase = searchText.toLowerCase();
    return company.toLowerCase().includes(searchLowerCase);
  };

  const applyActiveBarSearchFilter = () => {
    if (searchText === "") {
      return rows;
    } else {
      return rows.filter((comp) => FilterCompanies(comp.company));
    }
  };
  const filteredCompanies = applyActiveBarSearchFilter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModel = (params: any) => {
    setOpenModelOne(true);
    setSelectedItemId(params.row.id);
  };
  const handleOpenModelSecound = (params: any) => {
    setOpenModelSecound(true);
    setSelectedItemId(params.row.id);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const columns: GridColDef[] = [
    {
      field: "company",
      headerName: "Company",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: classes.customHeader,
      // sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "plan",
      headerName: "Plan",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "earning",
      headerName: "Earning",
      width: 70,
      headerClassName: "custom-header",
    },
    {
      field: "paying",
      headerName: "Paying",
      width: 60,
      headerClassName: "custom-header",
    },
    {
      field: "followers",
      headerName: "Followers",
      width: 80,
      headerClassName: "custom-header",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 70,
      headerClassName: "custom-header",
    },

    {
      field: "memebersince",
      headerName: "Member Since",
      width: 110,
      headerClassName: "custom-header",
    },

    {
      field: "is_active",
      headerName: "Status",
      headerClassName: "custom-header",
      width: 110,
      renderCell: (params) => {
        console.log("params Blocked", params);
        let styles =
          params.row.is_block === 1
            ? { backgroundColor: "#FFDBDB", color: "#FD1F1F" }
            : { backgroundColor: "#CEF9EC", color: "#039A36" };
        return (
          <Chip
            label={params.row?.is_block === 1 ? "Blocked" : "UnBlocked"}
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
      width: 50,
      renderCell: (params: any) => (
        <div>
          {actionClicked[params.row.id] === "Pause" && (
            <span style={{ color: "#DE9300" }}>Pause</span>
          )}
          {actionClicked[params.row.id] === "Block" && (
            <span style={{ color: "#FD1F1F" }}>Block</span>
          )}

          {!actionClicked[params.row.id] && (
            <CiMenuKebab
              aria-describedby={params.id}
              onClick={(e) => {
                handleAction("", params.row);
                //@ts-ignore
                handleClick(e);
              }}
              style={{
                cursor: "pointer",
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
              horizontal: "left",
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "10px",
                width: "110px",
                borderRadius: "4px",
                borderTop: "4px solid #DE9300",
                cursor: "pointer",
              }}
            >
              <div
                onClick={() => handleOpenModel(params)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#DE9300",
                  fontFamily: "mulish",
                }}
                className="list-item"
              >
                <img
                  alt="edit"
                  src={require("../../../assets/popover admin icons/editpopover.png")}
                />

                <span style={{ marginLeft: "5px", color: "#DE9300" }}>
                  Edit
                </span>
              </div>
              <div
                onClick={() => handleOpenModelSecound(params)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#84858D",
                  fontFamily: "mulish",
                }}
                className="list-item"
              >
                <img
                  alt="view"
                  src={require("../../../assets/popover admin icons/eyepopover.png")}
                />

                <span style={{ marginLeft: "5px", color: "#84858D" }}>
                  View
                </span>
              </div>
              <div
                onClick={() => handleAction("Pause", params.row.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#84858D",
                  fontFamily: "mulish",
                }}
                className="list-item"
              >
                <img
                  alt="pause"
                  src={require("../../../assets/popover admin icons/pause.png")}
                />

                <span style={{ marginLeft: "5px", color: "#84858D" }}>
                  Pause
                </span>
              </div>
              <div
                onClick={() => handleAction("Block", params.row)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color:
                    actionClicked[params.row.id] === "Block"
                      ? "#84858D"
                      : "#84858D",
                  fontFamily: "mulish",
                }}
                className="list-item"
              >
                <img
                  alt="reject"
                  src={require("../../../assets/popover admin icons/reject.png")}
                />

                <span
                  style={{
                    marginLeft: "5px",
                    color:
                      actionClicked[params.row.id] === "Block"
                        ? "#84858D"
                        : "#84858D",
                  }}
                >
                  Block
                </span>
              </div>
            </div>
          </Popover>
        </div>
      ),
    },
  ];

  const handleCloseModelOne = () => setOpenModelOne(false);
  const handleCloseModelSecound = () => setOpenModelSecound(false);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response =
          await AdminAuthApiService.getExistingCompaniesListAdminDashboard(
            pageNumber
          );
        const Existingcomapnies =
          response.data.message.companies?.list_user?.data || [];
        const formattedRows = Existingcomapnies.map((company: any) => {
          const memberSinceDate = moment(company.created_at).format(
            "DD MMM YYYY"
          );

          return {
            id: company.id,
            company: company.company_name,
            plan: company?.company_subscription?.package_name || null,
            phone: company.company_government_number,
            memebersince: memberSinceDate,
            email: company.email,
            description: company.description,
            directorName: company?.directors_name,
            is_active: company.is_active,
            is_block: company.is_block,

          };
        });
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
            md={12}
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
              Manage Existing Companies
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={3.5}
            xl={3.5}
            sx={{
              marginTop: { xs: 5, md: 5 },
              paddingRight: {
                xs: 0,
                md: "16px",
                lg: "16px",
                xl: "16px",
              },
            }}
          >
            <CustomInput
              type="text"
              error={false}
              title="Search"
              inputFontSize={12}
              placeholder="Search Company"
              endImg={require("../../../assets/icons/Search.png")}
              height="40px"
              fontWeight={200}
              fontSize={12}
              showLabel={false}
              value={searchText}
              onChange={handleSearchChange}
              style={{ padding: 1.4 }}
            />
          </Grid>

          <Grid
            item
            xs={4}
            md={4}
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
            md={4}
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
            md={4}
            lg={1}
            xl={1}
            sx={{
              marginTop: { xs: 2, md: 5 },
            }}
          >
            <CustomButton
              marginLeft="0px"
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
                rows={filteredCompanies}
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
                    paginationModel: { page: 0, pageSize: 10 },
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
            {filteredCompanies.map((item: any, index: any) => (
              <Grid item xs={12} key={id}>
                <Box alignItems={"center"} borderRadius={3} p={1}>
                  <Box border={"2px solid #EEEEEE"} p={2} borderRadius={3}>
                    <ResuableEventStack title={"Company"} body={item.company} />
                    <ResuableEventStack title={"Email"} body={item.email} />
                    <ResuableEventStack title={"Phone"} body={item.phone} />
                    <ResuableEventStack title={"Plan"} body={item.plan} />
                    <ResuableEventStack title={"Earning"} body={""} />
                    <ResuableEventStack title={"Paying"} body={""} />
                    <ResuableEventStack title={"Followers"} body={""} />
                    <ResuableEventStack title={"Rating"} body={""} />
                    <ResuableEventStack
                      title={"Memeber Since"}
                      body={item.memebersince}
                    />

                    <ResuableEventStack
                      title={"Status"}
                      body={
                        <CustomCategories
                          textColor="#F30E0E"
                          bgColor="#FFDBDB"
                          title={"blocked"}
                        />
                      }
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

      <UpdateModelComponent
        selectedItemIdProps={selectedItemId}
        open={openmodelone}
        onClose={handleCloseModelOne}
        rows={rows}
      />

      <ChartModal
       open={openmodelsecound} 
       onClose={handleCloseModelSecound}
       Company_detail={rows}
       selectedItemIdProps={selectedItemId}

        />
    </React.Fragment>
  );
};

export default WithLayout_AdminDashboard(Index);
