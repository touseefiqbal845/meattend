import { Grid } from "@mui/material";
import "../../assets/css/service-package.css";
import ServiceCard from "./ServiceCard";
import { PackageI } from "../../services/model";
import { getCompanyInfo } from "../../services/cacheFunc";
import React from "react";
import axios from "axios";

interface ServicePackagesProps {
  onSelectPackage: (selectedPackage: PackageI) => void;
}

function ServicePackages({ onSelectPackage }: ServicePackagesProps) {
  const [packages, setPackage] = React.useState<PackageI[]>([]);
  const [selectedPackage, setSelectedPackage] = React.useState<PackageI | null>(
    null
  );

  const onPackageSelection = (selectedPackage: PackageI) => {
    setSelectedPackage(selectedPackage);

    let currentPackages = [...packages];
    let selectedPackageIndex = packages.findIndex(
      (x) => x.id === selectedPackage.id
    );
    currentPackages[selectedPackageIndex].isSelected = true;

    // Deselecting all other packages
    for (let i = 0; i < currentPackages.length; i++) {
      if (i !== selectedPackageIndex) {
        currentPackages[i].isSelected = false;
      }
    }
    setPackage([...currentPackages]);
    onSelectPackage(selectedPackage);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getCompanyInfo()?.id;
        const response = await axios.post(
          "https://staging-api.meattend.com/api/react/list-package"
          // {
          //   params: {
          //     user_id: userId,
          //   },
          // }
        );
        const data = await response.data;
  console.log("data", data);

        const filteredData: PackageI[] = data.packages;
        setPackage(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("selected package", selectedPackage);

  console.log("packages", packages);
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ minHeight: "1000px" }}
    >
      mm
      {/* {packages.map((data) => (
        <ServiceCard
          onCardSelect={() => onPackageSelection({ ...data })}
          data={data}
        />
      ))} */}
    </Grid>
  );
}
export default ServicePackages;
