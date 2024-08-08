import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/Home/NavBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Avatar,
} from "@mui/material";

import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ContainerTitle from "../../components/Home/ContainerTitle";
import { useNavigate } from "react-router-dom";
import DemoInfo from "../../components/Demo/DemoInfo";
import WebImg from "../../assets/icons/bg_img.png";
import MobileImg from "../../assets/icons/bg_img_mobile.png";
import { ContactUs } from "../../components/Demo/ContactUs";
import Footer from "../../components/Home/Footer";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";

function AboutUs() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MUserDashboardPagesApiService.getAllFaqs();
        const FaqData = response?.data?.faqs.map((faq: any) => ({
          title: faq?.title,
          description: faq?.description,
        }));
        console.log("faq", FaqData);
        setFaqs(FaqData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function CustomAccordian({ title, body }: { title: string; body: string }) {
    return (
      <>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontSize={22} fontWeight={700} color={"#3F435E"}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={14} fontWeight={400} color="3F435E">
              {body}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#F9F9FC",
          padding: 0,
        }}
      >
        <Grid
          {...gridStyle}
          sx={{
            px: 0,
            width: "100%",
            py: { md: 0, xs: 4 },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box px={{ md: 0, xs: 2 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textAlign: "left",
                  color: "#04CAA5",
                }}
              >
                ABOUT US
              </Typography>

              <Typography
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  fontWeight: 600,
                  // mt: { md: 100, xs: 5 },
                }}
                component={"span"}
              >
                Uniting Opportunities, Empowering Growth
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
                We know ho frustrating it is to fork out lots of money in marketing and not any 
results, no sales, no people through the door and this is why we exist, this is why
we created Me Attend. For us, for you and for the members of public to get a 
win-win scenario. Welcome to Me Attend.
              </Typography>
              <Stack
                py={4}
                direction={"row"}
                spacing={2}
                sx={{ justifyContent: "flex-start" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#FFC000",
                    py: 1.3,
                    px: 3,
                  }}
                  onClick={() => navigate("/signUp")}
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
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              my={4}
              component={"img"}
              src={require("../../assets/icons/investor-approach.png")}
              sx={{ width: "100%", height: "100%", margin: 0 }}
            />
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          margin: "auto",
          maxWidth: "1456px",
          padding: "0 100px",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack direction={"row"}>
              <Avatar
                src={require("../../assets/icons/mission-aboutus.png")}
                alt="mission-img"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  position: "relative",
                }}
              />
              {/* <Box
                sx={{
                  position: "absolute",
                  top: "775px",
                  right: "545px",
                  height: "37%",
                  width: "4px",
                  backgroundColor: "orange",
                }}
              ></Box> */}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={"column"}>
              <Typography
                sx={{
                  fontSize: {
                    md: "45px",
                    sx: "30px",
                  },
                  fontWeight: 400,
                  lineHeight: {
                    md: "60px",
                    sx: "40px",
                  },
                  color: "Black",
                }}
              >
                Mission
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  textAlign: "left",
                  fontWeight: 400,
                  color: "#3F435E",
                }}
              >
                How mission is to help people stay connected with friends , affilicate creating  fun and exciting events world wide  and cherish memories together at the right places you want and at the times you want, all the time.
