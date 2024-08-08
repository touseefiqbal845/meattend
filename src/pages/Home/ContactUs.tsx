import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import MarketingImage from "../../assets/icons/marketing.png";
import MobileApproach from "../../assets/icons/market_mobile.png";
import WebApproach from "../../assets/icons/marketing_s.png";
import MobileMarketingImage from "../../assets/icons/mobile-market.png";
import ResponsiveAppBar from "../../components/Home/NavBar";
import ContainerTitle from "../../components/Home/ContainerTitle";
import PriceTable from "../../components/Home/Slider";
import React, { ChangeEvent } from "react";
import Footer from "../../components/Home/Footer";
import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import MAuthApiService from "../../services/MAuthApiService";
import CustomButton from "../../components/Demo/CustomButton";

export default function ContactUs() {
  const [contactDetails, setContactDetails] = React.useState<{
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
  const [contactError, setContactError] = React.useState<{
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // ? handle error here
    setContactError({ ...contactError, [e.target.name]: false });
  };

  const handleClick = () => {
    // handle error here
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

    if (contactDetails.message === "") {
      return setContactError({ ...contactError, message: true });
    } else {
      setContactError({ ...contactError, message: false });
    }

    if (
      contactDetails.firstName !== "" &&
      contactDetails.lastName !== "" &&
      contactDetails.email !== "" &&
      contactDetails.phone !== "" &&
      contactDetails.message !== ""
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
          message: contactDetails.message,
        };
        MAuthApiService.contactUsApi(JSON.stringify(obj))
          .then((res) => {
            if (res.status === 200) {
              alert("Your message has been sent successfully!");
            } else {
              alert("Something went wrong!");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong!");
          });
      }
    }
  };

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
                  textTransform: "uppercase",
                }}
              >
                Contact Us
              </Typography>
            </Stack>
            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "left",
              }}
            >
              Let’s build something{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                great together.
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
              Get in contact with us today and our team will get back to you 
              as soon as possible.
            </Typography>
            <Divider
              sx={{ borderColor: "gray.quat", mt: 2, borderWidth: 1 }}
              orientation="horizontal"
            />
            <Divider
              sx={{ borderColor: "gray.quat", mt: 0.4, borderWidth: 1 }}
              orientation="horizontal"
            />

            <Stack
              py={{ md: 4, xs: 0 }}
              spacing={2}
              sx={{ justifyContent: "flex-start" }}
            >
              <Typography
                fontSize={16}
                fontWeight={700}
                fontFamily={"mulish"}
                color={"secondary"}
              >
                Office Address
              </Typography>
              <Typography mt={0.5} color={"text.primary"}>
              City of London, United Kingdom
              </Typography>
              <Stack direction={"row"} alignItems={"center"} columnGap={2}>
                <Box
                  style={{ width: 40, height: 40 }}
                  component={"img"}
                  src={require("../../assets/icons/custom-mail.png")}
                />
                <Typography>support@meattend.com</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} columnGap={2}>
                <Box
                  style={{ width: 40, height: 40 }}
                  component={"img"}
                  src={require("../../assets/icons/custom-call.png")}
                />
                <Typography>+44 203 907 6813</Typography>
              </Stack>
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
                  placeholder="Company"
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
                  key={5}
                  title="Message"
                  placeholder="Enter your message..."
                  img={undefined}
                  height="10vh"
                  fontWeight={800}
                  fontSize={12}
                  onChange={handleChange}
                  value={contactDetails.message}
                  name="message"
                  helperText={
                    contactError?.message ? "Please enter your message!" : ""
                  }
                  error={contactError.message}
                />
                <CustomButton
                  onClick={handleClick}
                  notArrow
                  mdFullWidth
                  title="Contact us"
                  fullWidth
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          overflow: "cover",
          width: "100%",
          marginBottom: 18,
          marginTop: 5,
        }}
        component={"img"}
        src={require("../../assets/icons/map.png")}
      />
      <Container maxWidth={false} sx={{ backgroundColor: "#000315" }}>
        <Footer />
      </Container>
    </div>
  );
}

function CustomInput({
  img,
  title,
  placeholder,
  height = "0.2vh",
  fontWeight = 400,
  fontSize = 14,
  helperText,
  error,
  onChange,
  value,
  name,
}: {
  img: string | undefined;
  title: string;
  placeholder: string;
  height?: string;
  fontWeight?: number;
  fontSize?: number;
  helperText?: string;
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  value?: string;
  name?: string;
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
        name={name}
        id="input-with-icon-textfield"
        variant="outlined"
        fullWidth
        value={value}
        multiline={!img ? true : false}
        rows={!img ? 4 : 0}
        helperText={helperText}
        error={error}
        onChange={onChange}
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
