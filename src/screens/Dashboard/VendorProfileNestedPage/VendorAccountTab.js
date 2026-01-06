import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../../../utils/asyncStatus";
import { getVendorStatusAsync } from "../../../services/authentication";
import {
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import css from "./VendorProfile.module.css";
import Input from "../../../component/common/Input/Input";
import { themeOrange } from "../../../utils/colorTheme";
import ButtonComp from "../../../component/common/ButtonComp";
import { useParams } from "react-router-dom";

const VendorAccountTab = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAccountFields, setIsAccountFields] = useState(false);
  const [isOpenRegenerateLinkModal, setIsOpenRegenerateLinkModal] =
    useState(false);
  const {
    vendor_stripe_started_status,
    user,
    get_vendor_status_status,
    get_vendor_status_data,
  } = useSelector((state) => state.userAuth);

  const {
    get_user_by_id_status,
    get_user_by_id_data,
    update_vendor_status_status,
  } = useSelector((state) => state.dashboard_users);

  const isCheckStripeStatusLoading =
    get_vendor_status_status === asyncStatus.LOADING;

  const stripeDetails =
    get_user_by_id_data?.stripe_details &&
    JSON.parse(get_user_by_id_data?.stripe_details);

  const isStartedLoading = vendor_stripe_started_status === asyncStatus.LOADING;

  //   const _handleGetStarted = () => {
  //     if (user?.account_link) {
  //       setIsOpenRegenerateLinkModal(true);
  //     } else {
  //       dispatch(vendorStripeStartedAsync());
  //     }
  //   };

  const _handleOpenClick = () => {
    dispatch(getVendorStatusAsync({ user_id: id })); // Opens in a new tab
  };

  const stripeDetailArr = [
    {
      label: "Type",
      value: stripeDetails?.type || "",
    },
    {
      label: "Business Type",
      value: stripeDetails?.business_type || "",
    },
    {
      label: "Currency",
      value: stripeDetails?.default_currency || "",
    },
    {
      label: "Transfers",
      value: stripeDetails?.capabilities?.transfers || "",
    },
    {
      label: "Account Status",
      value: get_user_by_id_data?.stripe_account_status || "",
    },
    {
      label: "Stripe  Account id",
      value: get_user_by_id_data?.stripe_id || "",
    },
  ];

  //   useEffect(() => {
  //     if (
  //       vendor_stripe_started_status === asyncStatus.SUCCEEDED &&
  //       user?.account_link
  //     ) {
  //       setIsOpenRegenerateLinkModal(false);
  //       window.open(user?.account_link, "_blank");
  //       dispatch(setVendorStripeStatus());
  //     } else if (vendor_stripe_started_status === asyncStatus.ERROR) {
  //       console.log(
  //         "error while the vendor going to registered the stripe account"
  //       );
  //     }
  //   }, [vendor_stripe_started_status, user?.account_link]);

  //   useEffect(() => {
  //     if (get_vendor_status_status === asyncStatus.SUCCEEDED) {
  //       dispatch(setGetVendorStausSatus());
  //     }
  //   }, [get_vendor_status_status]);

  const isBusinessProfileMissing =
    get_vendor_status_data?.account_details?.requirements?.past_due?.some(
      (req) => req.startsWith("business_profile")
    );
  const isIndividualMissing =
    get_vendor_status_data?.account_details?.requirements?.past_due?.some(
      (req) => req.startsWith("individual")
    );

  return (
    <div>
      {" "}
      <Stack gap={1} pb={2}>
        <Divider />
      </Stack>
      {/* <!--------- GET STARTED SECTION OF THE VENDOR ACCOUNT ---------!> */}
      {get_user_by_id_data?.account_link ? (
        <Stack>
          <Typography
            mb={4}
            className={css.main_heading}
            sx={{
              fontSize: {
                xl: "35px",
                lg: "35px",
                md: "35px",
                sm: "30px",
                xs: "25px",
              },
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Account Details
          </Typography>

          <Grid container spacing={2}>
            {stripeDetailArr.map(({ label, value }, i) => {
              return (
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack key={i}>
                    <Typography variant="caption" className={css.label}>
                      {label}
                    </Typography>
                    <Input
                      style={{
                        padding: "10px 15px",
                        borderRadius: "7px",
                        borderColor: "lightgrey",
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                      disabled={true}
                      value={value || ""}
                    />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "60vh", width: "100%" }}
        >
          <Typography>No Data Found</Typography>
        </Stack>
      )}
      {/* <Stack
        alignItems={"flex-start"}
        gap={4}
        my={3}
        sx={{
          width: { xl: "70%", lg: "70%", md: "70%", sm: "80%", xs: "100%" },
          mx: "auto",
        }}
      >
        {!user?.account_link && (
          <Typography className={css.account_txt}>
            To receive payments directly from customers on Done Right Away,
            please connect your Stripe account. This will allow us to securely
            process payments and transfer funds to your account. Click the
            button below to get started with Stripe.
          </Typography>
        )}
      </Stack> */}
      {/* {user?.account_link && (
        <Stack
          p={2}
          mb={3}
          alignItems={"baseline"}
          justifyContent={"center"}
          sx={{
            border: `2px solid ${themeOrange}`,
            borderRadius: "10px",
            backgroundColor: "#f258201a",
          }}
        >
          {user?.account_link && (
            <Typography
              variant="caption"
              className={css.note}
              sx={{
                textAlign: "start !important",
                color: `${themeOrange} !important`,
              }}
            >
              Account Link:{" "}
              <Typography variant="caption" className={css.account_txt}>
                If the link is not redirecting you to Stripe for completing your
                profile, please{" "}
                <Link
                  href={user?.account_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.account_txt}
                  sx={{
                    textAlign: "start !important",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="caption"
                    className={css.account_txt}
                    sx={{
                      textAlign: "start !important",
                      color: `${themeOrange} !important`,
                      ":hover": {
                        textDecorationLine: "underline",
                      },
                    }}
                  >
                    click here
                  </Typography>
                </Link>
              </Typography>
            </Typography>
          )}
        </Stack>
      )} */}
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-around"}
        my={3}
      >
        {get_user_by_id_data?.stripe_id && (
          <ButtonComp
            disabled={isCheckStripeStatusLoading}
            onClick={_handleOpenClick}
            label={
              isCheckStripeStatusLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Check Stripe Status"
              )
            }
            style={{
              borderRadius: "10px",
              background:
                "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
              padding: "10px 20px",
            }}
          />
        )}
        {/* {!user?.stripe_account_status !== "Approved" && (
          <ButtonComp
            disabled={isStartedLoading}
            onClick={_handleGetStarted}
            label={
              user?.account_link ? (
                "Re Generate Link"
              ) : isStartedLoading && !user?.account_link ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Get Started"
              )
            }
            style={{
              borderRadius: "10px",
              background:
                "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
            }}
          />
        )} */}
      </Stack>
      {/* <Stack
        direction="row"
        alignItems={"center"}
        className={css.note_wrapper}
        gap={2}
      >
        <IoInformationCircleSharp
          style={{ color: "orange", fontSize: "20px" }}
        />
        <Typography className={css.note_txt}>Note : </Typography>
        <Typography className={css.note_desc}>
          If you're redirected back means link is expired. Kindly regenerate the
          link.
        </Typography>
      </Stack> */}
      {get_vendor_status_data?.user?.stripe_account_status === "Rejected" && (
        <Stack my={3} gap={1}>
          <Typography
            sx={{ color: themeOrange, fontSize: "25px", fontWeight: "600" }}
          >
            {get_vendor_status_data?.message &&
              "Account is not approved due to pending requirements by stripe"}
          </Typography>
          {get_vendor_status_data?.account_details?.requirements?.past_due
            ?.length > 0 && (
            <Typography sx={{ color: "black" }}>
              Stripe profile is incomplete. Need to update the{" "}
              {isBusinessProfileMissing ? "business profile" : ""}{" "}
              {isBusinessProfileMissing && isIndividualMissing && "and"}{" "}
              {isIndividualMissing ? "individuals" : ""} Details to complete the
              profile.{" "}
            </Typography>
          )}
        </Stack>
      )}
      {false ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "60vh", width: "100%" }}
        >
          <CircularProgress size={30} sx={{ color: themeOrange }} />
        </Stack>
      ) : false ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "60vh", width: "100%" }}
        >
          {/* <Typography>No Profile Found</Typography> */}
        </Stack>
      ) : (
        <Stack>
          <Grid container></Grid>
        </Stack>
      )}
      {/* <CustomModal
        isOpen={isOpenRegenerateLinkModal}
        setIsOpen={() => setIsOpenRegenerateLinkModal(false)}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
          onClick={() => setIsOpenRegenerateLinkModal(false)}
        >
          <RxCross2 style={{ fontSize: "20px", color: themeOrange }} />
        </IconButton>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            backgroundColor: "white",
            px: 2,
            py: 5,
            borderRadius: "10px",
          }}
          gap={3}
        >
          <Stack
            sx={{
              width: {
                xl: "30vw",
                lg: "35vw",
                md: "50vw",
                sm: "70vw",
                xs: "80vw",
              },
            }}
          >
            <Typography variant="caption" sx={{ color: "black" }}>
              Regenerating the link will replace your current account setup, and
              all previous data associated with your old link will be
              overwritten. Proceed only if you're sure you want to generate a
              new link.
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <CustomButton
              onClick={() => dispatch(vendorStripeStartedAsync())}
              style={{
                background:
                  "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
              }}
            >
              {isStartedLoading ? (
                <CircularProgress size={15} sx={{ color: "white" }} />
              ) : (
                "Yes"
              )}
            </CustomButton>
            <CustomButton
              onClick={() => setIsOpenRegenerateLinkModal(false)}
              style={{
                background:
                  "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
              }}
            >
              No
            </CustomButton>
          </Stack>
        </Stack>
      </CustomModal> */}
    </div>
  );
};

export default VendorAccountTab;