We want to make friends, family and business personnel  come together, much more efficient, cheaper, faster, enjoyable.
Like you and most people, we found that we would go to a venue and find its not the same as it was before or even worst, the venues we use to go to has closed down and turned into a block of apartments or restaurants, so not knowing where to go to catch up with friends, we didnt like this and our Director Tyrone Reid came up with an idea and a plan  to solve this and he created Me Attend.
A brand new social media platform to enhance, speed up and create even more memories with family and friends via events. A platform to better connect businesses to their target audience and to the general members of public world wide.
And furthermore, this social media platform is on a road map to become the next biggest social media platform for marketing and events in the world wide.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack direction={"column"}>
              <Typography
                sx={{
                  fontSize: {
                    md: "45px",
                    sx: "30px",
                  },
                  fontWeight: 400,
                  lineHeight: {
                    md: "60px",
                    sx: "40px",
                  },
                  color: "Black",
                }}
              >
                Vision
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  textAlign: "left",
                  fontWeight: 400,
                  color: "#3F435E",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Vel vitae blandit risus eu adipiscing nisl mauris mauris. Tortor a libero tristique in ac integer felis bibendum augue. In ut nibh nunc proin egestas elit. Tortor ut ac dui lectus sapien nisl sapien. Bibendum blandit sed sagittis facilisis eget ultricies eu. Mauris at aliquet eget commodo adipiscing urna pellentesque diam. Praesent turpis fermentum porta a lorem elementum facilisis. Velit libero porttitor pharetra sem quis. Tincidunt integer vitae eget eget phasellus dui blandit duis. Magnis dis ornare vestibulum sit enim. Dolor placerat dui massa quis. Felis diam interdum sit fringilla scelerisque risus diam.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={"row"}>
              <Avatar
                src={require("../../assets/icons/vision-aboutus.png")}
                alt="mission-img"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  position: "relative",
                }}
              />
              {/* <Box
                sx={{
                  position: "absolute",
                  top: "775px",
                  right: "545px",
                  height: "37%",
                  width: "4px",
                  backgroundColor: "orange",
                }}
              ></Box> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Box
        component={"div"}
        sx={{
          backgroundImage: {
            md: `url(${WebImg})`,

            xs: `url(${MobileImg})`,
          },
          width: "100%",
          height: { md: 824, xs: 600 },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          mt: { xs: 4 },
        }}
      >
        <Box>
          <Stack direction={"column"} alignItems={"center"} spacing={1}>
            <Typography
              color="white"
              fontWeight={400}
              fontSize={{
                md: "48px",
                xs: "25px",
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              color="white"
              fontSize={14}
              textAlign={"center"}
              width={"60%"}
              sx={{
                lineHeight: "38px",
                fontWeight: 400,
              }}
            >
             Our team is currently a one man band. A leader and visionary that transcends the norm of business and 
             entrepreneurship. His vision is 1000 times more forward thinking so called 99% and his plans to dominate the world stage is only just begun.
            </Typography>
          </Stack>
        </Box>

        <Grid
          container
          direction={"row"}
          spacing={{ xs: 1, md: 2.5 }}
          sx={{
            my: { md: 5, xs: 0 },
            paddingX: { md: 20, xs: 0 },
          }}
        >
          <Grid md={3} xs={12} item>
            <Avatar
              src={require("../../assets/icons/team-1aboutus.png")}
              alt="mission-img"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                position: "relative",
                backgroundColor: "initial",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  flexBasis: "70%",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Jenny Wilson
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Lorem ipsum dolor
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/twitter.png")}
                    alt="twitter"
                  />
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/linkdlin.png")}
                    alt="linkdlin"
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid md={3} xs={12} item>
            <Avatar
              src={require("../../assets/icons/team-2aboutus.png")}
              alt="mission-img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                position: "relative",
                backgroundColor: "initial",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  flexBasis: "70%",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Jenny Wilson
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Lorem ipsum dolor
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/twitter.png")}
                    alt="twitter"
                  />
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/linkdlin.png")}
                    alt="linkdlin"
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid md={3} xs={12} item>
            <Avatar
              src={require("../../assets/icons/team-3aboutus.png")}
              alt="mission-img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                position: "relative",
                backgroundColor: "initial",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  flexBasis: "70%",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Smith
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Lorem ipsum dolor
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/twitter.png")}
                    alt="twitter"
                  />
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/linkdlin.png")}
                    alt="linkdlin"
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid md={3} xs={12} item>
            <Avatar
              src={require("../../assets/icons/team-4aboutus.png")}
              alt="mission-img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                position: "relative",
                backgroundColor: "initial",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  flexBasis: "70%",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28px",
                  }}
                >
                  Lucy
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontFamily: "Mulish",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Lorem ipsum dolor
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/twitter.png")}
                    alt="twitter"
                  />
                </Box>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={require("../../assets/icons/linkdlin.png")}
                    alt="linkdlin"
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "white", minHeight: "50px" }}
      ></Container>
      <Container
        id="faq's"
        maxWidth={false}
        sx={{
          backgroundColor: "#F9F9FC",
          pt: { md: "2.5%", xs: 0 },
          pb: { md: "2.5%", xs: 0 },
        }}
      >
        <ContainerTitle
          mainTitle="FAQs"
          title={"Frequently Asked Questions"}
          body={""}
          titleColor="black"
          mainTitleColor="#DE9300"
        />
        <Grid
          container
          direction={"row"}
          sx={{
            backgroundColor: "#F9F9FC",
            px: { md: 20, xs: "auto" },
            pb: 3,
          }}
          spacing={4}
        >
          <Grid item md={6} xs={12}>
            <>
              {faqs?.map((faq, index) => (
                <CustomAccordian title={faq?.title} body={faq?.description} />
              ))}
            </>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "white", minHeight: "50px" }}
      ></Container>
      <DemoInfo />
      <ContactUs />
      <Footer />
   </React.Fragment>
  );
}

export default AboutUs;
