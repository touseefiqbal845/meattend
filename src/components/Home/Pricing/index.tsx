import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Paper,
  Box,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { features } from "process";
import { useTheme } from "@emotion/react";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowLeftOutlined,
  ArrowRightAltOutlined,
  ArrowRightOutlined,
} from "@mui/icons-material";

interface Feature {
  name: string;
  value: number;
  type: "img" | "text";
  align?: "center" | "left" | "right";
}

interface Plan {
  id: number;
  title: string;
  body?: string;
  amount?: string;
  features: Feature[];
  price: string;
  buttonText: string;
}

const tableData: Plan[] = [
  {
    id: 1,
    title: "Compare plans",
    body: " Choose your workspace plan according to your organisational plan",
    amount: "£10",

    features: [
      { name: "Number of Images", value: 1, type: "text", align: "left" },
      { name: "Number of Video", value: 2, type: "text", align: "left" },
      { name: "Number of Menus", value: 3, type: "text", align: "left" },
      { name: "Extra Free Staff", value: 4, type: "text", align: "left" },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  {
    id: 2,
    title: "Compare plans",
    body: "Basic package is a 2 year contract package which is free until December 2024 and then £15 per month after that",
    amount: "£100",

    features: [
      { name: "3 Images", value: 1, type: "text" },
      {
        name: require("../../../assets/icons/cross.png"),
        value: 2,
        type: "img",
      },
      { name: "2 Menus", value: 3, type: "text" },
      {
        name: require("../../../assets/icons/cross.png"),
        value: 4,
        type: "img",
      },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  {
    id: 3,
    title: "Compare plans",
    body: "Start marketing today with award-winning email and social tools.",
    amount: "£200",

    features: [
      { name: "5 Images", value: 1, type: "text" },
      { name: "1 Videos", value: 2, type: "text" },
      { name: "3 Menus", value: 3, type: "text" },
      { name: "2 Staff", value: 4, type: "text" },
      // { name: require("../../../assets/icons/cross.png"), value: 2, type: "img" },
      // { name: "2 Menus", value: 1, type: "text" },
      // { name: require("../../../assets/icons/cross.png"), value: 2, type: "img" },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  {
    id: 4,
    title: "Compare plans",
    body: "Start marketing today with award-winning email and social tools.",
    amount: "£500",

    features: [
      { name: "5 Images", value: 1, type: "text" },
      { name: "1 Videos", value: 2, type: "text" },
      { name: "3 Menus", value: 3, type: "text" },
      {
        name: require("../../../assets/icons/check.png"),
        value: 4,
        type: "img",
      },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  {
    id: 5,
    title: "Compare plans",
    body: "Start marketing today with award-winning email and social tools.",
    amount: "£1000",

    features: [
      { name: "5 Images", value: 1, type: "text" },
      { name: "1 Videos", value: 2, type: "text" },
      { name: "3 Menus", value: 3, type: "text" },
      {
        name: require("../../../assets/icons/check.png"),
        value: 4,
        type: "img",
      },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  {
    id: 6,
    title: "Compare plans",
    body: "Start marketing today with award-winning email and social tools.",
    amount: "£4000",

    features: [
      { name: "3 Images", value: 1, type: "text" },
      {
        name: require("../../../assets/icons/cross.png"),
        value: 2,
        type: "img",
      },
      { name: "2 Menus", value: 3, type: "text" },
      {
        name: require("../../../assets/icons/cross.png"),
        value: 4,
        type: "img",
      },
      // Add more features as needed
    ],
    price: "£0",
    buttonText: "Sign Up",
  },
  // Add more plan data as needed
];

const useStyles = makeStyles({
  body: {
    fontFamily: "mulish",
  },
  main: {
    fontFamily: "mulish",
    width: 1170,
    margin: "0 auto",
  },
  priceTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "0 none",
  },
  priceTableRow: {
    "&:not(:last-child)": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.03)",
    },
    "& td": {
      borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
      padding: "8px 24px",
      fontSize: 14,
    },
    "& td:first-child": {
      borderLeft: "0 none",
    },
    "& td:not(:first-child)": {
      textAlign: "center",
    },
    "&:nth-child(even)": {
      backgroundColor: "#FFFFFF",
    },
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  highlightedColumn: {
    "&:nth-child(2n) td:nth-child(3)": {
      backgroundColor: "rgba(216, 214, 227, 0.25)",
    },
    "& td:nth-child(3)": {
      backgroundColor: "rgba(216, 214, 227, 0.15)",
      padding: "8px 48px",
    },
  },
  priceTableHead: {
    "& td": {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Montserrat",
      textTransform: "uppercase",
    },
    "&": {
      backgroundColor: "#5336ca",
      color: "#FFFFFF",
    },
  },
  price: {
    color: "#f43f54",
    padding: "16px 24px",
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Montserrat",
    "& a": {
      backgroundColor: "#5336ca",
      color: "#FFFFFF",
      padding: "12px 32px",
      marginTop: 16,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Montserrat",
      textTransform: "uppercase",
      display: "inline-block",
      borderRadius: 64,
    },
  },
  priceTablePopular: {
    borderTop: "3px solid #5336ca",
    color: "#5336ca",
    textTransform: "uppercase",
    fontSize: 12,
    padding: "12px 48px",
    fontWeight: 700,
    fontFamily: "Montserrat",
  },
  priceBlank: {
    backgroundColor: "#fafafa",
    border: "1px solid #D8DAE7",
    fontSize: "12px",
    color: "#262A45",
    width: "20%",
  },
  pricesText: {
    fontSize: "80px",
    fontWeight: "bold",
    fontFamily: "mulish",
  },
  svg: {
    width: 90,
    fill: "#5336ca",
  },
  slickArrow: {
    position: "absolute",
    top: "5%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: "black",
    color: "#333",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:before": {
      backgroundColor: "black",
    },
    "&:hover": {
      backgroundColor: "black",
    },
  },
});
function TableCellText({ amount }: { amount: string }) {
  return (
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "30px",
        mb: 3,
      }}
    >
      {amount}
      <span
        style={{
          fontSize: "14px",
          fontWeight: 400,
          color: "#A0A3B5",
        }}
      >
        {"  "} /month
      </span>
    </Typography>
  );
}
function CustomButton({
  bodyText,
  bgColor = "transparent",
}: {
  bodyText: string;
  bgColor?: string;
}) {
  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Button
        sx={{
          border: "1px solid #84858D",
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1.5,
          px: 6,
        }}
      >
        <Typography
          sx={{
            textTransform: "none",
            color: "#84858D",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Choose plan
        </Typography>
      </Button>
      <Typography
        fontSize={"12px"}
        fontWeight={500}
        color={"#84858D"}
        mt={2}
        textAlign={"center"}
        height={"20px"}
        mb={4}
      >
        {bodyText}
      </Typography>
    </Box>
  );
}
function PriceTable() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  console.log("data in price")
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={`${classes.slickArrow} ${className}`}
        style={{ ...style, left: 0 }}
        onClick={onClick}
      >
        {/* <ArrowCircleLeft /> */}
      </Box>
    );
  };
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={`${classes.slickArrow} ${className}`}
        style={{ ...style, right: 0 }}
        onClick={onClick}
      >
        {/* <ArrowCircleRight /> */}
      </Box>
    );
  };
  return (
    <TableContainer className={classes.main}>
      <Slider
        infinite
        speed={500}
        slidesToShow={isMobile ? 1 : 6}
        slidesToScroll={1}
        // autoplay
        arrows={true}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        touchMove={false}
      >
        {tableData.map((plan) => (
          <Table
            sx={{ backgroundColor: plan.id == 4 ? "#FFF7DD" : "white" }}
            key={plan.id}
            className={classes.priceTable}
          >
            <TableHead>
              <TableRow>
                {plan.id == 1 ? (
                  <TableCell
                    sx={{
                      height: "185px",
                      borderTop: "1px solid #D8DAE7",
                    }}
                    colSpan={2}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={"20px"} fontWeight={700}>
                        {plan.title}
                      </Typography>
                      {plan.id == 1 && (
                        <Box
                          border={"1px solid #A0A3B5"}
                          borderRadius={50}
                          height={30}
                          width="30%"
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          ml={2}
                        >
                          <Typography fontSize={"2vw"} fontWeight={500}>
                            40% Off
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Typography
                      sx={{
                        textAlign: "left",
                        color: "#A0A3B5",
                        fontWeight: 500,
                        fontSize: "12px",
                        mt: 1,
                      }}
                    >
                      Choose your workspace plan according to your
                      organisational plan
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell
                    sx={{
                      // height: "185px",
                      backgroundColor: plan.id == 4 ? "#FFF7DD" : "white",
                    }}
                    align="center"
                    className={classes.priceBlank}
                  >
                    <TableCellText amount={plan.amount!} />
                    <CustomButton
                      bgColor={plan.id == 4 ? "#FFC000" : "white"}
                      bodyText={plan.body!}
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {plan.features.map((feature, index) => (
                <TableRow>
                  <TableCell
                    // sx={{ fontSize: "16px", fontWeight: 500, color: "#000315" }}

                    sx={{
                      height: "30px",
                      border: "1px solid #D8DAE7",
                    }}
                  >
                    {feature.type == "text" ? (
                      <Typography
                        fontSize={'"12px"'}
                        color={"#262A45"}
                        textAlign={feature.align ?? "center"}
                      >
                        {feature.name}
                      </Typography>
                    ) : (
                      <Avatar
                        sx={{
                          display: "block",
                          margin: "auto",
                          width: 20,
                          height: 20,
                        }}
                        src={feature.name}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </Slider>

      {/* <Table className={classes.priceTable}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={"18px"} fontWeight={700}>
                  Compare plans
                </Typography>
                <Box
                  border={"1px solid #A0A3B5"}
                  borderRadius={50}
                  height={30}
                  width="33%"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  ml={2}
                >
                  <Typography fontSize={"12px"} fontWeight={500}>
                    40% Off
                  </Typography>
                </Box>
              </Box>
              <Typography
                textAlign={"left"}
                color={"#A0A3B5"}
                fontWeight={500}
                fontSize={"12px"}
                mt={1}
              >
                Choose your workspace plan according to your organisational plan
              </Typography>
            </TableCell>
            <TableCell align="center" className={classes.priceBlank}>
              <TableCellText amount="£10" />
              <CustomButton bodyText="Basic package is a 2 year contract package which is free until December 2024 and then £15 per month after that" />
            </TableCell>
            <TableCell className={classes.priceBlank}>
              <TableCellText amount="£100" />
              <CustomButton bodyText="Start marketing today with award-winning email and social tools." />
            </TableCell>
            <TableCell className={classes.priceBlank}>
              <TableCellText amount="£500" />
              <CustomButton bodyText="Start marketing today with award-winning email and social tools." />
            </TableCell>
            <TableCell className={classes.priceBlank}>
              <TableCellText amount="£1000" />
              <CustomButton bodyText="Start marketing today with award-winning email and social tools." />
            </TableCell>
            <TableCell className={classes.priceBlank}>
              <TableCellText amount="£400" />
              <CustomButton bodyText="Start marketing today with award-winning email and social tools." />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: 500, color: "#000315" }}
            >
              Number of Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              3 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              5 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
              Number of Videos
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              3 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              5 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "16px", fontWeight: 500 }}>
              Number of Menus
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              <Avatar
                sx={{ display: "block", margin: "auto", width: 20, height: 20 }}
                src={require("../../../assets/icons/cross.png")}
              />
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              5 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              <Avatar
                sx={{ display: "block", margin: "auto", width: 25, height: 25 }}
                src={require("../../../assets/icons/check.png")}
              />
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                border: "1px solid #D8DAE7",
                fontSize: "12px",
                color: "#262A45",
              }}
            >
              10 Images
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </TableContainer>
  );
}

export default PriceTable;
