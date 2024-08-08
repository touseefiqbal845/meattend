import { Stack, SxProps, Theme, Typography } from "@mui/material";

export default function Index({
  mainTitle,
  title,
  body,
  mainTitleColor = "#FFC000",
  titleColor = "#FFC000",
  bodyColor = "#FFFFFF",
  sx,
  textAlign = "left",
}: {
  mainTitle: string;
  title: string;
  body: string;
  titleColor?: string;
  bodyColor?: string;
  mainTitleColor?: string;
  sx?: SxProps<Theme>;
  textAlign?: any;
}) {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        pt: { md: 10, xs: 3 },
        pb: { md: 5, xs: 3 },
      }}
    >
      <Typography fontSize={"14px"} fontWeight={700} color={mainTitleColor}>
        {mainTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: { md: "38px", xs: "26px" },
          fontWeight: 700,
          color: titleColor,
          mt: 1,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        color={bodyColor}
        fontSize={"14px"}
        alignSelf={"center"}
        marginTop={1}
        textAlign={textAlign}
      >
        {body}
      </Typography>
    </Stack>
  );
}
