import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../../../components/button/CustomButton";
import { CompanyModel } from "../admin-helpers/TypescriptInterface";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";

interface CompanyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  selectedItemIdProps: number | null;
  handleOpenModelReject: () => void;
  handleAction: (action: string, itemId: number) => void;
  pageNumber: number;
  rows: any;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  selectedItemIdProps,
  open,
  onClose,
  handleOpenModelReject,
  handleAction,
  pageNumber,
  rows,
}) => {
  // const [rows, setRows] = useState<any[]>([]);
  const [modelData, setModelData] = useState<CompanyModel[]>([]);
  const selectedRow = rows.find((row: any) => row.id === selectedItemIdProps);
  console.log(selectedRow)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await AdminAuthApiService.getNewCompaniesListAdminDashboard(
            pageNumber
          );
        const Newcompanies =
          response.data.message.companies?.list_user?.data || [];
        const formattedRows = Newcompanies.map((company: any) => ({
          id: company.id,
          company: company.company_name || null,
          plan: company?.company_subscription?.package_name || null,
          phone: company.company_government_number || null,
          email: company.email || null,
        }));
        const ModelData = Newcompanies.map((company: any) => ({
          id: company.id,
          company: company.company_name,
          plan: company?.company_subscription?.package_name || null,
          company_government_number: company.company_government_number,
          email: company.email,
          directorsName: company.directors_name,
          directorsemail: company.email,
          description: company.description,
          company_bill_image: company.company_bill_image,
          address_proof_image: company.address_proof_image,
        }));
        setModelData(ModelData);
        // setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

       const imageUrl = `https://staging-resources.meattend.com/${selectedRow?.address_proof_image}`;
       console.log(imageUrl)
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "company_bill.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleRemoveImage = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <React.Fragment>
        <IconButton
          sx={{
            position: "absolute",

            top: "8vh",
            right: (theme) => ({
              lg: theme.breakpoints.up("lg") ? "20vw" : "unset",
              md: theme.breakpoints.up("md") ? "18vw" : "unset",
              sm: theme.breakpoints.up("sm") ? "15vw" : "unset",
              xs: theme.breakpoints.up("xs") ? "1vw" : "unset",
            }),
            color: "white",
          }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            top: (theme) => ({
              md: theme.breakpoints.up("md") ? "70%" : "unset",
              xs: theme.breakpoints.up("xs") ? "70%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "100%", md: "100%" },
            minWidth: { xs: "80%", sm: "50%", md: "50%" },
            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comapnay Details
          </Typography>
          <hr />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: { md: "nowrap", sm: "wrap" },
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "100%" },
                flexWrap: "wrap",
              }}
            >
              <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
                <Typography sx={{ color: "black", fontWeight: 700 }}>
                  Company name
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.company}

                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Email Address
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.email}
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Categories
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  Gallary
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Director email
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.email}

                </Typography>
              </Box>
            </Box>

            {/* Right Side */}
            <Box sx={{ flexBasis: { xs: "100%", md: "65%" } }}>
              <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
                <Typography sx={{ color: "black", fontWeight: 700 }}>
                  Company government number
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.company_government_number}


                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Industry
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  Art
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Directors name
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  {selectedRow?.directorsName}
                </Typography>
              </Box>
            </Box>
          </Box>
          <br />
          <span style={{ color: "black", fontWeight: 700, marginRight: "5px" }}>
            Description
          </span>
          <br />
          <br />
          <span style={{ color: "#84858D", fontWeight: 400 }}>
          {selectedRow?.description}

          </span>
          <br />
          <br />
          <span style={{ color: "black", fontWeight: 700, marginRight: "5px" }}>
            Comapny bill
          </span>
          <br />
          <br />
          <div style={{ position: "relative" }}>
            <IconButton
              onClick={handleDownload}
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                zIndex: 1,
              }}
            >
              <GetAppIcon />
            </IconButton>
            <img
              alt="User Avatar"
              src={imageUrl}
              style={{ width: 140, height: 130 }}
            />
          </div>
          <Grid
            container
            marginTop={2}
            marginBottom={8}
            sx={{ marginBottom: "50px" }}
          >
            <Grid item md={2} xs={12}>
              <CustomButton
                marginTop="2px"
                notArrow
                // mdFullWidth
                title="Reject"
                color="#A0A3B5"
                borderColor="#A0A3B5"
                bgColor="white"
                // fullWidth
                xsWidth={"100%"}
                XFontSize="16"
                MFontSize="16"
                onClick={handleOpenModelReject}
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                paddingLeft: { md: 2, sm: 0 },
                marginTop: { md: 0, sm: 2 },
              }}
            >
              <CustomButton
                marginLeft="0px"
                marginTop="0px"
                marginBottom="150px"
                notArrow
                // mdFullWidtha
                xsWidth={"100%"}
                title="Approve"
                XFontSize="16"
                MFontSize="16"
                onClick={() => {
                  if (selectedItemIdProps !== null) {
                    handleAction("Approve", selectedItemIdProps);
                    onClose();
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    </Modal>
  );
};

export default CompanyDetailsModal;
