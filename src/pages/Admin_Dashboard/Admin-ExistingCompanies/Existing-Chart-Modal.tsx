import React from "react";
import { Container, Divider } from "@mui/material";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import "./style.css";
import Stack from "@mui/material/Stack";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement
);

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  Company_detail: any;
  selectedItemIdProps: number | null;

}

const ChartModal: React.FC<ChartModalProps> = ({selectedItemIdProps,Company_detail, open, onClose }) => {
  const selectedRow = Company_detail.find((row: any) => row.id === selectedItemIdProps);
  console.log("df",selectedRow);
  const incomeData = [
    1000, 1500, 1200, 2000, 1800, 2500, 4000, 2800, 3200, 2800, 3500, 3000,
  ];
  const maxIncome = Math.max(...incomeData);
  const gData = incomeData.map((value) => Math.max(maxIncome - value, 0));
  const gap = [];
  for (let i = 0; i < incomeData.length; i++) {
    if (incomeData[i] !== maxIncome) {
      gap.push(100);
    } else {
      gap.push(0);
    }
  }

  const data = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Income",
        backgroundColor: "orange",
        borderColor: "orange",
        borderWidth: 1,
        hoverBackgroundColor: "orange",
        hoverBorderColor: "orange",
        borderRadius: 10,
        data: incomeData,
        stack: "A",
        barPercentage: 0.4,
        categoryPercentage: 0.8,
      },
      // {
      //   label: "third",
      //   backgroundColor: 'white',
      //   borderColor: 'white',
      //   borderWidth: 1,
      //   hoverBackgroundColor: 'white',
      //   hoverBorderColor: 'white',
      //   borderRadius: 10,
      //   marginTop: 10, // Adjust margin top to create a gap
      //   data: gap,
      //   stack: "A",
      //   barPercentage: 0.4, // Reduce bar width for the second dataset
      //   categoryPercentage: 0.8, // Adjust the space between bars
      // },
      {
        label: "",
        backgroundColor: "#E6E8F0",
        borderColor: "#E6E8F0",
        borderWidth: 1,
        hoverBackgroundColor: "#E6E8F0",
        hoverBorderColor: "#E6E8F0",
        borderRadius: 10,
        marginTop: 10,
        data: gData,
        barPercentage: 0.4,
        categoryPercentage: 0.8,
        stack: "A",
        order: 1,
      },
    ],
  };

  const optionsd = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    indexAxis: "x",
    barPercentage: 0.8,
    categoryPercentage: 0.3,

    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
      },
    },
  };

  const lineData = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Income",
        data: [
          1000, 1500, 1200, 2000, 1800, 2500, 3000, 2800, 3200, 2800, 3500,
          4000,
        ],
        borderColor: "#FFD700",
      },
      {
        label: "Following",
        data: [
          2000, 2200, 2300, 2400, 2600, 2700, 2900, 3100, 3300, 3500, 3800,
          4000,
        ],
        borderColor: "#00FFFF",
      },
      {
        label: "Attending",
        data: [
          3000, 3300, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4500, 4700,
          5000,
        ],
        borderColor: "#FF0000",
      },
      {
        label: "Services",
        data: [
          4000, 4200, 4400, 4700, 5000, 5200, 5400, 5600, 5900, 6100, 6300,
          6500,
        ],
        borderColor: "#0000FF",
      },
    ],
  };

  const imageUrl = require("../../../assets/others/eventTestImage.png");

  const handleRemoveImage = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <IconButton
          sx={{
            position: "absolute",

            top: "8vh",
            right: (theme) => ({
              lg: theme.breakpoints.up("lg") ? "20vw" : "unset",
              md: theme.breakpoints.up("md") ? "18vw" : "unset",
              sm: theme.breakpoints.up("sm") ? "15vw" : "unset",
              xs: theme.breakpoints.up("xs") ? "1vw" : "unset",
            }),
            color: "white",
          }}
          onClick={handleRemoveImage}
        >
          <ClearIcon />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            top: (theme) => ({
              md: theme.breakpoints.up("md") ? "70%" : "unset",
              xs: theme.breakpoints.up("xs") ? "70%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: { xs: "100%", md: "100%" },
            minWidth: { xs: "80%", sm: "50%", md: "50%" },
            "&::-webkit-scrollbar": {
              width: 0,
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comapnay Details
          </Typography>
          <hr />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: { md: "nowrap", sm: "wrap" },
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "100%" },
                flexWrap: "wrap",
              }}
            >
              <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
                <Typography sx={{ color: "black", fontWeight: 700 }}>
                  Company name
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                 {selectedRow?.company}
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Email Address
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.email}

                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Categories
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  Gallary
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Director email
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.email}

                </Typography>
              </Box>
            </Box>

            {/* Right Side */}
            <Box sx={{ flexBasis: { xs: "100%", md: "65%" } }}>
              <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
                <Typography sx={{ color: "black", fontWeight: 700 }}>
                  Company government number
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                {selectedRow?.phone}

                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>  
                  Industry
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  Art
                </Typography>

                <Typography sx={{ color: "black", fontWeight: 700, mt: 2 }}>
                  Directors name
                </Typography>
                <Typography sx={{ color: "#84858D", fontWeight: 400 }}>
                  {selectedRow?.directorName}
                </Typography>
              </Box>
            </Box>
          </Box>
          <br />
          <span style={{ color: "black", fontWeight: 700, marginRight: "5px" }}>
            Description
          </span>
          <br />
          <br />
          <span style={{ color: "#84858D", fontWeight: 400 }}>
       {selectedRow?.description}
          </span>
          <br />
          <br />

          <Grid container>
            <Grid item md={6}>
              <Typography style={{ color: "black", fontWeight: 700 }}>
                Current Events
              </Typography>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "0px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{ width: "50px", height: "36px" }}
                  ></img>

                  <div
                    style={{
                      color: "#84858D",
                      fontSize: "12px",
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                  >
                    Oleo
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{ width: "50px", height: "36px" }}
                  ></img>

                  <div
                    style={{
                      color: "#84858D",
                      fontSize: "12px",
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                  >
                    Oleo
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <Typography style={{ color: "black", fontWeight: 700 }}>
                Past Events
              </Typography>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "0px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{ width: "50px", height: "36px" }}
                  ></img>

                  <div
                    style={{
                      color: "#84858D",
                      fontSize: "12px",
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                  >
                    Oleo
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src={imageUrl}
                    style={{ width: "50px", height: "36px" }}
                  ></img>

                  <div
                    style={{
                      color: "#84858D",
                      fontSize: "12px",
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                  >
                    Oleo
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>

          <br />
          <br />
          <br />
         

            <Grid
              container
              bgcolor={"white"}
              sx={{ width: "100%" }}
            >
              <Grid item md={12} xs={12}>
                <Stack
                  direction={"row"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Typography
                      sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}
                    >
                      <h2>Reports Chart</h2>
                    </Typography>
                  </Stack>
                </Stack>
                  <>
                    <Stack>
                      <Box
                        sx={{
                          height: 450,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Line data={lineData} />
                      </Box>
                    </Stack>
                  </>
              </Grid>
            </Grid>

          <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
          <div className="container">
            <div className="left-section">
              <span>Income</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>Following</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>Attending</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>Services</span>
            </div>
            <div className="right-section">
              <span>$29238</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>1M</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>10000K</span>
              <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
              <span>100</span>
            </div>
          </div>
          <br />
          <br />
          <Grid
              container
              bgcolor={"white"}
              sx={{ width: "100%" }}
            >
              <Grid item md={12} xs={12}>
                <Stack
                  direction={"row"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Typography
                      sx={{ fontSize: { md: 16, xs: 12 }, color: "#000315" }}
                    >
                      <h2>Bar graph</h2>

                    </Typography>
                  </Stack>
                </Stack>
                  <>
                    <Stack>
                      <Box
                        sx={{
                          height: 450,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                         <Bar
                    data={data}
                    //@ts-ignore
                    options={optionsd}
                  />
                      </Box>
                    </Stack>
                  </>
              </Grid>
            </Grid>
          <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box sx={{ flexBasis: "80%" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "10px" }}>Industries</li>
              </ul>
            </Box>

            <Box sx={{ flexBasis: "20%" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "10px" }}>
                  <Stack direction="row" spacing={1}>
                    <CustomCategories title="Art" />
                    
                  </Stack>
                </li>
              </ul>
            </Box>
          </Box>
          <Divider sx={{ my: 2, border: "1px solid #D8DAE7" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              marginBottom: "100px",
            }}
          >
            <Box sx={{ flexBasis: "80%" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "50px" }}>Categories</li>
              </ul>
            </Box>

            <Box sx={{ flexBasis: "20%" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "80px" }}>
                  <Stack direction="row" spacing={1}>
                    <CustomCategories title="Gallary" />
                    
                  </Stack>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export function CustomCategories({ title }: { title: string }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#FFC000"}
      borderRadius={1}
      height={21}
      minWidth={35}
      paddingX={0.2}
    >
      <Typography color={"black"} fontSize={8} fontWeight={700}>
        {title}
      </Typography>
    </Box>
  );
}

export default ChartModal;
