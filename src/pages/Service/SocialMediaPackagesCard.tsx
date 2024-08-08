import React, { useState } from "react";
import { Grid, Card, Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TikTokIcon from "@mui/icons-material/MusicNote";
import CustomButton from "../../components/button/CustomButton";
import LinkedlnModal from "./Modals/Linkedln";
import InstagramModal from "./Modals/Instagram";
import FacebookModal from "./Modals/Facebook";
import TikTokModal from "./Modals/TikTok";

interface CardData {
  id: number; // Add an ID or unique identifier
  title: string;
  description: string;
  price: string;
  isActive: boolean;
}

const SubscriptionCard: React.FC<CardData> = ({
  id,
  title,
  description,
  price,
  isActive,
}) => {
  const [openLinkedlnModal, setOpenLinkedlnModal] = useState<boolean>(false);
  const [openInstagramModal, setOpenInstagramModal] = useState<boolean>(false);
  const [openFacebookModal, setOpenFacebookModal] = useState<boolean>(false);
  const [openTikTokModal, setOpenTikTokModal] = useState<boolean>(false);

  const handleClose = () => {
    setOpenLinkedlnModal(false);
    setOpenInstagramModal(false);
    setOpenFacebookModal(false);
    setOpenTikTokModal(false);
  };

  const handleSubscription = () => {
    switch (title) {
      case "Instagram Connection":
        setOpenInstagramModal(true);
        break;
      case "Linkdln Connection":
        setOpenLinkedlnModal(true);
        break;
      case "Facebook Connection":
        setOpenFacebookModal(true);
        break;
      case "TikTok Connection":
        setOpenTikTokModal(true);
        break;
      default:
        break;
    }
  };

  const renderIcon = () => {
    switch (title) {
      case "Instagram Connection":
        return <InstagramIcon style={{ color: "#E1306C" }} />;
      case "Linkdln Connection":
        return <LinkedInIcon style={{ color: "#0077B5" }} />;
      case "Facebook Connection":
        return <FacebookIcon style={{ color: "#1877F2" }} />;
      case "TikTok Connection":
        return <TikTokIcon style={{ color: "#000000" }} />;
      default:
        return <FacebookIcon style={{ color: "#DE9300" }} />;
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
            height: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
            {renderIcon()}
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
          </Box>
          <Box textAlign="center">
            <CustomButton
              marginLeft="0px"
              marginTop="16px"
              notArrow
              mdFullWidth
              title={isActive ? "Active" : "Buy Services"}
              bgColor={isActive ? "#FFF7DD" : "#FFC000"}
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
      {title === "Linkdln Connection" && (
        <LinkedlnModal open={openLinkedlnModal} onClose={handleClose} />
      )}
      {title === "Instagram Connection" && (
        <InstagramModal open={openInstagramModal} onClose={handleClose} />
      )}
      {title === "Facebook Connection" && (
        <FacebookModal open={openFacebookModal} onClose={handleClose} />
      )}
      {title === "TikTok Connection" && (
        <TikTokModal open={openTikTokModal} onClose={handleClose} />
      )}
    </React.Fragment>
  );
};

const SubscriptionCards = () => {
  const cardsData: CardData[] = [
    {
      id: 1,
      title: "Instagram Connection",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: true,
    },
    {
      id: 2,
      title: "Facebook Connection",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: false,
    },
    {
      id: 3,
      title: "Linkdln Connection",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: true,
    },
    {
      id: 4,
      title: "TikTok Connection",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat quae incidunt id labore iste totam debitis quis, saepe doloremque!",
      price: "$80 pcm",
      isActive: false,
    },
  ];

  return (
    <Grid container spacing={2} mt={2}>
      {cardsData.map((card) => (
        <SubscriptionCard key={card.id} {...card} />
      ))}
    </Grid>
  );
};

export default SubscriptionCards;
