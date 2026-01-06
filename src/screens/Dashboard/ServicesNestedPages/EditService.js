import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  edit_service,
  get_service_by_id,
} from "../../../services/DashboardServices";
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
import { CgAddR, CgTrash } from "react-icons/cg";
import CustomButton from "../../../component/common/Button/Button";
import { themeOrange } from "../../../utils/colorTheme";
import { FiUpload, FiX } from "react-icons/fi";
import Input from "../../../component/common/Input";
import { img_url } from "../../../utils/helper/urls";
import { asyncStatus } from "../../../utils/asyncStatus";
import { CANADA_SEASONS } from "../../../utils/ArrayData";


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

const EditService = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]); // Seasons state add kiya
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
    seasons: [], // seasons field add kiya
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMobileImage, setSelectedMobileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _clearDataState = () => {
    setData({
      name: "",
      price: "",
      add_price: "",
      additional_text: "",
      additional_text_2: "",
      image: "",
      mobile_image: "",
      description: "",
      used_for: [],
      seasons: [],
    });
    setItems([]);
    setSelectedSeasons([]); // seasons clear kar rahe hain
  };

  const {
    get_service_by_id_data,
    edit_service_status,
    get_service_by_id_status,
  } = useSelector((state) => state.dashaboard_services);

  const loader = edit_service_status === asyncStatus.LOADING;

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
    const seasonsArray = typeof value === 'string' ? value.split(',') : value;
    
    setSelectedSeasons(seasonsArray);
    
    // Data state mein bhi update kar rahe hain
    setData(prevData => ({
      ...prevData,
      seasons: seasonsArray
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

    // Adding other data to formData
    formData.append("name", data?.name);
    formData.append("price", +data?.price);
    formData.append("description", data?.description);
    formData.append("add_price", +data?.add_price);
    formData.append("additional_text", data?.additional_text);
    formData.append("additional_text_2", data?.additional_text_2);

    // Adding used_for items to formData
    items.length > 0
      ? items.forEach((item, index) => {
          formData.append(`used_for[${index}]`, item);
        })
      : get_service_by_id_data?.service?.used_for?.forEach((item, index) => {
          formData.append(`used_for[${index}]`, item);
        });

    // Seasons - selected seasons ko FormData mein array format mein add kar rahe hain
    if (selectedSeasons.length > 0) {
      selectedSeasons.forEach((season, index) => {
        formData.append(`seasons[${index}]`, season);
      });
    } else if (get_service_by_id_data?.service?.seasons?.length > 0) {
      // Agar koi naye seasons select nahi kiye to existing seasons use kar rahe hain
      get_service_by_id_data.service.seasons.forEach((season, index) => {
        formData.append(`seasons[${index}]`, season);
      });
    }

    // Adding the image to formData
    if (selectedImage || get_service_by_id_data.service?.image) {
      formData.append(
        "image",
        selectedImage || `${img_url}${get_service_by_id_data.service?.image}`
      );
    }
    if (selectedMobileImage || get_service_by_id_data.service?.mobile_image) {
      formData.append(
        "mobile_image",
        selectedMobileImage ||
          `${img_url}${get_service_by_id_data.service?.mobile_image}`
      );
    }

    dispatch(edit_service({ edited_data: formData, id: id }));
  };

  useEffect(() => {
    if (Object.keys(get_service_by_id_data || {})?.length > 0) {
      const serviceData = get_service_by_id_data?.service;
      
      setData(serviceData);
      const existingImageUrl = `${img_url}${serviceData?.image}`;
      const existingImageUrlMobile = `${img_url}${serviceData?.mobile_image}`;
      setSelectedImage(existingImageUrl);
      setSelectedMobileImage(existingImageUrlMobile);
      setItems(serviceData?.used_for || []);
      
      console.log(serviceData ,"serviceData")
      // Seasons populate kar rahe hain
      if (serviceData?.seasons && Array.isArray(serviceData.seasons)) {
        setSelectedSeasons(serviceData.seasons);
      }
    }
  }, [get_service_by_id_data]);

  console.log(selectedSeasons ,"selectedSeasons")

  useEffect(() => {
    if (edit_service_status === asyncStatus.SUCCEEDED) {
      _clearDataState();
      navigate(`/service-main`);
    }
  }, [edit_service_status]);

  useEffect(() => {
    if (id) {
      dispatch(get_service_by_id(id));
    }
  }, [id]);

  const previewSrc =
    selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : selectedImage;
  const previewSrcMobile =
    selectedMobileImage instanceof File
      ? URL.createObjectURL(selectedMobileImage)
      : selectedMobileImage;

  if (get_service_by_id_status !== asyncStatus.SUCCEEDED) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "40vh" }}
      >
        <CircularProgress size={"30px"} sx={{ color: themeOrange }} />
      </Stack>
    );
  } else {
    return (
      <Stack bgcolor={"#FAFAFA"}>
        <Stack sx={{ mx: "15px" }}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography className="mainHeading">Update Service</Typography>
          </Stack>
          <hr color={"#D1D1D1"} />
        </Stack>
        <Container
          sx={{
            maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" },
          }}
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
                      alt="Preview"
                      style={{
                        width: "50%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick();
                      }}
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
                      alt="Preview-mobile"
                      style={{
                        width: "50%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClickMobile();
                      }}
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
                style={{ borderRadius: "6px" }}
                placeholder={"Service"}
                label="Service"
                value={data?.name}
                defaultValue={get_service_by_id_data?.service?.name}
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
                            onDelete={(e) => {
                              e.stopPropagation();
                              handleDeleteSeason(value);
                            }}
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
                style={{ borderRadius: "10px" }}
                placeholder={"Price"}
                label="Price"
                value={data?.price}
                defaultValue={get_service_by_id_data?.service?.price}
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
                value={data?.add_price}
                defaultValue={get_service_by_id_data?.service?.add_price}
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
                value={data?.additional_text}
                defaultValue={get_service_by_id_data?.service?.additional_text}
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
                value={data?.additional_text_2}
                defaultValue={
                  get_service_by_id_data?.service?.additional_text_2
                }
              />
            </Grid>

            {/* Description */}
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Input
                id={"description"}
                type={"text"}
                onChange={(e) =>
                  setData({ ...data, [e.target.id]: e.target.value })
                }
                maxRows={8}
                rows={8}
                multiline={true}
                style={{ borderRadius: "6px" }}
                placeholder={"Description"}
                value={data?.description}
                defaultValue={get_service_by_id_data?.service?.description}
              />
            </Grid>

            {/* Used For Section */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} my={2}>
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} my={2}>
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
                      <CgAddR size={30} />
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
                      "Update Service"
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
  }
};

export default EditService;