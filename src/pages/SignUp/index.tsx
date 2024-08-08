import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../../theme";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import bgImage from "../../assets/icons/login-bg.png";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { createStyles, makeStyles } from "@mui/styles";
import "./sign-up.css";
import DragDropFileUpload from "./CompanyBillUpload";
import MutliSelectCheckbox from "./Multichecbox";
import "../../assets/css/service-package.css";
import ThumbsUpIcon from "../../assets/icons/thumb-up-1.svg";
import ServicePackages from "./ServicesPackages";
import Button from "@mui/material/Button";
import axios from "axios";
import CustomSnackbar from "../../components/CustomSnackbar/CustomeSnackbar";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AuthResponsiveAppBar from "../../components/Auth/NavBar";
import { Link, useNavigate } from "react-router-dom";
import {
  SubscriptionApiPayload,
  SignUpOption,
  PackageI,
  Option,
} from "../../services/model";
import SteperOneTypo from "./SteperOneTypo";
import SteperTwoTypo from "./SteperTwoTypo";
import SteperThirdTypo from "./SteperThirdTypo";
import SteperLastTypo from "./SteperFourthTypo";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
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
const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const SignUp: React.FC = () => {
  function Services({ value, title }: { value: number; title: string }) {
    return (
      <Stack direction={"column"}>
        <Typography
          sx={{
            fontSize: { md: 30, xs: 25 },
            color: "black",
            fontWeight: "bold",
          }}
        >
          {value}+
        </Typography>
        <Typography sx={{ color: "#84858D", fontSize: { md: 16, xs: 10 } }}>
          {title}
        </Typography>
      </Stack>
    );
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [industry, setIndustry] = React.useState<Option[]>([
  ]);
  const [category, setCategory] = React.useState<Option[]>([]);
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [directorEmailError, setDirectorEmailError] =
    React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [directorEmail, setDirectorEmail] = React.useState<string>("");
  const [industrySelectedValues, setIndustrySelectedValues] = React.useState<
  Option[]
  >([]);
  const [industryError, setIndustryError] = useState(false);
  const [categorySelectedValues, setCategorySelectedValues] = React.useState<
  Option[]
  >([]);
  const [categoryError, setCategoryError] = useState(false);
  const [companyName, setCompanyName] = React.useState<string>("");
  const [companyNameError, setCompanyNameError] = useState(false);
  const [directorName, setDirectorName] = React.useState<string>("");
  const [directorNameError, setdirectorNameError] = useState(false);
  const [companyNumber, setCompanyNumber] = React.useState<string>("");
  const [CompanyNumberError, setCompanyNumberError] = React.useState(false);
  const [password, setPassword] = React.useState<string>("");
  const [cpassword, setcPassword] = React.useState<string>("");
  const [passwordError, setpasswordError] = React.useState(false);
  const [confirmPasswordError, setconfirmPasswordError] = React.useState(false);
  const [profImage, setProfImage] = React.useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [companyBillError, setCompanyBillError] = React.useState(false);
  const [templateId, setTemplateId] = React.useState<number>(1);
  const [description, setDescription] = React.useState<string>("");
  const [descriptionError, setdescriptionError] = React.useState(false);

  const [address_line1, setaddress_line1] = React.useState<string>("");
  const [address_line1Error, setAddress_line1Error] = React.useState(false);
  const [address_line2, setaddress_line2] = React.useState<string>("");
  const [address_line2Error, setAddress_line2Error] = React.useState(false);
  const [address_line3, setaddress_line3] = React.useState<string>("");
  const [address_line3Error, setAddress_line3Error] = React.useState(false);
  const [state, setState] = React.useState<string>("");
  const [stateError, setStateError] = React.useState(false);
  const [city, setCity] = React.useState<string>("");
  const [cityError, setCityError] = React.useState(false);
  const [country, setCountry] = React.useState<string>("");
  const [zipnumber, setZipNumber] = React.useState<string>("");
  const [zipnumberError, setZipNumberError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);

  const [selectedPackage, setSelectedPackage] = useState<PackageI | null>(null);
  const [selectedPackageError, setSelectedPackageError] = useState(false);

  const [billing_address, setbilling_address] = React.useState<string>("");
  const [billing_addressError, setBilling_addressError] = useState(false);
  const [cardholdername, setCardHolderName] = React.useState<string>("");
  const [cardholdernameError, setCardholdernameError] = useState(false);
  const [masterPassword, setMasterPassword] = React.useState<string>("");
  const [masterPasswordError, setMasterPasswordError] = useState(false);
  const [cmasterPassword, setcMasterPassword] = React.useState<string>("");
  const [cmasterPasswordError, setCmasterPasswordError] = useState(false);

  const [subscriptionPayload, setSubscriptionPayload] =
    useState<SubscriptionApiPayload | null>(null);
  const [packages, setPackage] = React.useState<PackageI[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  // APIS Calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://staging-api.meattend.com/api/react/industry-list"
        );
        const data = await response.json();
        const filteredData: Option[] = data.value.map(
          ({ id, name }: { id: number; name: string }) => ({ id, name })
        );
        setIndustry(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [1]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://staging-api.meattend.com/api/react/category-list",
          {
            params: {
              industry_ids: industrySelectedValues.map(
                ({ id }: { id: number }) => id
              ),
            },
          }
        );
        const data = await response.data;
        const filteredData: Option[] = data.value.map(
          ({
            id,
            category,
            industry_id,
          }: {
            id: number;
            category: string;
            industry_id: number;
          }) => ({ id, name: category, industry: industry_id })
        );
        setCategory(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [industrySelectedValues]);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://staging-api.meattend.com/api/react/list-package",
          {
            params: {
              user_id: null,
            },
          }
        );
        const data = await response.data;
        const filteredData: PackageI[] = data.packages;
        setPackage(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [1]);

  // Handlers

  const handleFileUpload = (
    file: Blob,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (e && e.target && e.target.result) {
        const base64String = e.target.result as string;
        setProfImage(base64String);
        setImage(base64String);
        setIsImageSelected(true);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setProfImage(null);
    setIsImageSelected(false);
  };
  const handleIndustryChange = (selected: Option[]) => {
    setIndustrySelectedValues(selected);
  };

  const handleCategoryChange = (selected: Option[]) => {
    const selectedCategories = selected.map((option) => option.name);
     //@ts-ignore
    setCategorySelectedValues(selectedCategories);
  };
  const validateFieldFirstStep = () => {
    const isValidCompanyName = !!companyName;
    const isValidCompanyNumber = !!companyNumber;
    const isValidIndustry = industrySelectedValues.length > 0;
    const isValidCategory = categorySelectedValues.length > 0;
    const isValidDescription = !!description;
    const isValidEmail = !!email;
    const isValidDirectorEmail = !!directorEmail;
    const isValidDirectorName = !!directorName;
    const isValidPassword =
      !!password && !passwordError && !confirmPasswordError;
    const isValidConfirmPassword = !!cpassword && !confirmPasswordError;
    const isValidCompanyBillUploading = !!profImage;

    setCompanyNameError(!isValidCompanyName);
    setCompanyNumberError(!isValidCompanyNumber);
    setIndustryError(!isValidIndustry);
    setCategoryError(!isValidCategory);
    setdescriptionError(!isValidDescription);
    setEmailError(!isValidEmail);
    setDirectorEmailError(!isValidDirectorEmail);
    setdirectorNameError(!isValidDirectorName);
    setpasswordError(!isValidPassword);
    setconfirmPasswordError(!isValidConfirmPassword);
    setCompanyBillError(!isValidCompanyBillUploading);

    return (
      isValidCompanyName &&
      isValidCompanyNumber &&
      isValidIndustry &&
      isValidCategory &&
      isValidDescription &&
      isValidEmail &&
      isValidDirectorEmail &&
      isValidDirectorName &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidCompanyBillUploading
    );
  };

  const validateFieldSecoundStep = () => {
    const isValidAddress1 = !!address_line1;
    const isValidAddress2 = !!address_line2;
    const isValidAddress3 = !!address_line3;
    const isValidState = !!state;
    const isValidCity = !!city;
    const isValidCountry = !!country;
    const isValidZipNumber = !!zipnumber;

    setAddress_line1Error(!isValidAddress1);
    setAddress_line2Error(!isValidAddress2);
    setAddress_line3Error(!isValidAddress3);
    setStateError(!isValidState);
    setCityError(!isValidCity);
    setCountryError(!isValidCountry);
    setZipNumberError(!isValidZipNumber);

    return (
      isValidAddress1 &&
      isValidAddress2 &&
      isValidAddress3 &&
      isValidState &&
      isValidCity &&
      isValidCountry &&
      isValidZipNumber
    );
  };

  const validateFieldThirdStep = () => {
    const isValidSelectedPackages = !!selectedPackage;
    setSelectedPackageError(!isValidSelectedPackages);
    return isValidSelectedPackages;
  };

  const validateFieldLastStep = () => {
    const isValidBillingAddress = !!billing_address;
    const isValidCardHolderName = !!cardholdername;
    const isValidMasterPassword = !!masterPassword;
    const isValidConfirmMasterPassword = !!cmasterPassword;

    setBilling_addressError(!isValidBillingAddress);
    setCardholdernameError(!isValidCardHolderName);
    setMasterPasswordError(!isValidMasterPassword);
    setCmasterPasswordError(!isValidConfirmMasterPassword);

    return (
      isValidBillingAddress &&
      isValidCardHolderName &&
      isValidMasterPassword &&
      isValidConfirmMasterPassword
    );
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handlePackageSelection = (packageDetails: PackageI) => {
    console.log("packageDetails", packageDetails);
    const { id, package_name, stripe_id, trial_days } = packageDetails;
    const subscriptionPayload: SubscriptionApiPayload = {
      package_id: id,
      package_name,
      plan: stripe_id,
      //@ts-ignore
      trial_days,
    };
    setSelectedPackage(packageDetails);
    setSubscriptionPayload(subscriptionPayload);
  };

  // Email Related Handlers

  const changeEmailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const changeDirectorEmailHandler = (event: any) => {
    setDirectorEmail(event.target.value);
  };

  const validateDirectorEmail = () => {
    const emailRegex1 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (directorEmail && emailRegex1.test(directorEmail)) {
      setDirectorEmailError(false);
    } else {
      setDirectorEmailError(true);
    }
  };

  //  SignUp Password Confirmation
  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const isValidPassword = passwordRegex.test(newPassword);
    setpasswordError(!isValidPassword);
  };

  const handleConfirmPasswordChange = (event: any) => {
    const newConfirmPassword = event.target.value;
    setcPassword(newConfirmPassword);
    const passwordsMatch = newConfirmPassword === password;
    setconfirmPasswordError(!passwordsMatch);
  };

  // Master Password Confirmation
  const handleMasterPasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setMasterPassword(newPassword);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const isValidPassword = passwordRegex.test(newPassword);
    setMasterPasswordError(!isValidPassword);
  };

  const handleMasterConfirmPasswordChange = (event: any) => {
    const newConfirmPassword = event.target.value;
    setcMasterPassword(newConfirmPassword);

    const passwordsMatch = newConfirmPassword === password;
    setCmasterPasswordError(!passwordsMatch);
  };

  const handleBack = (step: number) => () => {
    setActiveStep(step - 1);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // APIS Calling in Sequense for stripe account saving for future Use

  const handleStep = (step: number) => async () => {
    try {
      if (step < 1) {
        const isValid = validateFieldFirstStep();

        if (!isValid) {
          console.log("Please fill in all required fields.");
          return;
        }
        setActiveStep(step + 1);
      } else if (step < 2) {
        const isValid = validateFieldSecoundStep();

        if (!isValid) {
          console.log("Please fill in all required fields.");
          return;
        }
        setActiveStep(step + 1);
      } else if (step < 3) {
        const isValid = validateFieldThirdStep();

        if (!isValid) {
          console.log("Please fill in all required fields.");
          return;
        }
        setActiveStep(step + 1);
      } else {
        const isValid = validateFieldLastStep();

        if (!isValid) {
          console.log("Please fill in all required fields.");
          return;
        }
        setIsSubmitting(true);
        const address = `${address_line1}, ${address_line2}, ${address_line3}, ${city}, ${country}, ${state}, ${zipnumber}`;
        const extractIndustryNames = (selectedValues: Option[]): string[] => {
          return selectedValues.map((option) => option.name);
        };
        const industriesPayload = extractIndustryNames(industrySelectedValues);
  
        const dataToSend = {
          company_name: companyName,
          directors_name: directorName,
          company_government_number: companyNumber,
          email: email,
          password: password,
          description: description,
          selectedCompany: 0,
          categories:categorySelectedValues ,
          industries:industriesPayload,
          template_id: templateId,
          role_id: 2,
          payment_password: password,
          address_proof_image: profImage,
          address: address,
          director_email: directorEmail,
        };

        // Step 1: Sign up
        try {
          const signUpResponse = await axios.post(
            "https://staging-api.meattend.com/api/react/signin/store",
            dataToSend
          );
          console.log("From signup", signUpResponse);

          if (signUpResponse.status === 201) {
            const userId = signUpResponse.data.id;
            const customerId = signUpResponse.data.stripe_customer.id;
            localStorage.setItem("user_ID", userId);
            // Step 2: Create setup intent
            const setupIntentPayload = {
              user_id: userId,
              customer_id: customerId,
            };

            // Step 2: setup-intent
            const setupIntentUrl =
              "https://staging-api.meattend.com/api/v1/user/setup-intent";
            const setupIntentResponse = await axios.post(
              setupIntentUrl,
              setupIntentPayload
            );
            console.log("Setup-intent API Response:", setupIntentResponse);
            if (setupIntentResponse.status === 200) {
              const clientSecret = setupIntentResponse.data.client_secret;
              console.log("clientSecret:", clientSecret);
              setClientSecret(clientSecret);
              localStorage.setItem("client-key", clientSecret);
              const billing = {
                name: cardholdername,
                address: {
                  city: city,
                  line1: address_line1,
                  line2: address_line2,
                  postal_code: "4222",
                },
              };

              // Step 3: setup-intent Confirmation
              if (stripe) {
                try {
                  const { setupIntent, error } = await stripe.confirmCardSetup(
                    clientSecret,
                    {
                      payment_method: {
                        //@ts-ignore
                        card: elements.getElement(CardElement)!,
                        billing_details: billing,
                      },
                    }
                  );

                  if (error) {
                    console.error(error);
                  } else if (setupIntent.status === "succeeded") {
                    setPaymentSucceeded(true);
                    console.log("Setup Intent ID:", setupIntent.id);
                    const paymentMethodfromConfirmation =
                      setupIntent.payment_method;
                    //@ts-ignore
                    localStorage.setItem("paymentMethodId",paymentMethodfromConfirmation);
                    console.log("Status:", setupIntent.status);
                  }
                } catch (error) {
                  console.error("Error confirming card payment:", error);
                }
              }

              // Step 4: Assigning Payment Method so me attend user can extract paymentMethod from that
              const ID = localStorage.getItem("user_ID");
              const paymentMethodPayload = { user_id: ID };
              const paymentMethodResponse = await axios.post(
                "https://staging-api.meattend.com/api/v1/user/payment-methods",
                paymentMethodPayload
              );
              console.error(
                "Fourth API fetchapi giving error:",
                paymentMethodResponse
              );

              if (paymentMethodResponse.status >= 200) {
                const user_id = localStorage.getItem("user_ID");
                const payment = localStorage.getItem("paymentMethodId");

                // Step 5: Package add Successfully and Email send to relavent User for confirmation
                const subscriptionResponse = await axios.put(
                  "https://staging-api.meattend.com/api/v1/user/subscription",
                  {
                    ...subscriptionPayload,
                    user_id,
                    payment,
                  }
                );
                console.error(
                  "Fifth fetch api giving error:",
                  subscriptionResponse
                );
                setIsCompleted(true);
              }
            }
          }
        } catch (error: any) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const apiErrors = error.response.data.errors;
            let errorMessage = "Errors:\n";
            for (const key in apiErrors) {
              errorMessage += `${key}: ${apiErrors[key]}\n`;
            }
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
          }
        }
      }
    } catch (error) {
      console.error("Error during API calls:", error);
      // window.alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.bgImage}>
        <AuthResponsiveAppBar />

        {isCompleted ? (
          <Card
            sx={{
              width: { xs: "80%", md: "60%" },
              margin: "15vh auto",
              padding: "10px",
              boxSizing: "border-box",
              boxShadow: "0px 12px 60.000003814697266px 0px #02101F0F",
              minHeight: "60vh",
            }}
          >
            <div style={{ textAlign: "center", marginTop: 80, fontSize: 36 }}>
              <img src={ThumbsUpIcon} />
              <br />
              <p>
                <strong>Congratulations,</strong> You have now completed your
                registeration and our team will review your application. We will
                try and get back to you in due course. Please check your email
                for any updates regarding your application
              </p>
              <p>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC000",
                    boxShadow: "none",
                    color: "black",
                    textTransform: "none",
                    borderRadius: "5px",
                    fontWeight: 700,
                    fontSize: { xs: "10px", md: "14px" },
                    py: 0.9,
                    px: 1.5,
                    ml: 1.5,
                  }}
                >
                  Home
                </Button>
              </p>
            </div>
          </Card>
        ) : (
          <Box
            className={classes.container}
            sx={{ width: { xs: "80%", md: "60%" } }}
          >
            <Card className={classes.card}>
              <CustomSnackbar
                open={openSnackbar}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                width="30%"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />

              <CardHeader
                paddingBottom="0"
                title={
                  <div>
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      className="custom-stepper"
                    >
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepButton color="inherit">{label}</StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === 0 ? (
                      <>
                        <SteperOneTypo />
                      </>
                    ) : activeStep === 1 ? (
                      <>
                        <SteperTwoTypo />
                      </>
                    ) : activeStep === 2 ? (
                      <>
                        <SteperThirdTypo />
                      </>
                    ) : activeStep === 3 ? (
                      <>
                        <SteperLastTypo />
                      </>
                    ) : (
                      <>
                        <ServicePackages  onSelectPackage={handlePackageSelection}
                        />
                      </>
                    )}
                  </div>
                }
              />
              <CardContent>
                {activeStep === 0 ? (
                  <>
                    <Grid
                      container
                      rowSpacing={2}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={companyNameError}
                          title="Company name"
                          placeholder="Company name"
                          img={require("../../assets/icons/building.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          inputFontSize={14}
                          value={companyName}
                          onChange={(event) =>
                            setCompanyName(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="number"
                          error={CompanyNumberError}
                          title="Company government number"
                          inputFontSize={14}
                          placeholder="Company Government Number"
                          img={require("../../assets/icons/Vector.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={companyNumber}
                          onChange={(event) =>
                            setCompanyNumber(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="email"
                          error={emailError}
                          title="Email address"
                          inputFontSize={14}
                          placeholder="Email address"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={email}
                          onChange={changeEmailHandler}
                          onBlur={validateEmail}
                        />
                        {emailError && (
                          <span className="text-danger inline-block mt-2">
                            Please enter a valid email address
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6} mt={{md:2}}>
                        <MutliSelectCheckbox
                          label="Industry"
                          names={industry}
                          onChange={handleIndustryChange}
                          selected={industrySelectedValues}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} mt={{md:2}}>
                        <MutliSelectCheckbox
                          label="Category"
                          names={category}
                          onChange={handleCategoryChange}
                          selected={categorySelectedValues}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={directorNameError}
                          title="Directors name"
                          inputFontSize={14}
                          placeholder="Directors name"
                          img={require("../../assets/icons/Vector.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={directorName}
                          onChange={(event) =>
                            setDirectorName(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <CustomInput
                          type="email"
                          error={directorEmailError}
                          title="Directors email"
                          inputFontSize={14}
                          placeholder="Directors email"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={directorEmail}
                          onChange={changeDirectorEmailHandler}
                          onBlur={validateDirectorEmail}
                        />
                        {directorEmailError && (
                          <span className="text-danger inline-block mt-2">
                            Please enter a valid email address
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <CustomInput
                          type="text"
                          error={descriptionError}
                          row={4}
                          title="Description"
                          inputFontSize={14}
                          placeholder="Description"
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="password"
                          error={passwordError}
                          title="Password"
                          inputFontSize={14}
                          placeholder="Password"
                          img={require("../../assets/icons/Lock.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        {passwordError && (
                          <span className="text-danger inline-block mt-2">
                            Password should be at least 8 characters long,
                            contain one uppercase letter, one lowercase letter,
                            and one number.
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="password"
                          error={confirmPasswordError}
                          title="Confirm password"
                          inputFontSize={14}
                          placeholder="Confirm password"
                          img={require("../../assets/icons/Lock.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={cpassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && (
                          <span className="text-danger inline-block mt-2">
                            Passwords do not match.
                          </span>
                        )}
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Grid item md={12} xs={12} sx={{ marginTop: 2 }}>
                          <Typography
                          sx={{
                             fontSize:"14px",
                             fontWeight:700,
                             color:"#000315"
                          }}
                          >Upload Proof of Address</Typography>
                          <Box position="relative">
                            {profImage ? (
                              <React.Fragment>
                                <img
                                  src={profImage}
                                  alt="Uploaded"
                                  style={{
                                    maxHeight: "200%",
                                    width: "100%",
                                    maxWidth: "150%",
                                    marginTop: "6px",
                                    height: "217px",
                                  }}
                                />
                                {isImageSelected && (
                                  <IconButton
                                    sx={{
                                      position: "absolute",
                                      top: 4,
                                      right: 5,
                                      color: "black",
                                    }}
                                    onClick={handleRemoveImage}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                )}
                              </React.Fragment>
                            ) : (
                              <DragDropFileUpload
                                onFileUpload={handleFileUpload}
                                setImage={setProfImage}
                                fontWeight={700}
                                fontSize={14}
                                title=""
                                // value={}
                                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler("profile_image", event.target.value)}
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : activeStep === 1 ? (
                  <>
                    <Grid
                      container
                      rowSpacing={2}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={address_line1Error}
                          title="Address line 1"
                          placeholder="Address line 1"
                          img={require("../../assets/icons/GPS.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          inputFontSize={14}
                          value={address_line1}
                          onChange={(event) =>
                            setaddress_line1(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={address_line2Error}
                          title="Address line 2"
                          inputFontSize={14}
                          placeholder="Address line 2"
                          img={require("../../assets/icons/GPS.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) =>
                            setaddress_line2(event.target.value)
                          }
                          value={address_line2}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={address_line3Error}
                          title="Address line 3"
                          inputFontSize={14}
                          placeholder="Address line 3"
                          img={require("../../assets/icons/GPS.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) =>
                            setaddress_line3(event.target.value)
                          }
                          value={address_line3}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={stateError}
                          title="State"
                          inputFontSize={14}
                          placeholder="State"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) => setState(event.target.value)}
                          value={state}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={cityError}
                          title="City"
                          inputFontSize={14}
                          placeholder="City"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) => setCity(event.target.value)}
                          value={city}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={countryError}
                          title="Country"
                          inputFontSize={14}
                          placeholder="Country"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) => setCountry(event.target.value)}
                          value={country}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={zipnumberError}
                          title="Zip Code"
                          inputFontSize={14}
                          placeholder="Zip Code"
                          img={require("../../assets/icons/email.png")}
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          onChange={(event) => setZipNumber(event.target.value)}
                          value={zipnumber}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : activeStep === 2 ? (
                  <>
                    <ServicePackages onSelectPackage={handlePackageSelection} />
                  </>
                ) : activeStep === 3 ? (
                  <>
                    {/* <CardElement /> */}

                    <Grid
                      container
                      rowSpacing={2}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} md={12}>
                        <Typography variant="h6" fontSize="16px">
                          Your bank details you provide will be used when you
                          make any purchase within Me Attend. Please read the
                          terms and conditions for Me Attend here{" "}
                          <Link to="/terms" className="terms-link">
                            (Terms and Conditions)
                          </Link>
                          .
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="text"
                          error={cardholdernameError}
                          title="Card holder name"
                          inputFontSize={14}
                          placeholder="Card holder name"
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={cardholdername}
                          onChange={(event) =>
                            setCardHolderName(event.target.value)
                          }
                        />
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <div
                            style={{
                              marginLeft: "28px",
                              marginTop: "33px",
                              fontSize: "16px",
                            }}
                          >
                            Card Details
                          </div>

                          <div
                            style={{
                              border: "2px solid #ccc",
                              borderRadius: "14px",
                              padding: "18px",
                              marginLeft: "21px",
                              marginTop: "20px",
                            }}
                          >
                            <CardElement options={{}} />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <CustomInput
                          type="text"
                          error={billing_addressError}
                          title="Billing address"
                          inputFontSize={14}
                          placeholder="Billing address"
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={billing_address}
                          onChange={(event) =>
                            setbilling_address(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="password"
                          error={masterPasswordError}
                          title="Master Password"
                          inputFontSize={14}
                          placeholder=" Password"
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={masterPassword}
                          onChange={handleMasterPasswordChange}
                        />
                        {masterPasswordError && (
                          <span className="text-danger inline-block mt-2">
                            Password should be at least 8 characters long,
                            contain one uppercase letter, one lowercase letter,
                            and one number.
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          type="password"
                          error={cmasterPasswordError}
                          title="Master Confirm Password"
                          inputFontSize={14}
                          placeholder="Confirm Password"
                          height="1.7vh"
                          fontWeight={400}
                          fontSize={14}
                          value={cmasterPassword}
                          onChange={handleMasterConfirmPasswordChange}
                        />
                        {cmasterPasswordError && (
                          <span className="text-danger inline-block mt-2">
                            Passwords do not match.
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </CardContent>
              <CardActions>
                <Box ml="auto" display="flex" flexDirection="row">
                  {activeStep !== 0 && (
                    <CustomButton
                      notArrow
                      // mdFullWidth
                      title="Previous"
                      // fullWidth
                      color="#A0A3B5"
                      borderColor="#A0A3B5"
                      bgColor="white"
                      XFontSize="16"
                      MFontSize="16"
                      onClick={handleBack(activeStep)}
                    />
                  )}

                  <CustomButton
                    marginLeft="12px"
                    notArrow
                    // mdFullWidth
                    title={activeStep !== 3 ? "Next" : "Finish"}
                    // fullWidth
                    XFontSize="16"
                    MFontSize="16"
                    onClick={handleStep(activeStep)}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  />
                </Box>
              </CardActions>
            </Card>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
};
export default SignUp;
