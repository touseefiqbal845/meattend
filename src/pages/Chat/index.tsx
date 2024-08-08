import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button, Container, Modal, Stack, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import {
  ChatListI,
  MessageI,
  SocketContactsI,
  SocketLoginI,
} from "../../services/model";
import _ from "lodash";
import MRegisterApiService from "../../services/MRegisterApiService";
import moment from "moment";
import { sleep } from "../../services/constant";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import SingleTick from "../../assets/icons/singleTick.png";
import DoubleTick from "../../assets/icons/doubleTick.png";
import DoubleTickView from "../../assets/icons/doubleTickView.png";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "95vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

var socket: Socket;
const ChatComponent = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<SocketLoginI>(
    {} as SocketLoginI
  );
  const [chatListUser, setChatListUser] = React.useState<SocketContactsI>(
    {} as SocketContactsI
  );
  const [selectChat, setSelectedChat] = React.useState<ChatListI>(
    {} as ChatListI
  );
  const selectChatRef = useRef<ChatListI | null>(null);
  const [messages, setMessages] = React.useState<MessageI[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ChatListI[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
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

      socket.emit("contactlist", { token: userData.token });

      socket.on("contactlist_response", (userContacts: SocketContactsI) => {
        setChatListUser(userContacts);
      });
      socket.once("requestlist_response", (user: SocketContactsI) => {
        // console.log("Request List Response", user);
      });
      socket.once("invitelist_response", (user: SocketContactsI) => {
        // console.log("Invite List Response", user);
      });
      socket.on("request_friend", (data: any) => {
        console.log("Received message:", data);
      });
      socket.on("receive_message", (data: any) => {
        console.log(data.data, selectChatRef);

        if (data.data.senderId !== selectChatRef.current!.mobileNumber) {
          setChatListUser((prevChatList: SocketContactsI) => {
            return {
              ...prevChatList,
              data: prevChatList.data.map((chat) => {
                if (chat.mobileNumber === data.data.senderId) {
                  // Update the count for the correct chat
                  return {
                    ...chat,
                    count: chat.count ? chat.count + 1 : 1,
                  };
                }
                return chat;
              }),
            };
          });
        } else if (data.data.senderId === selectChatRef.current!.mobileNumber) {
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

  useEffect(() => {
    if (_.size(userData) == 0) return;

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

    socket.on("disconnect", (reason: string) => {
      console.log("Socket.IO disconnected:", reason);
    });
  }, [selectChat]);
  useEffect(() => {
    handleSearch();
  }, [searchText]);
  function scrollToBottom() {
    sleep(500).then(() =>
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  }
  const handleSearch = _.debounce(async () => {
    try {
      const res = await MRegisterApiService.getSearchResults(searchText);
      setSearchResults(res.data.data);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }, 300);
  const acceptRequest = async (mobileNumber: string | number) => {
    let params = {
      token: userData.token,
      friend: mobileNumber,
      acceptStatus: true,
    };

    socket.emit("accept_request", params);
    socket.once("accept_request_response", (msg) => {
      socket.on("contactlist_response", (userContacts: SocketContactsI) => {
        setChatListUser(userContacts);
        _.size(userContacts.data) > 0 && setSelectedChat(userContacts.data[0]);
        console.log("contact", userContacts);
      });
      socket.on("error", (msg) => {
        console.log(msg);
      });
      socket.on("proccessing_error", (msg) => {
        console.log(msg);
      });
    });
  };

  const declineRequest = async (mobileNumber: string | number) => {
    let params = {
      token: userData.token,
      friend: mobileNumber,
      acceptStatus: false,
    };
    socket.emit("accept_request", params);
    socket.once("accept_request_response", (msg) => {
      console.log("REQUEST-DECLINE", msg);
      socket.on("error", (msg) => {
        console.log(msg);
      });
      socket.on("proccessing_error", (msg) => {
        console.log(msg);
      });
    });
  };
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
  function handleInvite(mobileNumber: string): void {
    socket.emit("friend_request", {
      token: userData.token,
      friend: mobileNumber,
    });
    socket.on("friend_request_response", (msg: any) => {
      handleSearch();
      console.log("FRIEND-REQUEST-RESPONSES", msg);
    });
  }

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <h2>Messages</h2>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item md={3.5} xs={12} className={classes.borderRight500}>
            <Grid item xs={12} style={{ padding: "5%" }}>
              <TextField
                placeholder="Search"
                id="outlined-basic-email"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                  ".MuiOutlinedInput-root": {
                    borderRadius: 3,
                    border: "2px solid #C7CADA",
                    position: "unset",
                    height: "5vh",
                  },
                  "& .MuiInputLabel-root": {
                    textAlign: "center",
                    top: -5,
                  },
                  "& .MuiInputLabel-shrink": {
                    top: 0,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Box
                      component="img"
                      width={18}
                      height={18}
                      mr={1}
                      sx={{
                        filter: "opacity(0.5) drop-shadow(0px 0px 0px #A0A3B5)",
                      }}
                      src={require("../../assets/navIcons/search.png")}
                    />
                  ),
                }}
              />
            </Grid>
            <List>
              {searchText && _.size(searchResults) > 0
                ? searchResults.map((user) => {
                    return (
                      <ListItem
                        key={user._id}
                        // onClick={() => {
                        //   if (isMobile) {
                        //     navigate(`/chat/:${user._id}`);
                        //   } else {
                        //     setSelectedChat(user);
                        //   }
                        // }}
                      >
                        <ListItemIcon>
                          <Avatar alt="Remy Sharp" src={user.profile} />
                        </ListItemIcon>
                        <ListItemText
                          primary={user.firstName + " " + user.lastName}
                        />
                        {user?.inviteList?.includes(
                          userData.user[0].mobileNumber
                        ) ? (
                          // show two buttons accept and reject
                          <Typography fontSize={10}>Requested.</Typography>
                        ) : user.friendList?.includes(
                            userData.user[0].mobileNumber
                          ) ? (
                          <></>
                        ) : (
                          <Button
                            onClick={() => handleInvite(user.mobileNumber)}
                            variant="contained"
                            sx={{
                              backgroundColor: "green",
                              color: "white",
                              fontSize: 10,
                              borderRadius: 20,
                              padding: "5px 10px",
                            }}
                          >
                            <Typography textTransform={"lowercase"}>
                              Invite
                            </Typography>
                          </Button>
                        )}
                      </ListItem>
                    );
                  })
                : chatListUser?.data?.map((user) => {
                    return (
                      <ListItem
                        sx={{
                          cursor: "pointer",
                        }}
                        key={user._id}
                        onClick={() => {
                          if (isMobile) {
                            navigate(`/chat/:${user._id}`, {
                              state: { selectChat: user },
                            });
                          } else {
                            //make read count zero and updated state
                            let updatedUser = user;
                            updatedUser.count = 0;
                            selectChatRef.current = updatedUser;
                            setSelectedChat({ ...updatedUser });

                            socket.emit("message_seen_request", {
                              token: userData.token,
                              from: userData.user[0].mobileNumber,
                              to: user.mobileNumber,
                            });
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Avatar alt="Remy Sharp" src={user.profile} />
                        </ListItemIcon>
                        <Stack direction={"column"} width={"60%"}>
                          <Typography
                            fontWeight={"bold"}
                            color={"text.primary"}
                          >
                            {user.firstName + " " + user.lastName}
                          </Typography>

                          <Typography
                            sx={{ color: "gray.secondary", fontSize: 12 }}
                          >
                            {user.lastMessage.message.length > 20
                              ? user.lastMessage.message.slice(0, 20) + "..."
                              : user.lastMessage.message}
                          </Typography>
                        </Stack>
                        {user.requestList.includes(
                          userData.user[0].mobileNumber
                        ) ? (
                          // show two buttons accept and reject
                          <Stack direction={"row"} alignItems={"center"}>
                            <Button
                              onClick={() => acceptRequest(user.mobileNumber)}
                              variant="contained"
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                                fontSize: 10,
                                borderRadius: 20,
                                padding: "5px 10px",
                                marginRight: 2,
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => declineRequest(user.mobileNumber)}
                              variant="contained"
                              sx={{
                                backgroundColor: "error.main",
                                color: "white",
                                fontSize: 10,
                                borderRadius: 20,
                                padding: "5px 10px",
                              }}
                            >
                              Reject
                            </Button>
                            {user.count && (
                              <ListItemText
                                sx={{
                                  width: 15,
                                  height: 15,
                                  borderRadius: 50,
                                  bgcolor: "primary.main",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography fontSize={10}>
                                  {user.count}
                                </Typography>
                              </ListItemText>
                            )}
                          </Stack>
                        ) : (
                          <Stack
                            direction={"column"}
                            display={"flex"}
                            alignItems={"center"}
                          >
                            <Typography fontSize={12} color={"gray.main"}>
                              {moment(user.lastMessage.date).format("hh:mm a")}
                            </Typography>
                            {user.count > 0 ? (
                              <ListItemText
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 50,
                                  bgcolor: "primary.main",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography color={"black"} fontSize={10}>
                                  {user.count}
                                </Typography>
                              </ListItemText>
                            ) : (
                              <Box
                                component={"img"}
                                width={20}
                                height={20}
                                sx={{
                                  objectFit: "contain",
                                }}
                                mt={1}
                                src={
                                  user.lastMessage.status == "1"
                                    ? SingleTick
                                    : user.lastMessage.status == "2"
                                    ? DoubleTick
                                    : DoubleTickView
                                }
                              />
                            )}
                          </Stack>
                        )}
                      </ListItem>
                    );
                  })}
              {/* <ListItem key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItem
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "unset",
                    marginLeft: -2,
                  }}
                >
                  <ListItemText>
                    <Typography color={"text"} fontWeight={700}>
                      Remy Sharp
                    </Typography>
                  </ListItemText>
                  <Typography color={"gray.secondary"} fontSize={12}>
                    Hello , how are you
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    position: "unset",
                    marginLeft: -2,
                  }}
                >
                  <Typography color={"gray.secondary"} fontSize={12}>
                    12:35
                  </Typography>
                  <ListItemText
                    sx={{
                      width: 15,
                      height: 15,
                      borderRadius: 50,
                      bgcolor: "primary.main",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize={10}>2</Typography>
                  </ListItemText>
                </ListItem>
              </ListItem> */}
              <Divider
                sx={{ margin: 5, marginY: 2, borderColor: "border.main" }}
              />
            </List>
          </Grid>
          {_.size(selectChat) > 0 && (
            <Grid item md={8.5} paddingX={2} paddingY={2}>
              <Box display={{ xs: "none", md: "block" }}>
                <List className={classes.messageArea}>
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
                            bgcolor={
                              selectChat.online ? "#04CAA5" : "primary.main"
                            }
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
                  <Box>
                    {messages.map((message) => {
                      // if date is today then dow format like that Today at, 09:10 AM else MMMM DD, YYYY [at] hh:mm A
                      const dateToCheck = moment(message.date);
                      const today = moment();
                      const finalDate = dateToCheck.isSame(today, "day")
                        ? "Today at " + dateToCheck.format("hh:mm A")
                        : dateToCheck.format("MMMM DD, YYYY [at] hh:mm A");

                      return (
                        <>
                          {message.senderId ===
                          userData.user[0].mobileNumber ? (
                            <ListItem key={message._id}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <ListItemText
                                    //   align="right"
                                    sx={{ float: "right", width: "50%", mt: 3 }}
                                  >
                                    <Typography
                                      color={"gray.quat"}
                                      fontSize={10}
                                      fontWeight={400}
                                    >
                                      {finalDate}
                                    </Typography>
                                  </ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    direction={"row"}
                                    display={"flex"}
                                    // alignItems={"center"}
                                    justifyContent={"flex-end"}
                                  >
                                    <ListItemText
                                      sx={{
                                        bgcolor: "white",
                                        border: "1px solid #C7CADA",
                                        padding: "1%",
                                        borderBottomRightRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        borderTopLeftRadius: 20,
                                        marginRight: "1%",
                                        //max width according to message size
                                        maxWidth:
                                          (message.message.length * 1 > 64
                                            ? 30
                                            : message.message.length * 1) +
                                          "vw",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: 14,
                                          color: "gray.tertiary",
                                        }}
                                      >
                                        {message.message}
                                      </Typography>
                                    </ListItemText>
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
                                  >
                                    <Typography
                                      color={"gray.quat"}
                                      fontSize={10}
                                      fontWeight={400}
                                    >
                                      {finalDate}
                                    </Typography>
                                  </ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    direction={"row"}
                                    display={"flex"}
                                    // alignItems={"center"}
                                  >
                                    <Avatar
                                      alt="Alicep"
                                      src={selectChat.profile}
                                    />
                                    <ListItemText
                                      sx={{
                                        bgcolor: "#F3F4F9",
                                        padding: "1%",
                                        borderBottomRightRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        marginLeft: "1%",
                                        maxWidth:
                                          (message.message.length * 1 > 64
                                            ? 30
                                            : message.message.length * 1) +
                                          "vw",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: 14,
                                          color: "gray.tertiary",
                                        }}
                                      >
                                        {message.message}
                                      </Typography>
                                    </ListItemText>
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
                <Grid item xs={12}>
                  <Stack
                    bgcolor={"bgColor.main"}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    position={"sticky"}
                    mt={10}
                    bottom={20}
                  >
                    <Box
                      onClick={() => setOpenEmoji(true)}
                      width={20}
                      height={20}
                      component={"img"}
                      src={require("../../assets/icons/gif_icon.png")}
                      marginX={1}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                    {/* <Box
                      width={20}
                      height={20}
                      component={"img"}
                      src={require("../../assets/icons/share.png")}
                    /> */}
                    <TextField
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
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
                      }}
                    />

                    <Box
                      onClick={sendMessage}
                      width={40}
                      height={40}
                      component={"img"}
                      src={require("../../assets/icons/send.png")}
                    />
                  </Stack>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
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
};

export default WithLayout(ChatComponent);
