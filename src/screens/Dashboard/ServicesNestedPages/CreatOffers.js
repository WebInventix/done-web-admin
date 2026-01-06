import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { themeBlue, themeOrange } from "../../../utils/colorTheme";
import CustomButton from "../../../component/common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../component/common/Input";
import { LuPlusSquare } from "react-icons/lu";
import dot from "../../../assets/dot.png";
import logo_2 from "../../../assets/logo_2.png";
import add from "../../../assets/add.png";
import { RxCross2 } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";

import {
  creat_service_offer,
  add_additional_service_offer,
  get_addons_list,
  get_offers_list,
  delete_addons_list,
  delete_offers_by_id,
} from "../../../services/DashboardServices";
import { asyncStatus } from "../../../utils/asyncStatus";
import CustomModal from "../../../component/common/CustomModal/CustomModal";
import { LuTrash2 } from "react-icons/lu";

const CreatOffers = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    discounted_price: "",
    start_date: "",
    end_date: "",
  });
  const [beforPreview, setBeforPreview] = useState({});
  const [preview, setPreview] = useState(null);
  const [addOnesData, setAddOnesData] = useState({ name: "", price: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    creat_service_offer_status,
    get_offers_list_by_id_status,
    get_addons_list_by_id,
    get_addons_list_by_id_status,
    get_offers_list_by_id,
    delete_addons_by_id_status,
    delete_offer_by_id_status,
    additional_service_offer_status,
  } = useSelector((state) => state.dashaboard_services);

  const offersLoader = get_offers_list_by_id_status === asyncStatus.LOADING;
  const addonsLoader = get_addons_list_by_id_status === asyncStatus.LOADING;
  const creataofferLoader = creat_service_offer_status === asyncStatus.LOADING;


  const _isStartDateBeforeEndDate = () => {
    return new Date(data.start_date) < new Date(data.end_date);
  };

  const _submitData = () => {
    if (!_isStartDateBeforeEndDate()) {
      alert("Start date must be before the end date.");
      return;
    }
    let obj = {
      ...data,
      service_id: id,
    };

    dispatch(creat_service_offer(obj));
    setBeforPreview({
      ...obj,
      additional_service: addOnesData.name,
      additional_price: addOnesData.price,
    });
    setData({
      name: "",
      description: "",
      discounted_price: "",
      start_date: "",
      end_date: "",
    });
  };

  const _submitPreviewData = () => {
    setPreview({
      ...beforPreview,
      actual_price: location.state.actual_price,
    });
  };

  const priceDateArr = [
    {
      id: "actual_price",
      type: "number",
      onchange: (e) => {},
      value: location.state.actual_price,
      placeholder: "Actual Price",
      label: "Actual Price",
      disabled: true,
    },
    {
      id: "discounted_price",
      type: "number",
      onchange: (e) => setData({ ...data, [e.target.id]: e.target.value }),
      value: data.discounted_price,
      placeholder: "Discounted Price",
      label: "Discounted Price",
    },
    {
      id: "start_date",
      type: "date",
      onchange: (e) => setData({ ...data, [e.target.id]: e.target.value }),
      value: data.start_date,
      placeholder: "Start Date",
      label: "",
      pattern: "d{4}-d{2}-d{2}",
    },
    {
      id: "end_date",
      type: "date",
      onchange: (e) => setData({ ...data, [e.target.id]: e.target.value }),
      value: data.end_date,
      placeholder: "End Date",
      label: "",
      pattern: "d{4}-d{2}-d{2}",
    },
  ];

  const _areRequiredFieldsFilled = () => {
    // Check if all required fields are filled
    return (
      data.name &&
      data.description &&
      data.discounted_price &&
      data.start_date &&
      data.end_date
    );
  };
  const _arePreviewRequiredFieldsFilled = () => {
    // Check if all required fields are filled
    return (
      beforPreview.name &&
      beforPreview.description &&
      beforPreview.discounted_price &&
      beforPreview.start_date &&
      beforPreview.end_date &&
      beforPreview.additional_service &&
      beforPreview.additional_price
    );
  };

  useEffect(() => {
    if (creat_service_offer_status === asyncStatus.SUCCEEDED) {
      // navigate("/service-main");
      setIsOpenModal(false);
    }
  }, [creat_service_offer_status]);

  useEffect(() => {
    if (
      delete_addons_by_id_status === asyncStatus.SUCCEEDED ||
      additional_service_offer_status === asyncStatus.SUCCEEDED
    ) {
      dispatch(get_addons_list(id));
    }
  }, [delete_addons_by_id_status, additional_service_offer_status]);

  useEffect(() => {
    if (
      delete_offer_by_id_status === asyncStatus.SUCCEEDED ||
      creat_service_offer_status === asyncStatus.SUCCEEDED
    ) {
      dispatch(get_addons_list(id));
      dispatch(get_offers_list(id));
    }
  }, [delete_offer_by_id_status, creat_service_offer_status]);

  useEffect(() => {
    dispatch(get_addons_list(id));
    dispatch(get_offers_list(id));
  }, []);

  const _handleAddOnesData = () => {
    dispatch(add_additional_service_offer({ ...addOnesData, service_id: id }));
    setAddOnesData({ name: "", price: "" });
  };

  const _handleOfferEdit = () => {
    setIsOpenModal(!isOpenModal);
  };
  const _handleAddonsEdit = () => {
    // setIsOpenModal(!isOpenModal);
  };

  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
        my={1}
      >
        <Typography className="mainHeading">Create Offers</Typography>
        <Stack
          className="globleGradientBlue"
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          <CustomButton
            style={{
              backgroundColor: "transparent",
              paddingTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
            onClick={() => setIsOpenModal(true)}
          >
            <img
              src={add}
              style={{ height: "20px", width: "20px", color: "white" }}
            />
            <Typography
              sx={{ color: "white", whiteSpace: "nowrap", fontWeight: "20px" }}
            >
              {" "}
              Create offer
            </Typography>
          </CustomButton>
          {/* <!--------- Depart Custom Modal ---------!>  */}
          <CustomModal
            isOpen={isOpenModal}
            setIsOpen={() => setIsOpenModal(false)}
          >
            <Stack
              alignItems={"center"}
              sx={{
                position: "relative",
                backgroundColor: "white",
                py: 5,
                borderRadius: "30px",
                overflow: "hidden",
                width: {
                  xl: "600px",
                  lg: "600px",
                  md: "600px",
                  sm: "600px",
                  xs: "250px",
                },
                maxHeight: "600px",
              }}
              gap={3}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                }}
                onClick={() => setIsOpenModal(false)}
              >
                <RxCross2 style={{ fontSize: "20px", color: themeOrange }} />
              </Box>

              <Stack sx={{ width: "100%", overflow: "auto" }}>
                <Stack
                  alignItems={"center"}
                  sx={{
                    width: "80%",
                    backgroundColor: themeOrange,
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    px: 1,
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography className="mainHeading" sx={{ color: "white" }}>
                    Create offer form
                  </Typography>
                </Stack>
                <Stack gap={2} mx={2}>
                  <Input
                    id={"name"}
                    type={"text"}
                    onChange={(e) =>
                      setData({ ...data, [e.target.id]: e.target.value })
                    }
                    value={data.name}
                    style={{ borderRadius: "6px" }}
                    placeholder={"Offer Name"}
                    label="Offer Name"
                  />
                  <Input
                    id={"description"}
                    type={"text"}
                    onChange={(e) =>
                      setData({ ...data, [e.target.id]: e.target.value })
                    }
                    value={data.description}
                    maxRows={5}
                    rows={5}
                    multiline={true}
                    style={{ borderRadius: "6px" }}
                    placeholder={"Description"}
                    label="Description"
                  />

                  <Grid container spacing={2}>
                    {priceDateArr.map(
                      ({
                        id,
                        label,
                        placeholder,
                        type,
                        onchange,
                        value,
                        pattern,
                        disabled,
                      }) => {
                        return (
                          <Grid
                            key={id}
                            item
                            xl={6}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                          >
                            <Input
                              id={id}
                              type={type}
                              onChange={onchange}
                              style={{ borderRadius: "6px" }}
                              placeholder={placeholder}
                              label={label}
                              value={value}
                              pattern={pattern && pattern}
                              disabled={disabled}
                            />
                          </Grid>
                        );
                      }
                    )}
                  </Grid>

                  <Stack
                    className="globleGradientBlue"
                    sx={{ borderRadius: "10px" }}
                  >
                    <CustomButton
                      style={{
                        backgroundColor: !_areRequiredFieldsFilled()
                          ? "grey"
                          : "transparent",
                        fontSize: "20px",
                        fontWeight: "400",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                      onClick={_submitData}
                      children={
                        creataofferLoader ? (
                          <CircularProgress
                            size={"20px"}
                            sx={{ color: "white" }}
                          />
                        ) : (
                          "Submit"
                        )
                      }
                      disable={!_areRequiredFieldsFilled()}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </CustomModal>
        </Stack>
      </Stack>
      <hr color={"#D1D1D1"} />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Grid container mt={2}>
          <Grid
            item
            xl={7}
            lg={7}
            md={7}
            sm={12}
            xs={12}
            sx={{
              borderRight: {
                xl: "1px solid #D1D1D1",
                lg: "1px solid #D1D1D1",
                md: "1px solid #D1D1D1",
                sm: "none",
                xs: "none",
              },
              borderBottom: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "1px solid #D1D1D1",
                xs: "1px solid #D1D1D1",
              },
            }}
            py={2}
            px={2}
          >
            <Typography className="mainHeading" my={1}>
              Offers
            </Typography>

            {offersLoader ? (
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "20vh", width: "100%" }}
              >
                <CircularProgress size={30} sx={{ color: themeOrange }} />
              </Stack>
            ) : get_offers_list_by_id?.length == 0 ? (
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ height: "20vh", width: "100%" }}
              >
                <Typography className="subpara" my={1}>
                  No offers found
                </Typography>
              </Stack>
            ) : (
              get_offers_list_by_id?.map(
                ({ id, name, price, discounted_price, description }, i) => {
                  return (
                    <Grid
                      container
                      alignItems={"center"}
                      my={1}
                      key={id}
                      sx={{
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                        px: 2,
                        py: 2,
                        boxShadow: "grey 0px 0px 6px -1px",
                      }}
                    >
                      <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Typography
                          className="subHeading"
                          sx={{ color: themeOrange, lineHeight: "25px" }}
                        >
                          {name ?? ""}
                        </Typography>
                        <Typography
                          className="mainPara"
                          sx={{ lineHeight: "25px" }}
                        >
                          {description ?? ""}
                        </Typography>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          gap={1.5}
                        >
                          <Typography
                            className="subpara"
                            sx={{ lineHeight: "25px", color: themeOrange }}
                          >
                            {discounted_price ?? ""}
                          </Typography>
                          <Typography
                            className="mainPara"
                            sx={{
                              lineHeight: "25px",
                              textDecoration: "line-through",
                            }}
                          >
                            {location.state.actual_price ?? ""}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Stack
                          justifyContent={"center"}
                          alignItems={"flex-end"}
                          pl={0.3}
                          gap={1}
                        >
                          <IconButton
                            sx={{
                              border: "1px solid lightgrey",
                              p: 1,
                              borderRadius: "10px",
                            }}
                            onClick={() => _handleOfferEdit(id)}
                          >
                            <BiEditAlt style={{ color: "#656565" }} />
                          </IconButton>
                          <IconButton
                            sx={{
                              border: "1px solid lightgrey",
                              p: 1,
                              borderRadius: "10px",
                            }}
                            onClick={() => dispatch(delete_offers_by_id(id))}
                          >
                            <LuTrash2 style={{ color: "#656565" }} />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  );
                }
              )
            )}
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12} py={2} px={2}>
            <Stack>
              <Typography className="mainHeading" my={1}>
                Add Ons
              </Typography>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xl={6} lg={6} md={12} sm={6} xs={12}>
                  <Input
                    value={addOnesData.name}
                    id={"name"}
                    type={"text"}
                    onChange={(e) =>
                      setAddOnesData({
                        ...addOnesData,
                        name: e.target.value,
                      })
                    }
                    style={{ borderRadius: "10px", borderColor: "#A9A9A9" }}
                    rest_stack_styles={{
                      borderRadius: "10px",
                      borderColor: "#A9A9A9",
                    }}
                    placeholder={"Additional Service"}
                    label="Additional Service"
                  />
                </Grid>
                <Grid item xl={4} lg={4} md={9} sm={4} xs={9}>
                  <Input
                    value={addOnesData.price}
                    id={"Price"}
                    type={"number"}
                    onChange={(e) =>
                      setAddOnesData({ ...addOnesData, price: e.target.value })
                    }
                    style={{ borderRadius: "10px", borderColor: "#A9A9A9" }}
                    rest_stack_styles={{
                      borderRadius: "10px",
                      borderColor: "#A9A9A9",
                    }}
                    placeholder={"Price"}
                    label="Price"
                  />
                </Grid>
                <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                  <Stack
                    alignItems={"flex-end"}
                    sx={{
                      // backgroundColor: "red",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <IconButton
                      sx={{
                        border: "1px solid lightgrey",
                        p: 1,
                        borderRadius: "10px",
                      }}
                      onClick={_handleAddOnesData}
                    >
                      <LuPlusSquare style={{ color: "#656565" }} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>

              {addonsLoader ? (
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ height: "20vh", width: "100%" }}
                >
                  <CircularProgress size={30} sx={{ color: themeOrange }} />
                </Stack>
              ) : get_addons_list_by_id?.length == 0 ? (
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ height: "20vh", width: "100%" }}
                >
                  <Typography className="subpara" my={1}>
                    no addons found
                  </Typography>
                </Stack>
              ) : (
                get_addons_list_by_id?.map(({ id, name, price }, i) => {
                  console.log("get_offer_addons", get_addons_list_by_id);
                  return (
                    <Grid container my={1} key={id}>
                      <Grid item xl={6} lg={6} md={12} sm={6} xs={12} px={1}>
                        <Typography
                          className="subpara"
                          sx={{ color: themeOrange, lineHeight: "25px" }}
                        >
                          {name ?? ""}
                        </Typography>
                      </Grid>
                      <Grid item xl={4} lg={4} md={9} sm={4} xs={9} px={1}>
                        <Typography
                          className="subpara"
                          sx={{
                            color: themeOrange,
                            textAlign: "end",
                            lineHeight: "25px",
                          }}
                        >
                          {price ?? ""}
                        </Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} md={3} sm={2} xs={3}>
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                          <IconButton
                            sx={{
                              border: "1px solid lightgrey",
                              p: 1,
                              borderRadius: "10px",
                            }}
                            onClick={() => _handleAddonsEdit(id)}
                          >
                            <BiEditAlt style={{ color: "#656565" }} />
                          </IconButton>
                          <IconButton
                            sx={{
                              border: "1px solid lightgrey",
                              p: 1,
                              borderRadius: "10px",
                            }}
                            onClick={() => dispatch(delete_addons_list(id))}
                          >
                            <LuTrash2 style={{ color: "#656565" }} />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  );
                })
              )}
            </Stack>

            {preview && (
              <>
                <Typography className="mainHeading" my={1}>
                  Preview Offer
                </Typography>

                <Stack
                  sx={{ borderRadius: "10px", backgroundColor: themeBlue }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    sx={{ borderBottom: "1px solid white" }}
                    py={2}
                    px={2}
                    gap={2}
                  >
                    <img
                      src={dot}
                      style={{
                        height: "18px",
                        width: "18px",
                        objectFit: "contain",
                      }}
                    />
                    <img
                      src={logo_2}
                      style={{
                        height: "30px",
                        objectFit: "contain",
                      }}
                    />
                  </Stack>

                  <Stack py={2} px={2} gap={1}>
                    <Grid container>
                      <Grid xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Typography
                          className="subHeading"
                          sx={{ color: themeOrange, lineHeight: "25px" }}
                        >
                          {preview.name ?? ""}
                        </Typography>
                      </Grid>
                      <Grid xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Stack alignItem={"center"}>
                          <Typography
                            className="subHeading"
                            sx={{
                              color: themeOrange,
                              lineHeight: "25px",
                              textAlign: "end",
                            }}
                          >
                            ${preview.discounted_price ?? ""}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                xl: "16px",
                                lg: "16px",
                                md: "14px",
                                sm: "14px",
                                xs: "13px",
                              },
                              fontWeight: "500",
                              textAlign: "end",
                              color: "grey",
                              textDecoration: "line-through",
                            }}
                          >
                            ${preview.actual_price ?? ""}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Typography
                          className="mainPara"
                          sx={{
                            color: "white",
                            lineHeight: "22px",
                          }}
                        >
                          {preview.additional_service ?? ""}
                        </Typography>
                      </Grid>
                      <Grid xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Stack
                          direction={"row"}
                          alignItem={"flex-end"}
                          justifyContent={"flex-end"}
                        >
                          <Typography
                            className="mainPara"
                            sx={{
                              color: "white",
                              lineHeight: "22px",
                            }}
                          >
                            ${preview.additional_price ?? ""}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack sx={{ borderTop: "1px solid white" }} py={2} px={2}>
                    <Typography
                      className="mainPara"
                      sx={{
                        color: "white",
                        lineHeight: "22px",
                      }}
                    >
                      {preview.description ?? ""}
                    </Typography>
                  </Stack>
                </Stack>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default CreatOffers;
