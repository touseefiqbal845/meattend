import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import IVSBroadcastClient from "amazon-ivs-web-broadcast";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import { ParticularEvent } from "../../services/model";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import { CustomBox } from "../../components/CustomBox/CustomBox";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Promoters from "./PromotersSection";
import { CustomCategories } from "../../components/CustomCategoriesRowWise/CustomCategories";
import CommentCard from "./Comments";
import ReviewCard from "./Reviews";
import PreviewModal from "./PreviewModal";
import CustomButton from "../../components/button/CustomButton";
import TicketBuyersChart from "./TicketBuyersChart";
import CustomInput from "../../components/Input/CustomInput";
import MAuthApiService from "../../services/MAuthApiService";
import ReactPlayer from "react-player";

const Index = () => {
  // UseStates
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<ParticularEvent | null>(null);
  const [dateTime, setDateTime] = useState<ParticularEvent | null>(null);
  const [comments, setComments] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [companyID, setCompanyID] = useState<number>(0);
  const [geolocation, setGeolocation] = useState<any>("");
  const [ivsClient, setIvsClient] = useState(false);
  const [streamKey, setStreamKey] = useState(
    "sk_us-east-1_3Unc9J5V32Ms_di0GUPWQniJo6eKtd4xXB02gvP1RWe"
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const [isMediaSupported, setIsMediaSupported] = useState(false);
  const [isLivePreviewClicked, setIsLivePreviewClicked] = useState(false);

  const [mediaStream, setMediaStream] = useState(null);
  const [mediaStreamId, setMediaStreamId] = useState(null);
  const [isChannelExist, setIsChannelExist] = useState(false);
  const [error, setError] = useState(null);
  const [ingestEndpoint, setIngestEndpoint] = useState(null);

  const [loading, setLoading] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [fee, setFee] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const previewRef = useRef<HTMLDivElement | null>(null);

  // const startMedia = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     console.log(stream.id);
  //     setIsMediaSupported(true);
  //     setMediaStream(stream);
  //     setMediaStreamId(stream.id);

  //     ivsClient.addVideoInputDevice(stream, stream.id, { index: 0 });
  //     startBroadcast();
  //   } catch (error) {
  //     console.error("Error accessing media devices:", error);
  //   }
  // };

  // const stopStream = async () => {
  //   if (mediaStream) {
  //     const tracks = mediaStream.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     ivsClient.removeVideoInputDevice(mediaStreamId);
  //     setIsMediaSupported(false);
  //     setMediaStream(null);
  //     setMediaStreamId(null);
  //     stopBroadcast();
  //   }
  // };
  // const fetchBroadcastUrl = async () => {
  //   const apiUrl = `https://staging-api.meattend.com/api/ivs/get-broadcast-url?event_id=${eventId}`;
  //   try {
  //     const response = await MUserDashboardPagesApiService.getBroadcastUrl(
  //       eventIdNumber
  //     );
  //     if (!response.ok) {
  //       setIsChannelExist(true);
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const { status, eventStream } = await response.json();
  //     if (status === "success" && eventStream) {
  //       setStreamKey(eventStream?.stream_key);
  //       setIngestEndpoint(eventStream?.ingest_endpoint);
  //       items.forEach((item) => {
  //         const parameter = item.Parameter;
  //         if (eventStream.hasOwnProperty(parameter)) {
  //           item.Value = eventStream[parameter];
  //         }
  //       });
  //       initializeIVSBroadCast(eventStream?.ingest_endpoint);
  //     }
  //   } catch (error) {
  //     setError(
  //       "No Active Streams are available for this event, Please create a new one"
  //     );
  //   }
  // };

  // const startBroadcast = () => {
  //   ivsClient
  //     .startBroadcast(streamKey, ingestEndpoint)
  //     .then(() => {
  //       setIsStreaming(true);
  //       alert("Broadcast started");
  //     })
  //     .catch((error) => console.error("Failed to start broadcast:", error));
  // };

  // const stopBroadcast = async () => {
  //   try {
  //     await ivsClient.stopBroadcast(streamKey, ingestEndpoint);
  //     setIsStreaming(false);
  //     console.log("Broadcast stopped");
  //   } catch (error) {
  //     console.error("Failed to stop broadcast:", error);
  //   }
  // };
  // const initializeIVSBroadCast = async (ingestEndpoint: string) => {
  //   console.log("IVS-INTIALIZE-STREAM", ingestEndpoint);
  //   const client = IVSBroadcastClient.create({
  //     streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
  //     ingestEndpoint: ingestEndpoint,
  //   });
  //   const previewEl = previewRef.current;
  //   console.log(previewEl);
  //   if (previewEl) {
  //     client.attachPreview(previewEl);
  //   }
  //   ivsClient.current = client;
  // };
  // const submitForm = async () => {
  //   // if (!channelName.match(/^[a-zA-Z0-9\s]+$/)) {
  //   //   setError('Invalid Channel Name. Only alphanumeric characters are allowed.');
  //   //   return;
  //   // }

  //   setLoading(true);
  //   setError(null);
  //   const apiUrl = `https://staging-api.meattend.com/api/ivs/create-channel?channelName=${encodeURIComponent(
  //     channelName
  //   )}&event_id=${eventId}&amount=${fee}&currency=${currency}`;

  //   try {
  //     const response = await MUserDashboardPagesApiService.LiveStreaming(
  //       eventIdNumber
  //     );
  //     const data = await response.json();
  //     console.log("API response:", data);
  //     if (data?.status === "error") {
  //       setError(data?.message);
  //     } else {
  //       console.log("success");
  //       setIsChannelExist(false);
  //       fetchBroadcastUrl();
  //     }
  //   } catch (error) {
  //     console.error("API error:", error);
  //     setError(error?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const initializeCanvas = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       canvas.width = 1280;
  //       canvas.height = 720;
  //       context.fillRect(0, 0, canvas.width, canvas.height);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   initializeCanvas();
  // }, []);

  // useEffect(() => {
  //   const client = IVSBroadcastClient.create({
  //     streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
  //     ingestEndpoint: "51115b38d857.global-contribute.live-video.net",
  //   });
  //   setIvsClient(client);
  // }, [ingestEndpoint]);

  //@ts-ignore
  const eventIdNumber = parseInt(eventId, 10);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetProfile = await MAuthApiService.getProfile();

        const CompanyId = responseGetProfile.data?.id;
        setCompanyID(CompanyId);
        const response = await MUserDashboardPagesApiService.getEventDetails(
          eventIdNumber
        );
        console.log("response", response);
        const eventData = response?.data?.event_details;

        if (eventData) {
          const fromDate = new Date(eventData.from_time);
          const toDate = new Date(eventData.to_time);
          const fromTimeFormatted = fromDate.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          });
          const toTimeFormatted = toDate.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          const formattedEvent = {
            ...eventData,
            from_time_formatted: fromTimeFormatted,
            to_time_formatted: toTimeFormatted,
          };
          const combinedCoordinates = `N ${eventData?.lat}°, W ${eventData?.lon}°`;
          setGeolocation(combinedCoordinates);
          setDateTime(formattedEvent);
          setEvent(formattedEvent);
        } else {
          setDateTime(null);
          setEvent(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (eventIdNumber) {
      fetchData();
    }
  }, [eventIdNumber]);

  if (!event ) {
    return null;
  }

  // const handleLiveStreaming = async () => {
  //   try {
  //     const response = await MUserDashboardPagesApiService.getBroadcastUrl(
  //       eventIdNumber
  //     );

  //     // const { data} = await response.json();
  //     // console.log("status,eventStream",data)
  //     // if (response !=== "200") {
  //     //   setIsChannelExist(true);
  //     //   throw new Error(`HTTP error! Status: ${response.status}`);
  //     // }
  //     console.log("response", response);
  //     const data = response?.data;
  //     const status = data.status;
  //     const eventStream = data?.eventStream;

  //     console.log("status", status);
  //     // const { status, eventStream } = await response.json();
  //     console.log("status,eventStream", status);
  //     if (status === "success") {
  //       setStreamKey(eventStream?.stream_key);
  //       setIngestEndpoint(eventStream?.ingest_endpoint);
  //       // items.forEach((item) => {
  //       //   const parameter = item.Parameter;
  //       //   if (eventStream.hasOwnProperty(parameter)) {
  //       //     item.Value = eventStream[parameter];
  //       //   }
  //       // });
  //       // console.log("im in ");
  //       // initializeIVSBroadCast(eventStream?.ingest_endpoint);
  //       // const startBroadcast = () => {
  //       //   ivsClient
  //       //     .startBroadcast(streamKey, ingestEndpoint)
  //       //     .then(() => {
  //       //       setIsStreaming(true);
  //       //       alert("Broadcast started");
  //       //     })
  //       //     .catch((error) =>
  //       //       console.error("Failed to start broadcast:", error)
  //       //     );
  //       // };
  //       // startBroadcast();
  //       setIsLivePreviewClicked(true);
  //     } else {
  //       console.log("No existing channel found. Creating a new channel...");
  //       const responseLiveStreaming =
  //         await MUserDashboardPagesApiService.LiveStreaming(eventIdNumber);
  //       console.log("New channel created:", responseLiveStreaming.data);
  //       console.log("New channel created:", responseLiveStreaming.data);
  //       const responseData = responseLiveStreaming.data.data;
  //       console.error("No existing channel found and creation failed.");
  //       alert(console.error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const getMonthName = (monthIndex: any) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  const formatdate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  const handleUpload = (file: Blob, fileType: string, action: string) => {
    console.log("image uplaoding successfully");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    navigate("/livepreview", { state: { eventId } });
  };
  const commentK = () => {
    if (event?.comments.length > 1000) {
      setComments(`${event?.comments}K`);
    } else {
      setComments(`${event?.comments}`);
    }
  };
  console.log("eventData", event);

  return (
    <React.Fragment>
      <Grid
        container
        padding={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          backgroundColor: "#FBFBFB",
        }}
      >
        <Grid item md={12}>
          <Grid container md={12}>
            <Grid
              item
              xs={8}
              sm={9}
              md={9.5}
              sx={{ marginTop: { xs: 0, md: 0 } }}
            >
              <h2>Event Details</h2>
            </Grid>
            <Grid
              item
              xs={4}
              sm={3}
              md={2.5}
              sx={{ marginTop: { xs: 3, sm: 2, md: 1 } }}
            >
              <CustomButton
                marginLeft="0px"
                marginTop="0px"
                notArrow
                // mdFullWidth
                title="View History"
                // fullWidth
                XFontSize="14px"
                MFontSize="14px"
                onClick={() => navigate(`/event_history/${eventIdNumber}`)}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              width: "100%",
              overflowY: { md: "auto", xs: "none" },
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Grid item md={12}>
              <Grid
                container
                direction="row"
                spacing={1}
                //   alignItems="center"
                marginTop="5px"
                marginBottom="10px"
                sx={{
                  width: { lg: "100%", md: "200%", xs: "auto" },
                }}
              >
                <Grid item xs={12} md={3}>
                  <CustomBox
                    color={"orange"}
                    figure={`${event?.attendees}`}
                    title={"Total Attending"}
                    img={require("../../assets/navIcons/locations.png")}
                    width={"100%"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <CustomBox
                    color={"green"}
                    figure={"0"}
                    title={"Total Income"}
                    img={require("../../assets/navIcons/locations.png")}
                    width={"100%"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <CustomBox
                    color="orange"
                    figure={`${event?.comments.length}`}
                    title={"Total Commenting"}
                    img={require("../../assets/navIcons/income.png")}
                    width={"100%"}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <CustomBox
                    color="orange"
                    figure={`${event?.reviews.length}`}
                    title={"Total Reviews"}
                    img={require("../../assets/navIcons/followers.png")}
                    width={"100%"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container sm={12} sx={{ backgroundColor: "#FBFBFB", mt: 3 }}>
          <Grid item md={12} lg={7.5} sx={{ paddingRight: { lg: 3, md: 0 } }}>
            <Grid item xs={12} md={12} sx={{ marginTop: { xs: 0, md: 0 } }}>
              <Paper
                sx={{
                  marginTop: { xs: 0, md: 0 },
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: 2.5,
                  overflow: "hidden",
                }}
              >
                <img
                  alt="location"
                  src={require("../../assets/icons/LocationImg.png")}
                  style={{
                    marginTop: "15px",
                    maxHeight: "100%",
                    width: "100%",
                  }}
                />
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  mt={2}
                >
                  <Typography
                    fontSize={{ md: 20, xs: 16 }}
                    fontWeight={700}
                    color="gray.graphTitle"
                  >
                    {event?.event_name}
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
                      onClick={handleClick}
                    >
                      Create Live Preview
                    </Button>

                    <Box
                      ml={1}
                      width={20}
                      height={20}
                      component={"img"}
                      src={require("../../assets/event/Eye.png")}
                      onClick={handleOpenModal}
                    />
                    <Typography ml={1} display={{ md: "flex", xs: "none" }}>
                      Preview
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "16px",
                    marginTop: "5px",
                    color: theme.palette.gray.tertiary,
                    lineHeight: "24px",
                  }}
                >
                  District Sky Longe
                </Typography>

                <Grid
                  container
                  xs={12}
                  md={12}
                  direction="row"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={6}
                    xl={6}
                    sx={{ mt: { xs: 2.5 } }}
                  >
                    <Stack direction="row" spacing={0.5} sx={{ flexGrow: 5 }}>
                      <img
                        alt="loc"
                        src={require("../../assets/icons/Location.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        style={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        {event?.event_address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={6}
                    xl={6}
                    sx={{ mt: { xs: 2.5 } }}
                  >
                    <Stack direction="row" spacing={0.5} sx={{ flexGrow: 5 }}>
                      <img
                        alt="loc"
                        src={require("../../assets/icons/Location.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        style={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        Geolocation:{" "}
                        <span style={{ color: "black" }}>{geolocation}</span>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  direction={{ xs: "column", lg: "row" }}
                  sx={{ marginTop: 0 }}
                >
                  {/* Grid for Phone and Click */}
                  <Grid item xs={12} md={6} lg={6} xl={2.5}>
                    <Stack direction="row" spacing={0.5}>
                      <img
                        alt="clock"
                        src={require("../../assets/icons/Clock.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        {dateTime && dateTime.from_time_formatted} -{" "}
                        {dateTime && dateTime.to_time_formatted}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} xl={2.5}>
                    <Stack direction="row" spacing={0.5}>
                      <img
                        alt="phone"
                        src={require("../../assets/icons/phone.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Grid for Mail and Ticket */}
                  <Grid item xs={12} md={6} lg={6} xl={3.5}>
                    <Stack direction="row" spacing={0.5}>
                      <img
                        alt="ticket"
                        src={require("../../assets/event/ticket 1.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        Tickets Records:{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#000315",
                          }}
                        >
                           Tickets
                        </span>
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} xl={2.5}>
                    <Stack direction="row" spacing={0.5}>
                      <img
                        alt="mail"
                        src={require("../../assets/icons/mail.png")}
                        style={{ height: 15, width: 15 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#84858D",
                          fontWeight: 400,
                        }}
                      >
                        {event?.contact}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={0}
                  sx={{ marginTop: "15px", alignItems: "center" }}
                >
                  <Grid item xs={12} md={5} lg={5} xl={5}>
                    <Stack direction="row" alignItems="center">
                      <Typography
                        fontSize={16}
                        fontWeight={400}
                        color="gray.graphTitle"
                      >
                        Industry
                      </Typography>
                      <Stack direction="row" spacing={1} ml={1}>
                        <Grid
                          container
                          spacing={1}
                          sx={{ marginLeft: "5px", flexWrap: "nowrap" }}
                        >
                          {event?.categories.map((categoryObj, index) => {
                            const parsedCategories = JSON.parse(
                              categoryObj.category
                            );
                            return parsedCategories.map(
                              (category: any, idx: any) => (
                                <Grid item key={`${index}-${idx}`}>
                                  <CustomCategories
                                    title={category}
                                    style={{ marginTop: "5px" }}
                                    bgColor={"#FFC000"}
                                  />
                                </Grid>
                              )
                            );
                          })}
                        </Grid>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3.5} xl={2.5}>
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
                        {event?.date_time}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3} xl={2}>
                    <Stack direction="row" mt={{ md: 0, xs: 0.5 }}>
                      <Typography
                        fontSize={16}
                        fontWeight={400}
                        color="gray.main"
                      >
                        Attending:
                      </Typography>
                      <Typography
                        fontSize={16}
                        fontWeight={400}
                        color="gray.graphTitle"
                      >
                       {event?.attendees}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3.5}
                    lg={3.5}
                    xl={2.5}
                    sx={{ mt: { lg: 2, xs: 2 } }}
                  >
                    <CustomButton
                      marginLeft="0px"
                      marginTop="0px"
                      notArrow
                      title="Boost Cost £10"
                      xsHeight="37px"
                      XFontSize="14px"
                      MFontSize="14px"
                      xsWidth="146px"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
                <Box
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    style={{
                      // color: theme.palette.gray.graphTitle,
                      color: "#000315",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Mulish",
                    }}
                  >
                    Description
                  </Typography>{" "}
                </Box>
                <Grid container sx={{ marginTop: "15px" }}>
                  <Grid item sx={{ marginTop: "15px" }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          fontFamily: "Mulish",
                          color: "#84858D",
                        }}
                      >
                        {event?.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    style={{
                      // color: theme.palette.gray.graphTitle,
                      color: "#000315",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Mulish",
                    }}
                  >
                    Public Photos
                  </Typography>{" "}
                </Box>
                <Grid
                  container
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  
                  <Grid item xs={12} md={12}>
                    <ImageList sx={{ width: "100%" }} cols={5} rowHeight={"auto"}>
                      {event.images.map((img, index) => (
                        <ImageListItem key={index} sx={{ width: "100%" }}>
                          <img
                            srcSet={`https://staging-resources.meattend.com/images/events/${img?.image}?w=150&fit=crop&auto=format&dpr=2 2x`}
                            src={`https://staging-resources.meattend.com/images/events/${img?.image}?w=150&fit=crop&auto=format`}
                            loading="lazy"
                            style={{
                              height: "auto",
                              width: "100%",
                              objectFit: "revert",
                            }}
                            alt="event_img"
                          />
                          <ImageListItemBar
                            title={
                              img.type === "default" ? "By Owner" : img.user
                            }
                            // subtitle={new Date(img?.created_at).toLocaleDateString()}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    style={{
                      // color: theme.palette.gray.graphTitle,
                      color: "#000315",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Mulish",
                    }}
                  >
                    Videos
                  </Typography>{" "}
                </Box>
                <Grid
                  container
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <ImageList
                      sx={{ width: "100%" }}
                      cols={3}
                      rowHeight={"auto"}
                    >
                      {event.videos.map((vid, index) => (
                        <ImageListItem
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <ReactPlayer
                            url={`https://staging-resources.meattend.com/videos/events/${vid?.video}?w=150&fit=crop&auto=format`}
                            controls={true} // Adds controls to the video player
                            width="100%"
                            height="auto"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography
                    style={{
                      // color: theme.palette.gray.graphTitle,
                      color: "#000315",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Mulish",
                    }}
                  >
                    Menu
                  </Typography>{" "}
                </Box>
                <Grid
                  container
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <ImageList sx={{ width: "100%" }} cols={5} rowHeight={118}>
                      {event?.menus.map((menu, index) => (
                        <ImageListItem key={index} sx={{ width: "100%" }}>
                          <img
                            srcSet={`https://staging-resources.meattend.com/MeAttend/menus/${menu.menu_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`https://staging-resources.meattend.com/MeAttend/menus/${menu.menu_image}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            style={{
                              height: 118,
                              width: "100%",
                              objectFit: "revert",
                            }}
                            alt={"menu_img"}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={4.5}
            sx={{
              backgroundColor: "#FFFFF",
              mt: { lg: 0, md: 3, xs: 3 },
            }}
          >
            <Promoters
              event={event}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 3, bg: "white" }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{ paddingRight: { lg: 3, md: 0 } }}
          >
            <Paper
              sx={{
                // marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "white",
                borderRadius: 2.5,
                padding: "24px",
                "& .MuiPaper-root": {
                  boxShadow: "none",
                },
              }}
            >
              <Typography
                sx={{
                  // color: theme.palette.gray.graphTitle,
                  color: "#000315",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  fontFamily: "Mulish",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              >
                Comments
              </Typography>{" "}
              <Box
                sx={{
                  maxHeight: "600px",
                  minHeight: "500px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "0.512rem",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#04CAA5",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#04CAA5",
                  },
                }}
              >
                {event?.comments.map((comment: any, index: number) => (
                  <CommentCard
                    index={index}
                    key={index}
                    user={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    comment={comment?.comment}
                    time={formatTime(comment.created_at)}
                    company_id={companyID}
                    comment_id={comment?.id}
                    userImg={comment?.user?.profile_image}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <>
              <Paper
                sx={{
                  // marginTop: "20px",
                  backgroundColor: "white",
                  borderRadius: 2.5,
                  padding: "24px",
                  "& .MuiPaper-root": {
                    boxShadow: "none",
                  },
                }}
              >
                <Typography
                  style={{
                    color: "#000315",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Mulish",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                >
                  Reviews
                </Typography>
                {/* <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    style={{
                      color: "#000315",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Mulish",
                      backgroundColor: "white",
                      borderRadius: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    Reviews
                  </Typography>

                  <Stack
                    direction={"column"}
                    alignItems={"flex-end"}
                    justifyContent={"center"}
                  >
                    <Typography>Only for Companies</Typography>

                    {/* <CustomInput
                      type="text"
                      error={false}
                      inputFontSize={10}
                      placeholder="Send selelcted to google review"
                      height="40px"
                      fontWeight={400}
                      fontSize={10}
                    /> */}
                {/* </Stack>
                </Stack>  */}
                <Box
                  sx={{
                    // maxHeight: "1054px",
                    maxHeight: "600px",
                    minHeight: "500px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "0.512rem",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#04CAA5",
                      borderRadius: "10px",
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#04CAA5",
                    },
                  }}
                >
                  {event?.reviews.map((review, index) => (
                    <ReviewCard
                      index={index}
                      key={index}
                      user={`${review?.user?.first_name} ${review?.user?.last_name}`}
                      review={review?.description}
                      date={formatdate(review.created_At)}
                      rating={review?.rating}
                      userImg={review?.user?.profile_image}
                      company_id={companyID}
                      rating_id={review?.id}
                    />
                  ))}
                </Box>
              </Paper>
            </>
          </Grid>
        </Grid>
        <TicketBuyersChart />
      </Grid>
      <PreviewModal
        open={openModal}
        onClose={handleCloseModal}
        dateTime={dateTime}
        geolocation={geolocation}
        event={event}
        company_id={companyID}
      />
    </React.Fragment>
  );
};

export default WithLayout(Index);
