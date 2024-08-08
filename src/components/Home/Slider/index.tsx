import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@emotion/react";
import MRegisterApiService from './../../../services/MRegisterApiService';



const useStyles = makeStyles({
  body: {
    fontFamily: "mulish",
  },
  main: {
    fontFamily: "mulish",
    width: "100wh",
    margin: "0 auto",
  },
  priceTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "0 none",
  },
  priceTableRow: {
    "&:not(:last-child)": {
      // borderBottom: "1px solid rgba(0, 0, 0, 0.03)",
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
function TableCellText({ amount,title }: { title: string,amount: string }) {
  return (
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: { md: "1.2vw", xs: "30px" },
        mb: 3,
        color: "black",
      }}
    >
      {title?.substring(0, 10)}..
      <Typography
      sx={{
        fontWeight: 700,
        fontSize: { md: "1vw", xs: "30px" },
        mb: 3,
        color: "black",
      }}
    >
      {amount}
    </Typography>

      <Typography
        sx={{
          fontSize: { md: "0.9vw", xs: 14 },
          fontWeight: 400,
          color: "#A0A3B5",
        }}
      >
        {"  "} /month
      </Typography>
    </Typography>
  );
}
function CustomButton({
  bodyText,
  bgColor = "transparent",
  bodyColor,
}: {
  bodyText: string;
  bgColor?: string;
  bodyColor: string;
}) {
  return (
    <Box
      display={"flex"}
      // justifyContent={"center"}
      flexDirection={"column"}
      height={"100%"}
    >
      <Button
        sx={{
          border: bgColor == "primary.main" ? "none" : "1px solid #84858D",
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1.5,
          // px: 6,
        }}
      >
        <Typography
          sx={{
            textTransform: "none",
            color: "#84858D",
            fontSize: { md: "0.8vw", xs: "12px" },
            fontWeight: 700,
          }}
        >
          Choose plan
        </Typography>
      </Button>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        height={"40%"}
      >
        <Typography
          fontSize={{ md: "0.8vw", xs: "12px" }}
          fontWeight={500}
          color={bodyColor}
          mt={3}
        >
          {bodyText}
        </Typography>
      </Box>
    </Box>
  );
}
function PriceTable() {
  const [selectedTable, setSelectedTable] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const indexRef = useRef<number>(1);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [servicepackage, setServicePackage] = React.useState<any[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await MRegisterApiService.getServicesPackages();
          //@ts-ignore
        const data = await response.data?.packages;
        console.log("hdata",data)

        setServicePackage(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const truncateText = (text: any, wordLimit: any) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  console.log("h",servicepackage)
  const tableData = [
    {
    id: 0,
    title: "Compare plans",
    body: " Choose your workspace plan according to your organisational plan",
    amount: "£10",

    features: [
      { name: "Number of Images", value: 1, type: "text", align: "left" },
      { name: "Number of Videos", value: 2, type: "text", align: "left" },
      { name: "Live Streaming", value: 3, type: "text", align: "left" },
      {
        name: "Promoters Limit",
        value: 5,
        type: "text",
        align: "left",
      },
      { name: "Reporting Access", value: 6, type: "text", align: "left" },
      { name: "GPRS Tracking", value: 7, type: "text", align: "left" },
      {
        name: "Marketing Notification",
        value: 8,
        type: "text",
        align: "left",
      },
      { name: "Event Prioritize", value: 9, type: "text", align: "left" },

    ],
    price: "£0",
    buttonText: "Sign Up",
  },
    ...servicepackage.map(packagee => {
      const features = packagee.package_permission.map((permission : any)  => ({ 
        name: permission.access_status,
        value: permission.access_status,
        type: "text",
        align: "left"
      }));
      console.log("features", features);
      return {
        id: packagee.id,
        title: `${packagee.package_name}`,
        body: truncateText(packagee.description, 10),
        amount: `£${packagee.package_cost}`,
        features: features,
        price: "£0",
        buttonText: "Sign Up"
      };
    })
  ];
  
  console.log(tableData);
  
  
  console.log("data happy",tableData);
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={`${classes.slickArrow} ${className}`}
        style={{ ...style, left: 0, top: 200 }}
        onClick={onClick}
      ></Box>
    );
  };
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={`${classes.slickArrow} ${className}`}
        style={{ ...style, right: 0, top: 200 }}
        onClick={onClick}
      ></Box>
    );
  };

  const handleWindowSizeChange = () => {
    // if compare plans is not at first position then

    if (window.innerWidth > 768) {
      sliderRef.current?.slickGoTo(0);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      sliderRef.current?.slickGoTo(0);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);



  return (
    <TableContainer className={classes.main}>
      <Slider
        ref={sliderRef}
        infinite
        speed={500}
        slidesToShow={isMobile ? 1 : 7}
        slidesToScroll={1}
        swipe={false}
        arrows={isMobile ? true : false}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        touchMove={false}
        beforeChange={(current) => {
          indexRef.current = current;
        }}
        initialSlide={0}
      >
        {tableData.map((plan) => (
          <Table
            onClick={() => setSelectedTable(plan.id)}
            key={plan.id}
            className={classes.priceTable}
            sx={{
              backgroundColor: plan.id == selectedTable ? "#FFF7DD" : "white",
              cursor: "pointer",
            }}
          >
            <TableHead>
              <TableRow>
                {plan.id == 0 ? (
                  <TableCell
                    sx={{
                      height: "250px",
                      borderTop: "1px solid white",
                      backgroundColor:
                        plan.id == selectedTable ? "#FFF7DD" : "white",
                      borderBottom:
                        plan.id == selectedTable
                          ? "1px solid #FFC000"
                          : "1px solid #E0E2EC",
                      borderLeft: "2px solid #E0E2EC",
                    }}
                    className={classes.priceBlank}
                    // colSpan={2}
                  >
                    <Box height={"28vh"}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingTop: 6,
                        }}
                      >
                        <Typography
                          color="black"
                          fontSize={{ md: "1vw", xs: "16px" }}
                          fontWeight={700}
                        >
                          {plan.title}
                        </Typography>
                        {plan.id == 0 && (
                          <Box
                            border={"1px solid #A0A3B5"}
                            borderRadius={50}
                            height={{ md: "5vh", xs: 30 }}
                            width={{ md: "5vw", xs: "30%" }}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            ml={2}
                          >
                            <Typography
                              fontSize={{ md: "0.8vw", xs: "12px" }}
                              fontWeight={500}
                              color="black"
                            >
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
                          fontSize: { md: "0.8vw", xs: "12px" },
                          pt: 1,
                        }}
                      >
                        Choose your workspace plan according to your
                        organisational plan
                      </Typography>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell
                    sx={{
                      height: "250px",
                      borderRight:
                        plan.id == 6
                          ? "2px solid #E0E2EC"
                          : "1px solid #E0E2EC",

                      backgroundColor:
                        plan.id == selectedTable ? "#FFF7DD" : "white",
                      borderColor: "#E0E2EC",
                      borderTop: "1px solid white",

                      borderBottom:
                        plan.id == selectedTable
                          ? "1px solid primary.main"
                          : "1px solid #E0E2EC",
                    }}
                    align="center"
                    className={classes.priceBlank}
                  >
                    <Box height={"28vh"}>
                    {/* <TableCellText title={plan.title!} /> */}
                      <TableCellText title={plan.title!} amount={plan.amount!} />
                      <CustomButton
                        bgColor={
                          plan.id == selectedTable ? "primary.main" : "white"
                        }
                        bodyText={plan.body!}
                        bodyColor={
                          plan.id == selectedTable ? "primary" : "gray.main"
                        }
                      />
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                borderRight:
                  plan.id == 6 ? "2px solid #E0E2EC" : "1px solid #E0E2EC",
                borderLeft:
                  plan.id == 0 ? "2px solid #E0E2EC" : "1px solid #E0E2EC",
              }}
            >
              {plan.features.map((feature: any, index: any) => (
                <TableRow
                  style={{
                    borderTop:
                      plan.id == selectedTable
                        ? "2px solid #FFC000"
                        : "2px solid #E0E2EC",
                    borderBottom:
                      plan.id == selectedTable
                        ? "1px solid #FFC000"
                        : "2px solid #E0E2EC",
                  }}
                >
                  <TableCell
                    // sx={{ fontSize: "16px", fontWeight: 500, color: "#000315" }}

                    sx={{
                      height: { md: "5vh", xs: "30px" },
                      // border:
                      //   plan.id == selectedTable
                      //     ? "2px solid #FFC000"
                      //     : "1px solid #D8DAE7",
                    }}
                  >
                    {feature.type == "text" ? (
                      <Typography
                        fontSize={{ md: "0.8vw", xs: "14px" }}
                        color={
                          selectedTable == plan.id
                            ? "primary.main"
                            : "text.primary"
                        }
                        textAlign={ "center"}
                      >
                        {feature.name}
                      </Typography>
                    ) : (
                      <Avatar
                        sx={{
                          display: "block",
                          margin: "auto",
                          width: feature.imgName == "cross" ? 18 : 24,
                          height: feature.imgName == "cross" ? 18 : 24,
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
    </TableContainer>
  );
}

export default PriceTable;
