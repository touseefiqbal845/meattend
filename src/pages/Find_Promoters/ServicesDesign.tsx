
import React from "react";
import { Grid} from "@mui/material";
import "../../assets/css/service-package.css";
import ServiceCard from "./ServicesCard";
import { PackageI } from "../../services/model";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";
import MAuthApiService from "../../services/MAuthApiService";

interface ServicePackagesProps {
    onSelectPackage: (selectedPackage: PackageI) => void;
}

function ServicePackages({ onSelectPackage }: ServicePackagesProps) {
    const [packages, setPackage] = React.useState<PackageI[]>([]);
    const [selectedPackage, setSelectedPackage] = React.useState<PackageI | null>(null);



    const onPackageSelection = (selectedPackage: PackageI) => {
        setSelectedPackage(selectedPackage);

        let currentPackages = [...packages];
        let selectedPackageIndex = packages.findIndex(x => x.id === selectedPackage.id);
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
                const responseGetProfile = await MAuthApiService.getProfile();
                const officialUserId = responseGetProfile.data?.user_subscription?.user_id || null;
                if (officialUserId !== null) {
                    const response = await MUserDashboardPagesApiService.getServicesPackages_AgainstUser(officialUserId);
                    const data = await response.data;
                    const filteredData = data?.packages;
                    setPackage(filteredData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Grid container spacing={2}>
            {packages.slice(0, 3).map((data) => (
                <ServiceCard onCardSelect={() => onPackageSelection({ ...data })} data={data} />
            ))}
        </Grid>
    );
}
export default ServicePackages;