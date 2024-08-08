import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Grid, IconButton, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { Select, MenuItem, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import TextField from "@mui/material/TextField";
import Switch, { SwitchProps } from "@mui/material/Switch";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectChangeEvent } from "@mui/material/Select";
import "./MUI-ComponentsAndCSS/style.css";
import axios from "axios";
import MultiSelectCheckbox from "../../components/Input/MutliSelectCheckbox";
import DiscountCheckBox from "./MUI-ComponentsAndCSS/DiscountCheckbox";
import SingleCheckBox from "./MUI-ComponentsAndCSS/LocationMultiCheckBox";
import Uploaders from "../../components/Input/Uploader";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import MAuthApiService from "../../services/MAuthApiService";
import {
  DiscountCode,
  Event,
  getLocationAPI,
  Create_Event_Payload,
  Option,
} from "../../services/model";
import MRegisterAuthApiService from "../../services/MRegisterApiService";
import Events from "./Event-Card ";
import "./MUI-ComponentsAndCSS/style.css";
import VideoUploaders from "./MUI-ComponentsAndCSS/VideosUploader";
import { DatePickerCSS } from "../../components/DateTimePickerCSS/DatePickerCSS";
import CustomFilterSelect from "./MUI-ComponentsAndCSS/discountFilter";

