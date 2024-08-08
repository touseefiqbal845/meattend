import React, { useState } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Stack,
  Grid,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteFilledIcon from "@mui/icons-material/Favorite";
import CustomInput from "../../../components/Input/CustomInput";

//@ts-ignore
const CommentCard = ({ index, user, comment, date, key,userImg }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Grid container spacing={2} sx={{ backgroundColor: "white" }}>
      <Grid item xs={10} md={10}>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Avatar
            alt={user}
            src={`https://staging-resources.meattend.com/MeAttend/posts/${userImg}?w=150&fit=crop&auto=format`}
            />
          <div style={{ maxWidth: "calc(100% - 56px)" }}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "14px",
                fontWeight: 800,
                lineHeight: "20px",
                fontFamily: "Mulish",
                color: "#333333",
              }}
            >
              {user}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  fontFamily: "Mulish",
                  color: "#84858D",
                }}
              >
                {comment}
              </Typography>
            </Box>
          </div>
        </Stack>
      </Grid>
      <Grid item md={12}>
      <Typography
          fontSize={12}
          color={"gray.tertiary"}
          fontWeight={"bold"}
          >
            {date}
            </Typography>
      </Grid>
    </Grid>
  );
};

export default CommentCard;
