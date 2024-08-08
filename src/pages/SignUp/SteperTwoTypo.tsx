import React from 'react'
import { Typography } from "@mui/material";


const SteperTwoTypo = () => {
    return (
        <>
            <Typography sx={{
                fontSize: { md: 15, xs: 12 },
                color: "#04CAA5",
                letterSpacing: "0.17em",
                textAlign: "center",
                paddingTop: "20px"
            }} >REGISTRATION</Typography>
            <Typography sx={{
                fontSize: { md: 40, xs: 26 },
                lineHeight: { md: "50.2px", xs: "32.63px" },
            }} fontWeight={400} textAlign="center"  >Company Address</Typography>
            <Typography sx={{
                fontSize: { md: 16, xs: 14 },
                lineHeight: "20px",
                paddingTop: { md: 2, xs: 1 }
            }} fontWeight={400} textAlign="center" color="#84858D">Enter Your Proper details</Typography>

        </>
    )
}

export default SteperTwoTypo;