import { Box, Stack, Typography } from "@mui/material";
import { EventRowI } from "../../services/model";
import { ReactElement } from "react";

const ResuableEventStack = ({
  title,
  body,
  img,
}: {
  title: string;
  body: string | ReactElement | number;
  img?: string;
}) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"100%"}
      justifyContent={"space-between"}
      paddingTop={1}
    >
      <Typography fontSize={14} fontWeight={700}>
        {title}
      </Typography>
      <Stack
        display={"flex"}
        alignItems={"center"}
        flexDirection={"row"}
        gap={1}
      >
        {img && (
          <Box
            component="img"
            sx={{ height: 30, width: 40, borderRadius: 1 }}
            src={img}
          />
        )}
        <Typography fontSize={14} color={"#84858D"}>
          {body}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default ResuableEventStack;
