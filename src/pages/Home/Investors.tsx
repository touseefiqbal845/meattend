import React, { ChangeEvent } from "react";
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
} from "@mui/material";
import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ContainerTitle from "../../components/Home/ContainerTitle";

import { useNavigate } from "react-router-dom";
import DemoInfo from "../../components/Demo/DemoInfo";
import CustomInput from "../../components/Demo/CustomInput";
import CustomButton from "../../components/Demo/CustomButton";
import WebImg from "../../assets/icons/bg_img.png";
import MobileImg from "../../assets/icons/bg_img_mobile.png";
import BackgroundImg from "../../assets/icons/investor_2.png";
import { ContactUs } from "../../components/Demo/ContactUs";
import Footer from "../../components/Home/Footer";

function Investors() {
  const navigate = useNavigate();
  const isScreen1050 = useMediaQuery("(max-width:1050px)");

  const [contactDetails, setContactDetails] = React.useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    message: "",
  });
  const [writingDetails, setWritingDetails] = React.useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [writingError, setWritingError] = React.useState<{
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    message: boolean;
  }>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });

  const [contactError, setContactError] = React.useState<{
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;

    company: boolean;
    industry: boolean;
  }>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    company: false,
    industry: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // ? handle error here
    setContactError({ ...contactError, [e.target.name]: false });
  };

  const handleClick = () => {
    if (
      contactDetails.firstName == "" &&
      contactDetails.lastName == "" &&
      contactDetails.email == "" &&
      contactDetails.phone == "" &&
      contactDetails.company == "" &&
      contactDetails.industry == ""
    ) {
      {
        return setContactError({
          ...contactError,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
          industry: true,
        });
      }
    }
    if (contactDetails.firstName === "") {
      return setContactError({ ...contactError, firstName: true });
    } else {
      setContactError({ ...contactError, firstName: false });
    }
    if (contactDetails.lastName === "") {
      return setContactError({ ...contactError, lastName: true });
    } else {
      setContactError({ ...contactError, lastName: false });
    }
    if (contactDetails.email === "") {
      return setContactError({ ...contactError, email: true });
    } else {
      setContactError({ ...contactError, email: false });
    }
    if (contactDetails.phone === "") {
      return setContactError({ ...contactError, phone: true });
    } else {
      setContactError({ ...contactError, phone: false });
    }

    if (contactDetails.company === "") {
      return setContactError({ ...contactError, company: true });
    } else {
      setContactError({ ...contactError, company: false });
    }
    if (contactDetails.industry === "") {
      return setContactError({ ...contactError, industry: true });
    } else {
      setContactError({ ...contactError, industry: false });
    }

    if (
      contactDetails.firstName !== "" &&
      contactDetails.lastName !== "" &&
      contactDetails.email !== "" &&
      contactDetails.phone !== "" &&
      contactDetails.company !== "" &&
      contactDetails.industry !== ""
    ) {
      // email not valid email regix

      if (
        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(contactDetails.email)
      ) {
        alert("please enter valid email!");
      } else {
        const obj = {
          email_address: contactDetails.email,
          first_name: contactDetails.firstName,
          last_name: contactDetails.lastName,
          contact_number: contactDetails.phone.includes("+")
            ? contactDetails.phone
            : "+" + contactDetails.phone,
          company_name: contactDetails.company,
          industry: contactDetails.industry,
        };
        //    MAuthApiService.contactUsApi(JSON.stringify(obj))
        //      .then((res) => {
        //        if (res.status === 200) {
        //          alert("Your message has been sent successfully!");
        //        } else {
        //          alert("Something went wrong!");
        //        }
        //      })
        //      .catch((err) => {
        //        console.log(err);
        //        alert("Something went wrong!");
        //      });
      }
    }
  };
  const handleWritingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWritingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // ? handle error here
    setWritingError({ ...writingError, [e.target.name]: false });
  };
  const handleWritingClick = () => {
    // handle error here
    if (writingDetails.firstName === "") {
      return setWritingError({ ...writingError, firstName: true });
    } else {
      setWritingError({ ...writingError, firstName: false });
    }
    if (writingDetails.lastName === "") {
      return setWritingError({ ...writingError, lastName: true });
    } else {
      setWritingError({ ...writingError, lastName: false });
    }
    if (writingDetails.email === "") {
      return setWritingError({ ...writingError, email: true });
    } else {
      setWritingError({ ...writingError, email: false });
    }
    if (writingDetails.phone === "") {
      return setWritingError({ ...writingError, phone: true });
    } else {
      setWritingError({ ...writingError, phone: false });
    }
    if (writingDetails.message === "") {
      return setWritingError({ ...writingError, message: true });
    } else {
      setWritingError({ ...writingError, message: false });
    }

    if (
      writingDetails.firstName !== "" &&
      writingDetails.lastName !== "" &&
      writingDetails.email !== "" &&
      writingDetails.phone !== "" &&
      writingDetails.message !== ""
    ) {
      // email not valid email regix

      if (
        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(writingDetails.email)
      ) {
        alert("please enter valid email!");
      } else {
        const obj = {
          email_address: writingDetails.email,
          first_name: writingDetails.firstName,
          last_name: writingDetails.lastName,
          contact_number: writingDetails.phone.includes("+")
            ? writingDetails.phone
            : "+" + writingDetails.phone,
          message: writingDetails.message,
        };
        //    MAuthApiService.contactUsApi(JSON.stringify(obj))
        //      .then((res) => {
        //        if (res.status === 200) {
        //          alert("Your message has been sent successfully!");
        //        } else {
        //          alert("Something went wrong!");
        //        }
        //      })
        //      .catch((err) => {
        //        console.log(err);
        //        alert("Something went wrong!");
        //      });
      }
    }
  };
  function OfferCards({
    title,
    body,
    number,
  }: {
    title: string;
    body: string;
    number: string;
  }) {
    return (
      <Grid item md={4} xs={12}>
        <Card
          sx={{
            py: 2,
            borderRadius: 5,
            boxShadow: "none",
            mt: { xs: -2 },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between", // Add space between children
              // height: { md: "2vh", xs: "20vh" }, // Adjusted height to accommodate space between children
              borderRadius: 20,
            }}
          >
            <Box
              sx={{
                width: 45,
                height: 45,
                backgroundColor: "#04CAA5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-start",
                borderRadius: 2,
              }}
            >
              <Typography color="white" fontSize={24} fontWeight={600}>
                {number}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "gray.graphTitle",
                fontSize: { md: "22px", xs: "12px" },
                textAlign: "left",
                fontWeight: 600,
                mt: 1,
              }}
              children={title}
            />
            <Typography
              sx={{
                color: "#84858D",

                fontSize: { md: "12px", xs: "12px" },
                textAlign: "left",
                mt: 1,
              }}
              children={body}
            />
          </CardContent>
        </Card>
      </Grid>
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
                INVESTORS
              </Typography>

              <Typography
                sx={{
                  fontSize: { md: 48, xs: 25 },
                  fontWeight: 600,
                  // mt: { md: 100, xs: 5 },
                }}
                component={"span"}
              >
                A systematic approach For Investors
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
                Ea pro tibique comprehensam, sed ea verear. Nam te omittam
                compre. Ne nam nonumy putent fuisset, reque fabulas usu ne.
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
      <Container maxWidth={false}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { md: "center", xs: "flex-start" },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: 48, xs: 25 },
              fontWeight: 400,

              mt: { md: 5, xs: 5 },
            }}
            component={"span"}
          >
            Investor Waiting List
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",

              fontWeight: 400,
              color: "#3F435E",
              py: 1,
              width: { md: "50%", xs: "100%" },
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Box>
        <Grid
          {...gridStyle}
          sx={{
            direction: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingX: { md: 10, xs: 0 },
          }}
          columnSpacing={5}
        >
          <Grid item xs={12} md={6} mt={5}>
            <Stack direction={"row"} spacing={2}>
              <Box
                my={4}
                component={"img"}
                src={require("../../assets/icons/investor_1.png")}
                sx={{ width: "50%" }}
              />
              <Box
                component="div"
                sx={{
                  backgroundImage: `url(${BackgroundImg})`,
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  borderRadius: 5,
                }}
              >
                <Box
                  component={"img"}
                  src={require("../../assets/icons/investor_time.png")}
                  sx={{ width: "30%" }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <Box
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                borderRadius: 5,
                py: { md: 3, xs: 2 },
                px: { md: 5, xs: 0 },
                width: { md: "80%", xs: "100%" },
              }}
              component={"div"}
            >
              <Grid
                container
                direction={"row"}
                spacing={{ md: 2, xs: 0 }}
                paddingX={{ md: 0, xs: 2 }}
              >
                <Grid md={6} xs={12} item>
                  <CustomInput
                    key={1}
                    title="First Name"
                    placeholder="First name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={handleChange}
                    value={contactDetails.firstName}
                    name="firstName"
                    helperText={
                      contactError?.firstName
                        ? "Please enter your first name!"
                        : ""
                    }
                    error={contactError.firstName}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <CustomInput
                    key={2}
                    title="Last name "
                    placeholder="Last name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={handleChange}
                    value={contactDetails.lastName}
                    name="lastName"
                    helperText={
                      contactError?.lastName
                        ? "Please enter your last name!"
                        : ""
                    }
                    error={contactError.lastName}
                  />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} paddingX={{ md: 0, xs: 2 }}>
                <CustomInput
                  key={3}
                  title="Email address"
                  placeholder="Email address"
                  img={require("../../assets/icons/email.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleChange}
                  value={contactDetails.email}
                  name="email"
                  helperText={
                    contactError?.email ? "Please enter your email!" : ""
                  }
                  error={contactError.email}
                />
                <CustomInput
                  key={4}
                  title="Phone number"
                  placeholder="Phone number"
                  img={require("../../assets/icons/call2.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleChange}
                  value={contactDetails.phone}
                  name="phone"
                  helperText={
                    contactError?.phone ? "Please enter your phone number!" : ""
                  }
                  error={contactError.phone}
                />
                <CustomInput
                  key={4}
                  title="Company Name/ NA"
                  placeholder="Company Name/ NA"
                  img={require("../../assets/icons/business.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleChange}
                  value={contactDetails.company}
                  name="company"
                  helperText={
                    contactError?.company
                      ? "Please enter your company name!"
                      : ""
                  }
                  error={contactError.company}
                />
                <CustomInput
                  key={4}
                  title="What Industry You are in"
                  placeholder="What Industry You are in"
                  img={require("../../assets/icons/industry.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleChange}
                  value={contactDetails.industry}
                  name="industry"
                  helperText={
                    contactError?.industry
                      ? "Please enter your industry name!"
                      : ""
                  }
                  error={contactError.industry}
                />

                <CustomButton
                  onClick={handleClick}
                  notArrow
                  mdFullWidth
                  title="Join Waiting List"
                  fullWidth
                />
              </Grid>
            </Box>
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
          height: { md: 350, xs: 600 },
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
        <Grid {...gridStyle}>
          <Grid md={4} xs={12}>
            <Box
              component={"img"}
              src={require("../../assets/icons/c_arrow.png")}
              width={isScreen1050 ? "10%" : "15%"}
              height={10}
              mt={2}
              left={"28vw"}
              position={"absolute"}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            />
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  backgroundColor: "#04CAA5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color="white" fontSize={24} fontWeight={600}>
                  01
                </Typography>
              </Box>

              <Typography
                color="white"
                fontWeight={600}
                fontSize={{
                  md: "1.5vw",
                  xs: 24,
                }}
              >
                Register
              </Typography>
              <Typography
                color="white"
                fontSize={12}
                textAlign={"center"}
                width={"60%"}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </Typography>
            </Stack>
          </Grid>

          <Grid
            md={4}
            xs={12}
            mt={{ xs: 3, md: 0 }}
            //   sx={{ border: "1px solid red" }}
          >
            <Box
              component={"img"}
              src={require("../../assets/icons/c_arrow.png")}
              width={isScreen1050 ? "10%" : "15%"}
              height={10}
              mt={2}
              left={"55vw"}
              position={"absolute"}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            />
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  backgroundColor: "#04CAA5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color="white" fontSize={24} fontWeight={600}>
                  02
                </Typography>
              </Box>

              <Typography
                color="white"
                fontSize={{
                  md: "1.5vw",
                  xs: 24,
                }}
                fontWeight={600}
              >
                Connect with Entrepreneurs
              </Typography>
              <Typography
                color="white"
                fontSize={12}
                textAlign={"center"}
                width={"60%"}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </Typography>
            </Stack>
          </Grid>

          <Grid md={4} xs={12} mt={{ xs: 3, md: 0 }}>
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  backgroundColor: "#04CAA5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color="white" fontSize={24} fontWeight={600}>
                  03
                </Typography>
              </Box>

              <Typography
                color="white"
                fontWeight={600}
                fontSize={{
                  md: "1.5vw",
                  xs: 24,
                }}
              >
                Invest
              </Typography>
              <Typography
                color="white"
                fontSize={12}
                textAlign={"center"}
                width={"60%"}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth={false}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { md: "center", xs: "self-start" },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: 48, xs: 25 },
              fontWeight: 400,
              mt: { md: 5, xs: 5 },
              color: "gray.graphTitle",
            }}
          >
            Dinner Gala Waiting List
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              textAlign: "left",
              fontWeight: 400,
              color: "#3F435E",
              py: 1,
              width: { md: "50%", xs: "100%" },
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Box>
        <Grid
          sx={{
            direction: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...gridStyle}
        >
          <Grid item xs={12} md={6} mt={5}>
            <Box
              component={"img"}
              src={require("../../assets/icons/investor_group.png")}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <Box
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                borderRadius: 5,
                py: { md: 3, xs: 2 },
                px: { md: 5, xs: 0 },
                width: { md: "80%", xs: "100%" },
              }}
              component={"div"}
            >
              <Grid
                container
                direction={"row"}
                spacing={{ md: 2, xs: 0 }}
                paddingX={{ md: 0, xs: 2 }}
              >
                <Grid md={6} xs={12} item>
                  <CustomInput
                    key={1}
                    title="First Name"
                    placeholder="First name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={handleWritingChange}
                    value={writingDetails.firstName}
                    name="firstName"
                    helperText={
                      writingError?.firstName
                        ? "Please enter your first name!"
                        : ""
                    }
                    error={writingError.firstName}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <CustomInput
                    key={2}
                    title="Last name "
                    placeholder="Last name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={handleWritingChange}
                    value={writingDetails.lastName}
                    name="lastName"
                    helperText={
                      writingError?.lastName
                        ? "Please enter your last name!"
                        : ""
                    }
                    error={writingError.lastName}
                  />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} paddingX={{ md: 0, xs: 2 }}>
                <CustomInput
                  key={3}
                  title="Email address"
                  placeholder="Email address"
                  img={require("../../assets/icons/email.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleWritingChange}
                  value={writingDetails.email}
                  name="email"
                  helperText={
                    writingError.email ? "Please enter your email!" : ""
                  }
                  error={writingError.email}
                />
                <CustomInput
                  key={4}
                  title="Phone number"
                  placeholder="Phone number"
                  img={require("../../assets/icons/call2.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleWritingChange}
                  value={writingDetails.phone}
                  name="phone"
                  helperText={
                    writingError.phone ? "Please enter your phone number!" : ""
                  }
                  error={writingError.phone}
                />
                <CustomInput
                  key={5}
                  title="Tell us about yourself"
                  placeholder="Enter your message."
                  img={undefined}
                  height="10vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleWritingChange}
                  value={writingDetails.message}
                  name="message"
                  helperText={
                    writingError.message ? "Please enter your message!" : ""
                  }
                  error={writingError.message}
                />

                <CustomButton
                  onClick={handleWritingClick}
                  notArrow
                  mdFullWidth
                  title="Submit"
                  fullWidth
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
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
        id="features"
        maxWidth={false}
        sx={{
          backgroundColor: "#F9F9FC",
        }}
      >
        <ContainerTitle
          mainTitle="Benfits"
          title="Investor Benfits"
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
            title="Financial Returns"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
          <OfferCards
            title="Diversification of Portfolio"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
          <OfferCards
            title="Brand Exposure and Recognition"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
          <OfferCards
            title="Networking Opportunities"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
          <OfferCards
            title="Market Insights"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
          <OfferCards
            title="Strategic Partnerships"
            body="Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus eget purus ligula molestie non ac eget fringilla. Arcu
                    rutrum proin lacus eget purus."
            number={"01"}
          />
        </Grid>
      </Container>
      <DemoInfo />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Investors;
