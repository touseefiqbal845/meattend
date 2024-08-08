import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Checkbox,
  IconButton,
  Modal,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { FaLinkedin } from "react-icons/fa";
import CustomButton from "../../../components/button/CustomButton";
import "../style.css";
import { useNavigate } from "react-router-dom";



const REDIRECT_URI = "https://staging-web.meattend.com";
const CLIENT_ID = "78rtwcmztcw7s9";
const CLIENT_SECRET = "&G&HU7Qzv$I3ygbH";
// const REDIRECT_URI = "http://localhost:3000/services";
// const CLIENT_ID = "77jqqusvbead5z";
// const CLIENT_SECRET = "onmJwEpEoybVvIQG";

interface LinkedlnModalProps {
  open: boolean;
  onClose: () => void;
}

const LinkedlnModal: React.FC<LinkedlnModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    const state = popupWindowURL.searchParams.get("state");
    // setIsLoggedIn(true);

    if (state === "linkedin" && code) {
      fetchAccessToken(code);
      window.close();
      // setIsLoggedIn(true)- 

    }
  }, []);

  const onLoginStart = useCallback(() => {
    navigate("/services")
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    alert("logout success");
  }, []);

  const handleRemoveImage = () => {
    onClose();
  };

  const handleLinkedInConnect = () => {
    onLoginStart();
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=linkedin&scope=profile`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      "LinkedIn",
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
    );

  };

  const fetchAccessToken = async (code: string) => {
    const params = {
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    try {
      const response = await fetch(
        "https://www.linkedin.com/oauth/v2/accessToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(params),
        }
      );
      const data = await response.json();
      if (data.access_token) {
        fetchProfile(data.access_token);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const fetchProfile = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://api.linkedin.com/v2/me?oauth2_access_token=${accessToken}&projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`
      );
      const profileData = await response.json();
      setIsLoggedIn(true);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <React.Fragment>
        <IconButton
          sx={{
            position: "absolute",
            top: (theme) => ({
              xs: theme.breakpoints.up("xs") ? "15vh" : "unset",
              sm: theme.breakpoints.up("sm") ? "8vh" : "unset",
            }),
            right: (theme) => ({
              lg: theme.breakpoints.up("lg") ? "20vw" : "unset",
              md: theme.breakpoints.up("md") ? "18vw" : "unset",
              sm: theme.breakpoints.up("sm") ? "18vw" : "unset",
              xs: theme.breakpoints.up("xs") ? "1vw" : "unset",
            }),
            color: "white",
          }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            top: (theme) => ({
              md: theme.breakpoints.up("md") ? "40%" : "unset",
              xs: theme.breakpoints.up("xs") ? "40%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "100%", md: "100%" },
            minWidth: { xs: "80%", sm: "50%", md: "50%" },
            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "40.16px",
              fontFamily: "Mulish",
              color: "#000315",
            }}
          >
            LinkedIn Connection
          </Typography>

          <hr style={{ color: "#D8DAE7" }} />

          <Grid container sx={{ marginTop: "16px" }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60px",
                    height: "60px",
                    marginRight: "10px",
                    justifyContent: "center",
                  }}
                >
                  <FaLinkedin
                    style={{
                      color: "#0077B5",
                      fontSize: "50px",
                    }}
                  />
                </Box>
                <Box marginTop="0px" fontFamily="Mulish">
                  <Typography
                    sx={{
                      color: "#000315",
                      marginTop: "5px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    LinkedIn Connection
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      marginBottom: "5px",
                      fontSize: "10px",
                    }}
                  >
                    Ligula molestie non ac eget fringilla. Arcu rutrum proin
                    lacus eget purus ligula molestie non ac eget fringilla.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              >
                {!isLoggedIn ? (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFCE3A",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      width: "172px",
                      height: "30px",
                      borderRadius: "8px",
                    }}
                    onClick={handleLinkedInConnect}
                  >
                    £10 pcm - Connect
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      bgcolor: "#0077B5",
                      color: "white",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  >
                    Connected
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          <Divider
            style={{
              color: "#D8DAE7",
              marginTop: "10px",
              marginBottom: "30",
            }}
          />

<Typography
            variant="body1"
            sx={{
              fontFamily: "Mulish",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "#363853",
              marginTop: "5px",
            }}
          >
            Payment Subscription
          </Typography>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              sx={{
                color: "#000315",
                "&.Mui-checked": {
                  // color: "#000315",
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Mulish",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#5A5D60",
              }}
            >
                            Please Confirm Your Subscription!

            </Typography>
          </Box>
          <Grid xs={12} md={12} mt={3}>
            <CustomButton
              marginLeft="0px"
              marginTop="0px"
              notArrow
              mdFullWidth
              title="Pay Now"
              fullWidth
              XFontSize="16"
              MFontSize="16"
            />
          </Grid>
        </Box>
      </React.Fragment>
    </Modal>
  );
};

export default LinkedlnModal;
