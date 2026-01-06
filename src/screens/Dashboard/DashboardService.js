import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { themeOrange } from "../../utils/colorTheme";
import profile from "../../assets/profile.png";
import exportImg from "../../assets/export.png";
import { FiUpload, FiX } from "react-icons/fi";
import Input from "../../component/common/Input";
import { CgAddR, CgTrash } from "react-icons/cg";
import CustomButton from "../../component/common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { admin_service_add } from "../../services/AdminServiceManage";
import { useNavigate } from "react-router-dom";
import { asyncStatus } from "../../utils/asyncStatus";
import { add_service } from "../../services/DashboardServices";
import { CANADA_SEASONS } from "../../utils/ArrayData";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DashboardService = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]); // Seasons state
  const [data, setData] = useState({
    name: "",
    price: "",
    add_price: "",
    additional_text: "",
    additional_text_2: "",
    image: "",
    mobile_image: "",
    description: "",
    used_for: [],
    seasons: [], // seasons array add kiya
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMobileImage, setSelectedMobileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { service_add_status, service_add_data, service_add_error } =
    useSelector((state) => state.dashaboard_services);

  const loader = service_add_status === asyncStatus.LOADING;

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems((prevItems) => [...prevItems, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Season selection handler
  const handleSeasonChange = (event) => {
    const value = event.target.value;
    setSelectedSeasons(typeof value === 'string' ? value.split(',') : value);
    
    // Data state mein bhi update kar rahe hain
    setData(prevData => ({
      ...prevData,
      seasons: typeof value === 'string' ? value.split(',') : value
    }));
  };

  // Season chip delete karne ke liye
  const handleDeleteSeason = (seasonToDelete) => {
    const updatedSeasons = selectedSeasons.filter(season => season !== seasonToDelete);
    setSelectedSeasons(updatedSeasons);
    setData(prevData => ({
      ...prevData,
      seasons: updatedSeasons
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleFileChangeMobile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedMobileImage(file);
    }
  };

  const handleDeleteClick = () => {
    setSelectedImage(null);
  };

  const handleDeleteClickMobile = () => {
    setSelectedMobileImage(null);
  };

  const handleUploadClickMobile = () => {
    if (!selectedMobileImage) {
      document.getElementById("upload-input-mobile").click();
    }
  };

  const handleUploadClick = () => {
    if (!selectedImage) {
      document.getElementById("upload-input").click();
    }
  };

  const submit = () => {
    const formData = new FormData();

    // Basic fields
    formData.append("name", data?.name);
    formData.append("add_price", data?.add_price);
    formData.append("additional_text", data?.additional_text);
    formData.append("additional_text_2", data?.additional_text_2);
    formData.append("price", data?.price);
    formData.append("description", data?.description);

    // Images
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    if (selectedMobileImage) {
      formData.append("mobile_image", selectedMobileImage);
    }

    // Used for items
    items.forEach((item, index) => {
      formData.append(`used_for[${index}]`, item);
    });

    // Seasons - selected seasons ko FormData mein add kar rahe hain
    selectedSeasons.forEach((season, index) => {
      formData.append(`seasons[${index}]`, season);
    });

    dispatch(add_service(formData));
  };

  useEffect(() => {
    if (service_add_status === asyncStatus.SUCCEEDED) {
      navigate(`/service-main`);
    }
  }, [service_add_status]);

  const previewSrc =
    selectedImage instanceof File ? URL.createObjectURL(selectedImage) : null;
  const previewSrcMobile =
    selectedMobileImage instanceof File
      ? URL.createObjectURL(selectedMobileImage)
      : null;

  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack sx={{ mx: "15px" }}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography className="mainHeading">Services</Typography>
        </Stack>
        <hr color={"#D1D1D1"} />
      </Stack>
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Grid container spacing={2} mt={2}>
          {/* Image Upload Sections */}
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Stack
              bgcolor={"#f2f2f2"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                height: "140px",
                border: "1px solid #ebebeb",
                borderRadius: "10px",
                p: 1.5,
                cursor: "pointer",
                position: "relative",
              }}
              gap={2}
              onClick={handleUploadClick}
            >
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {selectedImage && (
                <>
                  <img
                    src={previewSrc}
                    alt="Uploaded"
                    style={{
                      width: "50%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                  <IconButton
                    onClick={handleDeleteClick}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: themeOrange,
                      zIndex: 1,
                    }}
                  >
                    <FiX />
                  </IconButton>
                </>
              )}
              {!selectedImage && (
                <>
                  <FiUpload size={35} color={themeOrange} />
                  <Typography
                    sx={{
                      color: themeOrange,
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Upload Icon
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Stack
              bgcolor={"#f2f2f2"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                height: "140px",
                border: "1px solid #ebebeb",
                borderRadius: "10px",
                p: 1.5,
                cursor: "pointer",
                position: "relative",
              }}
              gap={2}
              onClick={handleUploadClickMobile}
            >
              <input
                id="upload-input-mobile"
                type="file"
                accept="image/*"
                onChange={handleFileChangeMobile}
                style={{ display: "none" }}
              />
              {selectedMobileImage && (
                <>
                  <img
                    src={previewSrcMobile}
                    alt="Uploaded"
                    style={{
                      width: "50%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                  <IconButton
                    onClick={handleDeleteClickMobile}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: themeOrange,
                      zIndex: 1,
                    }}
                  >
                    <FiX />
                  </IconButton>
                </>
              )}
              {!selectedMobileImage && (
                <>
                  <FiUpload size={35} color={themeOrange} />
                  <Typography
                    sx={{
                      color: themeOrange,
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    Upload Banner and Mobile Image
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>

          {/* Service Name */}
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Input
              id={"name"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: e.target.value })
              }
              style={{ borderRadius: "10px" }}
              placeholder={"Service"}
              label="Service"
            />
          </Grid>

          {/* Season Multiselect Dropdown */}
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <FormControl 
              fullWidth 
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            >
              <InputLabel 
                id="seasons-label"
                sx={{
                  color: '#666',
                  '&.Mui-focused': {
                    color: themeOrange,
                  },
                }}
              >
                Select Seasons
              </InputLabel>
              <Select
                labelId="seasons-label"
                id="seasons-select"
                multiple
                value={selectedSeasons}
                onChange={handleSeasonChange}
                input={<OutlinedInput label="Select Seasons" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const season = CANADA_SEASONS.find(s => s.value === value);
                      return (
                        <Chip 
                          key={value} 
                          label={season?.label || value}
                          size="small"
                          onDelete={() => handleDeleteSeason(value)}
                          deleteIcon={<FiX size={16} />}
                          sx={{
                            backgroundColor: `${themeOrange}20`,
                            color: themeOrange,
                            '& .MuiChip-deleteIcon': {
                              color: themeOrange,
                              '&:hover': {
                                color: '#d32f2f',
                              },
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: themeOrange,
                  },
                }}
              >
                {CANADA_SEASONS.map((season) => (
                  <MenuItem 
                    key={season.value} 
                    value={season.value}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: `${themeOrange}20`,
                        '&:hover': {
                          backgroundColor: `${themeOrange}30`,
                        },
                      },
                    }}
                  >
                    {season.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Fields */}
          <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
            <Input
              id={"price"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: +e.target.value })
              }
              style={{ borderRadius: "6px" }}
              placeholder={"Price"}
              label="Price"
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
            <Input
              id={"add_price"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: +e.target.value })
              }
              style={{ borderRadius: "6px" }}
              placeholder={"Additional Price"}
              label="Additional Price"
            />
          </Grid>

          {/* Additional Text Fields */}
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Input
              id={"additional_text"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: e.target.value })
              }
              style={{ borderRadius: "10px" }}
              placeholder={"Additional Text 1"}
              label="Additional Text 1"
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Input
              id={"additional_text_2"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: e.target.value })
              }
              style={{ borderRadius: "10px" }}
              placeholder={"Additional Text 2"}
              label="Additional Text 2"
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              id={"description"}
              type={"text"}
              onChange={(e) =>
                setData({ ...data, [e.target.id]: e.target.value })
              }
              maxRows={4}
              rows={4}
              multiline={true}
              style={{ borderRadius: "10px" }}
              placeholder={"Description"}
              label="Description"
            />
          </Grid>

          {/* Used For Section */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={2}
                  mb={1}
                >
                  <Input
                    id={"Customers use this service for"}
                    type={"text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ borderRadius: "6px", width: "100%" }}
                    placeholder={"Customers use this service for"}
                    label="Customers use this service for"
                    rest_stack_styles={{ width: "100%" }}
                  />
                  <Stack
                    bgcolor={"white"}
                    p={1}
                    borderRadius={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onClick={handleAddItem}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography>
                      <CgAddR size={30} />
                    </Typography>
                  </Stack>
                </Stack>
                <CustomButton
                  onClick={submit}
                  disable={loader}
                  style={{
                    background:
                      "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                  }}
                >
                  {loader ? (
                    <CircularProgress size={"15px"} sx={{ color: "white" }} />
                  ) : (
                    "ADD"
                  )}
                </CustomButton>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                my={2}
                sx={{ maxHeight: "325px", overflow: "auto" }}
              >
                <Stack mb={2} sx={{ maxHeight: "100%" }}>
                  {items?.map((item, index) => (
                    <Stack
                      key={index}
                      bgcolor={"white"}
                      p={2}
                      borderRadius={2}
                      boxShadow={"0px 4px 10px 0px rgba(0, 0, 0, 0.15);"}
                      my={0.4}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography>{item}</Typography>
                      <IconButton onClick={() => handleDeleteItem(index)}>
                        <CgTrash color="red" size={20} />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default DashboardService;