import React, { useState } from "react";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import "./style.css";
import ServicePackages from "./ServicesDesign";
import FacebookIcon from "@mui/icons-material/Facebook";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import { PackageI } from "../../services/model";
import SocialMediaPackagesCard from "./SocialMediaPackagesCard";
import StaffPackagesCard from "./StaffPackagesCard";
import SupportPackagesCard from "./SupportPackagesCard";

const Index: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageI | null>(null);

  const handlePackageSelection = (packageDetails: PackageI) => {
    // console.log("packageDetails", packageDetails);
    const { id, package_name, stripe_id, trial_days, currency, interval } =
      packageDetails;
    setSelectedPackage(packageDetails);
  };

  return (
    <React.Fragment>
      <Grid
        container
        padding={3}
        sx={{
          backgroundColor: "#FBFBFB",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{ marginTop: { xs: 5, md: 1 }, marginLeft: "0px" }}
        >
          <h2>MeAttend Registered Service Packages </h2>
        </Grid>
        <Grid item xs={12} md={12}>
          <ServicePackages onSelectPackage={handlePackageSelection} />
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          sx={{ marginTop: { xs: 5, md: 5 }, marginLeft: "0px" }}
        >
          <h2>Choose Your Services </h2>
        </Grid>
        <Box
          sx={{
            width: "100%",
            padding: "24px",
            borderRadius: "16px",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#000315",
            }}
          >
            Social Media Packages
          </Typography>
          <SocialMediaPackagesCard />
        </Box>

        <Box
          sx={{
            width: "100%",
            padding: "24px",
            borderRadius: "16px",
            backgroundColor: "white",
            marginTop:"24px"
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#000315",
            }}
          >
            Staff Packages
          </Typography>
          <StaffPackagesCard />
        </Box>


        <Box
          sx={{
            width: "100%",
            padding: "24px",
            borderRadius: "16px",
            backgroundColor: "white",
            marginTop:"24px"

          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#000315",
            }}
          >
            Support Packages
          </Typography>
          <SupportPackagesCard />
        </Box>

      </Grid>
    </React.Fragment>
  );
};

export default WithLayout(Index);
