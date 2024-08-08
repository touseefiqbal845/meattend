import React, {useState } from "react";
import { Grid, Divider, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import CustomButton from "../../components/button/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import CustomFilterSelect from "../../components/Custom-Filter-Input-Field/CustomFilterwithHeading";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import ServicePackages from "./ServicesDesign";

const Index: React.FC = () => {
  const [eventselelcted, setEventSelected] = useState<any>([]);
  const [eventselelctedError, setEventSelectedError] = useState<any>([]);
  const [promoterselelcted, setPromoterSelected] = useState<any>([]);

  const [promoterselelctedError, setPromoterSelectedError] = useState<any>([]);

  const [budget, setBudget] = useState("");
  const [budgetError, setBudgetError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { events, linkedPromoters } = location.state || {};

  const eventOptions = events.map((event: any) => ({
    value: event?.id,
    label: event?.event_name,
  }));
  const promoterOptions = linkedPromoters.map((promoter: any) => ({
    value: promoter.users.id,
    label: `${promoter.users.first_name} ${promoter.users.last_name}`,
  }));

  const handlePackageSelection = (packageDetails: any) => {
    // console.log("packageDetails", packageDetails);
  };
  const handleEventChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEventSelected(event.target.value as string);
  };
  const handlePromoterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPromoterSelected(event.target.value as string);
  };

  const validations = () => {
    const isValidBudget = !!budget;
    const isValidEvent = eventselelcted.length > 0;
    const isValidPromoter = promoterselelcted.length > 0;

    setBudgetError(!isValidBudget);
    setEventSelectedError(!isValidEvent);
    setPromoterSelectedError(!isValidPromoter);
    return isValidBudget;
  };

  const handleRequest = async () => {
    try {
      const isValid = validations();

      if (!isValid) {
        console.log("Please fill in all required fields.");
        return;
      }
      const data = {
        company_id: 358,
        promoter_id: promoterselelcted,
        status: 1,
        budget: budget,
        message: message,
        event_id: eventselelcted,
      };
      const response = await MUserDashboardPagesApiService.requestPromoter(
        data
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
       
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          overflow: "hidden",
          backgroundColor: "#FBFBFB",
          padding:{sm:5,xs:2}

        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={9}
          xl={9}
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: "22px",
          }}
        >
          <Box
            style={{
              boxShadow: "0px, 0px, 0px, 0px",
            }}
          >
            <Typography
              sx={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 400,
                color: "#000315 ",
                fontFamily: "Mulish",
              }}
            >
              Promoter Details
            </Typography>
            <Divider
              sx={{
                my: 2,
                // mx: 3,
                // borderWidth: 0,
                // borderLeft: "1px solid #C7CADA",
                // borderColor: "divider",
              }}
            />
            <Box flexDirection="row" display="flex">
              <Avatar
                src={require("../../assets/others/manan.png")}
                sx={{ width: 45, height: 45, marginRight: 1 }}
              />
              <Box flexDirection="column">
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                  }}
                >
                  Sara Manan
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Mulish, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000315",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  100K Followers
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid item md={12} xs={12} sx={{ marginTop: "20px" }}>
            <ServicePackages onSelectPackage={handlePackageSelection} />
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={6} xs={12} sx={{ marginTop: "0px" }}>
              <CustomFilterSelect
                //@ts-ignore

                label="Select an Event"
                options={eventOptions}
                value={eventselelcted}
                onChange={handleEventChange}
                
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                name="Number of times the promoter should post"
                type="text"
                error={false}
                title="Number of times the promoter should post"
                inputFontSize={12}
                placeholder="Number of times the promoter should post"
                height="1.8vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                // value={values.emailAddress}
                // onChange={handleChange}
                // helperText="Email Address is required"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} mt={3}>
            <Grid item xs={12} md={1}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#000315",
                  }}
                >
                  Custom
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInput
                disabled={false}
                name="Amount"
                type="number"
                error={budgetError}
                title="Amount"
                inputFontSize={12}
                placeholder="Amount"
                // img={require("../../assets/icons/Dollor.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={false}
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#000315",
                  }}
                >
                  Per Promotion
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {budgetError && (
            <span className="text-danger inline-block mt-2">
              Budget is required
            </span>
          )}
          <Grid container spacing={1} mt={3}>
            <Grid item xs={12} md={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#000315",
                  }}
                >
                  Number of Post required
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput
                disabled={false}
                name="Posts"
                type="number"
                // error={budgetError}
                title="Posts"
                inputFontSize={12}
                placeholder="Posts"
                // img={require("../../assets/icons/Dollor.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={false}
                // value={posts}
                // onChange={(event) => setPosts(event.target.value)}
              />
            {/* </Stack> */}

            </Grid>
            <Grid item xs={12} md={3}>
            <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#000315",
                }}
              >
                Per Event Promotion
              </Typography>

            </Grid>

          </Grid>

          <Grid item md={6} xs={12} sx={{ marginTop: "20px" }}>
            <CustomFilterSelect
              //@ts-ignore

              label="Select Promoter"
              options={promoterOptions}
              value={promoterselelcted}
              onChange={handlePromoterChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <CustomInput
              name="which is number of fields"
              type="text"
              error={false}
              title="which is number of fields"
              inputFontSize={12}
              placeholder="which is number of fields"
              height="1.8vh"
              fontWeight={400}
              fontSize={14}
              showLabel={true}
              // value={fields}
              // onChange={handleChange}
              // helperText="Required"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CustomInput
              name="Message"
              type="text"
              error={messageError}
              title="Message"
              inputFontSize={12}
              placeholder="Type your message here"
              height="1.8vh"
              fontWeight={400}
              fontSize={14}
              showLabel={true}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              // helperText="Email Address is required"
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
          >
            <CustomButton
              marginLeft="0px"
              notArrow
              mdFullWidth
              title="Request"
              fullWidth
              XFontSize="16px"
              MFontSize="16px"
              xsHeight={42}
              // xsWidth="95%"
              onClick={handleRequest}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default WithLayout(Index);
