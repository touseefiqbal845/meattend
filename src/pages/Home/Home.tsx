import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayCircleFilledOutlined, ArrowForwardIos } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MarketingImage from "../../assets/icons/marketing.png";
import MobileMarketingImage from "../../assets/icons/mobile-market.png";
import ResponsiveAppBar from "../../components/Home/NavBar";
import ContainerTitle from "../../components/Home/ContainerTitle";
import Divider from "../../components/Home/Divider";
import Footer from "../../components/Home/Footer";
import PriceTable from "../../components/Home/Slider";
import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import EmojiGrid from "../../components/CustomContainerGrid/EmojiGrid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { sleep } from "../../services/constant";
import DemoInfo from "../../components/Demo/DemoInfo";
import { ContactUs } from "../../components/Demo/ContactUs";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import { getCompanyInfo } from "../../services/cacheFunc";
import MAuthApiService from "../../services/MAuthApiService";
import MRegisterApiService from './../../services/MRegisterApiService';

export default function Home() {
  const params = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [packages, setPackage] = React.useState<any[]>([]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Update isInView state when the element comes into view

  useEffect(() => {
    if (params.state) {
      const element = document.getElementById(params.state.title.toLowerCase());
      if (element) {
        sleep(1000).then(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
      navigate("/", {
        replace: true,
      });
    }
  }, [params.state]);

  console.log("yes");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await MRegisterApiService.getServicesPackages();
        const data = await response.data;

        setPackage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function Services({ value, title }: { value: string; title: string }) {
    return (
      <Stack direction={"column"}>
        <Typography
          sx={{
            fontSize: { md: 30, xs: 25 },
            color: "black",
            fontWeight: "bold",
          }}
        >
          {value}+
        </Typography>
        <Typography sx={{ color: "#84858D", fontSize: { md: 16, xs: 10 } }}>
          {title}
        </Typography>
      </Stack>
    );
  }
  function ResponsiveImage({ src, float }: { src: string; float: string }) {
    return (
      <Box
        sx={{
          width: "90%",
          float: { md: float, xs: "center" },
          mt: { md: 0, xs: 5 },
          display: { md: "grid", xs: "block" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
        component={"img"}
        src={src}
      />
    );
  }
  function ResponsiveTitle({ children }: { children: string }) {
    return (
      <Typography
        sx={{
          fontSize: { md: 40, xs: 26 },
          fontWeight: 400,
          color: "white",
          textAlign: "left",
          px: { md: 0, xs: 3 },
        }}
        children={children}
      />
    );
  }
  function ResponsiveBody({ children }: { children: string }) {
    return (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: "white",
          textAlign: "left",
          px: { md: 0, xs: 3 },
          mt: 1,
        }}
        children={children}
      />
    );
  }
  function OfferCards({
    title,
    body,
    img,
  }: {
    title: string;
    body: string;
    img: string;
  }) {
    return (
      <Grid item md={4} xs={6}>
        <Card
          sx={{
            py: 2,
            borderRadius: 5,
            boxShadow: "none",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between", // Add space between children
              // height: { md: "2vh", xs: "20vh" }, // Adjusted height to accommodate space between children
              borderRadius: 20,
            }}
          >
            <Box
              sx={{ objectFit: "contain" }}
              width={{ md: "15%", xs: "30%" }}
              height={"auto"}
              component={"img"}
              src={img}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { md: "18px", xs: "12px" },
                color: "black",
                textAlign: "center",
                mt: 1,
              }}
              children={title}
            />
            <Typography
              sx={{
                color: "#84858D",
                fontSize: { md: "12px", xs: "12px" },
                textAlign: "center",
                mt: 1,
              }}
              children={body}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }
  function MarketCards({
    title,
    body,
    img,
  }: {
    title: string;
    body: string;
    img: string;
  }) {
    return (
      <Grid item md={4} xs={12}>
        <Card
          sx={{
            py: { md: 2, xs: 0 },
            borderRadius: 5,
            boxShadow: "none",
            backgroundColor: "transparent",
            border: "1px solid #D8DAE7",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between", // Add space between children
              //  height: { md: "25vh", xs: "18vh" }, // Adjusted height to accommodate space between children
              borderRadius: 20,
            }}
          >
            <Box
              sx={{ objectFit: "contain" }}
              width={"15%"}
              height={"auto"}
              component={"img"}
              src={img}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { md: 22, xs: 12 },
                color: "black",
                textAlign: "center",
                mt: 1,
              }}
              children={title}
            />
            <Typography
              sx={{
                color: "#84858D",
                fontSize: { md: 12, xs: 12 },
                textAlign: "center",
                mt: 1,
              }}
              children={body}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }
  function CustomInput({
    img,
    title,
    placeholder,
    height = "0.2vh",
    fontWeight = 400,
    fontSize = 14,
  }: {
    img: string | undefined;
    title: string;
    placeholder: string;
    height?: string;
    fontWeight?: number;
    fontSize?: number;
  }) {
    return (
      <>
        <Typography
          fontWeight={fontWeight}
          color={"black"}
          mb={1}
          fontSize={fontSize}
          mt={2}
        >
          {title}
        </Typography>
        <TextField
          id="input-with-icon-textfield"
          variant="outlined"
          fullWidth
          multiline={!img ? true : false}
          rows={!img ? 4 : 0}
          sx={{
            ".MuiOutlinedInput-root": {
              flexDirection: "row",
              borderRadius: 3,
              border: "1px solid #C7CADA",
              position: "unset",
              fontSize: 14,
              fontFamily: "mulish",
            },
            inputContainer: {},
            img: {
              paddingRight: "1rem",
            },
            input: {
              height: height,
              font: "unset",
              fontSize: "0.8rem",
              color: "#343436",
              fontWeight: 400,
              transform: !img ? "translate(0, -28%)" : undefined,
            },
          }}
          InputProps={{
            startAdornment: img ? (
              <img
                style={{ objectFit: "contain" }}
                width={20}
                height={20}
                src={img!}
              />
            ) : null,
            disableUnderline: true,
          }}
          placeholder={placeholder}
        />
      </>
    );
  }
  function CustomButton({
    title,
    fullWidth,
    mdFullWidth,
    notArrow = true,
    onClick,
  }: {
    title: string;
    fullWidth?: boolean;
    mdFullWidth?: boolean;
    notArrow?: boolean;
    onClick?: () => void;
  }) {
    return (
      <Button
        variant="contained"
        onClick={onClick}
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
            md: mdFullWidth ? "100%" : "140px",
            xs: fullWidth ? "100%" : "120px",
          },
          height: { md: "42px", xs: "30px" },
          "&:hover": {
            color: "white",
          },

          // width: { xs: "100px", md: "120px" },
        }}
        endIcon={
          notArrow ? null : (
            <ArrowForwardIos sx={{ height: 14, width: 14, mt: 0.2 }} />
          )
        }
      >
        {title}
      </Button>
    );
  }
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
  const handleClick = (value: string) => {
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleShowMore2 = () => {
    setShowMore2(!showMore2);
  };

  return (
    <div>
      <ResponsiveAppBar handleLinkClick={handleClick} />
      <Container maxWidth={false}>
        <Grid {...gridStyle}>
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
            <Stack direction={"row"} alignItems={"center"} spacing={2} mt={5}>
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
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textAlign: "left",
                  color: "#04CAA5",
                }}
              >
                ME ATTEND
              </Typography>
            </Stack>

            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "left",
              }}
            >
              The{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                Ultimate{" "}
              </Typography>
              in Effective and Affordable{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                marketing solutions!
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
              Global marketing at your finger tips at a fraction of the price, just waiting for you to unlock your business potential.
            </Typography>
            <Stack
              py={4}
              direction={"row"}
              spacing={2}
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <Button
                sx={{
                  backgroundColor: "#FFC000",
                  py: 1.3,
                  px: 3,
                }}
                // on click navigate to register page
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
              <Button
                onClick={() => navigate("/signUp")}
                startIcon={
                  <PlayCircleFilledOutlined sx={{ color: "#DE9300" }} />
                }
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#DE9300",
                  }}
                >
                  Introduction
                </Typography>
              </Button>
            </Stack>
          </Grid>
          <EmojiGrid img={require("../../assets/icons/chart.png")} />
        </Grid>
        <Grid px={{ md: "10%", xs: 0 }}>
          <Box
            my={4}
            component={"img"}
            src={require("../../assets/icons/companies.png")}
            sx={{ width: "100%" }}
          />
        </Grid>
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
          Sign Up Now
        </Button>
      </Box>
      <Container
        id="features"
        maxWidth={false}
        sx={{
          backgroundColor: "#F9F9FC",
        }}
      >
        <ContainerTitle
          mainTitle="Our Features"
          title="We offer a marketing features"
          body=""
          titleColor="black"
          mainTitleColor="#DE9300"
        />
        <Grid
          container
          direction={"row"}
          rowSpacing={4}
          sx={{
            backgroundColor: "#F9F9FC",
            px: { md: 20, xs: "auto" },
            pb: 3,
          }}
          spacing={4}
        >
          <OfferCards
            title="Showcase your events worldwide"
            body="Create events that will be shown on the Me Attend global mobile application platform."
            img={require("../../assets/icons/m1.png")}
          />
          <OfferCards
            title="Earn additional streams of  income "
            body="Use our live stream feature to earn additional streams 
