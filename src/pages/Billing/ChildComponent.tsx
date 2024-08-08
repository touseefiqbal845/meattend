import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Invoice = ({
  modal,
  handleOpen,
  handleClose,
}: {
  modal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}) => {
  return (
    <Modal open={modal}>
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5" gutterBottom>
                Bill to:
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body1">1234567</Typography>
            <Typography variant="body1">Date: 5/14/2024</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              ME Attend
            </Typography>
            <Typography variant="body1">
              <b>Address:</b> 15-21 Ganton St, Soho, London W1F 9BN, United
              Kingdom
            </Typography>
            <Typography variant="body1">
              <b>City:</b> London
            </Typography>
            <Typography variant="body1">
              <b>Country:</b> United Kingdom
            </Typography>
            <Typography variant="body1">
              <b>Zipcode:</b> 78456
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">Amount</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Service Package</Typography>
                <Typography variant="body1">Additional Staff</Typography>
                <Typography variant="body1">Facebook Connection</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">£20</Typography>
                <Typography variant="body1">£20</Typography>
                <Typography variant="body1">£20</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">Tax (20%)</Typography>
                <Typography variant="h6">Grand Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">£40</Typography>
                <Typography variant="h6">£400000</Typography>
                <Typography variant="h6">£40</Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" mt={2}>
              Due on 5/14/2024
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Invoice;
