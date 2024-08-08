import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import "../style.css";
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
import CustomButton from "../../../components/button/CustomButton";
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

const REDIRECT_URI = "https://staging-web.meattend.com/";
interface TikTokModalProps {
  open: boolean;
  onClose: () => void;
}

const TikTokModal: React.FC<TikTokModalProps> = ({ open, onClose }) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

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
            TikTok Connection
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
                  <FaTiktok
                    style={{
                      //   color: "#1877f2",
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
                    TikTok Connection
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
                <LoginSocialTiktok
                  // client_key="awfzzgb8cs8kc4vq"
                  client_key="sbawdboj8f20c9km1y"
                  redirect_uri={REDIRECT_URI}
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
                </LoginSocialTiktok>
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

export default TikTokModal;
