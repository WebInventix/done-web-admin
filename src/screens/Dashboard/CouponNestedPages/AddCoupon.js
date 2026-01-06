import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../component/common/Button/Button";
import { themeOrange } from "../../../utils/colorTheme";
import { MdArrowBack, MdSave } from "react-icons/md";
import { asyncStatus } from "../../../utils/asyncStatus";
import { 
  createCouponAsync, 
  updateCouponAsync, 
  getCouponByIdAsync,

} from "../../../services/CouponService";
import { clearCouponDetails, resetCouponAsyncStatus } from "../../../store/slices/couponSlice"; 

const AddCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // For edit mode
  const isEditMode = Boolean(id);

  // Updated Redux selectors
  const {
    create_coupon_status,
    update_coupon_status,
    get_coupon_by_id_data,
    get_coupon_by_id_status,
  } = useSelector((state) => state.coupons);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage", 
    discountValue: "",
    validUntil: "",
    description: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Fetch coupon details for editing
      dispatch(getCouponByIdAsync(id));
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearCouponDetails());
      dispatch(resetCouponAsyncStatus({ type: "create" }));
      dispatch(resetCouponAsyncStatus({ type: "update" }));
    };
  }, [isEditMode, id, dispatch]);

  // Populate form when coupon data is loaded
  useEffect(() => {
    if (isEditMode && get_coupon_by_id_data) {
      const couponData = get_coupon_by_id_data;
      
      // Determine discount type and value based on what exists in the data
      let discountType = "percentage";
      let discountValue = "";
      
      if (couponData.percentage && couponData.percentage > 0) {
        discountType = "percentage";
        discountValue = couponData.percentage.toString();
      } else if (couponData.fixed_amount && couponData.fixed_amount > 0) {
        discountType = "fixedAmount";
        discountValue = couponData.fixed_amount.toString();
      }
      
      setFormData({
        code: couponData?.name || "", // Backend uses 'name', frontend uses 'code'
        discountType: discountType,
        discountValue: discountValue,
        validUntil: couponData.expiry_date ? couponData.expiry_date.split(' ')[0] : "", // Remove time part
        description: couponData.description || "",
        isActive: new Date(couponData.expiry_date) > new Date(), // Auto-calculate from expiry
      });
    }
  }, [isEditMode, get_coupon_by_id_data]);

  console.log(formData.code, "code");

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    
    // Special handling for discount type change
    if (field === "discountType") {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        discountValue: "" // Reset discount value when type changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Coupon code must be at least 3 characters";
    }

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }

    // Percentage specific validation
    if (formData.discountType === "percentage" && formData.discountValue > 100) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%";
    }

    // Fixed amount specific validation
    if (formData.discountType === "fixedAmount" && formData.discountValue > 10000) {
      newErrors.discountValue = "Fixed amount discount seems too high";
    }

    if (!formData.validUntil) {
      newErrors.validUntil = "Valid until date is required";
    }

    if (formData.validUntil && new Date(formData.validUntil) <= new Date()) {
      newErrors.validUntil = "Valid until date must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log(isEditMode, "isEditMode");
    try {
      const couponData = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
      };

      if (isEditMode) {
        dispatch(updateCouponAsync({ id, data: couponData }));
        console.log("Updating coupon:", couponData);
      } else {
        dispatch(createCouponAsync(couponData));
        console.log("Creating coupon:", couponData);
      }

      // Mock success
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/coupons");
      }, 2000);

    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  };

  // Show loading state when fetching coupon data for edit
  if (isEditMode && get_coupon_by_id_status === asyncStatus.LOADING) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" justifyContent="center" height="60vh">
          <CircularProgress size={40} sx={{ color: themeOrange }} />
          <Typography sx={{ mt: 2 }}>Loading coupon details...</Typography>
        </Stack>
      </Container>
    );
  }

  const isLoading = create_coupon_status === asyncStatus.LOADING || update_coupon_status === asyncStatus.LOADING;
  
  // Helper function to get discount label and constraints
  const getDiscountFieldProps = () => {
    if (formData.discountType === "percentage") {
      return {
        label: "Discount Value (%)",
        inputProps: { min: 0, max: 100, step: 1 },
        helperText: errors.discountValue || "Enter percentage (0-100)"
      };
    } else {
      return {
        label: "Discount Value ($)",
        inputProps: { min: 0, step: 0.01 },
        helperText: errors.discountValue || "Enter fixed amount in dollars"
      };
    }
  };

  const discountFieldProps = getDiscountFieldProps();

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} sx={{ py: 3 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <CustomButton
            onClick={() => navigate("/coupons")}
            style={{
              minWidth: "auto",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              color: "#666",
            }}
          >
            <MdArrowBack size={20} />
          </CustomButton>
          <Typography variant="h4" className="mainHeading">
            {isEditMode ? "Edit Coupon" : "Add New Coupon"}
          </Typography>
        </Stack>

        {/* Success Alert */}
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Coupon {isEditMode ? "updated" : "created"} successfully! Redirecting...
          </Alert>
        )}

        {/* Error Alert */}
        {(create_coupon_status === asyncStatus.ERROR || update_coupon_status === asyncStatus.ERROR) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to {isEditMode ? "update" : "create"} coupon. Please try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                    Basic Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Coupon Code"
                        value={formData.code}
                        onChange={handleInputChange("code")}
                        error={!!errors.code}
                        helperText={errors.code}
                        placeholder="e.g., SAVE20 or WELCOME50"
                        InputProps={{
                          style: { textTransform: "uppercase" }
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Discount Type"
                        value={formData.discountType}
                        onChange={handleInputChange("discountType")}
                        helperText="Choose between percentage or fixed amount discount"
                        required
                      >
                        <MenuItem value="percentage">Percentage (%)</MenuItem>
                        <MenuItem value="fixedAmount">Fixed Amount ($)</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={discountFieldProps.label}
                        type="number"
                        value={formData.discountValue}
                        onChange={handleInputChange("discountValue")}
                        error={!!errors.discountValue}
                        helperText={discountFieldProps.helperText}
                        inputProps={discountFieldProps.inputProps}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Valid Until"
                        type="date"
                        value={formData.validUntil}
                        onChange={handleInputChange("validUntil")}
                        error={!!errors.validUntil}
                        helperText={errors.validUntil || "Select the expiry date"}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange("description")}
                        placeholder="Brief description of the coupon offer (optional)"
                        helperText="This will be displayed to customers"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Settings & Preview */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Settings */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                      Settings
                    </Typography>
                    
                    <Stack spacing={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isActive}
                            onChange={handleInputChange("isActive")}
                            color="primary"
                          />
                        }
                        label="Active"
                      />
                    </Stack>
                  </CardContent>
                </Card>

                {/* Preview */}
                {formData.code && formData.discountValue && (
                  <Card sx={{ backgroundColor: "#f8f9fa" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: themeOrange }}>
                        Preview
                      </Typography>
                      
                      <Box 
                        sx={{ 
                          p: 2, 
                          backgroundColor: "white", 
                          borderRadius: 2,
                          border: `2px dashed ${themeOrange}`,
                          textAlign: "center"
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: "bold",
                            color: themeOrange,
                            mb: 1
                          }}
                        >
                          {formData.code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Save {formData.discountType === "percentage" ? `${formData.discountValue}%` : `$${formData.discountValue}`}
                        </Typography>
                        {formData.validUntil && (
                          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Valid until: {new Date(formData.validUntil).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <CustomButton
              type="button"
              onClick={() => navigate("/coupons")}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#666",
                padding: "12px 24px",
              }}
            >
              Cancel
            </CustomButton>
            
            <CustomButton
              type="submit"
              disabled={isLoading}
              style={{
                background: "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <MdSave size={20} />
              )}
              {isEditMode ? "Update Coupon" : "Create Coupon"}
            </CustomButton>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default AddCoupon;