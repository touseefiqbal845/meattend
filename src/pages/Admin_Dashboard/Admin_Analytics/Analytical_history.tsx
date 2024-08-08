import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  Rating,
  Input,
  Switch,
  TextField,
  Divider,
} from "@mui/material";
import Select, { ActionMeta, SingleValue } from "react-select";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "react-circular-progressbar/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { CustomBox } from "../../../components/CustomBox/CustomBox";
import { WithLayout } from "../../../components/Wrapper/WithLayout";
import { commentsList, feedbackList } from "./data";
import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCategories } from "../Admin-ExistingCompanies/Existing-Chart-Modal";
import { listOptions } from "../Admin-Finance/data";
import CustomInput from "../../../components/Input/CustomInput";

function AnalyticalHistory() {
  const [imagesLength, setImagesLength] = React.useState(4);
  function ReusablePromoters() {
    return (
      <>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          my={3}
        >
          <Stack direction="row" alignItems={"center"}>
            <Box
              width={30}
              height={30}
              component={"img"}
              src={require("../../../assets/icons/commentPerson.png")}
            />
            <Typography
              fontSize={12}
              color={"gray.tertiary"}
              fontWeight={"bold"}
              ml={1}
            >
              Oleo Bone
            </Typography>
          </Stack>
          <Rating name="read-only" value={5} readOnly />
        </Stack>

        <Carousel
          showThumbs={false}
          // renderArrowNext={(onClickHandler, hasNext, label) =>
          //   hasNext && (
          //     <Box
          //       onClick={onClickHandler}
          //       title={label}
          //       sx={{
          //         position: "absolute",
          //         top: "40%",
          //         right: 10,
          //         width: 40,
          //         height: 40,
          //         cursor: "pointer",
          //         borderRadius: "50%",
          //         backgroundColor: "white",
          //         display: "flex",
          //         justifyContent: "center",
          //         alignItems: "center",
          //       }}
          //     >
          //       <Box
          //         width={20}
          //         height={20}
          //         component={"img"}
          //         sx={{
          //           objectFit: "contain",
          //         }}
          //         src={require("../../../assets/icons/right-arrow.png")}
          //       />
          //     </Box>
          //   )
          // }
          // renderArrowPrev={(onClickHandler, hasPrev, label) =>
          //   hasPrev && (
          //     <Box
          //       onClick={onClickHandler}
          //       title={label}
          //       sx={{
          //         position: "absolute",
          //         top: "50%",
          //         left: 10,
          //         width: 40,
          //         height: 40,
          //         cursor: "pointer",
          //         borderRadius: "50%",
          //         backgroundColor: "white",
          //         display: "flex",
          //         justifyContent: "center",
          //         alignItems: "center",
          //       }}
          //     >
          //       <Box
          //         width={40}
          //         height={40}
          //         // zIndex={999}
          //         // component={"img"}
          //         sx={{
          //           backgroundColor: "red",
          //           objectFit: "contain",
          //         }}
          //         // src={require("../../../assets/icons/left-arrow.png")}
          //       />
          //     </Box>
          //   )
          // }
        >
          <Stack>
            <Box
              height={"30vh"}
              component={"img"}
              src={require("../../../assets/navIcons/APromoters.png")}
            />
          </Stack>
          <Stack>
            <Box
              height={"30vh"}
              component={"img"}
              src={require("../../../assets/navIcons/APromoters.png")}
            />
          </Stack>
        </Carousel>

        <Stack direction={"row"} alignItems={"center"} mt={-5}>
          <Typography fontSize={18} fontWeight={700} color="gray.tertiary">
            Report
          </Typography>
          <Typography
            fontSize={18}
            fontWeight={700}
            color="gray.tertiary"
            mx={1}
          >
            |
          </Typography>
          <Typography fontSize={18} fontWeight={700} color="gray.tertiary">
            Hide
          </Typography>
        </Stack>
      </>
    );
  }
  const handleEventChange = (
    newValue: SingleValue<{
      label: Event | undefined;
      value: Event | undefined;
    }>,
    actionMeta: ActionMeta<{
      label: Event | undefined;
      value: Event | undefined;
    }>
  ) => {};
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <Grid container xs={12} md={4} lg={7}>
        <Typography
          fontSize={{ md: 25, xs: 20 }}
          fontWeight={700}
          color={"gray.graphTitle"}
        >
          Event Details
        </Typography>
      </Grid>

      <Grid container columnSpacing={2}>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#DE9300"}
            figure={"1.6K"}
            title={"Total Attending"}
            img={require("../../../assets/navIcons/Aincome.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#10D453"
            figure={"1.6K"}
            title={"Total Income"}
            img={require("../../../assets/navIcons/A_T_Income.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color={"#0884E2"}
            figure={"4.1K"}
            title={"Total Commenting"}
            img={require("../../../assets/navIcons/A_Comment.png")}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <CustomBox
            color="#FD1F1F"
            figure={"5.2K"}
            title={"Total Reviews"}
            img={require("../../../assets/navIcons/A_Reviews.png")}
          />
        </Grid>
      </Grid>
      <Grid container mt={4} columnSpacing={2}>
        <Grid item md={7} xs={12}>
          <Box
            width={"100%"}
            height={"30vh"}
            component={"img"}
            src={require("../../../assets/navIcons/AMap.png")}
          />
          <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
            <Typography
              fontSize={{ md: 20, xs: 16 }}
              fontWeight={700}
              color="gray.graphTitle"
            >
              Purple Firday Event
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFC000",
                  boxShadow: "none",
                  color: "black",
                  textTransform: "none",
                  borderRadius: "7px",
                  fontSize: { xs: 9, md: 14 },
                  alignSelf: "center",
                  fontWeight: 700,
                  width: {
                    md: "180px",
                    xs: "120px",
                  },
                  height: { md: "36px", xs: "26px" },
                  "&:hover": {
                    color: "white",
                  },

                  // width: { xs: "100px", md: "120px" },
                }}
              >
                Create Live Preview
              </Button>
              <Box
                ml={1}
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Eye.png")}
              />
              <Typography ml={1} display={{ md: "flex", xs: "none" }}>
                Preview
              </Typography>
            </Stack>
          </Stack>
          <Typography
            fontWeight={400}
            fontSize={16}
            color="gray.tertiary"
            my={2}
          >
            District Sky Lounge
          </Typography>
          <Stack direction={{ md: "row", xs: "column" }}>
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Location.png")}
              />
              <Typography fontSize={12} color={"gray.main"} ml={0.4}>
                15-21 Ganton St, Soho, London W1F 9BN, United Kingdom
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                ml={{ md: 1, xs: 0 }}
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Location.png")}
              />
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={12} color={"gray.main"} ml={1}>
                  Geo Location:{" "}
                </Typography>
                <Typography
                  fontSize={12}
                  fontWeight={700}
                  color="gray.graphTitle"
                  ml={0.4}
                >
                  40° 43' 23.884" N 74° 0' 10.757" W
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={{ md: "row", xs: "column" }} mt={1}>
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                // ml={2}
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Clock.png")}
              />
              <Typography fontSize={12} color={"gray.main"} ml={1}>
                10 PM - 3 AM
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              mt={{ md: 0, xs: 1 }}
              ml={{ md: 1, xs: 0 }}
            >
              <Box
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Call - Calling.png")}
              />
              <Typography fontSize={12} color={"gray.main"} ml={1}>
                9876543210
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              mt={{ md: 0, xs: 1 }}
              ml={{ md: 1, xs: 0 }}
            >
              <Box
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/Message-5.png")}
              />
              <Typography fontSize={12} color={"gray.main"} ml={1}>
                info@example.com
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              mt={{ md: 0, xs: 1 }}
              ml={{ md: 1, xs: 0 }}
            >
              <Box
                width={20}
                height={20}
                component={"img"}
                src={require("../../../assets/event/ticket 1.png")}
              />
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={12} color={"gray.main"} ml={1}>
                  Ticket Record:
                </Typography>
                <Typography fontSize={12} color={"gray.tertiary"} ml={1}>
                  320 Tickets
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={{ md: "row", xs: "column" }}
            alignItems={{ md: "center", xs: "flex-start" }}
            mt={1}
            justifyContent={{ md: "space-between", xs: "flex-start" }}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                fontSize={16}
                fontWeight={400}
                color="gray.graphTitle"
              >
                Industry
              </Typography>
              <Stack direction="row" spacing={1} ml={1}>
                <CustomCategories title="Music" />
                <CustomCategories title="Cubbing" />
                <CustomCategories title="Rnb" />
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1} mt={{ md: 0, xs: 0.5 }}>
              <Typography
                fontSize={16}
                fontWeight={400}
                color="gray.main"
                ml={0.5}
              >
                Date:
              </Typography>
              <Typography
                fontSize={16}
                fontWeight={400}
                color="gray.graphTitle"
              >
                20 Oct 2024
              </Typography>
            </Stack>
            <Stack direction="row" mt={{ md: 0, xs: 0.5 }}>
              <Typography fontSize={16} fontWeight={400} color="gray.main">
                Attending:
              </Typography>
              <Typography
                fontSize={16}
                fontWeight={400}
                color="gray.graphTitle"
              >
                150
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFC000",
                boxShadow: "none",
                color: "black",
                textTransform: "none",
                borderRadius: "7px",
                fontSize: { xs: 10, md: 14 },
                // alignSelf: "center",
                fontWeight: 700,
                mt: { md: 0, xs: 1 },
                width: {
                  md: "180px",
                  xs: "120px",
                },
                height: { md: "36px", xs: "26px" },
                "&:hover": {
                  color: "white",
                },

                // width: { xs: "100px", md: "120px" },
              }}
            >
              Boost Cost £10
            </Button>
          </Stack>
          <Box my={4} border={"1px solid #D8DAE7"} />
          <Typography
            fontWeight={400}
            fontSize={16}
            color="gray.tertiary"
            mb={1.5}
            mt={-0.5}
          >
            District Sky Lounge
          </Typography>
          <Typography color={"gray.main"} fontSize={14}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontWeight={600}
              fontSize={16}
              color="gray.tertiary"
              my={1.5}
            >
              Public Photos
            </Typography>
            <Switch
              checked={true}
              onChange={() => {}}
              inputProps={{ "aria-label": "ant design" }}
              // className="customSwitch"
            />
          </Stack>
          <Box display={{ md: "none", xs: "block" }}>
            <Input
              type="file"
              onChange={() => {
                setImagesLength(imagesLength + 1);
              }}
              style={{ display: "none" }}
              id="upload-button"
              inputProps={{
                accept: "image/*",
              }}
            />
            <label htmlFor="upload-button">
              <Box
                height={"15vh"}
                width={"100%"}
                mb={2}
                ml={0.5}
                border={"1px dashed #FFC000"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                sx={{ cursor: "pointer" }}
              >
                <Typography>Upload</Typography>
                <Box
                  mt={0.5}
                  width={20}
                  height={20}
                  component={"img"}
                  src={require("../../../assets/icons/export.png")}
                />
              </Box>
            </label>
          </Box>
          <Stack
            direction={"row"}
            overflow={"scroll"}
            width={{ md: "40vw", xs: "100%" }}
          >
            {Array.from({ length: imagesLength }).map((_, index) => (
              <Stack position={"relative"} width={"30vw"} height={"16vh"}>
                <Box
                  key={index}
                  ml={index !== 0 ? 0.5 : 0}
                  component={"img"}
                  src={require("../../../assets/navIcons/APhotos.png")}
                />
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => setImagesLength(imagesLength - 1)}
                  position={"absolute"}
                  m={2}
                  width={10}
                  height={10}
                  component={"img"}
                  src={require("../../../assets/icons/cross-white.png")}
                />
              </Stack>
            ))}
            <Box display={{ md: "block", xs: "none" }}>
              <Input
                type="file"
                onChange={() => {
                  setImagesLength(imagesLength + 1);
                }}
                style={{ display: "none" }}
                id="upload-button"
                inputProps={{
                  accept: "image/*",
                }}
              />
              <label htmlFor="upload-button">
                <Box
                  height={"15vh"}
                  width={"12vw"}
                  ml={0.5}
                  border={"1px dashed #FFC000"}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography>Upload</Typography>
                  <Box
                    mt={0.5}
                    width={20}
                    height={20}
                    component={"img"}
                    src={require("../../../assets/icons/export.png")}
                  />
                </Box>
              </label>
            </Box>
          </Stack>
          <Typography
            fontWeight={600}
            fontSize={16}
            color="gray.tertiary"
            my={1.5}
          >
            Menu
          </Typography>
          <Box
            sx={{
              width: 110,
              height: 150,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            border={"1px solid black"}
          >
            <Typography
              color={"gray.graphTitle"}
              fontWeight={700}
              fontSize={15}
            >
              Drinks
            </Typography>
            <Typography color={"gray.graphTitle"} fontSize={15} mt={2}>
              Super Dry
            </Typography>
            <Typography color={"gray.graphTitle"} fontSize={15} mt={2}>
              Vodka
            </Typography>
          </Box>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box
            sx={{
              "&:before::-webkit-scrollbar": {
                display: "block",
              },

              "&:hover::-webkit-scrollbar": {
                display: "block",
              },
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0.512rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#04CAA5",
                height: "8px",
                borderRadius: "8px",
              },
            }}
            height={"100vh"}
            overflow={"scroll"}
          >
            <Typography fontSize={20} fontWeight={700} color="gray.graphTitle">
              Promoters
            </Typography>
            <ReusablePromoters />
            <ReusablePromoters />
          </Box>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2} mt={4}>
        <Grid item md={6} xs={12}>
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Comments
          </Typography>
          <Box
            sx={{
              overflowY: "scroll",
              maxHeight: 400,
              mt: 3,

              // keep showing scroll bar not only on hover
              // help me to write code
              "&:before::-webkit-scrollbar": {
                display: "block",
              },

              "&:hover::-webkit-scrollbar": {
                display: "block",
              },
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0.512rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#04CAA5",
                height: "8px",
                borderRadius: "8px",
              },
            }}
          >
            {feedbackList.map((item) => {
              return (
                <Box mb={2}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    px={2}
                  >
                    <Stack direction={"row"} columnGap={2}>
                      <Box
                        width={30}
                        height={30}
                        component={"img"}
                        src={item.img}
                      />
                      <Stack>
                        <Typography
                          fontSize={12}
                          color={"gray.graphTitle"}
                          fontWeight={"bold"}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          fontSize={12}
                          color={"gray.tertiary"}
                          mt={1.5}
                        >
                          {item.comment}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      fontSize={12}
                      color={"gray.tertiary"}
                      fontWeight={"bold"}
                    >
                      12:20
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} px={2} my={2}>
                    <Box
                      sx={{ objectFit: "contain" }}
                      width={15}
                      height={15}
                      component={"img"}
                      src={require("../../../assets/icons/AHeart.png")}
                    />
                    <Typography fontSize={10} fontWeight={500} ml={1}>
                      100
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                      ml={1}
                    >
                      Report
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                      mx={1}
                    >
                      |
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                    >
                      Hide
                    </Typography>
                  </Stack>

                  <CustomInput
                    key={1}
                    placeholder="Write Review"
                    img={""}
                    height="1.2vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={() => {}}
                    type={""}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography
            sx={{
              fontSize: { md: 24, xs: 12 },
              color: "gray.graphTitle",
            }}
          >
            All Feedbacks
          </Typography>
          <Box
            sx={{
              overflowY: "scroll",
              maxHeight: 400,
              mt: 3,
              // keep showing scroll bar not only on hover
              // help me to write code
              "&:before::-webkit-scrollbar": {
                display: "block",
              },

              "&:hover::-webkit-scrollbar": {
                display: "block",
              },
              "&::-webkit-scrollbar": {
                display: "none",
                width: "0.512rem",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#04CAA5",
                height: "8px",
                borderRadius: "8px",
              },
            }}
          >
            {feedbackList.map((item) => {
              return (
                <Box mb={2}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    px={2}
                  >
                    <Stack direction={"row"} columnGap={2}>
                      <Box
                        width={30}
                        height={30}
                        component={"img"}
                        src={item.img}
                      />
                      <Stack>
                        <Typography
                          fontSize={12}
                          color={"gray.graphTitle"}
                          fontWeight={"bold"}
                        >
                          {item.name}
                        </Typography>
                        <Rating name="read-only" value={item.rating} readOnly />
                        <Typography
                          fontSize={12}
                          color={"gray.tertiary"}
                          mb={3}
                          mt={1.5}
                        >
                          {item.comment}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      fontSize={12}
                      color={"gray.tertiary"}
                      fontWeight={"bold"}
                    >
                      {item.date}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} px={2} my={2}>
                    <Box
                      sx={{ objectFit: "contain" }}
                      width={15}
                      height={15}
                      component={"img"}
                      src={require("../../../assets/icons/AHeart.png")}
                    />
                    <Typography fontSize={10} fontWeight={500} ml={1}>
                      100
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                      ml={1}
                    >
                      Report
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                      mx={1}
                    >
                      |
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={700}
                      color="gray.tertiary"
                    >
                      Hide
                    </Typography>
                  </Stack>

                  <CustomInput
                    key={1}
                    placeholder="Write Review"
                    img={""}
                    height="1.2vh"
                    fontWeight={800}
                    fontSize={12}
                    onChange={() => {}}
                    type={""}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item md={12} xs={12}>
          <Box
            mt={3}
            borderRadius={2}
            boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
            p={2}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontSize: { md: 22, xs: 12 },
                  color: "gray.graphTitle",
                }}
              >
                Ticket Buyers Summary
              </Typography>
              <Select
                // value={{
                //   label:'',
                //   value:''
                // }}
                onChange={handleEventChange}
                //@ts-ignore
                options={listOptions}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                // increase marke point size and width

                elements: {
                  point: {
                    radius: 10,
                    borderWidth: 1,
                  },
                  // and remove inside point color and border width
                  // point: {
                  //   borderWidth: 0,
                  //   backgroundColor: 'red',
                  // },
                },
              }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "18-25",
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "25-35",
                    data: [2, 3, 20, 5, 1, 4],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                ],
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WithLayout(AnalyticalHistory);
