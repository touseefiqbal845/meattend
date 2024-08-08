import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import CustomInput from "../../../components/Input/CustomInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import FormLabel from "@mui/material/FormLabel";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateTicket = () => {
  const [values, setValues] = useState<{
    ticketName: string;
    ticketPrice: string;
    eventName: string;
    eventDate: string;
    eventTime: string;
    eventAddress: string;
    ticketsAllocated: string;
    customerTickets: string;
    companyName: string;
    description: string;
  }>({
    ticketName: "",
    ticketPrice: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventAddress: "",
    ticketsAllocated: "",
    customerTickets: "",
    companyName: "",
    description: "",
  });
  const [error, setError] = useState<{
    ticketName: boolean;
    ticketPrice: boolean;
    eventName: boolean;
    eventDate: boolean;
    eventTime: boolean;
    eventAddress: boolean;
    ticketsAllocated: boolean;
    customerTickets: boolean;
    companyName: boolean;
    description: boolean;
  }>({
    ticketName: false,
    ticketPrice: false,
    eventName: false,
    eventDate: false,
    eventTime: false,
    eventAddress: false,
    ticketsAllocated: false,
    customerTickets: false,
    companyName: false,
    description: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void | Promise<void> => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };
  const handleHeldDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD");
      setValues((prev) => ({ ...prev, eventDate: formattedDate }));
      setError((prev) => ({ ...prev, eventDate: false }));
    }
  };
  return (
    <Container maxWidth={false}>
      <Box pb={3}>
        <Typography
          mt={{ xs: 5 }}
          fontSize={30}
          fontWeight={700}
          color={"gray.graphTitle"}
        >
          Create Ticket
        </Typography>
      </Box>
      <Grid container columnSpacing={4}>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="ticketName"
            type="text"
            error={error.ticketName}
            title="Ticket Name"
            inputFontSize={12}
            placeholder="Ticket Name"
            img={require("../../../assets/icons/tickerName.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.ticketName}
            onChange={handleChange}
            helperText="Ticket Name is required"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="ticketPrice"
            type="text"
            error={error.ticketPrice}
            title="Ticket Price"
            inputFontSize={12}
            placeholder="Ticket Price"
            img={require("../../../assets/icons/tickerPrice.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.ticketPrice}
            onChange={handleChange}
            helperText="Ticket Price is required"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="eventName"
            type="text"
            error={error.eventName}
            title="Event Name"
            inputFontSize={12}
            placeholder="Event Name"
            img={require("../../../assets/icons/eventName.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.eventName}
            onChange={handleChange}
            helperText="Event Name is required"
          />
        </Grid>

        <Grid item md={4} xs={12} mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <text className="Typeography-title-input">Event Date</text>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={values.eventDate ? dayjs(values.eventDate) : null}
                onChange={handleHeldDateChange}
                label="Event Date"
                sx={{
                  width: "100%",
                  ".MuiFormLabel-root,.MuiInputLabel-root": {
                    color: "#BCBCBD",
                  },

                  "& .MuiInputLabel-root": {
                    fontSize: "13px",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FFC000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#FFC000" },
                    height: "50px",
                    borderRadius: "14px",
                    borderColor: "red",
                  },
                  ".css-vponqm-MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root":
                    {
                      height: 200,
                    },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                  //change input border color
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item md={4} xs={12} mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <text className="Typeography-title-input">Event Time</text>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                value={values.eventDate ? dayjs(values.eventTime) : null}
                onChange={handleHeldDateChange}
                label="Event Time"
                sx={{
                  width: "100%",
                  ".MuiFormLabel-root,.MuiInputLabel-root": {
                    color: "#BCBCBD",
                  },

                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.0vh",
                  },

                  "& .MuiInputLabel-root": {
                    fontSize: "13px",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FFC000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#FFC000" },
                    height: "50px",
                    borderRadius: "14px",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },

                  //change input border color
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="eventAddress"
            type="text"
            error={error.eventAddress}
            title="Event Address"
            inputFontSize={12}
            placeholder="Event Address"
            img={require("../../../assets/icons/tickerName.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.eventAddress}
            onChange={handleChange}
            helperText="Event Address is required"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="ticketsAllocated"
            type="text"
            error={error.ticketsAllocated}
            title="Number of tickets allocated"
            inputFontSize={12}
            placeholder="Tickets Allocated"
            img={require("../../../assets/icons/tickerName.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.ticketsAllocated}
            onChange={handleChange}
            helperText="Tickets Allocated is required"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="customerTickets"
            type="text"
            error={error.customerTickets}
            title="Number of tickets one customer can buy"
            inputFontSize={12}
            placeholder="Customer Tickets"
            img={require("../../../assets/icons/tickerName.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.customerTickets}
            onChange={handleChange}
            helperText="Customer Tickets is required"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <CustomInput
            name="companyName"
            type="text"
            error={error.companyName}
            title="Company Name"
            inputFontSize={12}
            placeholder="Company Name"
            img={require("../../../assets/icons/building.png")}
            height="2.0vh"
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.companyName}
            onChange={handleChange}
            helperText="Company Name is required"
          />
        </Grid>
        <Box mx={4} my={4}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Option
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                mt: 2,
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="One Event"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="All Linked Events"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Grid item md={12} xs={12}>
          <CustomInput
            name="description"
            type="text"
            error={error.description}
            title="Description"
            inputFontSize={12}
            placeholder="Description"
            height={200}
            fontWeight={400}
            fontSize={14}
            showLabel={true}
            value={values.description}
            onChange={handleChange}
            helperText="Description is required"
          />
        </Grid>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFC000",
            boxShadow: "none",
            color: "black",
            textTransform: "none",
            borderRadius: "7px",
            fontSize: { xs: 10, md: 12 },
            fontWeight: 700,
            mx: 4,
            mt: 3,
            width: {
              md: "140px",
              xs: "120px",
            },
            height: { md: "42px", xs: "30px" },
            "&:hover": {
              color: "white",
            },

            // width: { xs: "100px", md: "120px" },
          }}
        >
          Create Ticket
        </Button>
      </Grid>
    </Container>
  );
};
export default WithLayout(CreateTicket);
