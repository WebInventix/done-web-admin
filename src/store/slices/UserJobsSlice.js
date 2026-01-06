import { createSlice } from "@reduxjs/toolkit";
import { check_auth } from "../../services/authentication";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";
import {
  changeVendorAsync,
  getAllUsersJobsAsync,
  getUserJobByIdAsync,
  updateAdminOrderAsync
} from "../../services/UserJobsServices";
import { asyncStatus } from "../../utils/asyncStatus";

const initialState = {
  //  Get all user jobs  =========>>>>>>>>>>>
  get_all_user_jobs_status: asyncStatus.IDLE,
  get_all_user_jobs_data: null,
  get_all_user_jobs_error: null,

  //  Get user job By Id  =========>>>>>>>>>>>
  get_user_job_by_id_status: asyncStatus.IDLE,
  get_user_job_by_id_data: null,
  get_user_job_by_id_error: null,

  //  Get user job By Id  =========>>>>>>>>>>>
  change_vendor_status: asyncStatus.IDLE,
  change_vendor_data: null,
  change_vendor_error: null,

   update_admin_order_status: asyncStatus.IDLE,
  update_admin_order_data: null,
  update_admin_order_error: null,
};

const userJobsSlice = createSlice({
  name: "user_jobs_clice",
  initialState,

  reducers: {
    setAddVendorStatus(state) {
      state.add_vendor_status = asyncStatus.IDLE;
    },
    setChangeVendorStatus(state) {
      state.change_vendor_status = asyncStatus.IDLE;
    },
    resetUpdateAdminOrder: (state) => {
      state.update_admin_order_status = asyncStatus.IDLE;
      state.update_admin_order_data = null;
      state.update_admin_order_error = null;
    },
    // for only booking value change
  },
  extraReducers: (builder) => {
    // GET USER ALL JOBS ========================>
    builder.addCase(getAllUsersJobsAsync.pending, (state, action) => {
      state.get_all_user_jobs_status = asyncStatus.LOADING;
    });

    builder.addCase(getAllUsersJobsAsync.fulfilled, (state, { payload }) => {
      state.get_all_user_jobs_status = asyncStatus.SUCCEEDED;
      state.get_all_user_jobs_data = payload.orders;
    });

    builder.addCase(getAllUsersJobsAsync.rejected, (state, action) => {
      state.get_all_user_jobs_status = asyncStatus.ERROR;
      state.get_all_user_jobs_error = action.error;
      error_toast_message(action.error.message);
    });

    // GET USER JOB BY ID ========================>
    builder.addCase(getUserJobByIdAsync.pending, (state, action) => {
      state.get_user_job_by_id_status = asyncStatus.LOADING;
    });

    builder.addCase(getUserJobByIdAsync.fulfilled, (state, { payload }) => {
      state.get_user_job_by_id_status = asyncStatus.SUCCEEDED;
      state.get_user_job_by_id_data = payload;
    });

    builder.addCase(getUserJobByIdAsync.rejected, (state, action) => {
      state.get_user_job_by_id_status = asyncStatus.ERROR;
      state.get_user_job_by_id_error = action.error;
      error_toast_message(action.error.message);
    });

    builder.addCase(updateAdminOrderAsync.pending, (state) => {
      state.update_admin_order_status = asyncStatus.LOADING;
      state.update_admin_order_error = null;
    });
    builder.addCase(updateAdminOrderAsync.fulfilled, (state, action) => {
      state.update_admin_order_status = asyncStatus.SUCCESS;
      state.update_admin_order_data = action.payload;
      state.update_admin_order_error = null;

      // Update the existing order data if the response contains updated order
      // if (action.payload.order) {
      //   state.get_user_job_by_id_data = {
      //     ...state.get_user_job_by_id_data,
      //     order: action.payload.order,
      //   };
      // }
    });
    builder.addCase(updateAdminOrderAsync.rejected, (state, action) => {
      state.update_admin_order_status = asyncStatus.ERROR;
      state.update_admin_order_error = action.payload;
    });

    // GET USER JOB BY ID ========================>
    builder.addCase(changeVendorAsync.pending, (state, action) => {
      state.change_vendor_status = asyncStatus.LOADING;
    });

    builder.addCase(changeVendorAsync.fulfilled, (state, { payload }) => {
      state.change_vendor_status = asyncStatus.SUCCEEDED;
      state.change_vendor_data = payload;
      // state.get_user_job_by_id_data.order = payload.order

      if (state.get_user_job_by_id_data) {
        state.get_user_job_by_id_data = {
          ...state.get_user_job_by_id_data,
          order: {
            ...state.get_user_job_by_id_data.order,
            vendor: payload?.order?.vendor, // 🔥 This ensures the vendor is updated
          },
        };
      }
      success_toast_message(payload.message);
    });

    builder.addCase(changeVendorAsync.rejected, (state, action) => {
      state.change_vendor_status = asyncStatus.ERROR;
      state.change_vendor_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export const { setAddVendorStatus, setChangeVendorStatus ,resetUpdateAdminOrder } =
  userJobsSlice.actions;

export default userJobsSlice.reducer;
