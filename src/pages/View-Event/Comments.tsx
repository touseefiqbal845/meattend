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
import CustomInput from "./Comment-Input";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";



//@ts-ignore
interface CommentCardProps {
  index: number;
  user: any; 
  comment: any; 
  time: any; 
  key: any; 
  company_id: any;
  comment_id: any;
  userImg: string;
}
//@ts-ignore
const CommentCard: React.FC<CommentCardProps> = ({
  index,
  user,
  comment,
  time,
  key,
  company_id,
  comment_id,
  userImg,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment_reply, setComment_Reply] = React.useState<string>("");

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
 
  const handleComment = async () => {
    try {
     
      const Response =
        await MUserDashboardPagesApiService.postComment(company_id,comment_id,comment_reply);
      const response = await Response;
      console.log("response from response.", response);
      const responseData = response.data.data;
      // setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error:", error);
    }
   
  };
  return (
    <Grid container spacing={0} sx={{ backgroundColor: "white" }}>
      <Grid item xs={10} md={11}>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={2}
          sx={{ marginBottom: 1 }}
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
      <Grid item md={1}>
        <Typography
      fontSize={12}
      color={"gray.tertiary"}
      fontWeight={"bold"}
        >{time}</Typography>
      </Grid>
      <Grid item xs={2} md={4}>
        <Stack direction="row" alignItems="center">
          <IconButton onClick={handleFavoriteClick}>
            {isFavorite ? (
              <FavoriteFilledIcon style={{ color: "red" }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
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
          <Typography fontSize={12} fontWeight={700} color="gray.tertiary">
            Hide
          </Typography>
        </Stack>
      </Grid>
      <Grid item md={12} xs={12} sx={{ margin: "10px" }}>
        <CustomInput
          disabled={false}
          type="text"
          // error={false}
          // title="Address Line 1"
          title="Comments"
          placeholder="Write Comment"
          endImg={require("../../assets/icons/send.png")}
          height="1.8vh"
          fontWeight={400}
          fontSize={14}
          inputFontSize={14}
          // onKeyPress={handleKeyPress}
          onClick={handleComment}
          showLabel={false}
          value={comment_reply}
          onChange={(event) => setComment_Reply(event.target.value)}
        />
      </Grid>
    </Grid>
    
  );
};

export default CommentCard;
