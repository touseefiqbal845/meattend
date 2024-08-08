import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MAuthApiService from "../../../services/MAuthApiService";

const ul1 = ["About us", "Services", "Features", "Benefits", "Pricing"];
const ul2 = [
  "Create event",
  "Performance report",
  "Find Promoters",
  "Scan Entry",
  "Discount",
];
const ul3: { name: string; icon: string }[] = [
  {
    name: "Twitter",
    icon: require("../../../assets/icons/f1.png"),
  },
  {
    name: "Linkedin",
    icon: require("../../../assets/icons/f2.png"),
  },

  {
    name: "Facebook",
    icon: require("../../../assets/icons/f3.png"),
  },
  {
    name: "Instagram",
    icon: require("../../../assets/icons/f4.png"),
  },
];
const ul4 = ["Terms", "Privacy", "Cookies"];

function Footer({
  handleLinkClick,
}: {
  handleLinkClick?: (value: string) => void;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");

  const handleClick = () => {
    if (email === "") {
      setEmailError("Email is required");
      return;
    }
    //? regix
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    const obj = {
      email: email,
    };
    MAuthApiService.subscribeNewsletterApi(JSON.stringify(obj))
      .then((res) => {
        alert(res?.data?.message ?? "Subscribed successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        px: { md: 15, xs: 0 },
        pt: { md: 30, xs: 25 },
        pb: { md: 5, xs: 10 },
        mt: -20,
        backgroundColor: "#000315",
      }}
    >
      <Grid container direction={"row"} spacing={6}>
        <Grid item md={2} xs={6}>
          <Box paddingLeft={{ xs: 2 }}>
            <Typography fontSize={24} fontWeight={700} color={"white"}>
              Company
            </Typography>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                flexDirection: "column",
                display: "flex",
                gap: 10,
              }}
            >
              {ul1.map((item, i) => (
                <li
                  onClick={(event) => {
                    if (item.toLowerCase() === "home") {
                      navigate("/");
                    } else if (item.toLowerCase() === "about us") {
                      navigate("/about_us");
                    } else if (item.toLowerCase() === "services") {
                      navigate("/", {
                        state: { title: "services" },
                      });
                    } else if (item.toLowerCase() === "features") {
                      navigate("/", {
                        state: { title: "features" },
                      });
                    } else if (item.toLowerCase() === "benefits") {
                      navigate("/", {
                        state: { title: "benefits" },
                      });
                    } else if (item.toLowerCase() === "contact us") {
                      navigate("/contactus");
                    }
                    if (item.toLowerCase() === "pricing") {
                      navigate("/", {
                        state: { title: item.toLowerCase() },
                      });
                    }
                  }}
                >
                  <Link
                    key={`${item}_${i}`}
                    href="#"
                    color="inherit"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "10px",
                      color: "#A0A3B5",
                      fontSize: "14px",
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Typography fontSize={24} fontWeight={700} color={"white"}>
            Resources
          </Typography>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              flexDirection: "column",
              display: "flex",
              gap: 10,
            }}
          >
            {ul2.map((item, i) => (
              <li>
                <Link
                  key={`${item}_${i}`}
                  href="#"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "10px",
                    color: "#A0A3B5",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box paddingLeft={{ xs: 2 }}>
            <Typography fontSize={24} fontWeight={700} color={"white"}>
              Social
            </Typography>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                flexDirection: "column",
                display: "flex",
                gap: 10,
              }}
            >
              {ul3.map((item, i) => (
                <li>
                  <Link
                    key={`${item.name}_${i}`}
                    href="#"
                    color="inherit"
                    sx={{
                      textDecoration: "none",
                      marginBottom: "10px",
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <img width={"10%"} src={item.icon} alt={item.name} />
                    <Typography fontSize={14} color={"#A0A3B5"} ml={1}>
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Typography fontSize={24} fontWeight={700} color={"white"}>
            Legal
          </Typography>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              flexDirection: "column",
              display: "flex",
              gap: 10,
            }}
          >
            {ul4.map((item, i) => (
              <li>
                <Link
                  key={`${item}_${i}`}
                  href={
                    item.toLowerCase() == "terms" ||
                    item.toLowerCase() == "cookies"
                      ? "/terms"
                      : "/privacy"
                  }
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "10px",
                    color: "#A0A3B5",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: "800",
              mt: { md: "auto", xs: -5 },
              mb: 2,
            }}
          >
            Subscribe to our newsletter
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"space-between"}
          >
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              fullWidth
              sx={{
                ".MuiOutlinedInput-root": {
                  flexDirection: "row",
                  borderRadius: 3,
                  border: "1px solid #A0A3B5",
                  position: "unset",
                  fontSize: 14,
                  fontFamily: "mulish",
                },
                inputContainer: {},
                img: {
                  paddingRight: "1rem",
                },
                input: {
                  height: "0.2vh",
                  font: "unset",
                  fontSize: "0.8rem",
                  color: "white",
                  fontWeight: 400,
                },
              }}
              InputProps={{
                startAdornment: (
                  <img
                    width={20}
                    height={20}
                    src={require("../../../assets/icons/email.png")}
                  />
                ),

                disableUnderline: true,
              }}
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                emailError && setEmailError("");
                setEmail(e.target.value);
              }}
              error={emailError !== ""}
              helperText={emailError}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFC000",
                boxShadow: "none",
                color: "black",
                textTransform: "none",
                borderRadius: "7px",
                fontSize: 13,
                alignSelf: "center",
                fontWeight: 700,
                width: "120px",
                height: 37,
                ml: 2,

                // width: { xs: "100px", md: "120px" },
              }}
              onClick={handleClick}
            >
              Subscribe
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Button
              sx={{
                backgroundColor: "white",
                textTransform: "none",
                px: 1.5,
                borderRadius: 10,
                py: 0.8,
                display: "flex",

                alignItems: "center",
                mr: 2,
                width: 160,
                height: 50,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <Avatar
                sx={{ width: 30, height: 30, mr: 1 }}
                src={require("../../../assets/icons/apple.png")}
              />
              <Box>
                <Typography
                  color={"#3F435E"}
                  fontSize={{ md: 10, xs: 8 }}
                  fontWeight={600}
                  textAlign={"justify"}
                >
                  Download Now
                </Typography>
                <Typography
                  fontSize={13}
                  fontWeight={800}
                  textAlign={"justify"}
                  color={"black"}
                >
                  App Store
                </Typography>
              </Box>
            </Button>
            <Button
              sx={{
                backgroundColor: "white",
                textTransform: "none",
                px: 1.5,
                borderRadius: 10,
                py: 0.8,
                display: "flex",
                alignItems: "center",
                width: 160,
                height: 50,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <Avatar
                sx={{ width: 30, height: 30, mr: 1 }}
                src={require("../../../assets/icons/google_play.png")}
              />
              <Box>
                <Typography
                  color={"#3F435E"}
                  fontSize={{ md: 10, xs: 8 }}
                  fontWeight={600}
                  textAlign={"justify"}
                >
                  Get in on
                </Typography>
                <Typography
                  fontSize={13}
                  fontWeight={800}
                  textAlign={"justify"}
                  color={"black"}
                >
                  Google Play
                </Typography>
              </Box>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider
        variant="inset"
        component="li"
        sx={{
          borderBottom: "1px solid #A0A3B5",
          width: "100%",
          ml: { md: 0, xs: 0 },
        }}
      />
      <Grid
        container
        sx={{ flexDirection: { md: "row", xs: "column-reverse" }, mt: 2 }}
      >
        <Grid item md={6} xs={12}>
          <Box
            component={"img"}
            src={require("../../../assets/icons/footerLogo.png")}
            sx={{
              margin: { md: 0, xs: "auto" },
              display: "block",
              width: { md: "5%", xs: "20%" },
              mt: { md: 0, xs: 2 },
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography
            sx={{
              color: "#A0A3B5",
              fontSize: "14px",
              textAlign: { md: "right", xs: "center" },
            }}
          >
            Copyright: © 2023 Me Attend. All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
