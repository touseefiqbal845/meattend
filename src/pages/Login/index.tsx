import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
} from "@mui/material";
import AuthResponsiveAppBar from "../../components/Auth/NavBar";
import { useReducer } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CustomInput from "../../components/Input/PasswordHide";

import CustomButton from "../../components/button/CustomButton";
import bgImage from "../../assets/icons/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Input/Error";
import MAuthApiService from "../../services/MAuthApiService";
import { useAuth } from "../../hooks/useAuth";
import { InfinitySpin } from "react-loader-spinner";
import { saveRoleId } from "../../services/cacheFunc";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      // maxWidth: {xs:'33%',md:"80%"},
      margin: "auto",
    },
    bgImage: {
      backgroundImage: `url(${bgImage})`,
    },
    loginBtn: {
      marginTop: 2,
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      width: "100%",
      marginTop: "3rem",
      boxShadow: "0px 12px 60.000003814697266px 0px #02101F0F",
      borderWidth: "1.5px, 1.5px, 0px, 1.5px",
      borderStyle: "solid",
      borderImageSource:
        "linear-gradient(180deg, #E6E8F0 0%, rgba(230, 232, 240, 0) 105.26%)",
    },
    remember: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
  checked: boolean;
  passwordError: string;
  usernameError: string;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
  checked: false,
  passwordError: "",
  usernameError: "",
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setChecked"; payload: boolean }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setUsernameError"; payload: string }
  | { type: "setPasswordError"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsernameError":
      return {
        ...state,
        usernameError: action.payload,
      };
    case "setPasswordError":
      return {
        ...state,
        passwordError: action.payload,
      };
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setChecked":
      return {
        ...state,
        checked: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const history = unstable_HistoryRouter();
  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const email = state.username;
      const password = state.password;
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && password && re.test(email) && password.length > 6) {
        const info = { username: email, password: password };
        const response = await MAuthApiService.loginApi(JSON.stringify(info));

        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);

          MAuthApiService.getRoleAccess()
            .then((res) => {
              if (res.status === 200) {
                MAuthApiService.getProfile()
                  .then((res) => {
                    saveRoleId(res.data.role_id);

                    login(response.data.access_token);
                    dispatch({
                      type: "loginSuccess",
                      payload: "Login Successfully",
                    });

                    navigate("/dashboard");
                  })
                  .catch((e) => console.log(e));
              }
            })
            .catch((e) => console.log(e));

          //   history.push('/dashboard');
        } else {
          dispatch({
            type: "loginFailed",
            payload: "Incorrect username or password",
          });
          dispatch({
            type: "setIsError",
            payload: true,
          });
        }
      } else {
        if (!email) {
          dispatch({ type: "setUsernameError", payload: "Email is required." });
          setError();
        } else if (!re.test(email)) {
          dispatch({ type: "setUsernameError", payload: "Email is Invalid." });
          setError();
        }
        if (!password) {
          dispatch({
            type: "setPasswordError",
            payload: "Password is required.",
          });
          setError();
        } else if (password.length < 6) {
          dispatch({
            type: "setPasswordError",
            payload: "Password must be six or more character.",
          });
          setError();
        }
      }
    } catch (error) {
      // console.error('Error during login:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetError = () => {
    dispatch({
      type: "loginFailed",
      payload: "",
    });
    dispatch({
      type: "setIsError",
      payload: false,
    });
  };
  const setError = () => {
    dispatch({
      type: "setIsError",
      payload: true,
    });
  };
  const resetUsernameError = () => {
    dispatch({
      type: "setUsernameError",
      payload: "",
    });
    dispatch({
      type: "setIsError",
      payload: false,
    });
  };
  const resetPasswordError = () => {
    dispatch({
      type: "setPasswordError",
      payload: "",
    });
    dispatch({
      type: "setIsError",
      payload: false,
    });
  };
  //listens to change event on username textField and dispatches the setUsername action.

  const handleCheckChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setChecked",
      payload: event.target.checked,
    });
  };

  //method to submit form when a user presses the Return Key

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  //listens to change event on username textField and dispatches the setUsername action.

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    console.log("event calling");
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
    resetError();
    resetUsernameError();
  };

  //listens to change event on password textField and dispatches the setPassword action.

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
    resetError();
    resetPasswordError();
  };
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {/* {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bgImage})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <InfinitySpin
            visible={true}
            //@ts-ignore
            width={200}
            color="#FFC000"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )} */}

      {/* {!loading && ( */}
        <div className={classes.bgImage}>
          <AuthResponsiveAppBar />
          <Box
            className={classes.container}
            sx={{ width: { xs: "80%", md: "33%" } }}
          >
            <Card className={classes.card}>
              <CardHeader
                paddingBottom="0"
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "40px",
                      fontWeight: "300",
                      display: "flex",
                      color: "#000315",
                      lineHeight: "50.2px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: "600",
                        color: "#000315",
                        lineHeight: "50.2px",
                      }}
                    >
                      Sign In&nbsp;
                    </Typography>{" "}
                    to your portal
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: "20px", color: "#84858D" }}
                  >
                    {" "}
                    Hello! Let's get Started
                  </Typography>
                }
              />
              <CardContent>
                <div>
                  <CustomInput
                    type="email"
                    error={state.isError}
                    title="Email"
                    placeholder="Email"
                    img={require("../../assets/icons/email.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    inputFontSize={14}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    value={state.username}
                  />
                  <Error
                    text={state.helperText}
                    fontSize={14}
                    fontWeight={400}
                  />
                  <Error
                    text={state.usernameError}
                    fontSize={14}
                    fontWeight={400}
                  />
                  <CustomInput
                    type="password"
                    error={state.isError}
                    title="Password"
                    inputFontSize={14}
                    placeholder="Password"
                    img={require("../../assets/icons/Lock.png")}
                    endImg={require("../../assets/icons/eye-slash.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    value={state.password}
                  />
                  <Error
                    text={state.passwordError}
                    fontSize={14}
                    fontWeight={400}
                  />
                </div>
                <div className={classes.remember}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checked}
                        onChange={handleCheckChange}
                        size="small"
                        sx={{ paddingTop: "1rem" }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#84858D",
                          alignItem: "self",
                        }}
                      >
                        Remember Password
                      </Typography>
                    }
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#84858D",
                      alignItem: "self",
                      paddingTop: "1rem",
                    }}
                  >
                    Forget Password?
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <CustomButton
                  notArrow
                  mdFullWidth
                  title="Sign In"
                  fullWidth
                  XFontSize="16"
                  MFontSize="16"
                  onClick={handleLogin}
                  disabled={isSubmitting} 
                  loading={isSubmitting} 
                
                />
              </CardActions>
              <div>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#D8DAE7"
                  width="100%"
                  my={2}
                >
                  <Box
                    width="40%"
                    borderBottom="1px solid #D8DAE7"
                    mr={2}
                  ></Box>
                  <Typography variant="h6" fontSize="14px">
                    Or
                  </Typography>
                  <Box
                    width="40%"
                    borderBottom="1px solid #D8DAE7"
                    ml={2}
                  ></Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#D8DAE7"
                  width="100%"
                  my={2}
                >
                  <Typography variant="h6" fontSize="14px">
                    Don't have an account?{" "}
                  </Typography>
                  <Link to="/signUp">
                    <Typography variant="h6" fontSize="14px" color="#FFC000">
                      Sign Up{" "}
                    </Typography>
                  </Link>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      {/* )} */}
    </>
  );
}
