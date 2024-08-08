import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  PlayCircleFilledOutlined,
  ArrowForwardIos,
  PlusOneOutlined,
  Scale,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MarketingImage from "../../../assets/icons/marketing.png";
import MobileMarketingImage from "../../../assets/icons/mobile-market.png";
import ResponsiveAppBar from "../../../components/Home/NavBar";
import ContainerTitle from "../../../components/Home/ContainerTitle";
import Divider from "../../../components/Home/Divider";
import Footer from "../../../components/Home/Footer";
import PriceTable from "../../../components/Home/Slider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from "react-player";


export default function Home() {
  const navigate = useNavigate();

 

  function Services({ value, title }: { value: number; title: string }) {
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
          // resizeMode: "contain",
          // height: { md: 550, xs: 280 },
          // width: { md: 600, xs: 300 },
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
            <Box width={"15%"} height={"auto"} component={"img"} src={img} />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { md: "20px", xs: "12px" },
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
            <Box width={"15%"} height={"auto"} component={"img"} src={img} />
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
              <img width={20} height={20} src={img!} />
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
  }: {
    title: string;
    fullWidth?: boolean;
    mdFullWidth?: boolean;
    notArrow?: boolean;
  }) {
    return (
      <Button
        variant="contained"
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
  return (
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
              sx={{ fontSize: { md: 48, xs: 25 }, textAlign: "left" }}
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
              Ea pro tibique comprehensam, sed ea verear. Nam te omittam compre.
              Ne nam nonumy putent fuisset, reque fabulas usu ne.
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
              <Button
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                margin: "auto",
                display: "block",
              }}
              component={"img"}
              alt="logo"
              src={require("../../assets/icons/chart.png")}
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
            We have an amazing 24 month package, giving you a free marketing
            package for until December 2024, so what you waiting for. Join us
            and start making money now!
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "#FFC000",
            px: 2,
            py: 1,
            textTransform: "none",
            color: "black",

            mt: 2,
          }}
        >
          Register Now
        </Button>
      </Box>
      <Container
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
            title="Successful events build"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m1.png")}
          />
          <OfferCards
            title="Events tell your story"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m2.png")}
          />
          <OfferCards
            title="Events appeal to all learners"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m3.png")}
          />
          <OfferCards
            title="Events prove you matter"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m4.png")}
          />
          <OfferCards
            title="Events create memories"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m5.png")}
          />
          <OfferCards
            title="Event promotion & marketing"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/m6.png")}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            my={{ md: 5, xs: 1 }}
          >
            <CustomButton title="Show More" />
          </Box>
        </Grid>
      </Container>
      <Container maxWidth={false} sx={{ py: "5%", backgroundColor: "white" }}>
        <Grid container direction={"row"}>
          <Grid
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: { md: "5%", xs: 0 },
              paddingLeft: { md: "10%", xs: "7%" },
            }}
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
                Nam sapien feugiat id ipsum quam massa. Convallis est morbi
                semper posuere arcu diam facilisi aliquam sit. Sit tincidunt
                turpis consequat lacus blandit lorem.
                <Typography fontSize={14} color={"#3F435E"} mt={5}>
                  Nam sapien feugiat id ipsum quam massa. Convallis est morbi
                  semper posuere arcu
                </Typography>
              </Typography>
              <Stack direction={"row"} spacing={6} mt={5}>
                <Services value={10} title={"Years of experience"} />
                <Services value={500} title={"Satisfied clients"} />
                <Services value={1000} title={"Successful events"} />
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
            {/* <Box
              component={"img"}
              sx={{
                width: { md: "80%", xs: "90%" },
              }}
              src={require("../../assets/icons/video.png")}
            /> */}
            <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
          </Grid>
        </Grid>
      </Container>
      <Container
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
                Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus
                eget purus ligula molestie.
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
                Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus
                eget purus ligula molestie.
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
                marginRight: { md: 10, xs: "auto" },
              }}
            >
              <ResponsiveTitle>
                Grow your company's brand awareness
              </ResponsiveTitle>
              <ResponsiveBody>
                Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus
                eget purus ligula molestie.
              </ResponsiveBody>
            </Box>
          </Grid>
          <Divider />
          <Grid md={5.5} xs={12} item>
            <ResponsiveImage
              float={"right"}
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
          <Grid md={5.5} xs={12} item>
            <Box
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
            />
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
                Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus
                eget purus ligula molestie.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} sx={{ py: "5%", backgroundColor: "#F9F9FC" }}>
        <Grid container direction={"row"} spacing={0}>
          <Grid
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: { md: "10%", xs: "0" },
              alignItems: "center",
              flexDirection: { md: "column", xs: "column-reverse" },
            }}
            item
          >
            <Card
              sx={{
                width: { backgroundColor: "#F9F9FC" },
                boxShadow: "none",
              }}
            >
              <Typography
                sx={{
                  color: "#DE9300",
                  fontWeight: 700,
                  mt: { md: 0, xs: 3 },
                  fontSize: 14,
                }}
              >
                Appointment
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: 38, xs: 25 },
                  fontWeight: 700,
                  mt: 1,
                }}
              >
                Request a Demo!
              </Typography>
              <Typography fontSize={14} color={"#3F435E"} mt={2}>
                If you would like to have a demo of how Me attend works , then
                <Typography fontSize={14} color={"black"}>
                  please provide us your details
                </Typography>
                below and one of our agents will give you a call to set up an
                appointment.
              </Typography>
            </Card>
            <Box
              sx={{
                width: { md: "80%", xs: "100%" },
                height: "auto",
                mt: { md: 12, xs: 5 },
              }}
              component={"img"}
              src={require("../../assets/icons/demo.png")}
            />
          </Grid>

          <Grid
            md={6}
            xs={12}
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
              // py: { md: 0, xs: 4 },
            }}
            item
          >
            <Box
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                borderRadius: 5,
                py: { md: 3, xs: 2 },
                px: { md: 5, xs: 2 },
                width: { md: "70%", xs: "100%" },
              }}
              component={"div"}
            >
              <Typography fontSize={32} fontWeight={700}>
                Provide us your details
              </Typography>
              <Typography fontSize={14} color={"#3F435E"} mt={2}>
                If you would like to have a demo of how Me attend works , then
                <Typography fontSize={14} color={"black"}>
                  please provide us your details
                </Typography>
                below and one of our agents will give you a call to set up an
                appointment.
              </Typography>
              <Box
                sx={{ width: "100%", borderBottom: "1px solid #3F435E", my: 4 }}
              />
              <CustomInput
                title="Name"
                placeholder="Enter name"
                img={require("../../assets/icons/profile.png")}
              />
              <CustomInput
                title="Email address"
                placeholder="Email address"
                img={require("../../assets/icons/sms.png")}
              />
              <CustomInput
                title="Phone number"
                placeholder="Phone number"
                img={require("../../assets/icons/call-outgoing.png")}
              />
              <CustomInput
                title="Company"
                placeholder="Company"
                img={require("../../assets/icons/building.png")}
              />
              <CustomButton title="Submit" fullWidth />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box mb={10}>
        <ContainerTitle
          mainTitle="Pricing Plans"
          title="Find the right plan for your needs"
          body=""
          titleColor="black"
          mainTitleColor="#DE9300"
        />
        <PriceTable />
      </Box>
      <Container
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
              title="When does course starts?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="What are our course offerings"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomAccordian
              title="When does course starts?"
              body="You can register online, or you can visit our physical office locate at 10801 Lockwood Dr STE 330, Silver Spring, MD 20901"
            />
          </Grid>
        </Grid>
      </Container>

      <Container
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
            title="24HR Support"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            img={require("../../assets/icons/ms1.png")}
          />
          <MarketCards
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

          <Box width={"100%"} display={"flex"} justifyContent={"center"} my={5}>
            <CustomButton title="Show More" />
          </Box>
        </Grid>
      </Container>
      <Container
        maxWidth={false}
        sx={{
          px: { md: 20, xs: "auto" },
        }}
      >
        <Box
          sx={{
            boxShadow: 2,
            borderRadius: 5,
            zIndex: 999,
            backgroundColor: "white",
            position: "relative",
            py: 4,
          }}
        >
          <ContainerTitle
            mainTitle="Contact us"
            title="How can we help you?"
            body=""
            titleColor="black"
            mainTitleColor="#DE9300"
          />
          {/* <ContainerTitle
            mainTitle="Contact us"
            title="How can we help you?"
            body=""
            titleColor="black"
            mainTitleColor="#DE9300"
          /> */}
          <Grid container direction={"row"}>
            <Grid item md={6} xs={12}>
              <LazyLoadImage
                src={require("../../assets/icons/mobile.png")}
                width={"100%"}
                height={"auto"}
              />
            </Grid>
            <Grid
              md={6}
              xs={12}
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: { md: "flex-start", xs: "center" },
                // py: { md: 0, xs: 4 },
              }}
              item
            >
              <Box
                sx={{
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: 5,
                  py: { md: 3, xs: 2 },
                  px: { md: 5, xs: 2 },
                  width: { md: "80%", xs: "100%" },
                  border: "1.5px solid #C7CADA",
                }}
                component={"div"}
              >
                <Grid container direction={"row"} spacing={2}>
                  <Grid md={6} xs={12} item>
                    <CustomInput
                      title="First Name"
                      placeholder="First name"
                      img={require("../../assets/icons/profile.png")}
                      height="1.7vh"
                      fontWeight={800}
                      fontSize={12}
                    />
                  </Grid>
                  <Grid md={6} xs={12} item>
                    <CustomInput
                      title="Last name "
                      placeholder="Last name"
                      img={require("../../assets/icons/profile.png")}
                      height="1.7vh"
                      fontWeight={800}
                      fontSize={12}
                    />
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  <CustomInput
                    title="Email address"
                    placeholder="Company"
                    img={require("../../assets/icons/email.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                  />
                  <CustomInput
                    title="Phone number"
                    placeholder="Phone number"
                    img={require("../../assets/icons/call2.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                  />
                  <CustomInput
                    title="Message"
                    placeholder="Enter your message..."
                    img={undefined}
                    height="10vh"
                    fontWeight={800}
                    fontSize={12}
                  />

                  <CustomButton
                    notArrow
                    mdFullWidth
                    title="Contact us"
                    fullWidth
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container maxWidth={false} sx={{ backgroundColor: "#000315" }}>
        <Footer />
      </Container>
    </div>
  );
}

