import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVendorAsync,
  getUserJobByIdAsync,
} from "../../../services/UserJobsServices";
import { useNavigate, useParams } from "react-router-dom";
import { asyncStatus } from "../../../utils/asyncStatus";
import {
  Avatar,
  Box,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { themeOrange } from "../../../utils/colorTheme";
import {
  AccessTime,
  AttachMoney,
  CalendarToday,
  LocationOn,
} from "@mui/icons-material";
import { HiMiniCalendar } from "react-icons/hi2";
import { img_url } from "../../../utils/helper/urls";
import CustomSelectBox from "../../../component/common/selectComp/CustomSelectBox";
import CustomButton from "../../../component/common/Button/Button";
import { setChangeVendorStatus } from "../../../store/slices/UserJobsSlice";
import { TbEdit } from "react-icons/tb";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [vendorId, setVendorId] = useState({});
  const [isShowVendor, setIsShowVendor] = useState("");

  const {
    get_user_job_by_id_status,
    get_user_job_by_id_data,
    change_vendor_status,
    change_vendor_data,
  } = useSelector((state) => state.userJobsSlice);

  const changeVendorLoader = change_vendor_status === asyncStatus.LOADING;

  //   console.log(
  //     ">>>>>>>>>>>",
  //     get_user_job_by_id_data.order.status === "Assigned" ||
  //       get_user_job_by_id_data.order.status === "In-Queue"
  //   );

  const _handleAssignedVendor = () => {
    const finalObj = {
      oid: id,
      ven_id: vendorId.value,
    };
    console.log("final obje", finalObj);
    dispatch(changeVendorAsync(finalObj));
  };

  useEffect(() => {
    dispatch(getUserJobByIdAsync(id));
  }, []);

  useEffect(() => {
    if (Object.keys(get_user_job_by_id_data?.order || {})?.length > 0) {
      const isVendorAssigned = {
        value: get_user_job_by_id_data?.order?.vendor?.id,
        label: `${get_user_job_by_id_data?.order?.vendor?.first_name} ${get_user_job_by_id_data?.order?.vendor?.last_name}`,
      };
      setVendorId(isVendorAssigned);
    }
  }, [get_user_job_by_id_data]);

  useEffect(() => {
    if (change_vendor_status === asyncStatus.SUCCEEDED) {
      setIsShowVendor(false);
      dispatch(setChangeVendorStatus());
    }
  }, [change_vendor_status]);

  const allVendors =
    get_user_job_by_id_data?.vendors?.map((vendor) => ({
      value: vendor?.id,
      label: `${vendor?.first_name} ${vendor?.last_name}`,
    })) || [];

  const isVendorsShow =
    get_user_job_by_id_data?.order?.status === "Assigned" ||
    get_user_job_by_id_data?.order?.status === "In-Queue";

  if (get_user_job_by_id_status === asyncStatus.LOADING) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "50vh" }}
      >
        <CircularProgress size={30} sx={{ color: themeOrange }} />
      </Stack>
    );
  }
  console.clear();
  console.log(get_user_job_by_id_data?.order);
  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
        my={1}
      >
        <Typography className="mainHeading">Order Detail</Typography>
        <Stack
          //   className="globleGradientBlue"
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          <CustomButton
            onClick={() => navigate(`/orders/edit-order/${id}`)}
            style={{
              background:
                "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
              padding: "10px 17px",
              borderRadius: "100px",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
            >
              <TbEdit size={15} color={"white"} />
              <Typography sx={{ fontSize: "13px !important" }}>
                Edit Order
              </Typography>
            </Stack>
          </CustomButton>
          <Chip
            label={get_user_job_by_id_data?.order?.status}
            sx={{
              //   backgroundColor:
              //     get_user_job_by_id_data?.order?.status === "Completed"
              //       ? "#b1f3b1"
              //       : "#f5bdbd9e",
              backgroundColor:
                get_user_job_by_id_data?.order?.status === "Completed"
                  ? "#b1f3b1"
                  : get_user_job_by_id_data?.order?.status === "Assigned"
                  ? "#b3d9ff"
                  : get_user_job_by_id_data?.order?.status === "In-Queue"
                  ? "#ffe5b4"
                  : "#f5bdbd9e",
              //   color:
              //     get_user_job_by_id_data?.order?.status === "Completed"
              //       ? "green"
              //       : "red",
              color:
                get_user_job_by_id_data?.order?.status === "Completed"
                  ? "green"
                  : get_user_job_by_id_data?.order?.status === "Assigned"
                  ? "#0056b3"
                  : get_user_job_by_id_data?.order?.status === "In-Queue"
                  ? "#cc7000"
                  : "red",
              fontWeight: "bold",
              // mt: 1,
              padding: "10px 17px",
            }}
          />
        </Stack>
      </Stack>
      <Divider />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        {Object.keys(get_user_job_by_id_data?.order || {})?.length === 0 ? (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ height: "50vh" }}
          >
            <Typography>No orders found</Typography>
          </Stack>
        ) : (
          <Stack my={2}>
            <Stack
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
                padding: "10px 10px",
                "&:hover": {
                  boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.25)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Grid container spacing={2} alignItems={"stretch"}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack sx={{ height: "100%" }} gap={2}>
                    <Chip
                      label={`Created At: ${new Date(
                        get_user_job_by_id_data?.order?.created_at
                      )?.toDateString()}`}
                      sx={{
                        backgroundColor: "#d4d4d49e",
                        color: "#6c6868",
                        fontWeight: "bold",
                        mt: 1,
                        width: "fit-content",
                      }}
                    />

                    <Stack p={2}>
                      <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                        gap={2}
                      >
                        <Avatar
                          src={`${img_url}${get_user_job_by_id_data?.order?.service?.image}`}
                          sx={{
                            height: "50px",
                            width: "50px",
                            backgroundColor: "lightgray",
                            objectFit: "contain",
                          }}
                        />
                        <Stack gap={0.5}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "black",
                              fontSize: "16px",
                              fontWeight: "700",
                            }}
                          >
                            {get_user_job_by_id_data?.order?.service?.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "gray", lineHeight: "normal" }}
                          >
                            {
                              get_user_job_by_id_data?.order?.service
                                ?.description
                            }
                          </Typography>{" "}
                          <Typography
                            variant="caption"
                            sx={{ color: "black" }}
                            mt={2}
                          >
                            $
                            {get_user_job_by_id_data?.order?.service?.price?.toLocaleString()}{" "}
                            {get_user_job_by_id_data?.order?.service
                              ?.additional_text || ""}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "black" }}
                            //   mt={2}
                          >
                            $
                            {get_user_job_by_id_data?.order?.service?.add_price?.toLocaleString()}{" "}
                            {get_user_job_by_id_data?.order?.service
                              ?.additional_text_2 || ""}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack
                    sx={{ height: "100%" }}
                    gap={2}
                    alignItems={"flex-end"}
                  >
                    <Chip
                      label={
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                          <LocationOn
                            style={{ color: themeOrange, fontSize: "20px" }}
                          />
                          <Typography sx={{ fontSize: "0.8125rem" }}>
                            {get_user_job_by_id_data?.order?.location}
                          </Typography>
                        </Stack>
                      }
                      sx={{
                        backgroundColor: "#fce6de",
                        color: "black",
                        fontWeight: "bold",
                        mt: 1,
                        width: "fit-content",
                      }}
                    />

                    <Stack m={1} mt={2}>
                      {get_user_job_by_id_data?.order?.date?.map(
                        (date, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            gap={1}
                            alignItems="center"
                            m={1}
                          >
                            <HiMiniCalendar
                              style={{
                                color: themeOrange,
                                fontSize: "20px",
                                flexShrink: "0",
                              }}
                            />
                            <Typography variant="caption">
                              {new Date(date?.selected_date)?.toDateString()}{" "}
                              <Typography
                                variant="caption"
                                sx={{ color: "gray" }}
                              >
                                (
                                {date?.shifts
                                  ?.map((shift) => shift?.slice(0, 3))
                                  .join(", ")}{" "}
                                )
                              </Typography>
                            </Typography>
                          </Stack>
                        )
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Divider />

              {/* Price Breakdown Section */}
              <Grid container spacing={2} mt={0.5}>
                <Grid item xs={12}>
                  <Stack
                    sx={{
                      backgroundColor: "#FFF8F5",
                      borderRadius: "12px",
                      padding: "20px",
                      border: `2px solid ${themeOrange}30`,
                    }}
                  >
                    {/* <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "16px",
                        color: themeOrange,
                      }}
                    >
                      Price Breakdown
                    </Typography> */}

                    <Grid container spacing={2}>
                      {/* Total Amount */}
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{
                            backgroundColor: themeOrange,
                            padding: "12px 20px",
                            borderRadius: "8px",
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "22px",
                              fontWeight: "700",
                              color: "white",
                            }}
                          >
                            Total Amount
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "28px",
                              fontWeight: "700",
                              color: "white",
                            }}
                          >
                            $
                            {get_user_job_by_id_data?.order?.total_amount
                              ? parseFloat(
                                  get_user_job_by_id_data.order.total_amount
                                ).toFixed(2)
                              : "0.00"}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2} alignItems={"stretch"} mt={0.5}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack sx={{ height: "100%" }} gap={2}>
                    <Stack
                      gap={2}
                      sx={{
                        // borderTop: "1px solid #e9e8e8",
                        // borderBottom: "1px solid #e9e8e8",
                        padding: "10px 12px",
                      }}
                      px={2}
                    >
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "700",
                          lineHeight: "normal",
                        }}
                      >
                        Posted By
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={get_user_job_by_id_data?.order?.user?.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="h6">{`${get_user_job_by_id_data?.order?.user?.first_name} ${get_user_job_by_id_data?.order?.user?.last_name}`}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {get_user_job_by_id_data?.order?.user?.email} |{" "}
                            {get_user_job_by_id_data?.order?.user?.phone}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack
                    sx={{ height: "100%" }}
                    gap={2}
                    // alignItems={"flex-end"}
                  >
                    {Object.keys(get_user_job_by_id_data?.order?.vendor || {})
                      ?.length > 0 && (
                      <Stack sx={{ height: "100%" }} gap={2}>
                        <Stack
                          gap={2}
                          sx={{
                            // borderTop: "1px solid #e9e8e8",
                            // borderBottom: "1px solid #e9e8e8",
                            padding: "10px 12px",
                          }}
                          px={2}
                        >
                          <Stack
                            gap={2}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: "700",
                                lineHeight: "normal",
                              }}
                            >
                              Assigned Vendor
                            </Typography>

                            <Stack
                              direction="row"
                              gap={1}
                              alignItems="center"
                              m={1}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  lineHeight: "normal",
                                  color: "gray",
                                }}
                              >
                                Locked by Vendor :
                              </Typography>
                              <Stack
                                direction="row"
                                gap={1}
                                alignItems="center"
                              >
                                <HiMiniCalendar
                                  style={{
                                    color: themeOrange,
                                    fontSize: "20px",
                                    flexShrink: "0",
                                  }}
                                />
                                <Typography variant="caption">
                                  {new Date(
                                    get_user_job_by_id_data?.order?.date_time_lock?.date
                                  )?.toDateString()}{" "}
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "gray" }}
                                  >
                                    {get_user_job_by_id_data?.order?.date_time_lock?.shifts
                                      ?.map((shift) => shift?.slice(0, 3))
                                      .join(", ")}{" "}
                                  </Typography>
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Avatar
                              src={
                                get_user_job_by_id_data?.order?.vendor?.avatar
                              }
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box>
                              <Typography variant="h6">{`${get_user_job_by_id_data?.order?.vendor?.first_name} ${get_user_job_by_id_data?.order?.vendor?.last_name}`}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {get_user_job_by_id_data?.order?.vendor?.email}{" "}
                                |{" "}
                                {get_user_job_by_id_data?.order?.vendor?.phone}
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </Stack>
                    )}
                    {isVendorsShow && (
                      <Typography
                        variant="caption"
                        sx={{ color: "gray" }}
                        px={2}
                      >
                        To assign the job to another vendor,{" "}
                        <Typography
                          variant="caption"
                          sx={{
                            color: themeOrange,
                            ":hover": {
                              color: "blue",
                              cursor: "pointer",
                              textDecorationLine: "underline",
                            },
                          }}
                          onClick={() => setIsShowVendor(!isShowVendor)}
                        >
                          click here.
                        </Typography>
                      </Typography>
                    )}
                    {isShowVendor && (
                      <Stack
                        gap={2}
                        sx={{
                          // borderTop: "1px solid #e9e8e8",
                          // borderBottom: "1px solid #e9e8e8",
                          padding: "10px 12px",
                        }}
                        px={3}
                      >
                        <Stack
                          gap={2}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          {isVendorsShow && (
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: "700",
                                lineHeight: "normal",
                              }}
                            >
                              Vendors
                            </Typography>
                          )}
                        </Stack>
                        {isVendorsShow && (
                          <Stack>
                            <CustomSelectBox
                              options={allVendors}
                              isMulti={false}
                              // value={statusArr.find(
                              //   (option) => option.value === selectedRole
                              // )}
                              value={vendorId}
                              onChange={(e) => setVendorId(e)}
                              placeholder={"Select a vendor"}
                              customStyles={{
                                control: {
                                  borderRadius: "7px",
                                  height: "auto",
                                  minHeight: "40px",
                                  width: "100%",
                                },
                              }}
                            />
                            <Stack
                              alignItems={"flex-end"}
                              //   gap={0.5}
                              sx={{
                                // borderTop: "1px solid #e9e8e8",
                                // borderBottom: "1px solid #e9e8e8",
                                padding: "10px 0px",
                              }}
                              //   px={3}
                            >
                              <CustomButton
                                disable={changeVendorLoader}
                                onClick={_handleAssignedVendor}
                                style={{
                                  background:
                                    "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                                  padding: "10px 17px",
                                }}
                              >
                                {changeVendorLoader ? (
                                  <CircularProgress
                                    size={15}
                                    sx={{ color: "white" }}
                                  />
                                ) : (
                                  "Submit"
                                )}
                              </CustomButton>
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

export default OrderDetails;
