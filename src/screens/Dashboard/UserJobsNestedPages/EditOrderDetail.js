import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomButton from "../../../component/common/Button/Button";
import CustomTextArea from "../../../component/common/CustomTextArea/CustomTextArea";
import {
  getUserJobByIdAsync,
  updateAdminOrderAsync,
} from "../../../services/UserJobsServices";
import { get_services_list } from "../../../services/DashboardServices";
import { asyncStatus } from "../../../utils/asyncStatus";
import { themeOrange } from "../../../utils/colorTheme";
import AdminDateShiftPicker from "../../../component/DateRangePicker/AdminDateShiftPicker";
import { HiMiniCalendar } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { format } from "date-fns";
import { resetUpdateAdminOrder } from "../../../store/slices/UserJobsSlice";
// import { resetUpdateAdminOrder } from "../../../redux/slice/UserJobsSlice";

const EditOrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Local state
  const [orderData, setOrderData] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Redux state
  const {
    get_user_job_by_id_status,
    get_user_job_by_id_data,
    update_admin_order_status,
    update_admin_order_error,
  } = useSelector((state) => state.userJobsSlice);

  const { get_services_list_data } = useSelector(
    (state) => state.dashaboard_services
  );

  // Fetch data on mount
  useEffect(() => {
    dispatch(getUserJobByIdAsync(id));
    dispatch(get_services_list());
  }, [dispatch, id]);

  // Initialize form when data loads
  useEffect(() => {
    if (get_user_job_by_id_data?.order) {
      const { order } = get_user_job_by_id_data;
      setOrderData(order);
      setSelectedService(order.service_id?.toString() || "");
    }
  }, [get_user_job_by_id_data]);

  // Reset update status when unmounting
  useEffect(() => {
    return () => {
      dispatch(resetUpdateAdminOrder());
    };
  }, [dispatch]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    if (formErrors.service) {
      setFormErrors((prev) => ({ ...prev, service: null }));
    }
  };

  const handleTextChange = (field) => (e) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDatesChange = (updatedDates) => {
    setOrderData((prev) => ({
      ...prev,
      date: updatedDates,
    }));
    if (formErrors.dates) {
      setFormErrors((prev) => ({ ...prev, dates: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedService) {
      errors.service = "Please select a service";
    }

    if (!orderData?.date?.length) {
      errors.dates = "Please select at least one date";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateOrder = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        order: {
          // Note the nested "order" object
          service_id: parseInt(selectedService),
          description: orderData.description || "",
          time: orderData.time || "",
          date: orderData.date.map((item) => ({
            selected_date: item.selected_date, // Already in "YYYY-MM-DD" format
            shifts: Array.isArray(item.shifts) ? item.shifts : [], // Ensure shifts is always an array
          })),
        },
      };

      // Debug: Log the payload before sending
      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const result = await dispatch(
        updateAdminOrderAsync({ id, data: payload })
      ).unwrap();

      if (result.success) {
        // Refresh the order data
        dispatch(getUserJobByIdAsync(id));
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const formatDisplayDate = (dateString) => {
    try {
      return format(new Date(dateString), "EEE, MMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  if (get_user_job_by_id_status === asyncStatus.LOADING || !orderData) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "50vh" }}
      >
        <CircularProgress size={30} sx={{ color: themeOrange }} />
      </Stack>
    );
  }

  return (
    <Stack bgcolor={"#FAFAFA"} p={3} spacing={3}>
      {/* Header */}
      <Typography variant="h5" fontWeight={600}>
        Edit Order Details
      </Typography>
      <Divider />

      {/* Error Alert */}
      {update_admin_order_error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {update_admin_order_error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Service Selection */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!formErrors.service}>
            <InputLabel id="service-select-label">Service</InputLabel>
            <Select
              labelId="service-select-label"
              value={selectedService}
              onChange={handleServiceChange}
              label="Service"
            >
              {get_services_list_data?.map((service) => (
                <MenuItem key={service.id} value={service.id.toString()}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.service && (
              <Typography color="error" variant="caption">
                {formErrors.service}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Date Management */}
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Scheduled Dates
            </Typography>

            {formErrors.dates && (
              <Typography color="error" variant="caption">
                {formErrors.dates}
              </Typography>
            )}

            <AdminDateShiftPicker
              initialDates={orderData.date || []}
              onDatesChange={handleDatesChange}
              maxDates={10}
            />

            {/* Current Dates Preview */}
            {orderData.date?.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Current Schedule:
                </Typography>
                <Stack spacing={1}>
                  {orderData.date.map((dateObj, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <HiMiniCalendar color={themeOrange} size={18} />
                      <Typography>
                        {formatDisplayDate(dateObj.selected_date)}
                        <Typography
                          component="span"
                          color="text.secondary"
                          ml={1}
                        >
                          ({dateObj.shifts?.join(", ")})
                        </Typography>
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>

        {/* Timing Constraints */}
        <Grid item xs={12} md={6}>
          <CustomTextArea
            label="Timing Constraints"
            value={orderData.time || ""}
            onChange={handleTextChange("time")}
            placeholder="Any specific timing requirements..."
            rows={4}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} md={6}>
          <CustomTextArea
            label="Description"
            value={orderData.description || ""}
            onChange={handleTextChange("description")}
            placeholder="Additional details about the order..."
            rows={4}
          />
        </Grid>
      </Grid>

      {/* Info Box */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          backgroundColor: "#FFF8F5",
          borderLeft: `3px solid ${themeOrange}`,
          p: 2,
          borderRadius: 1,
        }}
      >
        <MdInfoOutline size={20} color={themeOrange} />
        <Typography variant="body2">
          Update the service, dates, and details as needed. Changes will be
          reflected immediately after saving.
        </Typography>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {/* <CustomButton
          variant="outlined"
          style={{
            borderColor: themeOrange,
            color: themeOrange
          }}
        >
          Cancel
        </CustomButton> */}
        <CustomButton
          onClick={handleUpdateOrder}
          disabled={update_admin_order_status === asyncStatus.LOADING}
          style={{
            background: `linear-gradient(180deg, ${themeOrange} 0%, #C53F10 100%)`,
            color: "white",
            minWidth: 150,
          }}
        >
          {update_admin_order_status === asyncStatus.LOADING ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default EditOrderDetail;
