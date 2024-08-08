import React from "react";
import {
  Paper,
  Box,
  Stack,
  Rating,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

const Promoters = ({ event }) => {
  return (
    <React.Fragment>
      {event?.promoters?.length > 0 ? (
        <Box component={"div"}>
          <Paper
            sx={{
              marginTop: { xs: 0, md: 0 },
              padding: 2,
              borderRadius: 2.5,
              backgroundColor: "#FFFFF",
            }}
          >
            <Box
              style={{
                marginTop: 2.5,
                marginBottom: "10px",
              }}
            >
              <Typography
                style={{
                  color: "#000315",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  fontFamily: "Mulish",
                }}
              >
                Promoters
              </Typography>{" "}
            </Box>
            <Box
              sx={{
                minHeight: 1000,
                overflowY: "auto",
                maxHeight: 1000,

                "&::-webkit-scrollbar": {
                  width: "0.512rem",

                  marginLeft: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#04CAA5",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#04CAA5",
                },
              }}
            >
              <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
                {event.promoters.map((prom, index) => (
                  <Stack key={prom?.id} spacing={2}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Stack direction="row" alignItems={"center"}>
                        <Avatar
                          alt={`${prom?.promoter_details?.profile_image}`}
                          src={`https://staging-resources.meattend.com/MeAttend/promoters/${prom?.promoter_details?.profile_image}`}
                          sx={{ width: 30, height: 30 }}
                        />

                        <Typography
                          fontSize={12}
                          color={"gray.tertiary"}
                          fontWeight={"bold"}
                          ml={1}
                        >
                          {`${prom?.promoter_details?.first_name} ${prom?.promoter_details?.last_name}`}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        0
                        <Box>
                          <Rating value={0} />
                        </Box>
                      </Stack>
                    </Stack>
                    <Box>
                      <Carousel
                        showThumbs={true}
                        className="custom-carousel"
                        showArrows={true}
                        renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                          hasPrev && (
                            <Box
                              onClick={clickHandler}
                              title={labelPrev}
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: 10,
                                transform: "translateY(-50%)",
                                width: 40,
                                height: 40,
                                cursor: "pointer",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                              }}
                            >
                              <Box
                                width={30}
                                height={30}
                                component={"img"}
                                src={require("../../assets/icons/left-arrow.png")}
                                sx={{ objectFit: "contain" }}
                              />
                            </Box>
                          )
                        }
                        renderArrowNext={(clickHandler, hasNext, labelNext) =>
                          hasNext && (
                            <Box
                              onClick={clickHandler}
                              title={labelNext}
                              sx={{
                                position: "absolute",
                                top: "50%",
                                right: 10,
                                transform: "translateY(-50%)",
                                width: 40,
                                height: 40,
                                cursor: "pointer",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                              }}
                            >
                              <Box
                                width={30}
                                height={30}
                                component={"img"}
                                src={require("../../assets/icons/right-arrow.png")}
                                sx={{ objectFit: "contain" }}
                              />
                            </Box>
                          )
                        }
                      >
                        {prom.media?.map((media) => (
                          <Stack>
                            <Box
                              height={"30vh"}
                              component={"img"}
                              src={`https://staging-resources.meattend.com/images/posts/${media?.images}`}
                              alt="media.png"
                            />
                          </Stack>
                        ))}
                      </Carousel>

                      <Stack direction="row" alignItems="center" mt={"-30px"}>
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
                        <Typography
                          fontSize={12}
                          fontWeight={700}
                          color="gray.tertiary"
                        >
                          Hide
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box component={"div"}>
          <Paper
            sx={{
              marginTop: { xs: 0, md: 0 },
              padding: 2,
              borderRadius: 2.5,
              backgroundColor: "#FFFFF",
            }}
          >
            <Box
              style={{
                marginTop: 2.5,
                marginBottom: "10px",
              }}
            >
              <Typography
                style={{
                  color: "#000315",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  fontFamily: "Mulish",
                }}
              >
                Promoters
              </Typography>{" "}
            </Box>
            <Box
              sx={{
                minHeight: 1000,
                overflowY: "auto",
                maxHeight: 1000,

                "&::-webkit-scrollbar": {
                  width: "0.512rem",

                  marginLeft: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#04CAA5",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#04CAA5",
                },
              }}
            >
              <Stack direction="column" spacing={2} sx={{ padding: 1 }}>
                <p>No promoters available</p>
              </Stack>
            </Box>
          </Paper>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Promoters;
