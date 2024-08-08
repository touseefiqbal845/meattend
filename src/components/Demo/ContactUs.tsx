import { Box, Container, Grid } from "@mui/material";
import React, { ChangeEvent } from "react";
import CustomInput from "./CustomInput";
import ContainerTitle from "../../components/Home/ContainerTitle";
import CustomButton from "./CustomButton";
import MAuthApiService from "../../services/MAuthApiService";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ContactUs = () => {
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
    if (
      contactDetails.firstName === "" &&
      contactDetails.lastName === "" &&
      contactDetails.email === "" &&
      contactDetails.phone === "" &&
      contactDetails.message === ""
    ) {
      return setContactError({
        ...contactError,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        message: true,
      });
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
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          contactDetails.email
        )
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
              alt="mobile"
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
                    key={1}
                    title="First Name"
                    placeholder="First name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    name="firstName"
                    helperText={
                      contactError?.firstName
                        ? "Please enter your first name!"
                        : ""
                    }
                    error={contactError.firstName}
                    onChange={handleChange}
                    value={contactDetails.firstName}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <CustomInput
                    key={2}
                    title="Last name"
                    placeholder="Last name"
                    img={require("../../assets/icons/profile.png")}
                    height="1.7vh"
                    fontWeight={800}
                    fontSize={12}
                    name="lastName"
                    helperText={
                      contactError?.lastName
                        ? "Please enter your last name!"
                        : ""
                    }
                    error={contactError.lastName}
                    onChange={handleChange}
                    value={contactDetails.lastName}
                  />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <CustomInput
                  key={3}
                  title="Email address"
                  placeholder="Company"
                  img={require("../../assets/icons/email.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  name="email"
                  helperText={
                    contactError?.email ? "Please enter your email!" : ""
                  }
                  error={contactError.email}
                  onChange={handleChange}
                  value={contactDetails.email}
                />
                <CustomInput
                  key={4}
                  title="Phone number"
                  placeholder="Phone number"
                  img={require("../../assets/icons/call2.png")}
                  height="1.7vh"
                  fontWeight={800}
                  fontSize={12}
                  name="phone"
                  helperText={
                    contactError?.phone ? "Please enter your phone number!" : ""
                  }
                  error={contactError.phone}
                  onChange={handleChange}
                  value={contactDetails.phone}
                />
                <CustomInput
                  key={5}
                  title="Message"
                  placeholder="Enter your message..."
                  img={undefined}
                  height="10vh"
                  fontWeight={800}
                  fontSize={12}
                  name="message"
                  helperText={
                    contactError?.message ? "Please enter your message!" : ""
                  }
                  error={contactError.message}
                  onChange={handleChange}
                  value={contactDetails.message}
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
      </Box>
    </Container>
  );
};
