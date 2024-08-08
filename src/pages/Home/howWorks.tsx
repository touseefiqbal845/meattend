import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/Home/NavBar";
import { lightTheme } from "../../theme/index";
import Footer from "../../components/Home/Footer";
import { ThemeProvider } from "@emotion/react";
import DemoInfo from "../../components/Demo/DemoInfo";
import { ContactUs } from "../../components/Demo/ContactUs";

export default function HowItWork() {
  const navigate = useNavigate();
  const mobileView = useMediaQuery("(max-width:600px)");

  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        <ResponsiveAppBar />
        <Container>
          <Grid
            pl={{ md: 5, xs: 0 }}
            my={5}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, md: 2 }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Box
                  component={"img"}
                  sx={{
                    width: 10.34,
                    height: 14,
                    top: 2,
                    left: 2.07,
                  }}
                  src={require("../../assets/icons/pin.png")}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: 2,
                    textAlign: "left",
                    color: "#04CAA5",
                  }}
                >
                  How It Works
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  textAlign: "left",
                  fontFamily: "Mulish",
                  color: "black",
                }}
              >
                How{" "}
                <b style={{ color: "black", fontWeight: "bold" }}>Me Attend</b>{" "}
                Works
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  textAlign: "left",
                  fontWeight: 400,
                  color: "#3F435E",
                  py: 1,
                }}
              >
               How to use Me Attend and gain attraction and 
               an additional stream of income.
              </Typography>
              <Stack
                py={4}
                direction={"row"}
                spacing={2}
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <Button
                  onClick={() => navigate("/signUp")}
                  sx={{
                    backgroundColor: "#FFC000",
                    py: 1.3,
                    px: 3,
                  }}
                >
                  <Typography
                    component={"text"}
                    sx={{
                      color: "#000315",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "13px",
                    }}
                  >
                    Get Started
                  </Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <LazyLoadImage
                style={{
                  width: "100%",
                  margin: "auto",
                  display: "block",
                }}
                alt="logo"
                src={require("../../assets/navIcons/howitwork/me.png")}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: { md: 500, xs: 630 },
                  right: { md: 100, xs: 0 },
                  left: { md: "auto", xs: 30 },
                }}
                width={120}
                height={120}
                component={"img"}
                src={require("../../assets/icons/thumb.png")}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: { md: 570, xs: 690 },
                  right: { md: 130, xs: 0 },
                  left: { md: "auto", xs: -10 },
                }}
                width={120}
                height={120}
                component={"img"}
                src={require("../../assets/icons/heart.png")}
              />
            </Grid>
          </Grid>
          <Grid>
            <Box
              my={4}
              component={"img"}
              src={require("../../assets/icons/companies.png")}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Container>

        {/* ------------------------------------------------------- */}

        <Container
          sx={{ backgroundColor: "#000315", py: { xs: 0, md: 5 } }}
          maxWidth={false}
        >
          <Container
            maxWidth="md"
            style={{ textAlign: "center", paddingTop: "30px" }}
          >
            <Typography
              variant="body1"
              style={{
                fontFamily: "Mulish",
                color: "#FFC000",
                fontSize: "16px",
              }}
            >
              How it works
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Mulish",
                color: "#FFFF",
                fontSize: { sm: "42px", xs: "24px" },
                marginTop: "1px",
              }}
            >
              How Me Attend Works
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontFamily: "Mulish",
                color: "#D8DAE7",
                fontSize: "14px",
                marginTop: "2px",
              }}
            >
             How to register and succeeded using Me Attend.
            </Typography>
          </Container>

          <Container
            maxWidth="md"
            style={{ textAlign: "center", paddingTop: "30px" }}
          >
            <Box sx={{ mt: 5, mb: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFC000",
                        mb: 1,
                      }}
                    >
                      Step 1
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFFF",
                        mb: 0.5,
                        mt: 0.125,
                      }}
                    >
                      Create your account
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#D8DAE7",
                        fontSize: "12px",
                      }}
                    >
                     A simple register form to register your business with us, so you can get started.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LazyLoadImage
                    src={require("../../assets/navIcons/howitwork/p1.png")}
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#FFC000", my: 4 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Mulish", color: "#FFC000", mb: 1 }}
                    >
                      Step 2
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFFF",
                        mb: 0.5,
                        mt: 0.125,
                      }}
                    >
                      Choose a Package
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#D8DAE7",
                        fontSize: "12px",
                      }}
                    >
                      Choose your service package that will indicate what features and processes your company can use on the platform.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LazyLoadImage
                    src={require("../../assets/navIcons/howitwork/p2.png")}
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#FFC000", my: 4 }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: mobileView ? "column" : "row",
                  justifyContent: "space-between",
                  mt: 5,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        textAlign: mobileView ? "center" : "left",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Mulish", color: "#FFC000", mb: 1 }}
                      >
                        Step 3
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Mulish",
                          color: "#FFFF",
                          mb: 0.5,
                          mt: 0.125,
                        }}
                      >
                        Create & Publish Your Event
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Mulish",
                          color: "#D8DAE7",
                          fontSize: "12px",
                        }}
                      >
                        Create attractive and appealing events and publish them to your customers on the Me Attend mobile app platform.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                
                      <LazyLoadImage
                        src={require("../../assets/navIcons/howitwork/p3.png")}
                        alt="Image"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          marginLeft: "auto",
                        }}
                      />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ backgroundColor: "#FFC000", my: 4 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Mulish", color: "#FFC000", mb: 1 }}
                    >
                      Step 4
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFFF",
                        mb: 0.5,
                        mt: 0.125,
                      }}
                    >
                      Boost your event via promoters
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#D8DAE7",
                        fontSize: "12px",
                      }}
                    >
                      Boost your events  popularity and reach by finding the right influential promoters using our Me Attend Platform, which is safe and secure. With our number one rule being, if they dont promote, they don’t get paid!
                      .
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LazyLoadImage
                    src={require("../../assets/navIcons/howitwork/p4.png")}
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#FFC000", my: 4 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Mulish", color: "#FFC000", mb: 1 }}
                    >
                      Step 5
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFFF",
                        mb: 0.5,
                        mt: 0.125,
                      }}
                    >
                      Earn Additional Income from your event via our platform
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#D8DAE7",
                        fontSize: "12px",
                      }}
                    >
                      Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    component="img"
                    src={require("../../assets/navIcons/howitwork/p1.png")}
                    alt="Image"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ backgroundColor: "#FFC000", my: 4 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Mulish", color: "#FFC000", mb: 1 }}
                    >
                      Step 6
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#FFFF",
                        mb: 0.5,
                        mt: 0.125,
                      }}
                    >
                      Grow your business and brand awareness worldwide
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Mulish",
                        color: "#D8DAE7",
                        fontSize: "12px",
                        mb: 1,
                      }}
                    >
                      The Me Attend mobile will be global by 2025 and will give your business a new reach to expand your customer base and revenue income.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LazyLoadImage
                    src={require("../../assets/navIcons/howitwork/p6.png")}
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Container>

        {/* ------------------------------------------------------- */}
        <DemoInfo />
        <ContactUs />

        <Container maxWidth={false} sx={{ backgroundColor: "#000315" }}>
          <Footer />
        </Container>
      </div>
    </ThemeProvider>
  );
}