of revenue for your business and drive customers to your event door."
            img={require("../../assets/icons/m2.png")}
          />
          <OfferCards
            title="Find the right promoter to market & expand your events"
            body="Be able to filter and search for the right promoter for your event and watch your events flourish."
            img={require("../../assets/icons/m3.png")}
          />
          <OfferCards
            title="Create a global brand awareness"
            body="Showcase your company and events on a global stage and grow your customer base woeldwide."
            img={require("../../assets/icons/m4.png")}
          />
          <OfferCards
            title="Create memories & start trends"
            body="Allow members of public to post videos and pictures of your event and start trending, driving growth and awareness ."
            img={require("../../assets/icons/m5.png")}
          />
          <OfferCards
            title="Get customer interaction with your events"
            body="Get customer feedback, comments, reviews and interaction  all in one platform, all on one screen and reply."
            img={require("../../assets/icons/m6.png")}
          />
          {showMore && (
            <>
              {/* <OfferCards
                title="Events build relationships"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/m3.png")}
              />
              <OfferCards
                title="Events create a sense of community"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/m4.png")}
              />
              <OfferCards
                title="Events create memories"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/m5.png")}
              /> */}
            </>
          )}
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            my={{ md: 5, xs: 1 }}
          >
            <CustomButton
              onClick={handleShowMore}
              title={showMore ? "Show Less" : "Show More"}
            />
          </Box>
        </Grid>
      </Container>
      <Container
        id="aboutus"
        maxWidth={false}
        sx={{ py: "5%", backgroundColor: "white" }}
      >
        <Grid {...gridStyle}>
          <Grid
            md={6}
            xs={12}
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   paddingTop: { md: "5%", xs: 0 },
            //   paddingLeft: { md: "10%", xs: "7%" },
            // }}
            item
          >
            <Card sx={{ width: { md: "90%", xs: "100%" }, boxShadow: "none" }}>
              <Typography color={"#DE9300"} fontWeight={700}>
                About Us
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: 40, xs: 25 },
                  fontWeight: 700,
                  mt: 2,
                  color: "black",
                }}
              >
                Explore a different way
              </Typography>
              <Typography fontSize={14} color={"#3F435E"} mt={2}>
              We are Me Attend, we are social media platform designed to get people more connected together through events and catch ups.
              This application is a great way to plan your day and know exactly where to go to have a good time, saving you time, money and convenience and for companies its an amazing why to market your company to a world wide audience at a spectacular affordable rate..
                <Typography fontSize={14} color={"#3F435E"} mt={5}>
                So affordable, that we give your company the ability to post your events for free, that’s right for free.
                </Typography>
              </Typography>
              <Stack direction={"row"} spacing={{lg:6,md:1,sm:6}} mt={5}>
                <Services value={"2"} title={"Years in making"} />
                <Services value={"100"} title={"cities available"} />
                <Services value={"10M"} title={"events can be arranged "} />
              </Stack>
            </Card>
          </Grid>

          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              py: { md: 0, xs: 4 },
            }}
            item
          >
            <div ref={ref}>
              <ReactPlayer
                url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                playing={inView}
                width={"100%"}

              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container
        id="aboutus"
        maxWidth={false}
        sx={{ pb: "3%", backgroundColor: "white", mt: { md: -10, xs: 0 } }}
      >
        <Grid {...gridStyle} direction={{ md: "row", xs: "column-reverse" }}>
          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              py: { md: 0, xs: 4 },
            }}
            item
          >
            <Box
              component={"img"}
              width={"100%"}
              src={require("../../assets/icons/conference.png")}
            />
          </Grid>
          <Grid
            md={6}
            xs={12}
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   paddingTop: { md: "5%", xs: 0 },
            //   paddingLeft: { md: "10%", xs: "7%" },
            // }}
            item
          >
            <Card sx={{ width: { md: "90%", xs: "100%" }, boxShadow: "none" }}>
              <Typography color={"#DE9300"} fontWeight={700}>
                JOIN WAIT LIST
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: 40, xs: 25 },
                  fontWeight: 700,
                  mt: 2,
                  color: "black",
                }}
              >
                joining a conference gala to network
              </Typography>
              <Typography fontSize={14} color={"#3F435E"} mt={2}>
              Our conference gala’s are among the most sought after events in the world. We’ll have industry elites and guest speakers to discuss wealth, success and growth.
