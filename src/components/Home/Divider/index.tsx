import { Box, Divider, Grid } from "@mui/material";

export default function Index({ hide }: { hide?: boolean }) {
  return (
    <Grid sx={{ display: { md: "block", xs: "none" } }} md={1}>
      <Box
        sx={{
          width: "30px", // Adjust size of the circle
          height: "30px", // Adjust size of the circle
          borderRadius: "50%", // Make the circle round
          zIndex: 1,
          position: "relative",
          border: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: hide ? 33 : 25,
        }}
      >
        <Box
          sx={{
            width: "20px", // Adjust size of the circle
            height: "20px", // Adjust size of the circle
            borderRadius: "50%", // Make the circle round
            backgroundColor: "#FFC000",
          }}
        ></Box>
      </Box>
      {!hide && (
        <Divider
          orientation="vertical"
          sx={{
            backgroundImage:
              "linear-gradient(to bottom, #33343D 40%, rgba(255, 255, 255, 0) 0%)",
            backgroundPosition: "left",
            backgroundSize: "2px 30px", // Adjust the size of the dashed line
            backgroundRepeat: "repeat-y",
            marginLeft: "15px", // Adjust the spacing between the divider and adjacent components
            marginRight: "15px", // Adjust the spacing between the divider and adjacent components
            borderRadius: 50,
            height: 680,
            marginTop: -10,
            borderRightWidth: 0,
          }}
        />
      )}
    </Grid>
  );
}

{
  /* <Box
              sx={{
                width: "30px", // Adjust size of the circle
                height: "30px", // Adjust size of the circle
                borderRadius: "50%", // Make the circle round
                zIndex: 1,
                position: "relative",
                border: "2px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: -80,
              }}
            >
              <Box
                sx={{
                  width: "20px", // Adjust size of the circle
                  height: "20px", // Adjust size of the circle
                  borderRadius: "50%", // Make the circle round
                  backgroundColor: "#FFC000",
                }}
              ></Box>
            </Box> */
}
