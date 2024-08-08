import {Typography } from "@mui/material";

function Error({
    text,
    fontWeight = 400,
    fontSize = 14,
}: {


    text: string;
    fontWeight?: number;
    fontSize?: number|'14';

  }) {


    return (
      <>
        <Typography
          fontWeight={fontWeight}
          color={"#FD1F1F"}
          mb={1}
          fontSize={fontSize}
          mt={2}
        >
          {text}
        </Typography>

      </>
    );
  }
export default Error;
// end
