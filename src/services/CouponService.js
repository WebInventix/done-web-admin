import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandle } from "../config/apiHandle/apiHandle";
import { type_constant } from "../utils/asyncStatus";

/**
 * Get All Coupons
 * Fetches all coupons from the backend
 * Route: GET /admin/coupons
 */
export const getAllCouponsAsync = createAsyncThunk(
  type_constant.GET_ALL_COUPONS_ASYNC,
  async () => {
    try {
      const response = await apiHandle.get(`/admin/coupons`);
      const res_data = await response.data;
      console.log("getAllCoupons res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("getAllCoupons error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

/**
 * Get Single Coupon by ID
 * Fetches specific coupon details
 * Route: GET /admin/coupons/:id
 */
export const getCouponByIdAsync = createAsyncThunk(
  type_constant.GET_COUPON_BY_ID_ASYNC,
  async (id) => {
    try {
      const response = await apiHandle.get(`/admin/coupons/${id}`);
      const res_data = await response.data;
      console.log("getCouponById res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("getCouponById error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

/**
 * Create New Coupon
 * Creates a new coupon with support for both percentage and fixed amount
 * Route: POST /admin/coupons/save
 * Body: { name, percentage?, fixed_amount?, expiry_date, description? }
 */
export const createCouponAsync = createAsyncThunk(
  type_constant.CREATE_COUPON_ASYNC,
  async (couponData) => {
    try {
      // Transform form data to match API structure
      const apiData = {
        name: couponData.code, // Frontend uses 'code', backend expects 'name'
        expiry_date: couponData.validUntil,
        description: couponData.description || null,
      };

      // Set discount value based on type
      if (couponData.discountType === "percentage") {
        apiData.percentage = parseFloat(couponData.discountValue);
        apiData.fixedAmount = null; // Ensure fixed_amount is 0 for percentage discounts
        apiData.type = 1 
      } else if (couponData.discountType === "fixedAmount") {
        apiData.fixedAmount = parseFloat(couponData.discountValue);
        apiData.percentage = null; // Ensure percentage is 0 for fixed amount discounts
        apiData.type = 0
      }

      console.log("Creating coupon with data:", apiData);

      const response = await apiHandle.post(`/admin/coupons/save`, apiData);
      const res_data = await response.data;
      console.log("createCoupon res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("createCoupon error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

/**
 * Update Existing Coupon
 * Updates an existing coupon with support for both percentage and fixed amount
 * Route: POST /admin/coupons/save
 * Body: { id, name, percentage?, fixed_amount?, expiry_date, description? }
 */
export const updateCouponAsync = createAsyncThunk(
  type_constant.UPDATE_COUPON_ASYNC,
  async ({ id, data }) => {
    try {
      console.log(data, "couponData");
      
      // Transform form data to match API structure
      const apiData = {
        id: parseInt(id),
        name: data.code,
        expiry_date: data.validUntil,
        description: data.description || null,
      };

      // Set discount value based on type
      if (data.discountType === "percentage") {
        apiData.percentage = parseFloat(data.discountValue);
         apiData.fixedAmount = null; // Reset fixed_amount when switching to percentage
         apiData.type = 1
      } else if (data.discountType === "fixedAmount") {
        apiData.fixedAmount = parseFloat(data.discountValue);
        apiData.percentage = null; // Reset percentage when switching to fixed amount
        apiData.type = 0
      }

      console.log("Updating coupon with data:", apiData);

      const response = await apiHandle.post(`/admin/coupons/save`, apiData);
      const res_data = await response.data;
      console.log("updateCoupon res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("updateCoupon error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

/**
 * Delete Coupon
 * Deletes a coupon by ID
 * Route: POST /admin/coupons/delete/:id
 */
export const deleteCouponAsync = createAsyncThunk(
  type_constant.DELETE_COUPON_ASYNC,
  async (id) => {
    try {
      const response = await apiHandle.post(`/admin/coupons/delete/${id}`);
      const res_data = await response.data;
      console.log("deleteCoupon res_data", res_data);
      return { ...res_data, deletedId: id };
    } catch (error) {
      console.log("deleteCoupon error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);