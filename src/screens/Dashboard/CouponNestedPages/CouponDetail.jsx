import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../component/common/Button/Button";
import { themeOrange } from "../../../utils/colorTheme";
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdVisibility,
  MdDateRange,
  MdPercent,
  MdAttachMoney,
} from "react-icons/md";
import { asyncStatus } from "../../../utils/asyncStatus";
import { 
  getCouponByIdAsync, 
  deleteCouponAsync,
} from "../../../services/CouponService";
import { clearCouponDetails, resetCouponAsyncStatus } from "../../../store/slices/couponSlice";

const CouponDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    get_coupon_by_id_status,
    get_coupon_by_id_data,
    delete_coupon_status,
  } = useSelector((state) => state.coupons);

  useEffect(() => {
    // Fetch coupon details
    dispatch(getCouponByIdAsync(id));

    // Cleanup when component unmounts
    return () => {
      dispatch(clearCouponDetails());
      dispatch(resetCouponAsyncStatus({ type: "delete" }));
    };
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCouponStatus = (coupon) => {
    if (!coupon) return { label: "Unknown", color: "default" };
    
    const currentDate = new Date();
    const validUntilDate = new Date(coupon.expiry_date);
    
    if (validUntilDate < currentDate) {
      return { label: "Expired", color: "error" };
    } else {
      return { label: "Active", color: "success" };
    }
  };

  // Transform backend data to frontend format based on new API structure
  const transformCouponData = (backendData) => {
    if (!backendData) return null;
    
    // Determine discount type based on which field has value
    let discountType = "percentage";
    let discountValue = 0;
    
    if (backendData.type === 0 && backendData.fixedAmount !== null) {
      // Fixed amount discount
      discountType = "fixedAmount";
      discountValue = backendData.fixedAmount;
    } else if (backendData.type === 1 && backendData.percentage !== null) {
      // Percentage discount
      discountType = "percentage";
      discountValue = backendData.percentage;
    }
    
    return {
      id: backendData.id,
      code: backendData.name,
      discountType: discountType,
      discountValue: discountValue,
      percentage: backendData.percentage,
      fixedAmount: backendData.fixedAmount,
      type: backendData.type, // 0 = fixed amount, 1 = percentage
      validUntil: backendData.expiry_date,
      description: `${discountType === 'percentage' ? `${discountValue}% discount` : `$${discountValue} off`} coupon`,
      isActive: new Date(backendData.expiry_date) > new Date(),
      createdAt: backendData.created_at,
      updatedAt: backendData.updated_at,
    };
  };

  const couponData = transformCouponData(get_coupon_by_id_data);

  const handleEdit = () => {
    navigate(`/coupons/edit-coupon/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await dispatch(deleteCouponAsync(id)).unwrap();
        navigate("/coupons");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  // Get discount display info
  const getDiscountDisplay = (coupon) => {
    if (!coupon) return { icon: null, value: "", label: "" };
    
    if (coupon.discountType === "percentage") {
      return {
        icon: <MdPercent size={20} />,
        value: `${coupon.discountValue}%`,
        label: "Percentage Discount"
      };
    } else {
      return {
        icon: <MdAttachMoney size={20} />,
        value: `$${coupon.discountValue}`,
        label: "Fixed Amount Discount"
      };
    }
  };

  // Show loading while fetching coupon details
  if (get_coupon_by_id_status === asyncStatus.LOADING) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" justifyContent="center" height="60vh">
          <CircularProgress size={40} sx={{ color: themeOrange }} />
          <Typography sx={{ mt: 2 }}>Loading coupon details...</Typography>
        </Stack>
      </Container>
    );
  }

  // Show error if coupon not found
  if (get_coupon_by_id_status === asyncStatus.ERROR || !couponData) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" justifyContent="center" height="60vh" spacing={2}>
          <Alert severity="error">
            Failed to load coupon details. The coupon may not exist.
          </Alert>
          <CustomButton
            onClick={() => navigate("/coupons")}
            style={{
              backgroundColor: themeOrange,
              color: "white",
              padding: "10px 20px",
            }}
          >
            Back to Coupons
          </CustomButton>
        </Stack>
      </Container>
    );
  }

  const status = getCouponStatus(couponData);
  const discountDisplay = getDiscountDisplay(couponData);

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} sx={{ py: 3 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
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
            <Stack>
              <Typography variant="h4" className="mainHeading">
                Coupon Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coupon ID: {couponData.id} • Type: {couponData.type === 0 ? 'Fixed Amount' : 'Percentage'}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <CustomButton
              onClick={handleEdit}
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MdEdit size={18} />
              Edit
            </CustomButton>
            <CustomButton
              onClick={handleDelete}
              style={{
                backgroundColor: "#d32f2f",
                color: "white",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MdDelete size={18} />
              Delete
            </CustomButton>
          </Stack>
        </Stack>

        {/* Coupon Preview Card */}
        <Card sx={{ 
          background: `linear-gradient(135deg, ${themeOrange}15 0%, ${themeOrange}05 100%)`,
          border: `2px solid ${themeOrange}30`
        }}>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Box sx={{ 
                  backgroundColor: themeOrange,
                  color: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}>
                  {discountDisplay.icon}
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {discountDisplay.value}
                  </Typography>
                </Box>
                
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: themeOrange }}>
                    {couponData.code}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {discountDisplay.label}
                  </Typography>
                </Stack>
              </Stack>
              
              <Chip
                label={status.label}
                color={status.color}
                size="medium"
                sx={{ fontSize: "14px", fontWeight: "600" }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Main Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                  Coupon Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Coupon Code
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        fontFamily: "monospace", 
                        backgroundColor: "#f5f5f5", 
                        padding: "8px 12px", 
                        borderRadius: "4px",
                        display: "inline-block"
                      }}>
                        {couponData.code}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Discount Type
                      </Typography>
                      <Chip 
                        icon={discountDisplay.icon}
                        label={discountDisplay.label}
                        color={couponData.discountType === "percentage" ? "primary" : "secondary"}
                        size="small"
                        sx={{ alignSelf: "flex-start" }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Discount Value
                      </Typography>
                      <Typography variant="h6" sx={{ color: themeOrange }}>
                        {discountDisplay.value}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Valid Until
                      </Typography>
                      <Typography variant="body1">
                        {new Date(couponData.validUntil).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Days Remaining
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: new Date(couponData.validUntil) < new Date() ? "red" : "green",
                        fontWeight: 500
                      }}>
                        {Math.max(0, Math.ceil((new Date(couponData.validUntil) - new Date()) / (1000 * 60 * 60 * 24)))} days
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Backend Type Value
                      </Typography>
                      <Typography variant="body1">
                        {couponData.type === 0 ? 'Fixed Amount (0)' : 'Percentage (1)'}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body1">
                        {couponData.description || "No description provided"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Validity Information */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                    Validity Information
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Created Date
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MdDateRange color={themeOrange} />
                        <Typography variant="body1">
                          {formatDate(couponData.createdAt)}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Expiry Date
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MdDateRange color={themeOrange} />
                        <Typography variant="body1">
                          {formatDate(couponData.validUntil)}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Divider />

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Days Remaining
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        color: new Date(couponData.validUntil) < new Date() ? "red" : "green" 
                      }}>
                        {Math.max(0, Math.ceil((new Date(couponData.validUntil) - new Date()) / (1000 * 60 * 60 * 24)))} days
                      </Typography>
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip 
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ alignSelf: "flex-start" }}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Discount Details */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                    Discount Details
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">Discount Type</Typography>
                      <Chip 
                        icon={discountDisplay.icon}
                        label={couponData.discountType === "percentage" ? "Percentage" : "Fixed Amount"}
                        color={couponData.discountType === "percentage" ? "primary" : "secondary"}
                        size="small"
                      />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">Discount Value</Typography>
                      <Typography variant="h6" sx={{ color: themeOrange }}>
                        {discountDisplay.value}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">Coupon Code</Typography>
                      <Typography variant="body2" sx={{ 
                        fontFamily: "monospace",
                        backgroundColor: "#f5f5f5",
                        padding: "4px 8px",
                        borderRadius: "4px"
                      }}>
                        {couponData.code}
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Raw Backend Values
                      </Typography>
                      <Typography variant="caption" sx={{ backgroundColor: "#f8f9fa", p: 1, borderRadius: 1 }}>
                        Percentage: {couponData.percentage || 'null'}<br/>
                        Fixed Amount: {couponData.fixedAmount || 'null'}<br/>
                        Type: {couponData.type}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
                    Record Information
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(couponData.createdAt)}
                      </Typography>
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(couponData.updatedAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, color: themeOrange }}>
              Quick Actions
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <CustomButton
                onClick={() => navigate(`/coupons/edit-coupon/${id}`)}
                style={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MdEdit size={16} />
                Edit Coupon
              </CustomButton>

              <CustomButton
                onClick={() => {
                  navigator.clipboard.writeText(couponData.code);
                  alert("Coupon code copied to clipboard!");
                }}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Copy Code
              </CustomButton>

              <CustomButton
                onClick={() => navigate("/coupons")}
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#666",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MdVisibility size={16} />
                View All Coupons
              </CustomButton>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default CouponDetails;