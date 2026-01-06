import { createSlice } from "@reduxjs/toolkit";
import { asyncStatus } from "../../utils/asyncStatus";
import {
  getAllCouponsAsync,
  getCouponByIdAsync,
  createCouponAsync,
  updateCouponAsync,
  deleteCouponAsync,
} from "../../services/CouponService";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";

const initialState = {
  // Get All Coupons =========>>>>>>>>>>>
  get_all_coupons_status: asyncStatus.IDLE,
  get_all_coupons_data: null,
  get_all_coupons_error: null,

  // Get Coupon By ID =========>>>>>>>>>>>
  get_coupon_by_id_status: asyncStatus.IDLE,
  get_coupon_by_id_data: null,
  get_coupon_by_id_error: null,

  // Create Coupon =========>>>>>>>>>>>
  create_coupon_status: asyncStatus.IDLE,
  create_coupon_data: null,
  create_coupon_error: null,

  // Update Coupon =========>>>>>>>>>>>
  update_coupon_status: asyncStatus.IDLE,
  update_coupon_data: null,
  update_coupon_error: null,

  // Delete Coupon =========>>>>>>>>>>>
  delete_coupon_status: asyncStatus.IDLE,
  delete_coupon_data: null,
  delete_coupon_error: null,
};

const couponsSlice = createSlice({
  name: "coupons",
  initialState: initialState,
  reducers: {
    // Reset async status to IDLE
    resetCouponAsyncStatus: (state, action) => {
      const { type } = action.payload;
      switch (type) {
        case "create":
          state.create_coupon_status = asyncStatus.IDLE;
          break;
        case "update":
          state.update_coupon_status = asyncStatus.IDLE;
          break;
        case "delete":
          state.delete_coupon_status = asyncStatus.IDLE;
          break;
        default:
          break;
      }
    },

    // Clear coupon details when navigating away
    clearCouponDetails: (state) => {
      state.get_coupon_by_id_status = asyncStatus.IDLE;
      state.get_coupon_by_id_data = null;
      state.get_coupon_by_id_error = null;
    },
  },

  extraReducers: (builder) => {
    // ========== GET ALL COUPONS ==========
    builder.addCase(getAllCouponsAsync.pending, (state) => {
      state.get_all_coupons_status = asyncStatus.LOADING;
    });
    builder.addCase(getAllCouponsAsync.fulfilled, (state, { payload }) => {
      state.get_all_coupons_status = asyncStatus.SUCCEEDED;
      state.get_all_coupons_data = payload.data || [];
    });
    builder.addCase(getAllCouponsAsync.rejected, (state, action) => {
      state.get_all_coupons_status = asyncStatus.ERROR;
      state.get_all_coupons_error = action.error;
      error_toast_message(action.error.message || "Failed to fetch coupons");
    });

    // ========== GET COUPON BY ID ==========
    builder.addCase(getCouponByIdAsync.pending, (state) => {
      state.get_coupon_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(getCouponByIdAsync.fulfilled, (state, { payload }) => {
      state.get_coupon_by_id_status = asyncStatus.SUCCEEDED;
      state.get_coupon_by_id_data = payload.data;
    });
    builder.addCase(getCouponByIdAsync.rejected, (state, action) => {
      state.get_coupon_by_id_status = asyncStatus.ERROR;
      state.get_coupon_by_id_error = action.error;
      error_toast_message(action.error.message || "Failed to fetch coupon details");
    });

    // ========== CREATE COUPON ==========
    builder.addCase(createCouponAsync.pending, (state) => {
      state.create_coupon_status = asyncStatus.LOADING;
    });
    builder.addCase(createCouponAsync.fulfilled, (state, { payload }) => {
      state.create_coupon_status = asyncStatus.SUCCEEDED;
      state.create_coupon_data = payload.data;
      
      // Add the new coupon to the list if it exists
      if (state.get_all_coupons_data) {
        state.get_all_coupons_data.unshift(payload.data);
      }
      
      success_toast_message(payload.message || "Coupon created successfully");
    });
    builder.addCase(createCouponAsync.rejected, (state, action) => {
      state.create_coupon_status = asyncStatus.ERROR;
      state.create_coupon_error = action.error;
      error_toast_message(action.error.message || "Failed to create coupon");
    });

    // ========== UPDATE COUPON ==========
    builder.addCase(updateCouponAsync.pending, (state) => {
      state.update_coupon_status = asyncStatus.LOADING;
    });
    builder.addCase(updateCouponAsync.fulfilled, (state, { payload }) => {
      state.update_coupon_status = asyncStatus.SUCCEEDED;
      state.update_coupon_data = payload.data;
      
      // Update the coupon in the list if it exists
      if (state.get_all_coupons_data) {
        const index = state.get_all_coupons_data.findIndex(
          coupon => coupon.id === payload.data.id
        );
        if (index !== -1) {
          state.get_all_coupons_data[index] = payload.data;
        }
      }
      
      // Update the single coupon data if it's the same one
      if (state.get_coupon_by_id_data?.id === payload.data.id) {
        state.get_coupon_by_id_data = payload.data;
      }
      
      success_toast_message(payload.message || "Coupon updated successfully");
    });
    builder.addCase(updateCouponAsync.rejected, (state, action) => {
      state.update_coupon_status = asyncStatus.ERROR;
      state.update_coupon_error = action.error;
      error_toast_message(action.error.message || "Failed to update coupon");
    });

    // ========== DELETE COUPON ==========
    builder.addCase(deleteCouponAsync.pending, (state) => {
      state.delete_coupon_status = asyncStatus.LOADING;
    });
    builder.addCase(deleteCouponAsync.fulfilled, (state, { payload }) => {
      state.delete_coupon_status = asyncStatus.SUCCEEDED;
      state.delete_coupon_data = payload;
      
      // Remove the coupon from the list
      if (state.get_all_coupons_data && payload.deletedId) {
        state.get_all_coupons_data = state.get_all_coupons_data.filter(
          coupon => coupon.id !== payload.deletedId
        );
      }
      
      success_toast_message(payload.message || "Coupon deleted successfully");
    });
    builder.addCase(deleteCouponAsync.rejected, (state, action) => {
      state.delete_coupon_status = asyncStatus.ERROR;
      state.delete_coupon_error = action.error;
      error_toast_message(action.error.message || "Failed to delete coupon");
    });
  },
});

export const { 
  resetCouponAsyncStatus, 
  clearCouponDetails 
} = couponsSlice.actions;

export default couponsSlice.reducer;