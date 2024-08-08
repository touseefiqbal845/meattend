import React, { useCallback, useState } from "react";
import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomButton from "../../components/button/CustomButton";
import Modal from "@mui/material/Modal";
import "./style.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {
  LoginSocialFacebook,
  LoginSocialLinkedin,
  LoginSocialTiktok,
  LoginSocialInstagram,
} from "reactjs-social-login";
// import {
//   FacebookLoginButton,
//   GoogleLoginButton,
//   GithubLoginButton,
//   AmazonLoginButton,
//   InstagramLoginButton,
//   LinkedInLoginButton,
//   MicrosoftLoginButton,
//   TwitterLoginButton,
//   AppleLoginButton,
// } from "react-social-login-buttons";

const REDIRECT_URI = "https://react-social-login.netlify.app/";
interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  open,
  onClose,
}) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    console.log("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const handleRemoveImage = () => {
    onClose();
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
            Link Social Profiles
          </Typography>

          <hr style={{ color: "#D8DAE7" }} />
          {/* <Grid container sx={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <FacebookIcon
                  style={{
                    color: "#1877f2",
                    fontSize: "60px",
                  }}
                />
                <Box marginLeft="5px" marginTop="0px" fontFamily="Mulish">
                  <Typography
                    variant="body1"
                    sx={{ color: "black", marginBottom: "5px" }}
                  >
                    Facebook
                    <br />
                    @hess_bone
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
                <LoginSocialFacebook
                  isOnlyGetToken
                  appId={process.env.REACT_APP_FB_APP_ID || ""}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFCE3A",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      width: { sm: "100%", md: "172px" },
                      height: "30px",
                      borderRadius: "8px",
                    }}
                  >
                    £10 pcm - Connect
                  </Button>
                </LoginSocialFacebook>
              </Box>
            </Grid>
          </Grid> */}

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
                      color: "#1877f2",
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
                <LoginSocialFacebook
                  isOnlyGetToken
                  appId={process.env.REACT_APP_FB_APP_ID || ""}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    // Handle resolve
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
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
                  >
                    £10 pcm - Connect
                  </Button>
                </LoginSocialFacebook>
              </Box>
            </Grid>
          </Grid>

          {/* <Grid container sx={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <InstagramIcon
                  style={{
                    color: "#fa7e1e",

                    fontSize: "60px",
                  }}
                />
                <Box marginLeft="5px" marginTop="0px" fontFamily="Mulish">
                  <Typography
                    variant="body1"
                    sx={{ color: "black", marginBottom: "5px" }}
                  >
                    Facebook
                    <br />
                    @hess_bone
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
                <LoginSocialInstagram
                  isOnlyGetToken
                  client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ""}
                  client_secret={
                    process.env.REACT_APP_INSTAGRAM_APP_SECRET || ""
                  }
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }: any) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                >
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
                  >
                    £10 pcm - Connect
                  </Button>
                </LoginSocialInstagram>
              </Box>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <FaTiktok
                  style={{
                    color: "black",
                    fontSize: "60px",
                  }}
                />
                <Box marginLeft="5px" marginTop="0px" fontFamily="Mulish">
                  <Typography
                    variant="body1"
                    sx={{ color: "black", marginBottom: "5px" }}
                  >
                    Facebook
                    <br />
                    @hess_bone
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
                <LoginSocialTiktok
                  client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY || ""}
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFCE3A",
                      // bgcolor: "#FFF7DD",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      width: "172px",
                      height: "30px",
                      borderRadius: "8px",
                    }}
                  >
                    £10 pcm - Connect
                  </Button>
                </LoginSocialTiktok>
              </Box>
            </Grid>
          </Grid> */}
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

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{
                marginRight: "10px",
                fontSize: "40px",
                appearance: "none",
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                backgroundColor:  "#FFC000" ,
              }}
              // checked={isChecked}
              // onChange={handleCheckboxChange}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Mulish",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "30px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#646464",
                marginTop: "3px",
                marginBottom: "4px",
              }}
            >
              Please Confirm Your Subscription!
            </Typography>
          </div>

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
              // onClick={confirmDelete}
            />
          </Grid>
        </Box>
      </React.Fragment>
    </Modal>
  );
};

export default SubscriptionModal;
