import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Socket, io } from "socket.io-client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import {
  ChatListI,
  MessageI,
  SocketContactsI,
  SocketLoginI,
} from "../../services/model";
import { sleep } from "../../services/constant";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

var socket: Socket;

function MobileChat() {
  const {
    state: { selectChat },
  } = useLocation();
  console.log("🚀 ~ MobileChat ~ selectChat:", selectChat);

  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageI[]>([]);
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [userData, setUserData] = React.useState<SocketLoginI>(
    {} as SocketLoginI
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    socket = io("wss://staging-chat.meattend.com");

    //? if socket is already connected
    if (socket.connect()) {
      socketListeners();
    }
    // sleep(2000).then(() => {
    //   socket.on("connect", () => {
    //     console.log("Connected to the Socket.IO server");
    //   });
    // });
    else {
      console.log("Socket not connected");
      //? Reconnect it
      sleep(2000).then(() => {
        socket.on("connect", () => {
          console.log("Connected to the Socket.IO server");
        });
      });
      if (socket.connect()) {
        socketListeners();
      }
    }
    socket.on("disconnect", (reason: string) => {
      console.log("Socket.IO disconnected:", reason);
    });
    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("login_response");
      socket.off("contactlist_response");
      socket.off("requestlist_response");
      socket.off("invitelist_response");
      socket.off("request_friend");
      socket.off("receive_message");
      socket.off("send_message_response");
      socket.off("conversation_list_response");
      socket.off("message_seen_request");
      socket.off("message_seen_single_response");

      socket.off("error");
    };
  }, []);
  function socketListeners() {
    let access_token = localStorage.getItem("access_token");
    let accesstoken = {
      token: access_token,
      //! COMPANY CHECK IS HARD CODED HERE NEED TO BE CHANGED LATER ON
      is_company: true,
    };
    socket.emit("login", accesstoken);
    socket.on("login_response", (userData: SocketLoginI) => {
      setUserData(userData);

      let conversationData = {
        token: userData?.token,
        from: userData?.user[0]?.mobileNumber,
        to: selectChat?.mobileNumber,
        page: 0,
        limit: 30,
      };
      socket.emit("conversation_list_request", conversationData);
      socket.once("conversation_list_response", (msg) => {
        if (msg?.data?.length > 0) {
          const reverseArray = msg.data.reverse();
          setMessages(reverseArray);
        }
      });
      socket.on("receive_message", (data: any) => {
        if (data.data.senderId === selectChat.mobileNumber) {
          setMessages((prevMessages: MessageI[]) => [
            ...prevMessages,
            data.data,
          ]);
          scrollToBottom();
        }
      });
      socket.on("send_message_response", (data: any) => {
        //? count unread message

        setMessages((prevMessages: MessageI[]) => [...prevMessages, data.data]);
        scrollToBottom();
      });
      socket.on("message_seen_single_response", (data: any) => {
        console.log("🚀 ~ socket.on ~ data:", data);
      });

      socket.on("error", (msg) => {
        console.log(msg);
      });
    });
  }
  function scrollToBottom() {
    sleep(500).then(() =>
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  }
  const sendMessage: any = () => {
    let data = {
      token: userData.token,
      from: userData.user[0].mobileNumber,
      to: selectChat.mobileNumber,
      message: msg,
    };

    socket.emit("send_message", data);
    setMsg("");
  };
  return (
    <React.Fragment>
      <Box
        onClick={() => navigate("/chat")}
        component={"img"}
        src={require("../../assets/icons/arrow.png")}
        width={20}
        height={20}
        pl={2}
        pt={2}
      />
      <Grid xs={12} paddingX={2} pt={2}>
        <List
          sx={{
            overflowY: "scroll",
          }}
        >
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"}>
              <Avatar alt="Alicep" src={selectChat.profile} />

              <Stack paddingX={2}>
                <Typography fontWeight={800} fontSize={16}>
                  {selectChat.firstName + " " + selectChat.lastName}
                </Typography>
                <Stack direction={"row"} alignItems={"center"}>
                  <Box
                    width={7}
                    height={7}
                    bgcolor={selectChat.online ? "#04CAA5" : "primary.main"}
                    borderRadius={50}
                    marginRight={1}
                  />
                  <Typography color={"gray.main"} fontSize={12}>
                    {selectChat.online ? "Active Now" : "Offline"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* <Stack direction={"row"}>
              <Box
                width={40}
                height={40}
                component={"img"}
                src={require("../../assets/icons/videoCall.png")}
              />
              <Box
                width={40}
                height={40}
                component={"img"}
                marginLeft={2}
                src={require("../../assets/icons/call3.png")}
              />
            </Stack> */}
          </Stack>
          <Divider sx={{ borderColor: "#C7CADA", marginY: 4 }} />
          <Box sx={{ paddingBottom: 10 }}>
            {messages.map((message) => {
              return (
                <>
                  {message.senderId === userData.user[0].mobileNumber ? (
                    <ListItem key={message._id}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            //   align="right"
                            sx={{
                              float: "right",
                              width: "50%",
                              mt: 3,
                              color: "gray.quat",
                            }}
                          >
                            <Typography fontSize={10} color={"gray.quat"}>
                              {moment(message.date).format(
                                "MMMM DD, YYYY [at] hh:mm A"
                              )}
                            </Typography>
                          </ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack
                            direction={"row"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                          >
                            <ListItemText
                              sx={{
                                bgcolor: "white",
                                border: "1px solid #C7CADA",
                                padding: "1%",
                                borderBottomRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                borderTopLeftRadius: 50,
                                marginRight: "1%",
                                maxWidth: "50%",
                              }}
                              primary={message.message}
                            ></ListItemText>
                            <Avatar
                              alt="Alicep"
                              src={userData.user[0].profile}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ) : (
                    <ListItem key="1">
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            sx={{ float: "right", width: "50%" }}
                            secondary={moment(message.date).format(
                              "MMMM DD, YYYY [at] hh:mm A"
                            )}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack
                            direction={"row"}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <Avatar alt="Alicep" src={selectChat.profile} />
                            <ListItemText
                              sx={{
                                bgcolor: "#F3F4F9",
                                padding: "1%",
                                borderBottomRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                borderTopRightRadius: 50,
                                marginLeft: "1%",
                                maxWidth: "50%",
                              }}
                              primary={message.message}
                            ></ListItemText>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )}
                </>
              );
            })}
            <Box ref={messagesEndRef} />
          </Box>
        </List>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Stack
            bgcolor={"bgColor.main"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            position={"fixed"}
            bottom={0}
            padding={0}
            width={"100vw"}
          >
            {/* <Box
              onClick={() => setOpenEmoji(true)}
              width={20}
              height={20}
              component={"img"}
              src={require("../../assets/icons/gif_icon.png")}
              marginX={1}
              sx={{
                cursor: "pointer",
              }}
            /> */}
            <Box
              width={20}
              height={20}
              component={"img"}
              src={require("../../assets/icons/share.png")}
            />
            <TextField
              id="outlined-basic-email"
              label="Type here"
              fullWidth
              variant="filled"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "bgColor.main",
                },
                //borderWidth:0

                "& .MuiInputBase-root.MuiFilledInput-root::before": {
                  borderBottom: "none",
                },
                "& .MuiInputBase-root.MuiFilledInput-root::after": {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Box
              onClick={sendMessage}
              width={30}
              height={30}
              component={"img"}
              src={require("../../assets/icons/send.png")}
            />
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={openEmoji}
        onClose={() => setOpenEmoji(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <EmojiPicker
            onEmojiClick={(event) => {
              setMsg(msg + event.emoji);
            }}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default WithLayout(MobileChat);
