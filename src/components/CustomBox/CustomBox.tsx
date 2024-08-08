import {
    Box,
    Typography,
  } from "@mui/material";
  
  //@ts-ignore
export const CustomBox = ({
    figure,
    title,
    img,
    color,
    width,
    style = {} as any,

  }: {
    figure: string;
    title: string;
    img: string;
    color: string;
    width?: string;
    style?: {};

    

  }) => {
    return (
      <Box
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
        display={"flex"}
        alignItems={"center"}
        borderRadius={3}
        py={1}
        width={width}
        style={style}
           
      >
        <Box width={50} height={50} component={"img"} src={img} padding={2} />
        <Box>
          <Typography fontSize={30} fontWeight={800} color={color}>
            {figure}
          </Typography>
          <Typography color={"#3F435E"} fontWeight={500} fontSize={12}>
            {title}
          </Typography>
        </Box>
      </Box>
    );
  };