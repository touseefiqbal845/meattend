import React, { useCallback, useState, useEffect } from "react";
import { Box, Button, Grid, Typography, Divider, Checkbox, IconButton, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FacebookIcon from "@mui/icons-material/Facebook";
import CustomButton from "../../../components/button/CustomButton";

// const REDIRECT_URI = "http://localhost:3000/services";
// const CLIENT_ID = "393668843177643";
const REDIRECT_URI = "https://staging-app.meattend.com";
const CLIENT_ID = "1376817446327846";

interface FacebookModalProps {
  open: boolean;
  onClose: () => void;
}

const FacebookModal: React.FC<FacebookModalProps> = ({ open, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("facebookProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setIsLoggedIn(true);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data.type === "facebook-success") {
        setIsLoggedIn(true);
        setProfile(event.data.profile);
        localStorage.setItem("facebookProfile", JSON.stringify(event.data.profile));
        window.location.href = "/services";
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const onLoginStart = useCallback(() => {
    console.log("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setIsLoggedIn(false);
    localStorage.removeItem("facebookProfile");
    alert("logout success");
  }, []);

  const handleRemoveImage = () => {
    onClose();
  };

  const handleFacebookConnect = () => {
    onLoginStart();
    const oauthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=facebook&scope=email,public_profile`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const loginWindow = window.open(
      oauthUrl,
      "Facebook",
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
    );

    const checkPopupClosed = setInterval(() => {
      if (loginWindow?.closed) {
        clearInterval(checkPopupClosed);
        onClose();
      }
    }, 1000);
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
            Facebook Connection
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
                  <FacebookIcon
                    style={{
                      color: "#4267B2",
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
                    Facebook Connection
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      marginBottom: "5px",
                      fontSize: "10px",
                    }}
                  >
                    Connect to your Facebook account to sync your profile.
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
                    onClick={handleFacebookConnect}
                  >
                    £10 pcm - Connect
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      bgcolor: "#4267B2",
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
              marginBottom: "30px",
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

export default FacebookModal;
