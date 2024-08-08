import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import MultiSelectCheckbox from "../../../components/Input/TextFieldwithMultiCheckbox";
import { WithLayout_AdminDashboard } from "../../../components/Wrapper/WithLayout_Admin-Dashboard";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { LiveStreamingEvents } from "../admin-helpers/TypescriptInterface";


function Index() {

  const [activeEvents, setActiveEvents] = React.useState<LiveStreamingEvents[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminAuthApiService.AdminDashboard_LiveStreaming_event_list(358);
        const EventsData_Against_EachCompanies = response.data?.events || [];
        const EventsData = EventsData_Against_EachCompanies.map((event: any) => ({
          id: event?.id || null,
          name: event?.event_name || '',
          event_images: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

        }));
        setActiveEvents(EventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <React.Fragment >
        <Grid container style={{ height: '100vh' }} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={8} xl={8} style={{ backgroundColor: "white" }}>
            <h1>Select an Event and Click live Stream</h1>
            <MultiSelectCheckbox
              label=""
              placeholder="select your event"
              names={activeEvents}
            //@ts-ignore
            // onChange={handleIndustryChange}
            // selected={industrySelectedValues}
            />
          </Grid>
        </Grid>

      </React.Fragment>
    </>
  );
}

export default WithLayout_AdminDashboard(Index);