There are only a limited number of spaces allocated for each Gala event and each ticket if you manage to be lucky enough to be allocated will cost £2500.
Wealth attracts Wealth, and Success, is only the beginning.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container
        id="benefits"
        sx={{
          backgroundColor: "#000315",
          py: { xs: 0, md: 5 },
        }}
        maxWidth={false}
      >
        <ContainerTitle
          mainTitle="Me Attend Benefits"
          title={"The Benefits of Me Attend"}
          body={"Ea pro tibique comprehensam, sed ea verear"}
          titleColor="white"
        />
        <Grid direction={"row"} container sx={{ md: "5%", xs: "10%" }}>
          <Grid md={5.5} xs={12} item direction={"column"}>
            <Box
              sx={{
                width: { md: "70%", xs: "100%" },
                mt: { md: 15, xs: 0 },
                float: { md: "right", xs: "center" },
                marginRight: { md: 10, xs: "auto" },
              }}
            >
              <ResponsiveTitle>
                Additional income from showcasing.
              </ResponsiveTitle>
              <ResponsiveBody>
              Use our live stream and marketing pull features to create additional streams of income for your company.
              </ResponsiveBody>
            </Box>
          </Grid>
          <Divider />
          <Grid md={5.5} xs={12} item>
            <ResponsiveImage
              float={"left"}
              src={require("../../assets/icons/b1.png")}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            mt: { md: -40, xs: 0 },
            flexDirection: { md: "row", xs: "column-reverse" },
          }}
          container
        >
          <Grid md={5.5} xs={12} item direction={"column"}>
            <ResponsiveImage
              float={"right"}
              src={require("../../assets/icons/b3.png")}
            />
          </Grid>
          <Divider />
          <Grid md={5.5} xs={12} item direction={"column"}>
            <Box
              sx={{
                float: {
                  md: "left",
                  xs: "center",
                },
                width: { md: "70%", xs: "100%" },
                mt: { md: 20, xs: 5 },
              }}
            >
              <ResponsiveTitle>
                Analysis on your target audience.
              </ResponsiveTitle>
              <ResponsiveBody>
              Get advance reports on your target audience, your events and your income revenue all in real time.
              </ResponsiveBody>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{
            mt: { md: -40, xs: 0 },
            flexDirection: { md: "row" },
          }}
          container
        >
          <Grid md={5.5} xs={12} item>
            <Box
              sx={{
                float: {
                  md: "right",
                  xs: "center",
                },
                width: { md: "70%", xs: "100%" },
                mt: { md: 20, xs: 5 },
                marginRight: { md: 12, xs: "auto" },
              }}
            >
              <ResponsiveTitle>
                Grow your company's brand awareness
              </ResponsiveTitle>
              <ResponsiveBody>
              Showcase your company’s events on a global platform designed to connect your business to the rest of the world.
              </ResponsiveBody>
            </Box>
          </Grid>
          <Divider />
          <Grid md={5.5} xs={12} item>
            <ResponsiveImage
              float={"left"}
              src={require("../../assets/icons/b2.png")}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: { md: -40, xs: -15 },
            flexDirection: { md: "row", xs: "column-reverse" },
          }}
        >
          <Grid md={5.5} xs={12} item sx={{ paddingLeft: { md: 12, xs: 0 } }}>
            <ResponsiveImage
              float={"left"}
              src={require("../../assets/icons/b4.png")}
            />
            {/* <Box
              sx={{
                resizeMode: "contain",
                height: { md: 550, xs: 280 },
                width: { md: 600, xs: 300 },
                float: { md: "right", xs: "center" },
                mt: { md: 0, xs: 5 },
                display: { md: "grid", xs: "block" },
                marginLeft: "auto",
                marginRight: "auto",
              }}
              component={"img"}
              src={require("../../assets/icons/b4.png")}
            /> */}
          </Grid>
          <Divider hide />
          <Grid md={5.5} xs={12} item>
            <Box
              sx={{
                float: {
                  md: "left",
                  xs: "center",
                },
                width: { md: "70%", xs: "100%" },
              }}
              mt={20}
            >
              <Typography
                sx={{
                  fontSize: { md: 40, xs: 26 },

                  fontWeight: 400,
                  color: "white",
                  textAlign: "left",
                  px: { md: 0, xs: 3 },
                }}
              >
                AI and machine learning platform.
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "white",
                  textAlign: "left",
                  px: { md: 0, xs: 3 },
                  mt: 1,
                }}
              >
                How platform is integrated into machine learning AI, which is aimed to drive growth, sales and attraction to your events. These AI features will also be vital for growth for our platform and best aid your business to make the most out of our paltform.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <DemoInfo />

      <Container maxWidth={false} id="pricing" sx={{ mb: 10 }}>
        <ContainerTitle
          mainTitle="Pricing Plans"
          title="Find the right plan for your needs"
          body=""
          titleColor="black"
          mainTitleColor="#DE9300"
        />
        <PriceTable />
      </Container>
      <Container
        id="faq's"
        maxWidth={false}
        sx={{ backgroundColor: "#F9F9FC", pt: { md: "2.5%", xs: 0 } }}
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
            <CustomAccordian
              title={"How can I register?"}
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="How many events can I create?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="How to process payment?"
              body="We do all the heavy lifting for the customer’s regards to any payments, so you dont have to. We will create and process payments on your behalf and give your business the ability to retrieve those funds minus our small transaction fee."
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="Are there reports on our process?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="How much and what is a transaction fee?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="Are there course and support offerings?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="How do customers see our events?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="Can we create ticketing for our events?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
        </Grid>
      </Container>

      <Container
        id="services"
        maxWidth={false}
        sx={{
          backgroundColor: "white",
        }}
      >
        <ContainerTitle
          mainTitle="Our Services"
          title="We offer a marketing services"
          body=""
          titleColor="black"
          mainTitleColor="#DE9300"
        />
        <Grid
          container
          direction={"row"}
          rowSpacing={4}
          sx={{
            px: { md: 20, xs: "auto" },
            pb: 3,
          }}
          spacing={4}
        >
          <MarketCards
            title="Social Media Strategy "
            body="We help you plan a clear and precise social media strategy for how to use all social media platforms including Me Attend. Giving you a document which clear instructions of a step by step process of what we think you should do."
            img={require("../../assets/icons/ms1.png")}
          />
          <MarketCards
            title="Event Development"
            body="We help you come up with the event post , that will gain attraction and aim to increase renvenue."
            img={require("../../assets/icons/ms2.png")}
          />
          <MarketCards
            title="Full Growth Care Package"
            body="We will do your business Social Media Strategy, Event development and social media posting for a set period of time, bases on which package your company purchases."
            img={require("../../assets/icons/ms3.png")}
          />
          {showMore2 && (
            <>
              {/* <MarketCards
                title="Event Development"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/ms2.png")}
              />
              <MarketCards
                title="Full Growth Care Package"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/ms3.png")}
              />
              <MarketCards
                title="Event Development"
                body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
                img={require("../../assets/icons/ms2.png")}
              /> */}
            </>
          )}

          <Box width={"100%"} display={"flex"} justifyContent={"center"} my={5}>
            <CustomButton
              onClick={handleShowMore2}
              title={showMore2 ? "Show Less" : "Show More"}
            />
          </Box>
        </Grid>
      </Container>
      <ContactUs />
      <Container maxWidth={false} sx={{ backgroundColor: "#000315" }}>
        <Footer handleLinkClick={handleClick} />
      </Container>
    </div>
  );
}

{
  /* <Grid
              md={1}
              xs={0}
              item
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              mt={"15%"}
              sx={{ display: { xs: "none", md: "block" } }}
              direction={"column"}
            >
              <Box
                width={"30%"}
                height={"auto"}
                component={"img"}
                src={require("../../assets/icons/vertical-line.png")}
                sx={{ resizeMode: "contain" }}
              />
            </Grid> */
}
