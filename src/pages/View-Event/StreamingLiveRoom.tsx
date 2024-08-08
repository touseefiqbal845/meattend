import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Avatar,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import IVSBroadcastClient from "amazon-ivs-web-broadcast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomFilterSelect from "../../components/Custom-Filter-Input-Field/CustomFilterwithHeading";
import CustomInput from "../../components/Input/CustomInput";

const MeetingScreen = () => {
  const navigate = useNavigate();
  const [micMuted, setMicMuted] = useState(false);
  const [attendees, setAttendees] = useState(["User1", "User2", "User3"]);
  const [ivsClient, setIvsClient] = useState(null);
  const [streamKey, setStreamKey] = useState("");
  const [channel_arn, setChannel_Arn] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMediaSupported, setIsMediaSupported] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaStreamId, setMediaStreamId] = useState(null);
  const [isChannelExist, setIsChannelExist] = useState(false);
  const [error, setError] = useState(null);
  const [ingestEndpoint, setIngestEndpoint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [fee, setFee] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { eventId } = location.state || {};
  //@ts-ignore
  const eventIdNumber = parseInt(eventId, 10);

  const handleCreateChannel = async () => {
    try {
      // if (channelName) {
      // const response = await MUserDashboardPagesApiService.getBroadcastUrl(eventIdNumber);
      // const data = response?.data;
      // const status = data.status;
      // const eventStream = data?.eventStream;

      // if (status === "success") {
      //   setStreamKey(eventStream?.stream_key);
      //   setIngestEndpoint(eventStream?.ingest_endpoint);
      //   setOpenModal(false);
      // } else {
      const responseLiveStreaming =
        await MUserDashboardPagesApiService.LiveStreaming(
          eventIdNumber,
          channelName,
          amount,
          currency
        );
      const responseData = responseLiveStreaming.data.data;
      console.log("responseDataChannel Created", responseData);
      setStreamKey(responseData?.stream_key);
      setIngestEndpoint(responseData?.ingest_endpoint);
      setOpenModal(false);
      alert("Channel Successfull Created");
      fetchBroadcastUrl();
      // }
      // }
      // else {
      // //@ts-ignore
      //   console.log("Channel name is required");
      // }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };
  const fetchBroadcastUrl = async () => {
    try {
      //@ts-ignore
      const response = await MUserDashboardPagesApiService.getBroadcastUrl(
        eventIdNumber
      );
      const data = response?.data;

      if (data?.status === "success") {
        const eventStream = data?.eventStream;
        console.log("eventStream", eventStream);
        setStreamKey(eventStream?.stream_key);
        setIngestEndpoint(eventStream?.ingest_endpoint);
        setIsChannelExist(true);
        setChannel_Arn(eventStream?.channel_arn);

      } else {
        setOpenModal(true);
      }
    } catch (error) {
      //@ts-ignore
      if (error.response?.status === 404) {
        setOpenModal(true);
      } else {
        console.error("Error fetching broadcast URL:", error);
      }
    }
  };
  useEffect(() => {
    const client = IVSBroadcastClient.create({
      streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
      ingestEndpoint: "51115b38d857.global-contribute.live-video.net",
    });
    //@ts-ignore
    setIvsClient(client);

    const fetchBroadcastUrl = async () => {
      try {
        //@ts-ignore
        const response = await MUserDashboardPagesApiService.getBroadcastUrl(
          eventIdNumber
        );
        const data = response?.data;

        if (data?.status === "success") {
          const eventStream = data?.eventStream;
          console.log("eventStream", eventStream);

          setStreamKey(eventStream?.stream_key);
          setIngestEndpoint(eventStream?.ingest_endpoint);
          setChannel_Arn(eventStream?.channel_arn);
      console.log("channel_arn",channel_arn)

          setIsChannelExist(true);
        } else {
          setOpenModal(true);
        }
      } catch (error) {
        //@ts-ignore
        if (error.response?.status === 404) {
          setOpenModal(true);
        } else {
          console.error("Error fetching broadcast URL:", error);
        }
      }
    };

    fetchBroadcastUrl();
  }, []);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setIsMediaSupported(true);
      //@ts-ignore
      setMediaStream(stream);
      //@ts-ignore
      setMediaStreamId(stream?.id);
      //@ts-ignore
      ivsClient.addVideoInputDevice(stream, stream.id, { index: 0 });
      startBroadcast();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStream = async () => {
    if (mediaStream) {
      //@ts-ignore
      const tracks = mediaStream.getTracks();
      //@ts-ignore
      tracks.forEach((track) => track.stop());
      //@ts-ignore
      ivsClient.removeVideoInputDevice(mediaStreamId);
      setIsMediaSupported(false);
      setMediaStream(null);
      setMediaStreamId(null);
      stopBroadcast();
      console.log("channel_arn",channel_arn)
      //@ts-ignore
      const response = await MUserDashboardPagesApiService.endLiveStreaming(
        channel_arn
      );
         if (response.status === 200) {
          alert("Live Streaming Successfully has been ended");
      navigate(`/event_details/${eventIdNumber}`);

        } else {
          alert("Something Went Wrong!!")
        }
    }
    // navigate(`/event_details/${eventIdNumber}`);
  };

  const startBroadcast = () => {
    //@ts-ignore

    ivsClient
      .startBroadcast(streamKey, ingestEndpoint)
      .then(() => {
        setIsStreaming(true);
        alert("Broadcast started");
        console.log("streamKey, ingestEndpoint", streamKey, ingestEndpoint);
      })
      //@ts-ignore

      .catch((error) => console.error("Failed to start broadcast:", error));
  };

  const stopBroadcast = async () => {
    try {
      //@ts-ignore

      await ivsClient.stopBroadcast(streamKey, ingestEndpoint);
      setIsStreaming(false);
      console.log("Broadcast stopped");
    } catch (error) {
      console.error("Failed to stop broadcast:", error);
    }
  };

  const handleMuteMic = () => {
    setMicMuted((prev) => !prev);
  };

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f0f0f0", p: 3 }}>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <DialogTitle>Create Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your channel to start streaming.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            fullWidth
            variant="outlined"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <CustomInput
            type="number"
            error={false}
            title="Amount"
            inputFontSize={14}
            placeholder="Amount"
            height="1.7vh"
            fontWeight={400}
            fontSize={14}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            fullWidth
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateChannel} color="primary">
            Create Channel
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" gutterBottom>
        Channel: {channelName}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="success" onClick={startMedia}>
          Start Live Streaming
        </Button>
        <Button variant="contained" color="error" onClick={stopStream}>
          End Streaming
        </Button>
        <Button variant="contained" onClick={handleMuteMic}>
          {micMuted ? "Unmute Mic" : "Mute Mic"}
        </Button>
      </Stack>
      {isMediaSupported && (
        <video
          autoPlay
          muted
          ref={(video) => video && (video.srcObject = mediaStream)}
        />
      )}
      {/* <Typography variant="h6" gutterBottom>
        Attendees
      </Typography>
      <Grid container spacing={2}>
        {attendees.map((attendee, index) => (
          <Grid item key={index}>
            <Avatar>{attendee[0]}</Avatar>
            <Typography>{attendee}</Typography>
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
};

export default MeetingScreen;
