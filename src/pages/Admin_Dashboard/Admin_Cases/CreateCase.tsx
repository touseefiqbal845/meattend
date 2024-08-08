import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CustomInput from "../../../components/Input/CustomInput";
import CustomButton from "../../../components/button/CustomButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./style.css";
import AdminAuthApiService from "../admin-helpers/Admin-MAuthApiService";
import { ExistingCompanyData } from "../admin-helpers/TypescriptInterface";
import CustomFilterSelect from "../../../components/Custom-Filter-Input-Field/CustomFilterwithHeading";
import ImageUploader from "./ImagesUploader";

interface CreateCaseProps {
    open: boolean;
    onClose: () => void;
  }
  
  const CreateCase: React.FC<CreateCaseProps> = ({ open, onClose }) => {
  const [cityselected, setCitySelected] = useState<string>("");
  const [existingcompData, setExistingCompData] = useState<any>({
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
  });

  const changeHandler = (field: string, value: string) => {
    setExistingCompData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpload = (file: Blob, fileType: string, action: string) => {
    const reader = new FileReader();

    // reader.onload = function (e) {
    //   if (e && e.target && e.target.result) {
    //     const base64String = e.target.result as string;

    //     if (action === "removeImage") {
    //       setEventData((prevData) => ({
    //         ...prevData,
    //         image: prevData.image.filter((img) => img !== base64String),
    //       }));
    //     } else {
    //       const isImageExist = eventData.image.includes(base64String);

    //       const isImageLengthValid =
    //         eventData.image.filter((img) => img !== undefined).length < 5;

    //       let shouldAddToImage = false;

    //       switch (fileType) {
    //         case "image":
    //           shouldAddToImage = !isImageExist && isImageLengthValid;

    //           break;

    //         default:
    //           break;
    //       }
    //       setEventData((prevData) => ({
    //         ...prevData,
    //         image: shouldAddToImage
    //           ? [...prevData.image, base64String]
    //           : prevData.image,
    //       }));
    //     }
    //   }
    // };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onClose();
  };
  const cityOptions = [
    {
      value: "234",
      label: "API Don't",
    },
  ];
  const handleCityChange = (event: any) => {
    setCitySelected(event.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleRemoveImage}
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
            Create Case
          </Typography>
          <hr />
          <Grid container sx={{ marginTop: "0px" }}>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomInput
                name="Subject"
                type="text"
                error={false}
                title="Subject"
                inputFontSize={12}
                placeholder="Subject"
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={existingcompData.company}
                onChange={(event) =>
                  changeHandler("company", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomFilterSelect
                label="Selelct a Company"
                options={cityOptions}
                value={cityselected}
                onChange={handleCityChange}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomFilterSelect
                label="Select Event"
                options={cityOptions}
                value={cityselected}
                onChange={handleCityChange}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomFilterSelect
                label="Select User"
                options={cityOptions}
                value={cityselected}
                onChange={handleCityChange}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingRight: { md: 2 } }}>
              <CustomFilterSelect
                label="Select Subject"
                options={cityOptions}
                value={cityselected}
                onChange={handleCityChange}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ paddingLeft: { md: 2 } }}>
              <CustomInput
                name="ID Reference"
                type="text"
                error={false}
                title="ID Reference"
                inputFontSize={12}
                placeholder="ID Reference"
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                // value={staffData.first_name}
                // onChange={(event) =>
                //   changeHandler("first_name", event.target.value)
                // }
              />
            </Grid>
            <Grid item md={12} xs={12} marginTop={3}>
              <TextField
                title="Description"
                label="Description"
                multiline
                rows={7}
                variant="outlined"
                //   value={eventData.description}
                //   onChange={(event) =>
                //     changeHandler("description", event.target.value)
                //   }
                style={{
                  // height: "170px",
                  // padding: " 1.5 ",
                  width: "100%",
                  // margin: "3",
                }}
              />
            </Grid>
            <ImageUploader
              handleFileUpload={(file, fileType, action) =>
                handleUpload(file, fileType, action)
              }
              fileType="image"
            />
          </Grid>

          <Grid container spacing={0} justifyContent="center">
            <Grid
              item
              xs={11}
              sx={{ mt: 2.5, alignItems: "center", justifyContent: "center" }}
            >
              <CustomButton
                marginTop="0px"
                notArrow
                title="Create"
                XFontSize="16px"
                MFontSize="16px"
                xsHeight="52px"
                mdHeight="52px"
                mdFullWidth
                xsWidth="100%"
                marginBottom="170px"
                // onClick={onClose}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    </Modal>
  );
};

export default CreateCase;
