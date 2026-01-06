import { createSlice } from "@reduxjs/toolkit";
import { asyncStatus } from "../../utils/asyncStatus";
import {
  get_users_list,
  get_users_list_by_role,
  getUserByIdAsync,
  updateUserByIdAsync,
  updateVendorStatusAsync,
} from "../../services/DashboardUsers";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";

const initialState = {
  //  Get Users List =========>>>>>>>>>>>
  get_users_list_status: asyncStatus.IDLE,
  get_users_list_data: null,
  get_users_list_error: null,

  //  Get Users List by Role =========>>>>>>>>>>>
  get_users_list_by_role_status: asyncStatus.IDLE,
  get_users_list_by_role_data: null,
  get_users_list_by_role_error: null,

  //  GET USER BY ID =========>>>>>>>>>>>
  get_user_by_id_status: asyncStatus.IDLE,
  get_user_by_id_data: null,
  get_user_by_id_error: null,

  //  UPDATE VENDOR STATUS =========>>>>>>>>>>>
  update_vendor_status_status: asyncStatus.IDLE,
  update_vendor_status_data: null,
  update_vendor_status_error: null,

  update_user_status: asyncStatus.IDLE,
  update_user_data: null,
  update_user_error: null,
};

const dashboardUsers = createSlice({
  name: "dashboardUsers",
  initialState: initialState,
  reducers: {
    // setEdit_service_status:(state,action)=>{
    //     state.edit_service_status = asyncStatus.IDLE
    // }

    setAsyncStatusIDLE: (state) => {
      state.update_user_status = asyncStatus.IDLE
    }
  },

  extraReducers: (builder) => {
    //  Get Users List =========>>>>>>>>>>>
    builder.addCase(get_users_list.pending, (state, action) => {
      state.get_users_list_status = asyncStatus.LOADING;
    });
    builder.addCase(get_users_list.fulfilled, (state, { payload }) => {
      state.get_users_list_status = asyncStatus.SUCCEEDED;
      state.get_users_list_data = payload.users;
    });
    builder.addCase(get_users_list.rejected, (state, action) => {
      state.get_users_list_status = asyncStatus.ERROR;
      state.get_users_list_error = action.error;
      error_toast_message(action.error.message);
    });

    //  Get Users List by role=========>>>>>>>>>>>
    builder.addCase(get_users_list_by_role.pending, (state, action) => {
      state.get_users_list_by_role_status = asyncStatus.LOADING;
    });
    builder.addCase(get_users_list_by_role.fulfilled, (state, { payload }) => {
      state.get_users_list_by_role_status = asyncStatus.SUCCEEDED;
      state.get_users_list_by_role_data = payload.users;
    });
    builder.addCase(get_users_list_by_role.rejected, (state, action) => {
      state.get_users_list_by_role_status = asyncStatus.ERROR;
      state.get_users_list_by_role_error = action.error;
      error_toast_message(action.error.message);
    });

    //  Get Users List by role=========>>>>>>>>>>>
    builder.addCase(getUserByIdAsync.pending, (state, action) => {
      state.get_user_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(getUserByIdAsync.fulfilled, (state, { payload }) => {
      state.get_user_by_id_status = asyncStatus.SUCCEEDED;
      state.get_user_by_id_data = payload.user;
    });
    builder.addCase(getUserByIdAsync.rejected, (state, action) => {
      state.get_user_by_id_status = asyncStatus.ERROR;
      state.get_user_by_id_error = action.error;
      error_toast_message(action.error.message);
    });

    builder.addCase(updateUserByIdAsync.pending, (state) => {
      state.update_user_status = asyncStatus.LOADING;
    });
    builder.addCase(updateUserByIdAsync.fulfilled, (state, { payload }) => {
      state.update_user_status = asyncStatus.SUCCEEDED;
      state.update_user_data = payload.user;
      success_toast_message("User updated successfully");
    });
    builder.addCase(updateUserByIdAsync.rejected, (state, action) => {
      state.update_user_status = asyncStatus.ERROR;
      state.update_user_error = action.error;
      error_toast_message(action.error.message);
    });

    //  Get Users List by role=========>>>>>>>>>>>
    builder.addCase(updateVendorStatusAsync.pending, (state, action) => {
      state.update_vendor_status_status = asyncStatus.LOADING;
    });
    builder.addCase(updateVendorStatusAsync.fulfilled, (state, { payload }) => {
      state.update_vendor_status_status = asyncStatus.SUCCEEDED;
      state.update_vendor_status_data = payload.user;
      // success_toast_message(payload.message);
    });
    builder.addCase(updateVendorStatusAsync.rejected, (state, action) => {
      state.update_vendor_status_status = asyncStatus.ERROR;
      state.update_vendor_status_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export const { setEdit_service_status ,setAsyncStatusIDLE } = dashboardUsers.actions;

export default dashboardUsers.reducer;
