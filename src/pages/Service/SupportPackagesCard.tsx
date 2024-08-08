import React, { useState } from "react";
import { Grid, Card, Box, Typography, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import CustomButton from "../../components/button/CustomButton";
import SubscriptionModal from "./SubscriptionModal";

interface CardData {
  title: string;
  description: string;
  price: string;
  isActive: boolean;
}

const SupportPackagesCardComponent: React.FC<CardData> = ({
  title,
  description,
  price,
  isActive,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const handleClose = () => setOpen(false);
  const handleSubscription = () => {
    setOpen(true);
  };

  const onIncrement = () => {
    setCount(count + 1);
  };

  const onDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
        <Card
          sx={{
            maxWidth: 400,
            margin: "auto",
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "#D8DAE7",
            padding: 3,
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              bgcolor: "#FFF7DD",
              width: "60px",
              height: "60px",
              margin: "auto",
              borderRadius: "6px",
              marginTop: "16px",
            }}
          >
            <FacebookIcon style={{ color: "#0000" }} />
          </Box>
          <Box textAlign="center">
            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: 700,
                lineHeight: "36px",
                color: "#000315",
                marginTop: "16px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#84858D",
                marginTop: "16px",
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box
            textAlign="center"
            sx={{
              marginTop: "16px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                fontWeight={800}
                fontSize={26}
                lineHeight="50.2px"
                paddingLeft="16px"
                color="#000315"
              >
                {price}
                <span className="package-text" />
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #D8DAE7",
                    borderRadius: "3px",
                    padding: "8px",
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#FFF7DD",
                    },
                  }}
                  onClick={onDecrement}
                >
                  <Typography sx={{ color: "#000", fontWeight: 700 }}>
                    -
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "24px",
                    padding: "0 8px",
                    color: "#000",
                  }}
                >
                  {count}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #D8DAE7",
                    borderRadius: "3px",
                    padding: "8px",
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#FFF7DD",
                    },
                  }}
                  onClick={onIncrement}
                >
                  <Typography sx={{ color: "#000", fontWeight: 700 }}>
                    +
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box textAlign="center">
            <CustomButton
              marginLeft="0px"
              marginTop="16px"
              notArrow
              mdFullWidth
              title="Buy Services"
              fullWidth
              XFontSize="14px"
              MFontSize="14px"
              xsHeight={42}
              xsWidth="95%"
              onClick={handleSubscription}
            ></CustomButton>
          </Box>
        </Card>
      </Grid>
      <SubscriptionModal open={open} onClose={handleClose} />
    </React.Fragment>
  );
};

const SupportPackagesCard = () => {
  const cardsData = [
    {
      title: "Google Reviews",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: true,
    },
    {
      title: "24HR Support",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: true,
    },
    {
      title: "Salesforce",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: true,
    },

  ];
  return (
    <Grid container spacing={2} mt={2}>
      {cardsData.map((card, index) => (
        <SupportPackagesCardComponent key={index} {...card} />
      ))}
    </Grid>
  );
};

export default SupportPackagesCard;
