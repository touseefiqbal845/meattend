import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import MarketingImage from "../../assets/icons/marketing.png";
import MobileApproach from "../../assets/icons/market_mobile.png";
import WebApproach from "../../assets/icons/marketing_s.png";
import MobileMarketingImage from "../../assets/icons/mobile-market.png";
import ResponsiveAppBar from "../../components/Home/NavBar";
import ContainerTitle from "../../components/Home/ContainerTitle";
import Divider from "../../components/Home/Divider";
import PriceTable from "../../components/Home/Slider";
import React, { ChangeEvent } from "react";
import Footer from "../../components/Home/Footer";
import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import EmojiGrid from "../../components/CustomContainerGrid/EmojiGrid";
import DemoInfo from "../../components/Demo/DemoInfo";
import { ContactUs } from "../../components/Demo/ContactUs";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ShowCase() {
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth={false}>
        <Grid {...gridStyle}>
          <Grid
            item
            xs={12}
            md={6}
            mt={{ xs: 5 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Box
                alt="pin"
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
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textAlign: "left",
                  color: "#04CAA5",
                  textTransform: "uppercase",
                }}
              >
                Our Showcase
              </Typography>
            </Stack>
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "left",
              }}
            >
              A systematic approach to{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                marketing
              </Typography>
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
              The best way to marketing is always the most straightforward approach,
              with that extra bit of knowledge.
            </Typography>
            <Stack
              py={{ md: 4, xs: 0 }}
              direction={"row"}
              spacing={2}
              sx={{ justifyContent: "flex-start" }}
            >
              <Button
                sx={{
                  backgroundColor: "#FFC000",
                  py: { md: 1.3, xs: 1 },
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
          <EmojiGrid img={matches ? MobileApproach : WebApproach} />
        </Grid>
        <Box
          sx={{
            width: 30,
            height: 30,
            display: { md: "block", xs: "none" },
            marginLeft: "auto",
            marginRight: "auto",
            mt: -5,
          }}
          component={"img"}
          src={require("../../assets/icons/more.png")}
        />

        <Box
          my={4}
          component={"img"}
          src={require("../../assets/icons/companies.png")}
          sx={{ width: "100%" }}
        />
      </Container>

      <Box
        component="div"
        sx={{
          backgroundImage: {
            md: `url(${MarketingImage})`,
            xs: `url(${MobileMarketingImage})`,
          },
          width: "100%",
          height: { md: 550, xs: 400 },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          component={"div"}
          direction={"row"}
          alignItems={"center"}
          spacing={2}
        >
          <Box
            component={"img"}
            sx={{
              width: 10.34,
              height: 14,
              top: 2,
              left: 2.07,
            }}
            src={require("../../assets/icons/pin-orange.png")}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              letterSpacing: 3,
              textAlign: "left",
              color: "#FFC000",
            }}
          >
            Me Attend
          </Typography>
        </Stack>

        <Box
          component={"div"}
          justifyContent={"center"}
          alignItems={"center"}
          my={2}
          textAlign={"center"}
        >
          <Typography
            sx={{ fontSize: { md: "56px", xs: "30px" }, fontWeight: 600 }}
            color={"white"}
          >
            Get free marketing until <br /> December 2024!
          </Typography>
          <Typography color={"white"} my={1}>
          Sign up to Me Attend for free and start showcasing your events straight away.
          Sign up now to get FREE marketing until December 31st 024
          </Typography>
        </Box>
        <Button
          onClick={() => navigate("/signUp")}
          sx={{
            backgroundColor: "#FFC000",
            px: 2,
            py: 1,
            textTransform: "none",
            color: "black",
            mt: 2,
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
        >
          Register Now
        </Button>
      </Box>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "white",
        }}
      >
        <ContainerTitle
          mainTitle="Our Services"
          title="A systematic approach to marketing"
          body="Taking a systematic approach to marketing means having a clear and organized plan to create, run, and assess your marketing efforts, making sure you reach your business goals smoothly and successfully."
          titleColor="black"
          mainTitleColor="#DE9300"
          bodyColor="gray.main"
          textAlign="center"
        />
      </Container>

      <Container maxWidth={false} sx={{ py: "5%", backgroundColor: "white" }}>
        <Grid container direction={{ md: "row", xs: "column-reverse" }}>
          <Grid
            md={6}
            xs={12}
            sx={{
              paddingTop: { md: "5%", xs: 0 },
              paddingLeft: { md: "10%", xs: 0 },
            }}
            item
          >
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "left",
              }}
            >
              Market your{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                company{" "}
              </Typography>
              <Typography
                component={"span"}
                color={"black"}
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  textAlign: "left",
                }}
              >
                to{" "}
              </Typography>
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                millions{" "}
                <Typography
                  component={"span"}
                  color={"black"}
                  sx={{
                    fontSize: { md: 48, xs: 25 },
                    textAlign: "left",
                  }}
                >
                  of users
                </Typography>
              </Typography>
              <Typography
                color={"black"}
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  textAlign: "left",
                }}
              >
                worldwide.
              </Typography>
            </Typography>
            <Typography color={"gray.tertiary"} fontSize={14} mt={2}>
            Expand your customers world wide and watch your company grow.
            </Typography>
          </Grid>

          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              py: { md: 0, xs: 0 },
            }}
            item
          >
            <Box
              alt="worldwide"
              component={"img"}
              sx={{
                width: { md: "80%", xs: "100%" },
              }}
              src={require("../../assets/icons/worldwide.png")}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
        <Grid
          container
          direction={"row"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              pd: { xs: "2%" },
              paddingLeft: { md: "5%", xs: 0 },
            }}
            item
          >
            <LazyLoadImage
              alt="lead"
              width={"100%"}
              src={require("../../assets/icons/lead.png")}
            />
          </Grid>
          <Grid
            md={6}
            xs={12}
            sx={{
              paddingLeft: { md: "3%", xs: 0 },
            }}
            item
          >
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                // textAlign: "left",
              }}
            >
              Attract the
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                {" "}
                right leads{" "}
                <Typography
                  color={"black"}
                  sx={{
                    fontSize: { md: 48, xs: 25 },
                    textAlign: "left",
                  }}
                >
                  to your events.
                </Typography>
              </Typography>
            </Typography>
            <Typography color={"gray.tertiary"} fontSize={14} mt={2}>
            Use the platform to pin point your target audience and showcase them what they really want to see and buy.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
        <Grid
          container
          direction={{ md: "row", xs: "column-reverse" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            md={6}
            xs={12}
            sx={{
              paddingLeft: { md: "10%", xs: 0 },
            }}
            item
          >
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "center",
                fontWeight: 800,
              }}
            >
              Get promoters{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 } }}
                component={"span"}
              >
                to boost{" "}
              </Typography>
              <Typography
                component={"span"}
                color={"black"}
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  textAlign: "left",
                }}
              >
                your event &{" "}
              </Typography>
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                business{" "}
                <Typography
                  component={"span"}
                  color={"black"}
                  sx={{
                    fontSize: { md: 48, xs: 25 },
                    textAlign: "left",
                  }}
                >
                  revenue.
                </Typography>
              </Typography>
            </Typography>
            <Typography color={"gray.tertiary"} fontSize={14} mt={2}>
            Boost your event’s appeal to your customer audience by using well selected promoters, which are strategically targeted to capture the eyes of your target audience. 
            </Typography>
          </Grid>

          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              py: { md: 0, xs: 4 },
              pr: { md: 10 },
            }}
            item
          >
            <LazyLoadImage
              width={"100%"}
              alt="promoters"
              src={require("../../assets/icons/promoters.png")}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} sx={{ backgroundColor: "white", mb: "5%" }}>
        <Grid
          container
          direction={"row"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              py: { md: 0, xs: 4 },
              paddingLeft: { md: "5%", xs: "7%" },
            }}
            item
          >
            <LazyLoadImage
              alt="advertise"
              width={"100%"}
              src={require("../../assets/icons/advertise.png")}
            />
          </Grid>
          <Grid
            md={6}
            xs={12}
            sx={{
              paddingLeft: { md: "3%", xs: "7%" },
            }}
            item
          >
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                fontWeight: 800,
              }}
            >
              Advertise
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 } }}
                component={"span"}
              >
                {" "}
                on the
                <Typography
                  color={"black"}
                  sx={{
                    fontSize: { md: 48, xs: 25 },
                    textAlign: "left",
                  }}
                >
                  latest global social media platform.
                </Typography>
                {/* <Typography
                  color={"black"}
                  sx={{
                    fontSize: { md: 48, xs: 25 },
                    textAlign: "left",
                  }}
                >
                  Platform.
                </Typography> */}
              </Typography>
            </Typography>
            <Typography color={"gray.tertiary"} fontSize={14} mt={2}>
            Social media platforms have over $1.2 Trillion dollars market cap and we plan to grow this even further we our platform. So join the next revolution of social media and social media marketing now and be part of something spectacular!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <DemoInfo />
      <ContactUs />

      <Container maxWidth={false} sx={{ backgroundColor: "#000315" }}>
        <Footer />
      </Container>
    </div>
  );
}
