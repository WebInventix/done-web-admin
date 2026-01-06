import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { asyncStatus, save_tokens_constant } from "../../utils/asyncStatus";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";
import { getDashboardDataAsync } from "../../services/AdminServiceManage";

const initialState = {
  // GET DASHBOARD DATA =========>>>>>>>>>>>
  get_dashboard_data_status: asyncStatus.IDLE,
  get_dashboard_data_data: null,
  get_dashboard_data_error: null,
};

const admin_manage_slice = createSlice({
  name: "admin_manage",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    //  Add Services=========>>>>>>>>>>>
    builder.addCase(getDashboardDataAsync.pending, (state, action) => {
      state.get_dashboard_data_status = asyncStatus.LOADING;
    });

    builder.addCase(getDashboardDataAsync.fulfilled, (state, { payload }) => {
      state.get_dashboard_data_status = asyncStatus.SUCCEEDED;
      state.get_dashboard_data_data = payload;
    });

    builder.addCase(getDashboardDataAsync.rejected, (state, action) => {
      state.get_dashboard_data_status = asyncStatus.ERROR;
      state.get_dashboard_data_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export default admin_manage_slice.reducer;

// export const {
//   setEdit_service_status,
//   setCreat_service_offer_status,
//   setAdd_service_status,
// } = admin_manage_slice.actions;
