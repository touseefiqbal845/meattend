import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Divider, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NotificationsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Dummy notification data, you can replace this with your actual notifications
  const notifications = [
    {
      id: 1,
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
      title: "MEATTEND: Your daily news briefing",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "3d",
    },
    {
      id: 2,
      avatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
      title: "MEATTEND: You recieve message from John Doe",
      description: "Vivamus imperdiet venenatis est...",
      time: "4d",
    },
    // Add more notifications as needed
  ];

  return (
    <Dialog
      open={true}
      onClose={onClose}
      sx={{
        ".css-hz1bth-MuiDialog-container": {
          height: "auto",
          position: "fixed",
          right: 0,
          top: 20,
        },
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <DialogTitle fontSize={20} fontWeight={"bold"}>
          Notifications (1)
        </DialogTitle>
        {/* cross button */}
        <DialogActions>
          <Button onClick={onClose}>
            <CloseIcon color="warning" />
          </Button>
        </DialogActions>
      </Stack>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {notifications.map((notification) => (
            <Grid item xs={12} key={notification.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Avatar src={notification.avatar} alt="Notification Avatar" />
                <div style={{ marginLeft: "16px", flexGrow: 1 }}>
                  <Typography fontWeight={600} variant="subtitle1">
                    {notification.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notification.description}
                  </Typography>
                </div>
              </div>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationsDialog;
