import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import MAuthApiService from "../../services/MAuthApiService";

const redirect = (path:any) => {
  window.location.href = path;
};

const VerifyAccountPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const verify = queryParams.get("verify");
        console.log(verify);
        const responseGetProfile = await MAuthApiService.verifyAccount(verify!);
        if (responseGetProfile.status === 200) {
          redirect("/login"); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [location.search]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress style={{ color: "#FFC000" }} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>Wait, we are verifying the code...</p>
    </div>
  );
};

export default VerifyAccountPage;
