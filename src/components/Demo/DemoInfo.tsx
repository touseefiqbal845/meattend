import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import MAuthApiService from "../../services/MAuthApiService";

export default function DemoInfo() {
  const [demoDetails, setDemoDetails] = React.useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
  }>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [demoError, setDemoError] = React.useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
    company: boolean;
  }>({
    name: false,
    email: false,
    phone: false,
    company: false,
  });

  const handleClick = () => {
    // handle error here
    if (demoDetails.name === "") {
      return setDemoError({ ...demoError, name: true });
    } else {
      setDemoError({ ...demoError, name: false });
    }
    if (demoDetails.email === "") {
      return setDemoError({ ...demoError, email: true });
    } else {
      setDemoError({ ...demoError, email: false });
    }
    if (demoDetails.phone === "") {
      return setDemoError({ ...demoError, phone: true });
    } else {
      setDemoError({ ...demoError, phone: false });
    }
    if (demoDetails.company === "") {
      return setDemoError({ ...demoError, company: true });
    } else {
      setDemoError({ ...demoError, company: false });
    }

    // if no error
    if (
      demoDetails.name !== "" &&
      demoDetails.email !== "" &&
      demoDetails.phone !== "" &&
      demoDetails.company !== ""
    ) {
      // email not valid email regix

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(demoDetails.email)
      ) {
        alert("please enter valid email!");
      } else {
        const obj = {
          email_address: demoDetails.email,
          company_name: demoDetails.company,
          customer_name: demoDetails.name,
          contact_number: "+" + demoDetails.phone,
        };

        MAuthApiService.requestDemoApi(JSON.stringify(obj))
          .then((res) => {
            if (res.status === 200) {
              alert("Request submitted successfully!");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong!");
          });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDemoDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // ? handle error here
    setDemoError({ ...demoError, [e.target.name]: false });
  };

  return (
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
                color: "black",
              }}
            >
              Request a Demo!
            </Typography>
            <Typography fontSize={14} color={"#3F435E"} mt={2}>
              If you would like to have a demo of how Me attend works , then
              {/* <Typography fontSize={14} color={"black"}> */}
              <br />
              <span style={{ color: "black", fontWeight: 700 }}>
                please provide us your details{" "}
              </span>
              {/* </Typography> */}
              below and one of our agents will give
              <br />
              you a call to set up an appointment.
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
              width: { md: "75%", xs: "100%" },
              mt: { xs: 5 },
            }}
            component={"div"}
          >
            <Typography fontSize={32} fontWeight={700} color={"black"}>
              Provide us your details
            </Typography>
            <Typography fontSize={14} color={"#3F435E"} mt={2}>
              If you would like to have a demo of how Me attend works , then{" "}
              <span style={{ color: "black", fontWeight: 700 }}>
                please provide us your details{" "}
              </span>
              {/* <Typography fontSize={14} color={"black"}>
                please provide us your details
              </Typography> */}
              below and one of our agents will give you a call to set up an
              appointment.
            </Typography>
            <Box
              sx={{ width: "100%", borderBottom: "1px solid #3F435E", my: 4 }}
            />
            <CustomInput
              key={1}
              name="name"
              title="Name"
              placeholder="Enter name"
              img={require("../../assets/icons/profile.png")}
              helperText={demoError?.name ? "Please enter your name!" : ""}
              error={demoError.name}
              onChange={handleChange}
              value={demoDetails.name}
            />
            <CustomInput
              key={2}
              name="email"
              title="Email address"
              placeholder="Email address"
              img={require("../../assets/icons/sms.png")}
              helperText={
                demoError?.email ? "Please enter your email address!" : ""
              }
              error={demoError.email}
              onChange={(e) => {
                setDemoDetails({ ...demoDetails, email: e.target.value });
              }}
              value={demoDetails.email}
            />
            <CustomInput
              key={3}
              name="phone"
              title="Phone number"
              placeholder="Phone number"
              img={require("../../assets/icons/call-outgoing.png")}
              helperText={
                demoError?.phone ? "Please enter your phone number!" : ""
              }
              error={demoError.phone}
              onChange={(e) => {
                setDemoDetails({ ...demoDetails, phone: e.target.value });
              }}
              value={demoDetails.phone}
            />
            <CustomInput
              key={4}
              name="company"
              title="Company"
              placeholder="Company"
              img={require("../../assets/icons/building.png")}
              helperText={
                demoError?.company ? "Please enter your company name!" : ""
              }
              error={demoError.company}
              onChange={(e) => {
                setDemoDetails({ ...demoDetails, company: e.target.value });
              }}
              value={demoDetails.company}
            />
            <CustomButton onClick={handleClick} title="Submit" fullWidth />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
