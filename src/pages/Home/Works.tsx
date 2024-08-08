import React from "react";
import ResponsiveAppBar from "../../components/Home/NavBar";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { gridStyle } from "../../components/CustomContainerGrid/gridStyle";
import { Emoji } from "emoji-picker-react";
import EmojiGrid from "../../components/CustomContainerGrid/EmojiGrid";
import ContainerTitle from "../../components/Home/ContainerTitle";

export default function Works() {
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth={false}>
        <Grid {...gridStyle}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2} mt={5}>
              <Box
                component={"img"}
                sx={{
                  width: 10.34,
                  height: 14,
                  top: 2,
                  left: 2.07,
                }}
                src={require("../../assets/icons/pin.png")}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textAlign: "left",
                  color: "#04CAA5",
                }}
              >
                How it works
              </Typography>
            </Stack>

            <Typography
              color={"black"}
              sx={{
                fontSize: { md: 48, xs: 25 },
                textAlign: "left",
              }}
            >
              How{" "}
              <Typography
                sx={{ fontSize: { md: 48, xs: 25 }, fontWeight: 800 }}
                component={"span"}
              >
                Me Attend{" "}
              </Typography>
              Works
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "left",
                fontWeight: 400,
                color: "#3F435E",
                py: 1,
              }}
            >
              Ea pro tibique comprehensam, sed ea verear. Nam te omittam compre.
              Ne nam nonumy putent fuisset, reque fabulas usu ne.
            </Typography>
            <Stack
              py={4}
              direction={"row"}
              spacing={2}
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <Button
                sx={{
                  backgroundColor: "#FFC000",
                  py: 1.3,
                  px: 3,
                }}
              >
                <Typography
                  component={"text"}
                  sx={{
                    color: "#000315",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "13px",
                  }}
                >
                  Get Started
                </Typography>
              </Button>
            </Stack>
          </Grid>
          <EmojiGrid img={require("../../assets/icons/works.png")} />
        </Grid>
        <Grid>
          <Box
            my={4}
            component={"img"}
            src={require("../../assets/icons/companies.png")}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Container>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#000315",
          py: { xs: 0, md: 5 },
        }}
      >
        <ContainerTitle
          mainTitle="Me Attend Benefits"
          title={"The Benefits of Me Attend"}
          body={"Ea pro tibique comprehensam, sed ea verear"}
          titleColor="white"
          mainTitleColor="secondary"
        />
        <Grid container>
          <Grid item xs={12} md={4}>
            <Stack>
              <Typography fontSize={"14px"} fontWeight={700} color="secondary">
                STEP 1
              </Typography>
              <Typography fontSize={40} color={"white"} fontWeight={400}>
                Create your account
              </Typography>
              <Typography fontSize={"14px"} color={"white"}>
                Ligula molestie non ac eget fringilla. Arcu rutrum proin lacus
                eget purus ligula molestie.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              component={"img"}
              src={require("../../assets/icons/step1.png")}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
