import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  Stack,
  Typography,
  useMediaQuery,
  CircularProgress,
  Chip
} from "@mui/material";
import CustomInput from "../../components/Input/CustomInput";
import MultiSelectCheckbox from "../../components/Input/MutliSelectCheckbox";
import CustomButton from "../../components/button/CustomButton";
import MAuthApiService from "../../services/MAuthApiService";
import { passwordRegix } from "../../services/constant";
import { Option } from "../../services/model";
import MRegisterApiService from "../../services/MRegisterApiService";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import MUserDashboardPagesApiService from "../../services/UserDashboardPagesApiServices";

function CompanyInformation() {
  const mobileView = useMediaQuery("(max-width:600px)");

  const [industry, setIndustry] = useState<Option[]>([]);
  const [category, setCategory] = useState<Option[]>([]);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [industrypayload, setIndustryPayload] = useState([]);
  const [industrySelectedValues, setIndustrySelectedValues] = useState([]);
  const [categorySelectedValues, setCategorySelectedValues] = useState([]);

  const [values, setValues] = useState<{
    companyName: string;
    companyGovernmentNumber: string;
    emailAddress: string;
    industries: Option[];
    categories: Option[];
    directorsName: string;
    directorsEmail: string;
    description: string;
    password: string;
    confirmPassword: string;
    masterPassword: string;
    profilePicture: ArrayBuffer | string | undefined;
  }>({
    companyName: "",
    companyGovernmentNumber: "",
    emailAddress: "",
    industries: [],
    categories: [],
    directorsName: "",
    directorsEmail: "",
    description: "",
    password: "",
    confirmPassword: "",
    masterPassword: "",
    profilePicture: "",
  });
  const [error, setError] = useState<{
    companyName: boolean;
    companyGovernmentNumber: boolean;
    emailAddress: boolean;
    industries: boolean;
    categories: boolean;
    directorsName: boolean;
    directorsEmail: boolean;
    description: boolean;
    password: boolean;
    confirmPassword: boolean;
    masterPassword: boolean;
    profilePicture: boolean;
  }>({
    companyName: false,
    companyGovernmentNumber: false,
    emailAddress: false,
    industries: false,
    categories: false,
    directorsName: false,
    directorsEmail: false,
    description: false,
    password: false,
    confirmPassword: false,
    masterPassword: false,
    profilePicture: false,
  });

  const [loading, setLoading] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  useEffect(() => {
    // get Company Profile
    MRegisterApiService.getCompanyProfile()
      .then((res) => {
        //@ts-ignore
        const parsedIndustries = JSON.parse(res.data.categoryInfo.industries).map((name, index) => ({
          id: index,
          name: name,
        }));
        //@ts-ignore
        const parsedCategories = JSON.parse(res.data.categoryInfo.categories).map((name, index) => ({
          id: index,
          name: name,
        }));
        
        setCompanyId(res.data.id);
        setIndustrySelectedValues(parsedIndustries);
        setCategorySelectedValues(parsedCategories);
        setValues({
          ...values,
          companyName: res.data.company_name,
          companyGovernmentNumber: res.data.company_government_number,
          emailAddress: res.data.email,
          directorsName: res.data.directors_name,
          directorsEmail: res.data.director_email,
          description: res.data.description,
          profilePicture: `https://staging-resources.meattend.com/${res.data.address_proof_image}`,
          
          
        });
        
      })
      .catch((e) => console.log(e));
  }, []);


  useEffect(() => {
    console.log('')
  }, [industrySelectedValues,categorySelectedValues]);
  
    
  useEffect(() => {
    (() => {
      MRegisterApiService.getIndustryList()
        .then((res) => {
          setIndustry(
            res.data.value.map((item) => ({ id: item.id, name: item.name }))
          );
        })
        .catch((e) => console.log(e));
    })();
  }, []);
  useEffect(() => {
    (() => {
      const selectedValues = {
        industry_ids: values.industries.map((item) => item.id),
      };

      MRegisterApiService.getCatergoryList(selectedValues)
        .then((res) => {
          console.log(selectedValues, res);

          setCategory(
            res.data.value.map((item) => ({ id: item.id, name: item.category }))
          );
        })
        .catch((e) => console.log(e));
    })();
  }, [values.industries]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void | Promise<void> => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();

    setError({
      companyName: values.companyName === "" ? true : false,
      companyGovernmentNumber:
        values.companyGovernmentNumber === "" ? true : false,
      emailAddress: values.emailAddress === "" ? true : false,
      industries: values.industries.length == 0 ? true : false,
      categories: values.categories.length == 0 ? true : false,
      directorsName: values.directorsName === "" ? true : false,
      directorsEmail: values.directorsEmail === "" ? true : false,
      description: values.description === "" ? true : false,
      password: values.password === "" ? true : false,
      confirmPassword: values.confirmPassword === "" ? true : false,
      masterPassword: values.masterPassword === "" ? true : false,
      profilePicture: values.profilePicture === "" ? true : false,
    });

    const checkAllFieldsAreTrue = Object.values(error).every((value: any) =>
      typeof value == "object" ? value.length > 0 : value === true
    );

    if (checkAllFieldsAreTrue) return;
    if (!passwordRegix.test(values.password)) {
      return alert(
        "Password must be strong with one upper case, one lower case and one number"
      );
    }
    if (!passwordRegix.test(values.confirmPassword)) {
      return alert(
        "Confirm Password must be strong with one upper case, one lower case and one number"
      );
    }
    if (values.password !== values.confirmPassword) {
      return alert("Password and Confirm Password must be same");
    }
    if (!passwordRegix.test(values.masterPassword)) {
      return alert(
        "Master Password must be strong with one upper case, one lower case and one number"
      );
    }

    setLoading(true);

    const obj = {
      company_name: values.companyName,
      directors_name: values.directorsName,
      company_government_number: values.companyGovernmentNumber,
      email: values.emailAddress,
      password: values.masterPassword,
    };

    const data = values.profilePicture
      ? {
          ...obj,
          profile_image: values.profilePicture,
          id: companyId,
          categories:values?.categories ,
          industries: industrypayload,
        }
      : obj;

    try {
      const res = await MUserDashboardPagesApiService.UpdateComapnyProfie(
        JSON.stringify(data)
      );
      if (res && res.status === 200) {
        setShowBankDetails(true);
      } else {
        setError((prevError) => ({
          ...prevError,
          masterPassword: true,
        }));
      }
    } catch (e) {
      setError((prevError) => ({
        ...prevError,
        masterPassword: true,
      }));
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function handleIndustryChange(selected: any): void | undefined {
    const selectedIndustries = selected.map((option: any) => option.name);
    setError({ ...error, industries: false });
    setValues({ ...values, industries: selected });
    setIndustryPayload(selectedIndustries)
  }

  function handleCategoryChange(selected: any): void | undefined {
    const selectedCategories = selected.map((option:any) => option.name);
    setError({ ...error, categories: false });
    setValues({ ...values, categories: selectedCategories });
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = (e) => {
        //@ts-ignore
        setValues({ ...values, profilePicture: e.target?.result });
        setError({ ...error, profilePicture: false });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  
  return (
    <Container maxWidth={false}>
      <h2>Company Information</h2>

      <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={12} md={6}>
          <Grid container columnSpacing={4}>
            <Grid item md={6} xs={12}>
              <CustomInput
                disabled={false}
                name="companyName"
                type="text"
                error={error.companyName}
                title="Company Name"
                inputFontSize={12}
                placeholder="Company Name"
                img={require("../../assets/icons/building.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.companyName}
                onChange={handleChange}
                helperText="Company Name is required"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                disabled={false}
                name="companyGovernmentNumber"
                type="text"
                error={error.companyGovernmentNumber}
                title="Company government number"
                inputFontSize={12}
                placeholder="Company government number"
                img={require("../../assets/icons/Vector.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.companyGovernmentNumber}
                onChange={handleChange}
                helperText="Company government number is required"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={6} xs={12}>
              <CustomInput
                disabled={false}
                name="emailAddress"
                type="text"
                error={error.emailAddress}
                title="Email Address"
                inputFontSize={12}
                placeholder="Email Address"
                img={require("../../assets/icons/email.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.emailAddress}
                onChange={handleChange}
                helperText="Email Address is required"
              />
            </Grid>
            <Grid item md={6} xs={12} mt={2}>
              <MultiSelectCheckbox
                label="Industry"
                names={industry}
                placeholder="Industry"
                selected={industrySelectedValues}
                onChange={handleIndustryChange}
                helperText="Industry is required"
                error={error.industries}
              />
              <div style={{ marginTop: '20px' }} className="custom-chip">
                {industrySelectedValues.map((name) => (
                    <Chip
                    //@ts-ignore
                        key={name?.id}
                        sx={{
                            backgroundColor: "#FFC000",
                            fontSize: 10,
                            borderRadius: "10px",
                        }}
                    //@ts-ignore

                        label={name?.name}
                        style={{ margin: '4px' }}
                    />
                ))}
            </div>


            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={6} xs={12} mt={2}>
              <MultiSelectCheckbox
                label="Categories"
                names={category}
                placeholder="Categories"
                onChange={handleCategoryChange}
                selected={categorySelectedValues}
                helperText="Categories is required"
                error={error.categories}
              />
               <div style={{ marginTop: '20px' }} className="custom-chip">
                {categorySelectedValues.map((name) => (
                    <Chip
                    //@ts-ignore

                        key={name?.id}
                        sx={{
                            backgroundColor: "#FFC000",
                            fontSize: 10,
                            borderRadius: "10px",
                        }}
                    //@ts-ignore

                        label={name.name}
                        style={{ margin: '4px' }}
                    />
                ))}
            </div>

            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                name="directorsName"
                type="text"
                error={error.directorsName}
                title="Directors Name"
                inputFontSize={12}
                placeholder="Directors Name"
                img={require("../../assets/icons/Event.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.directorsName}
                onChange={handleChange}
                helperText="Directors Name is required"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={12} xs={12}>
              <CustomInput
                name="directorsEmail"
                type="text"
                error={error.directorsEmail}
                title="Directors Email"
                inputFontSize={12}
                placeholder="Directors Email"
                img={require("../../assets/icons/email.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.directorsEmail}
                onChange={handleChange}
                helperText="Directors Email is required"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={12} xs={12}>
              <CustomInput
                name="description"
                type="text"
                error={error.description}
                title="Description"
                inputFontSize={12}
                placeholder="Description"
                style={{
                  height: "200px",
                  alignItems: "flex-start",
                  fontSize: "14px",
                }}
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.description}
                onChange={handleChange}
                helperText="Description is required"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={6} xs={12}>
              <CustomInput
                name="password"
                type="text"
                error={error.password}
                title="Password"
                inputFontSize={12}
                placeholder="Password"
                img={require("../../assets/icons/Lock.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.password}
                onChange={handleChange}
                helperText="Password is required"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                name="confirmPassword"
                type="text"
                error={error.confirmPassword}
                title="Confirm Password"
                inputFontSize={12}
                placeholder="Confirm Password"
                img={require("../../assets/icons/Lock.png")}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                value={values.confirmPassword}
                onChange={handleChange}
                helperText="Confirm Password is required"
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={4} mt={3}>
            <Grid item md={12} xs={12}>
              <Stack direction={"row"} display={"flex"} alignItems={"center"}>
                <Box
                  component={"img"}
                  src={require("../../assets/icons/edit.png")}
                  width={30}
                  height={30}
                />

                <Typography
                  fontWeight={400}
                  color={"text.primary"}
                  mb={1}
                  fontSize={18}
                  mt={2}
                >
                  To edit your bank details (Please enter your master Password)
                </Typography>
              </Stack>
              <CustomInput
                name="masterPassword"
                type="text"
                error={error.masterPassword}
                title="Master Password"
                inputFontSize={12}
                placeholder="Master Password"
                img={""}
                height="1.7vh"
                fontWeight={400}
                fontSize={14}
                showLabel={true}
                helperText="Something Went Wrong!!"
                style={{
                  fontSize: "14px",
                }}
                value={values.masterPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {loading ? (
            <Box display="flex" justifyContent="center" sx={{marginTop:"8px"}}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container marginTop={4} sx={{}}>
              <Grid item md={2.5} xs={12}>
                <CustomButton
                  marginLeft="0px"
                  marginTop="0px"
                  notArrow
                  // mdFullWidtha
                  title={"Sumbit"}
                  // fullWidth
                  xsWidth={"100%"}
                  XFontSize="16"
                  MFontSize="16"
                  //@ts-ignore
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          )}

          {showBankDetails && (
            <>
              <h2>Bank Details</h2>

              <Grid container columnSpacing={4}>
                <Grid item md={6} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="Account number"
                    type="text"
                    error={false}
                    title="Account number"
                    inputFontSize={12}
                    placeholder="Account number"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="Account number is required"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="Sort code"
                    type="text"
                    error={error.companyName}
                    title="Sort code"
                    inputFontSize={12}
                    placeholder="Sort code"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="Sort code is required"
                  />
                </Grid>
              </Grid>
              <Grid container columnSpacing={4}>
                <Grid item md={6} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="Card holder name"
                    type="text"
                    error={error.companyName}
                    title="Card holder name"
                    inputFontSize={12}
                    placeholder="Card holder name"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="Card holder name is required"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="Expiry"
                    type="text"
                    error={error.companyName}
                    title="Expiry"
                    inputFontSize={12}
                    placeholder="Expiry"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="Expiry is required"
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="CVC"
                    type="text"
                    error={error.companyName}
                    title="CVC"
                    inputFontSize={12}
                    placeholder="CVC"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="CVC is required"
                  />
                </Grid>
              </Grid>
              <Grid container columnSpacing={4}>
                <Grid item md={12} xs={12}>
                  <CustomInput
                    // disabled={true}
                    name="Billing Address"
                    type="text"
                    error={error.companyName}
                    title="Billing Address"
                    inputFontSize={12}
                    placeholder="Billing Address"
                    // img={require("../../assets/icons/building.png")}
                    height="1.7vh"
                    fontWeight={400}
                    fontSize={14}
                    showLabel={true}
                    // value={values.companyName}
                    onChange={handleChange}
                    helperText="Billing Address is required"
                  />
                </Grid>
              </Grid>
              <Grid container marginTop={4} marginBottom={5} sx={{}}>
                <Grid item md={2.5} xs={12}>
                  <CustomButton
                    marginTop="0px"
                    notArrow
                    title="Cancel"
                    color="#A0A3B5"
                    borderColor="#A0A3B5"
                    bgColor="white"
                    xsWidth={"100%"}
                    XFontSize="16"
                    MFontSize="16"
                    //@ts-ignore
                    onClick={handleSubmit}
                  />
                </Grid>
                <Grid
                  item
                  md={2.5}
                  xs={12}
                  sx={{ mt: { xs: 1, md: 0 }, ml: { xs: 0, md: 1 } }}
                >
                  <CustomButton
                    marginLeft="0px"
                    marginTop="0px"
                    notArrow
                    // mdFullWidtha
                    title={"Update"}
                    // fullWidth
                    xsWidth={"100%"}
                    XFontSize="16"
                    MFontSize="16"
                    //@ts-ignore
                    onClick={handleSubmit}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        <Grid item display={{ md: "flex", xs: "none" }} xs={0} md={0.5}>
          <Divider
            orientation="vertical"
            sx={{
              my: 2,
              mx: 3,
              borderWidth: 0,
              borderLeft: "1px solid #C7CADA",
              borderColor: "divider",
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction={"column"} display={"flex"} alignItems={"center"}>
            <Typography fontSize={24} fontWeight={600}>
              Upload Profile Picture
            </Typography>
            <Box
              component={"img"}
              alt="Profile picture"
              src={
                values.profilePicture ??
                require("../../assets/icons/profile.png")
              }
              width={250}
              height={250}
              mt={2}
              borderRadius={50}
              border={"5px solid black"}
              mb={2}
              sx={{
                objectFit: "contain",
                textAlign: "center",
                lineHeight: 15,
              }}
            />

            <Input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-button"
              inputProps={{
                accept: "image/*",
              }}
            />
            <label htmlFor="upload-button">
              <Button
                startIcon={
                  <img
                    width={20}
                    height={20}
                    src={require("../../assets/icons/import.png")}
                    alt="Email Icon"
                    className="end-img"
                  />
                }
                title="Upload"
                component="span"
                variant="contained"
                sx={{
                  bgcolor: "upload.main",
                  width: "100px",
                  height: "40px",
                  mt: 3,
                }}
              >
                <Typography textTransform={"capitalize"} color={"#000000"}>
                  Upload
                </Typography>
              </Button>
            </label>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
export default WithLayout(CompanyInformation);
