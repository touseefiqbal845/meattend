import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
  import IconButton from "@mui/material/IconButton";
  import ClearIcon from "@mui/icons-material/Clear";
import CustomInput from "../../../components/Input/CustomInput";
import CustomButton from "../../../components/button/CustomButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import _ from "lodash";
import "./style.css";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { ExistingCompanyData } from "../admin-helpers/TypescriptInterface";

interface UpdateModelProps {
  selectedItemIdProps: number | null;
  open: boolean;
  onClose: () => void;
}

const UpdateModelComponent: React.FC<
  UpdateModelProps & { rows: ExistingCompanyData[] }
> = ({ selectedItemIdProps, open, onClose, rows }) => {
  const [existingcompData, setExistingCompData] = useState<ExistingCompanyData>(
    {
      id: 0,
      company: "",
      email: "",
      phone: "",
      plan: "",
      // earning: "",
      // paying: "",
      // followers: "",
      // rating: "",
      memebersince: "",
      is_active: 0,
      // directorName: "",
    }
  );

  useEffect(() => {
    if (selectedItemIdProps) {
      const selectedRow = rows.find((row) => row.id === selectedItemIdProps);
      if (selectedRow) {
        setExistingCompData({
          id: selectedRow?.id,
          company: selectedRow.company,
          email: selectedRow.email,
          phone: selectedRow.phone,
          plan: selectedRow.plan,
          memebersince: selectedRow.memebersince,
          is_active: selectedRow.is_active,
        });
      }
    }
  }, [selectedItemIdProps, rows]);

  const changeHandler = (field: string, value: string) => {
    setExistingCompData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdateData = (rowData: any) => {
    const selectedRow = rows.find((row) => row.id === selectedItemIdProps);
    if (selectedRow) {
      const data = {
        id: selectedRow.id,
        email: existingcompData.email,
        company_name: existingcompData?.company,
        company_government_number: existingcompData?.phone,
        //@ts-ignore
        directors_name: selectedRow?.directorName,
      };
      AdminAuthApiService.updateExistingCompanyDetails(data);
      onClose();
    }
  };

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
              lg: theme.breakpoints.up("lg") ? "15vw" : "unset",
              md: theme.breakpoints.up("md") ? "12vw" : "unset",
              sm: theme.breakpoints.up("sm") ? "12vw" : "unset",
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
              md: theme.breakpoints.up("md") ? "55%" : "unset",
              xs: theme.breakpoints.up("xs") ? "70%" : "unset",
            }),
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
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
            Edit Existing Companies
          </Typography>
          <hr />
          <Grid container sx={{ marginTop: "3px" }}>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Name"
                inputFontSize={12}
                placeholder="Name"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                value={existingcompData.company}
                onChange={(event) =>
                  changeHandler("company", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Email"
                inputFontSize={12}
                placeholder="Email"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                value={existingcompData.email}
                onChange={(event) => changeHandler("email", event.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Phone number"
                inputFontSize={12}
                placeholder="Phone number"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={existingcompData.phone}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Plan"
                inputFontSize={12}
                placeholder="Plan"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={existingcompData.plan}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Earning"
                inputFontSize={12}
                placeholder="Earning"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={staffData.first_name}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Paying"
                inputFontSize={12}
                placeholder="Paying"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={staffData.first_name}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Followers"
                inputFontSize={12}
                placeholder="Followers"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={staffData.first_name}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomInput
                type="text"
                error={false}
                title="Rating"
                inputFontSize={12}
                placeholder="Rating"
                height="1.7vh"
                fontWeight={200}
                fontSize={12}
                showLabel={true}
                style={{ padding: 1.4 }}
                // value={staffData.first_name}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
          </Grid>

          <Grid container marginTop={2} marginBottom={8} sx={{}}>
            <Grid item md={1} xs={6}>
              <CustomButton
                marginTop="2px"
                notArrow
                title="Cancel"
                color="#A0A3B5"
                borderColor="#A0A3B5"
                bgColor="white"
                XFontSize="16"
                MFontSize="16"
                onClick={onClose}
              />
            </Grid>
            <Grid item md={2} xs={6} sx={{ marginLeft: "20px" }}>
              <CustomButton
                marginLeft="1px"
                marginTop="2px"
                notArrow
                title="Update"
                XFontSize="16"
                MFontSize="16"
                onClick={handleUpdateData}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    </Modal>
  );
};

export default UpdateModelComponent;