const Index = () => {
  //  UseStates
  const [open, setOpen] = React.useState<boolean>(false);
  const [industry, setIndustry] = React.useState<Option[]>([]);
  const [category, setCategory] = React.useState<Option[]>([]);
  const [industrySelectedValues, setIndustrySelectedValues] = React.useState<
    Option[]
  >([]);
  const [categorySelectedValues, setCategorySelectedValues] = React.useState<
    Option[]
  >([]);
  const [discountSelectedValues, setDiscountSelectedValues] = React.useState<
    any[]
  >([]);
  const [eventselelcted, setEventSelected] = useState<any>([]);

  const [activePromotersSelectedValues, setActivePromotersSelectedValues] =
    React.useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<
    getLocationAPI[]
  >([]);
  const [recurrenceType, setRecurrenceType] = useState("daily");
  const [custom_from_date, setCustomFromDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [custom_to_date, setCustomToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datevalue, setDateValue] = React.useState<Dayjs | null>(
    dayjs(" Date and Time")
  );
  const [locations, setLocations] = React.useState<getLocationAPI[]>([]);
  const [discountList, setDiscountList] = React.useState<any[]>([]);
  const [discountCode, setDiscountCode] = React.useState([]);
  const [activePromotion, setActivePromotion] = React.useState([]);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [keyForRerender, setKeyForRerender] = useState<number>(0);
  const [createdid, setCreatedID] = useState<number>(0);
  const [packageid, setPackageID] = useState<number>(0);
  const [statusdid, setStatusID] = useState<number>(0);
  const [companyName, setCompanyName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eventData, setEventData] = useState<any>({
    category: [""],
    event_name: "",
    description: "",
    event_address: "",
    date_time: dayjs().format("YYYY-MM-DD"),
    event_promoters: [null],
    created_by: createdid,
    geo_location: "",
    from_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    held_date_time: dayjs().format("YYYY-MM-DD"),
    lat: 0,
    lon: 0,
    to_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    package_id: packageid,
    image: [],
    contact_mail: "",
    menu_image: [],
    video: [],
    recurring_event: 0,
    recurring_type: 0,
   

    status: statusdid,
    is_private: 0,
    created_status: 0,
    image_access: 1,
    show_company_name: 1,
  });
  const [isCustomSelected, setCustomSelected] = useState(false);

  //  Different Handlers
  const handleOpenModel = () => {
    setEventData({
      category: [""],
      event_name: "",
      description: "",
      event_address: "",
      date_time: "",
      event_promoters: [],
      created_by: createdid,
      geo_location: "",
      from_time: "",
      held_date_time: "",
      lat: 0,
      lon: 0,
      to_time: "",
      package_id: packageid,
      show_company_name: 1,
      image: [],
      contact_mail: "",
      image_access: 1,

    
      
      menu_image: [],
      video: [],
      status: statusdid,

      is_private: 0,
      created_status: 0,
      recurring_event: 0,
      recurring_type: 0,
    });
    setCustomSelected(false);
    setRecurrenceType("daily");
    setIndustrySelectedValues([]);
    setCategorySelectedValues([]);
    setDiscountSelectedValues([]);
    setActivePromotersSelectedValues([]);
    setSelectedLocation([]);
    setLatitude("");
    setLongitude("");
    setOpen(true);
  };

  const changeHandler = (field: string, value: string) => {
    // console.log("Event name is clicked:", field, value);
    setEventData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFromDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD HH:mm:ss");
      setEventData({
        ...eventData,
        from_time: formattedDate,
      });
    } else {
      const defaultTime = dayjs().startOf("day").format("YYYY-MM-DD 2:22:00");
      setEventData({ ...eventData, from_time: defaultTime });
    }
  };
  const handleToDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD HH:mm:ss");
      setEventData({
        ...eventData,
        to_time: formattedDate,
      });
    } else {
      const defaultTime = dayjs()
        .startOf("day")
        .add(12, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      setEventData({ ...eventData, to_time: defaultTime });
    }
  };

  const handleHeldDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD");
      setEventData({
        ...eventData,
        held_date_time: formattedDate,
        date_time: formattedDate,
      });
    } else {
      setEventData({ ...eventData, held_date_time: "", date_time: "" });
    }
  };
  const handleCustomFromChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD");
      setEventData({
        ...eventData,
        custom_from_date: formattedDate,
      });
    } else {
      setEventData({ ...eventData, custom_from_date: "" });
    }
  };
  const handleCustomToChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD");
      setEventData({
        ...eventData,
        custom_to_date: formattedDate,
      });
    } else {
      setEventData({ ...eventData, custom_to_date: "" });
    }
  };

  const handleUpload = (file: Blob, fileType: string, action: string) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e && e.target && e.target.result) {
        const base64String = e.target.result as string;

        if (action === "removeImage") {
          setEventData((prevData:any) => ({
            ...prevData,
            image: prevData.image.filter((img:any) => img !== base64String),
          }));
        } else if (action === "removeMenu") {
          setEventData((prevData:any) => ({
            ...prevData,
            menu_image: prevData.menu_image.filter(
              (img:any) => img !== base64String
            ),
          }));
        } else if (action === "removeVideo") {
          setEventData((prevData:any) => ({
            ...prevData,
            video: prevData.video.filter((vid:any) => vid !== base64String),
          }));
        } else {
          const isImageExist = eventData.image.includes(base64String);
          const isMenuImageExist = eventData.menu_image.includes(base64String);
          const isVideoExist = eventData.video.some(
            (vid:any) => vid === base64String
          );

          const isImageLengthValid =
            eventData.image.filter((img:any) => img !== undefined).length < 5;
          const isMenuImageLengthValid =
            eventData.menu_image.filter((img:any) => img !== undefined).length < 3;
          const isVideoLengthValid =
            eventData.video.filter((vid:any) => vid !== undefined).length < 3;

          let shouldAddToImage = false;
          let shouldAddToMenuImage = false;
          let shouldAddToVideo = false;

          switch (fileType) {
            case "image":
              shouldAddToImage = !isImageExist && isImageLengthValid;

              break;
            case "menu":
              shouldAddToMenuImage =
                !isMenuImageExist && isMenuImageLengthValid;

              break;
            case "video":
              shouldAddToVideo = !isVideoExist && isVideoLengthValid;

              break;
            default:
              break;
          }
          setEventData((prevData:any) => ({
            ...prevData,
            image: shouldAddToImage
              ? [...prevData.image, base64String]
              : prevData.image,
            menu_image: shouldAddToMenuImage
              ? [...prevData.menu_image, base64String]
              : prevData.menu_image,
            video: shouldAddToVideo
              ? [...prevData.video, base64String]
              : prevData.video,
          }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // APIS Calling Need During Intital Mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetProfile = await MAuthApiService.getProfile();
        const CompanyId = responseGetProfile.data?.id;
        setCreatedID(CompanyId);
        const PackageId = responseGetProfile.data?.package_type?.id;
        setPackageID(PackageId);
        const status = responseGetProfile.data?.package_type?.status;
        setStatusID(status);
        const Companyname = responseGetProfile.data?.company_name;
        setCompanyName(Companyname);

        if (responseGetProfile.status === 200) {
          const responseAddEvent = await MAuthApiService.getAddeventApi();

          const access_token = localStorage.getItem("access_token");
          const response = await axios.get(
            `https://staging-api.meattend.com/api/getCompanyLocations?company_id=${CompanyId}&is_active=1`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          console.log("Response from getCompanyLocations:", response.data);
          const data = await response.data.data;
          const filteredData = data.map(
            ({
              id,
              address_1,
              address_2,
              address_3,
              country,
              company_id,
              postal_code,
              district,
            }: {
              id: number;
              address_1: string;
              address_2: string;
              address_3: string;
              country: string;
              district: string;
              postal_code: string;
              company_id: number;
            }) => ({
              id,
              addressOne: [
                address_1,
                address_2,
                address_3,
                postal_code,
                district,
                country,
              ]
                .filter(Boolean)
                .join(", "),
              companyId: company_id,
            })
          );
          setLocations(filteredData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, newEvent]);
  };

  const handleAddEventForm = async () => {
    try {
      setIsSubmitting(true);
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        "https://staging-api.meattend.com/api/save-event",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
      setOpen(false);
      setKeyForRerender((prevKey) => prevKey + 1);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    MRegisterAuthApiService.getDiscountList()
      .then((res) => {
        const response = res.data;
        setDiscountList(
          res.data.data.map((item) => ({
            value: item.id,
            label: item.name,
            discount_code: item.discount_code,
          }))
        );
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let access_token = localStorage.getItem("access_token");
        const response = await axios.get(
          "https://staging-api.meattend.com/api/getActivePromotions",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (
          response.data.promotions &&
          response.data.promotions.data.length > 0
        ) {
          //@ts-ignore
          const combinedNames = response.data.promotions.data.map(
            (promotion: any) => {
              const { id, first_name, last_name } = promotion.users;
              return { id, name: `${first_name} ${last_name}` };
            }
          );

          setActivePromotion(combinedNames);
          setEventData((prevData:any) => ({
            ...prevData,
            event_promoters: activePromotion,
          }));
        } else {
          console.log("No promotions data available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleIndustryChange = (selected: Option[]) => {
    setIndustrySelectedValues(selected);
  };

  const handleCategoryChange = (selected: Option[]) => {
    setCategorySelectedValues(selected);
    const selectedCategories = selected.map((option) => option.name);
    setEventData((prevData:any) => ({
      ...prevData,
      category: selectedCategories,
    }));
  };
  const handleActivePromoters = (selected: any) => {
    setActivePromotersSelectedValues(selected);
    const selectedPromoters = selected.map((option: any) => option?.id);
    setEventData((prevData:any) => ({
      ...prevData,
      event_promoters: selectedPromoters,
    }));
  };

  // const handleDiscountChange = (selected: any[]) => {
  //   console.log("selected", selected);
  //   setDiscountSelectedValues(selected);
  //   const selectedDiscountCode =
  //     selected.length > 0 ? selected[0].discount_code : "";
  //   setEventData((prevData) => ({
  //     ...prevData,
  //     discount_code: selectedDiscountCode,
  //     discount_type: 1,
  //   }));
  // };
  const handleDiscountChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOption = discountList.find(
      (option) => option.value === event.target.value
    );
    const discountCode = selectedOption ? selectedOption.discount_code : "";
    console.log("discountCode", discountCode, selectedOption);
    //@ts-ignore
    setDiscountSelectedValues(event.target.value as string);

    setEventData((prevData:any) => ({
      ...prevData,
      discount_code: discountCode,
      discount_type: 1,
    }));
  };

  const getPostalCodeFromAddressComponents = (addressComponents: any[]) => {
    for (let component of addressComponents) {
      if (component.types.includes("postal_code")) {
        return component.long_name;
      }
    }
    return "";
  };
  const removePostalCode = (address: any) => {
    const parts = address.split(",");
    if (parts.length < 4) {
      console.error("Address format is incorrect");
      return address;
    }

    parts.splice(3, 1);
    return parts.join(",").trim();
  };

  const extractPostalCode = (address: any) => {
    const parts = address.split(",");
    if (parts.length < 4) {
      console.error("Address format is incorrect");
      return "";
    }

    return parts[3].trim();
  };

  const handleLocationSelected = (selected: any) => {
    setSelectedLocation(selected ? [selected] : []);
    const selectedLocations = selected?.addressOne ?? "";

    const postalCode = extractPostalCode(selectedLocations);
    const selectedLocation = removePostalCode(selectedLocations);
    console.log("Selected Location without postal code:", selectedLocation);
    console.log("Extracted Postal Code:", postalCode);
    setEventData((prevData:any) => ({
      ...prevData,
      event_address: selectedLocation,
    }));
    if (selected) {
      const address = selected.addressOne;
      if (address) {
        const apiKey = "AIzaSyAUEQwqCZvOHZZXlhGqEwVTL4vQhZR9Ri8";
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&components=postal_code:${postalCode}&key=${apiKey}`;
        axios
          .get(apiUrl)
          .then((response) => {
            const geocodingData = response.data;
            console.log("latitude-1");

            if (geocodingData.results && geocodingData.results.length > 0) {
              console.log("latitude0");

              const location = geocodingData.results[0].geometry.location;
              const firstResult = geocodingData.results[0];
              console.log("latitude1");

              const postalCode = getPostalCodeFromAddressComponents(
                firstResult.address_components
              );
              console.log("postalCode", postalCode);
              const latitude = location.lat;
              console.log("latitude2", latitude);
              const longitude = location.lng;
              setLatitude(latitude);
              setLongitude(longitude);
              setEventData((prevData:any) => ({
                ...prevData,
                geo_location: `${latitude},${longitude}`,
                lat: latitude,
                lon: longitude,
              }));
            } else {
              console.error("No results found");
            }
          })
          .catch((error) => {
            console.error("Error fetching geocoding data:", error);
          });
      }
    }
  };

  // const handleLocationSelected = (selected: getLocationAPI[]) => {
  //   setSelectedLocation(selected);
  //   const selectedLocations = selected
  //     .map((location) => location?.addressOne)
  //     .join(", ");
  //   setEventData((prevData) => ({
  //     ...prevData,
  //     event_address: selectedLocations,
  //   }));
  //   const selectedLocationObj = selected[0];
  //   const address = selectedLocationObj?.addressOne;
  //   if (address) {
  //     const apiKey = "AIzaSyAUEQwqCZvOHZZXlhGqEwVTL4vQhZR9Ri8";
  //     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${apiKey}`;
  //     axios
  //       .get(apiUrl)
  //       .then((response) => {
  //         const geocodingData = response.data;
  //         if (geocodingData.results && geocodingData.results.length > 0) {
  //           const location = geocodingData.results[0].geometry.location;
  //           const latitude = location.lat;
  //           const longitude = location.lng;
  //           setLatitude(latitude);
  //           setLongitude(longitude);
  //           setEventData((prevData) => ({
  //             ...prevData,
  //             geo_location: `${latitude},${longitude}`,
  //             lat: latitude,
  //             lon: longitude,
  //           }));
  //         } else {
  //           console.error("No results found");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching geocoding data:", error);
  //       });
  //   }
  // };

  useEffect(() => {
    const fetchGeocodingData = async () => {
      try {
        const selectedLocationObj = selectedLocation[0];
        const address = selectedLocationObj?.addressOne;

        if (address) {
          const apiKey = "AIzaSyAUEQwqCZvOHZZXlhGqEwVTL4vQhZR9Ri8";
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`;
          const response = await axios.get(apiUrl);
          const geocodingData = response.data;
          if (geocodingData.results && geocodingData.results.length > 0) {
            const location = geocodingData.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            setLatitude(latitude);
            setLongitude(longitude);
            setEventData((prevData:any) => ({
              ...prevData,
              geo_location: `${latitude},${longitude}`,
              lat: latitude,
              lon: longitude,
            }));
          } else {
            console.error("No results found");
          }
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    };

    if (selectedLocation.length > 0) {
      fetchGeocodingData();
    }
  }, [selectedLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://staging-api.meattend.com/api/react/industry-list"
        );
        const data = await response.json();
        const filteredData: Option[] = data.value.map(
          ({ id, name }: { id: number; name: string }) => ({ id, name })
        );
        setIndustry(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [1]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://staging-api.meattend.com/api/react/category-list",
          {
            params: {
              industry_ids: industrySelectedValues.map(
                ({ id }: { id: number }) => id
              ),
            },
          }
        );
        const data = await response.data;
        const filteredData: Option[] = data.value.map(
          ({
            id,
            category,
            industry_id,
          }: {
            id: number;
            category: string;
            industry_id: number;
          }) => ({ id, name: category, industry: industry_id })
        );
        setCategory(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [industrySelectedValues]);

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
    updateGeoLocation(event.target.value, longitude);
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(event.target.value);
    updateGeoLocation(latitude, event.target.value);
  };

  const updateGeoLocation = (lat: string, lon: string) => {
    const geoLocation = `${lat},${lon}`;
    setEventData((prevEvent:any) => ({
      ...prevEvent,
      geo_location: geoLocation,
    }));
  };

  const handleSwitchChange = () => {
    const newValue = !isCustomSelected;
    setCustomSelected(newValue);
    setEventData((prevEventData:any) => ({
      ...prevEventData,
      recurring_event: newValue ? 1 : 0,
      recurring_type: newValue ? 1 : 0,
    }));
  };

  const handleRecurrenceTypeChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const selectedType = event.target.value;
    console.log("selectedType", selectedType);
    setRecurrenceType(selectedType);
    if (selectedType === "daily") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 1,
      });
    }
    if (selectedType === "weekly") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 2,
      });
    }
    if (selectedType === "fortnightly") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 3,
      });
    }
    if (selectedType === "monthly") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 4,
      });
    }
    if (selectedType === "yearly") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 5,
      });
    }
    if (selectedType === "custom") {
      setEventData({
        ...eventData,
        recurring_event: 1,
        recurring_type: 6,
      });
    }
  };

  useEffect(() => {
    console.log("Updated eventData:", eventData);
  }, [eventData, open]);
  // const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Events
        handleOpenModel={handleOpenModel}
        keyForRerender={keyForRerender}
      />

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <React.Fragment>
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
            onClick={handleClose}
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
              Create New Event
            </Typography>

            <Typography
              id="modal-modal-description"
              variant="body1"
              component="p"
              sx={{
                color: "gray",
                fontSize: 12,
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              Enter your event details
            </Typography>
            <hr />

            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={6} xs={12}>
                <CustomInput
                  name="Event Name"
                  type="text"
                  error={false}
                  title="Event Name"
                  inputFontSize={12}
                  placeholder="Event Name"
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  value={eventData.event_name}
                  onChange={(event) =>
                    changeHandler("event_name", event.target.value)
                  }
                  helperText="Event Name is required"
                  img={require("../../assets/icons/Event.png")}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <CustomInput
                  name="Event Contact mail"
                  type="text"
                  error={false}
                  title="Event Contact mail"
                  inputFontSize={12}
                  placeholder="Event Contact mail"
                  img={require("../../assets/icons/email.png")}
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  value={eventData.contact_mail}
                  onChange={(event) =>
                    changeHandler("contact_mail", event.target.value)
                  }
                  helperText="Email Address is required"
                />
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <text className="Typeography-title-input">Event Held Date</text>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={
                        eventData.held_date_time
                          ? dayjs(eventData.held_date_time)
                          : null
                      }
                      onChange={handleHeldDateChange}
                      label=""
                      slotProps={{
                        inputAdornment: {
                          position: 'start',
                        },
                      }}
                      sx={DatePickerCSS}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <SingleCheckBox
                  label="Location"
                  names={locations}
                  placeholder="Location"
                  selected={selectedLocation[0] ?? null}
                  onChange={handleLocationSelected}
                  helperText="Location is required"
                  // error={error.industry}
                />
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={6} xs={12}>
                <MultiSelectCheckbox
                  label="Industry"
                  names={industry}
                  placeholder="Industry"
                  selected={industrySelectedValues}
                  onChange={handleIndustryChange}
                  helperText="Industry is required"
                  // error={error.industry}
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{}}>
                <MultiSelectCheckbox
                  label="Categories"
                  names={category}
                  placeholder="Categories"
                  onChange={handleCategoryChange}
                  selected={categorySelectedValues}
                  helperText="Categories is required"
                  // error={error.categories}
                />
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={6} xs={12}>
                <CustomInput
                  disabled={true}
                  name="Geo-Location latitude"
                  type="text"
                  error={false}
                  title="Geo-Location latitude"
                  inputFontSize={12}
                  placeholder="Geo-Location latitude"
                  img={require("../../assets/icons/Location_A.png")}
                  height="1.7vh"
                  fontWeight={400}
                  fontSize={14}
                  showLabel={true}
                  value={latitude}
                  onChange={handleLatitudeChange}
                  helperText="Geo-Location latitude is required"
                />
              </Grid>
             
            <Grid item md={6} xs={12}>
              <CustomInput
                disabled={true}
                name="Geo-Location longitude"
                type="text"
                error={false}
                title="Geo-Location longitude"
                inputFontSize={12}
                placeholder="Geo-Location longitude"
                img={require("../../assets/icons/Location_A.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={longitude}
                onChange={handleLongitudeChange}
                helperText="Geo-Location longitude is required"
              />
            </Grid>
            </Grid>
        
            <Grid container columnSpacing={4} mt={3}>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <text className="Typeography-title-input">
                      Start Date and Time
                    </text>
                  </Grid>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label=""
                      slotProps={{
                        inputAdornment: {
                          position: 'start',
                        },
                      }}
                      value={
                        eventData.from_time ? dayjs(eventData.from_time) : null
                      }
                      onChange={handleFromDateChange}
                      sx={DatePickerCSS}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <text className="Typeography-title-input">
                      End Date and Time
                    </text>
                  </Grid>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label=""
                      slotProps={{
                        inputAdornment: {
                          position: 'start',
                        },
                      }}
                      value={
                        eventData.to_time ? dayjs(eventData.to_time) : null
                      }
                      onChange={handleToDateChange}
                      sx={DatePickerCSS}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container mt={3}>
              <Grid item md={6} xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <text className="Typeography-title-input">
                    Recurring Event
                  </text>
                  <Switch
                    checked={isCustomSelected}
                    onChange={handleSwitchChange}
                    inputProps={{ "aria-label": "ant design" }}
                    className="customSwitch"
                    sx={{
                      marginLeft: "0px !important",
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                width: "100%",
                borderRadius: "14px",
                "& .MuiInputLabel-root": {
                  // fontSize: "13px",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FFC000" },
                "& .MuiOutlinedInput-root": {
                  "&:hover > fieldset": { borderColor: "#FFC000" },
                  height: "50px",
                  borderRadius: "14px",
                },
              }}
            >
              {isCustomSelected && (
                <Grid item container md={12} xs={12} spacing={1}>
                  <Grid item md={6} xs={12} marginTop={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="recurrence-type-label"
                        id="recurrence-type"
                        value={recurrenceType}
                        onChange={handleRecurrenceTypeChange}
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="fortnightly">Fortnightly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>

                        <MenuItem value="custom">Custom</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={3} xs={12}>
                    {recurrenceType === "custom" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <text className="Typeography-title-input">Start Date</text> */}

                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            value={
                              eventData.custom_from_date
                                ? dayjs(eventData.custom_from_date)
                                : null
                            }
                            slotProps={{
                              inputAdornment: {
                                position: 'start',
                              },
                            }}
                            
                            onChange={handleCustomFromChange}
                            sx={DatePickerCSS}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  </Grid>

                  <Grid item md={3} xs={12} >
                    {recurrenceType === "custom" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <text className="Typeography-title-input">End Date</text> */}

                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            value={
                              eventData.custom_to_date
                                ? dayjs(eventData.custom_to_date)
                                : null
                            }
                            onChange={handleCustomToChange}
                            slotProps={{
                              inputAdornment: {
                                position: 'start',
                              },
                            }}
                            sx={DatePickerCSS}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid container columnSpacing={4} mt={3}>
              <Grid item xs={12} md={6}>
                <CustomFilterSelect
                  //@ts-ignore
                  label="Enter Discount Code"
                  options={discountList}
                  //@ts-ignore
                  value={discountSelectedValues}
                  onChange={handleDiscountChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MultiSelectCheckbox
                  label="Send Event to Pomoters"
                  names={activePromotion}
                  //@ts-ignore
                  onChange={handleActivePromoters}
                  selected={activePromotersSelectedValues}
                />
              </Grid>
            </Grid>
            <Grid container mt={3}>
              <Grid item md={6} xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <text className="Typeography-title-input">
                    Allow people to tag his post
                  </text>
                  <Switch
                    inputProps={{ "aria-label": "ant design" }}
                    className="customSwitch"
                    sx={{
                      marginLeft: "0px !important",
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid item md={12} xs={12} mt={3}>
              <Box style={{ width: "100%" }}>
                <Typography
                  fontWeight={400}
                  color={"#262A45"}
                  mb={1}
                  fontSize={14}
                >
                  Description
                </Typography>
                <TextField
                  label="Description"
                  multiline
                  rows={7}
                  variant="outlined"
                  value={eventData.description}
                  onChange={(event) =>
                    changeHandler("description", event.target.value)
                  }
                  style={{
                    width: "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "13px", color: "#BCBCBD" },
                  }}
                  InputProps={{
                    style: { fontSize: "13px" },
                  }}
                />
              </Box>
            </Grid>

            <div>
              <Uploaders
                handleFileUpload={(file, fileType, action) =>
                  handleUpload(file, fileType, action)
                }
                fileType="image"
              />
              <VideoUploaders
                handleFileUpload={(file, fileType, action) =>
                  handleUpload(file, fileType, action)
                }
              />
            </div>

            <Grid container sx={{ marginTop: 3 }}>
              <p>
                Upgrade to <span className="pro-text">PRO</span> to add up to 10
                photos
              </p>
              <Grid item md={2} xs={6}>
                <CustomButton
                  marginLeft="8px"
                  marginTop="8px"
                  notArrow
                  title={"Upgrade"}
                  XFontSize="16"
                  MFontSize="16"
                  // onClick={handleUpgrade}
                />
              </Grid>
            </Grid>

            <Grid container marginTop={3} marginBottom={30} sx={{}}>
              <Grid item md={2} xs={12}>
                <CustomButton
                  marginTop="0 px"
                  notArrow
                  title="Cancel"
                  color="#A0A3B5"
                  borderColor="#A0A3B5"
                  bgColor="white"
                  xsWidth={"100%"}
                  XFontSize="16"
                  MFontSize="16"
                  onClick={() => setOpen(false)}
                />
              </Grid>
              <Grid item md={2} xs={12} sx={{ mt: { xs: 1, md: 0 } }}>
                <CustomButton
                  marginLeft="0px"
                  marginTop="0px"
                  notArrow
                  // mdFullWidtha
                  title={"Add"}
                  // fullWidth
                  xsWidth={"100%"}
                  XFontSize="16"
                  MFontSize="16"
                  onClick={handleAddEventForm}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default WithLayout(Index);
