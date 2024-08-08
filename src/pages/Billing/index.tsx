import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Grid, Stack } from "@mui/material";
import { usePDF } from "react-to-pdf";
import Box from "@mui/material/Box";
import CustomButton from "../../components/button/CustomButton";
import WhiteCustomButton from "../../components/button/WhiteCustomButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import Paper from "@mui/material/Paper";
import dayjs, { Dayjs } from "dayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { MdOutlineMail } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import ChildComponent from "./ChildComponent";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import MAuthApiService from "../../services/MAuthApiService";
import { SubscriptionData } from "../../services/model";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface MyProfile {
  package_type: any;
}

const Index = () => {
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(
    dayjs(" Date and Time")
  );
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = useState<MyProfile | null>(null);

  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        //@ts-ignore
        const responseGetProfile = await MAuthApiService.getProfile();
        const profileData = responseGetProfile?.data;
        setProfile(profileData);
        console.log("profile,", responseGetProfile);
        const response = await MUserDashboardPagesApiService.billingInvoice();
        const SubscriptionData = response?.data;
        setSubscription(SubscriptionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formattedDate = subscription?.invoice?.created
    ? new Date(subscription.invoice.created * 1000).toLocaleDateString(
        "en-US",
        {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }
      )
    : "";

  //Address Formation
  const fullAddress = subscription?.company.address;
  const addressParts = fullAddress ? fullAddress.split(",") : [];
  const addressLine1 = addressParts[0] || "";
  const addressLine2 = addressParts[1] || "";
  const addressLine3 = addressParts[2] || "";
  const city = addressParts[3] || "";
  const country = addressParts[4] || "";
  const state = addressParts[5] || "";
  const zipcode = addressParts[6] || "";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Grid
        container
        padding={3}
        style={{ backgroundColor: "#FBFBFB", overflow: "hidden" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginTop: { xs: 1, md: 1, lg: 1, xl: 1 } }}
        >
          <h2>Billing </h2>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{
            paddingRight: { xs: 2, md: 1, lg: 1, xl: 1 },

            marginTop: { xs: 3, md: 3 },
          }}
        >
          <WhiteCustomButton
            // marginLeft="12px"
            marginTop="2px"
            notArrow
            title="Invoice"
            XFontSize="16"
            // width="100px"
            MFontSize="16"
            xsHeight={42}
            xsWidth="100%"
            onClick={handleOpen}
          >
            <IoMdPrint
              style={{ height: "18px", width: "24px", color: "#3F435E" }}
            />
          </WhiteCustomButton>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{
            paddingRight: { xs: 2, md: 1, lg: 1, xl: 1 },

            marginTop: { xs: 3, md: 3 },
          }}
        >
          <WhiteCustomButton
            // marginLeft="12px"
            marginTop="2px"
            notArrow
            title="Print"
            XFontSize="16"
            // width="100px"
            MFontSize="16"
            xsHeight={42}
            xsWidth="100%"
            // onClick={addStaffHandler}
          >
            <IoMdPrint
              style={{ height: "18px", width: "24px", color: "#3F435E" }}
            />
          </WhiteCustomButton>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{
            paddingRight: { xs: 2, md: 1, lg: 1, xl: 1 },
            marginTop: { xs: 3, md: 3 },
          }}
        >
          <CustomButton
            //   marginLeft="12px"
            marginTop="2px"
            notArrow
            title="Email"
            XFontSize="16"
            // width="100px"
            MFontSize="16"
            xsHeight={42}
            xsWidth="100%"
            // onClick={addStaffHandler}
          >
            <MdOutlineMail style={{ height: "18px", width: "24px" }} />
          </CustomButton>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          style={{
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          <Paper sx={{ padding: 6 }}>
            {/* {subscription?.invoice?.lines?.data.map((pkg: any) => ( */}
            <>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                {/* Left side */}
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "24px",
                    color: "#3F435E",
                    font: "Mulish",
                    fontWeight: 600,
                  }}
                >
                  Bill to:
                </Typography>

                <Box>
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: "14px",
                      font: "Mulish",
                      color: "#262A45",
                      fontWeight: 400,
                    }}
                  >
                    {/* 1234567 */}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: "14px",
                      font: "Mulish",
                      color: "#262A45",
                      fontWeight: 400,
                    }}
                  >
                    Date:{" "}
                    <span style={{ color: "#84858D", marginLeft: "5px" }}>
                      {formattedDate}
                    </span>
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography
                  sx={{
                    fontSize: "30px",
                    color: "#000315",
                    font: "Mulish",
                    fontWeight: 800,
                  }}
                >
                  {subscription?.company?.company_name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    font: "Mulish",
                    marginTop: "15px",
                  }}
                  gutterBottom
                >
                  <b style={{ color: "black" }}>Address:  </b>
                  {addressLine1} |{addressLine2} |{addressLine3}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    font: "Mulish",
                    marginTop: "15px",
                  }}
                  gutterBottom
                >
                  <b style={{ color: "black" }}>City:  </b>

                  {city}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    font: "Mulish",
                    marginTop: "15px",
                  }}
                  gutterBottom
                >
                  <b style={{ color: "black" }}>Country: </b>

                  {country}
                </Typography>
              </Box>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item md={7}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      font: "Mulish",
                      marginTop: "15px",
                    }}
                    gutterBottom
                  >
                    <b style={{ color: "black" }}>Zipcode: </b>
                    {zipcode}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["SingleInputDateRangeField"]}>
                        <DateRangePicker
                          slots={{ field: SingleInputDateRangeField }}
                          name="allowedRange"
                          label=""
                          sx={{
                            width: "100%",
                            minWidth: "0px!important",
                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                              height: "0.4375em",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#FFC000",
                            },
                            "& .MuiOutlinedInput-root": {
                              "&:hover > fieldset": {
                                borderColor: "#FFC000",
                              },
                              "@media (max-width: 430px)": {
                                width: "100%",
                              },
                              height: "54px",
                              borderRadius: "14px",
                            },
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: "20px",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#FBFBFB",
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: "bold",
                    font: "Mulish",
                  }}
                >
                  Name
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: "bold",
                    font: "Mulish",
                  }}
                >
                  Amount
                </Typography>
              </Box>

              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontSize: "30px",
                        color: "#000315",
                        font: "Mulish",
                        fontWeight: 800,
                      }}
                    >
                      Service Package
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#84858D",
                        textAlign: "right",
                        font: "Mulish",
                        padding: 1,
                      }}
                    >
                      {/* £20 */}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                  {/* {subscription?.invoice?.lines?.data.map((pkg: any) => ( */}
                  <Stack direction="row" spacing={6}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#3F435E",
                        fontWeight: 500,
                        fontFamily: "Mulish",
                        width: "95%",
                        paddingTop: 1,
                      }}
                    >
                      {profile?.package_type?.package_name}
                    </Typography>
                    {/* <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      color: "#3F435E",
                      fontWeight: 500,
                      fontFamily: "Mulish",
                      width: "95%",
                      paddingTop: 1,
                    }}
                  >
                    Additional Staff
                  </Typography> */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1rem",
                        color: "#84858D",
                        textAlign: "right",
                        font: "Mulish",
                        padding: 1,
                      }}
                    >
                      £{profile?.package_type?.package_cost}
                    </Typography>
                  </Stack>
                  {/* ))} */}
                </Grid>
              </Grid>

              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  padding: 1,
                  marginLeft: {
                    xs: 0,
                    lg: "650px",
                    sm: "auto",
                    md: "auto",
                    xl: "850px",
                  },
                }}
              >
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "0px",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      display: "flex",
                      fontWeight: 700,
                    }}
                  >
                    <span> Total</span>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        fontSize: "12px",
                        font: "Mulish",
                        marginLeft: "8px",
                        marginTop: "8px",
                      }}
                    >
                      {/* {new Date().toLocaleDateString()} */}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    £{subscription?.formattedAmount}
                  </Typography>
                </Box>
                <Divider sx={{ border: "1px solid #D8DAE7" }} />
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "0px",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      fontWeight: 700,
                    }}
                  >
                    Tax (20%)
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    £{subscription?.formattedTax}
                  </Typography>
                </Box>
                <Divider sx={{ border: "1px solid #D8DAE7" }} />

                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "0px",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      display: "flex",
                      fontWeight: 700,
                    }}
                  >
                    <span> Grand Total</span>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        fontSize: "12px",
                        font: "Mulish",
                        marginLeft: "8px",
                        marginTop: "8px",
                      }}
                    >
                      {/* Due on {new Date().toLocaleDateString()} */}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      color: "#262A45",
                      font: "Mulish",
                      fontWeight: 400,
                    }}
                  >
                    £{subscription?.formattedTotal}
                  </Typography>
                </Box>
              </Box>
            </>
            {/* // ))} */}
          </Paper>
        </Grid>
      </Grid>
      <ChildComponent
        handleOpen={handleOpen}
        handleClose={handleClose}
        modal={open}
      />
    </React.Fragment>
  );
};

export default WithLayout(Index);
