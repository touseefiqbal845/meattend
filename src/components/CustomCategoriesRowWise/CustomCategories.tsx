import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function CustomCategories({
  title,
  style = {} as any,
  bgColor = "#FFC000",
  textColor = "black",
}: {
  title: string;
  style?: {};
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={bgColor}
      borderRadius={1}
      height={21}
      minWidth={35}
      paddingX={0.2}
      style={style}
    >
      <Typography color={textColor} fontSize={8} fontWeight={700}>
        {title}
      </Typography>
    </Box>
  );
}
