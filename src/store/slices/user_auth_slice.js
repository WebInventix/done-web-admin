import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { asyncStatus, save_tokens_constant } from "../../utils/asyncStatus";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";
import {
  addUserAsync,
  addVendorAsync,
  check_auth,
  get_signup_services,
  getVendorStatusAsync,
  login_service_auth,
  signup_service_auth,
  signup_vendor_auth,
} from "../../services/authentication";

const initialState = {
  // status
  check_auth_status: asyncStatus.IDLE,
  user_register_status: asyncStatus.IDLE,
  vendor_register_status: asyncStatus.IDLE,
  user_login_status: asyncStatus.IDLE,
  user_logout_status: asyncStatus.IDLE,
  user_profile_status: asyncStatus.IDLE,
  get_services_for_signup_status: asyncStatus.IDLE,

  // data
  userAuth: false,
  user: null,
  get_services_for_signup_data: null,
  authTokens: null,
  user_profile: null,
  profile_status: 0,
  role: "",

  // error
  check_auth_error: null,
  user_register_error: null,
  vendor_register_error: null,
  user_login_error: null,
  user_logout_error: null,
  user_profile_error: null,
  get_services_for_signup_error: null,

  edit_profile_status: asyncStatus.IDLE,
  edit_user_profile: null,
  edit_user_profile_error: null,

  // for only booking value change
  pageValue: "1",
  // for only booking value change

  //  UPDATE VENDOR STATUS =========>>>>>>>>>>>
  add_user_status: asyncStatus.IDLE,
  add_user_data: null,
  add_user_error: null,

  //  UPDATE VENDOR STATUS =========>>>>>>>>>>>
  add_vendor_status: asyncStatus.IDLE,
  add_vendor_data: null,
  add_vendor_error: null,

  //  CHECK VENDOR STATUS =========>>>>>>>>>>>
  get_vendor_status_status: asyncStatus.IDLE,
  get_vendor_status_data: null,
  get_vendor_status_error: null,
};

const user_auth_slice = createSlice({
  name: "userAuth",
  initialState,

  reducers: {
    setIdleStatus(state) {
      state.user_logout_status = asyncStatus.IDLE;
    },
    setAddUserStatus(state) {
      state.add_user_status = asyncStatus.IDLE;
    },
    setAddVendorStatus(state) {
      state.add_vendor_status = asyncStatus.IDLE;
    },
    setIdleRegisterStatus(state) {
      state.user_register_status = asyncStatus.IDLE;
    },
    setUserRole(state, { payload }) {
      state.role = payload;
    },
    // for only booking value change
    setpageValue(state, { payload }) {
      state.pageValue = payload;
    },
    setAuthState(state, { payload }) {
      state.userAuth = payload;
      state.check_auth_status = asyncStatus.SUCCEEDED;
    },
    // for only booking value change
  },
  extraReducers: (builder) => {
    // check auth ========================>

    builder.addCase(check_auth.pending, (state, action) => {
      state.check_auth_status = asyncStatus.LOADING;
    });

    builder.addCase(check_auth.fulfilled, (state, { payload }) => {
      // state.authTokens = payload.data.token;
      state.check_auth_status = asyncStatus.SUCCEEDED;
      state.user = payload.user;
      state.userRole = payload?.user?.user_role;
      state.userAuth = true;
      state.check_auth_error = null;
    });

    builder.addCase(check_auth.rejected, (state, action) => {
      state.check_auth_status = asyncStatus.ERROR;
      state.check_auth_error = action.error;
      // console.log("action.error",action.error.message);
      error_toast_message(action.error.message);
    });

    builder.addCase(login_service_auth.pending, (state, action) => {
      state.user_login_status = asyncStatus.LOADING;
    });

    builder.addCase(login_service_auth.fulfilled, (state, { payload }) => {
      state.authTokens = payload.data.token;
      state.user_login_status = asyncStatus.SUCCEEDED;
      state.user = payload?.data?.user;
      state.userAuth = true;
      success_toast_message("Login Successfully");
      state.user_login_error = null;
      console.log("payload", payload);
      localStorage.setItem(save_tokens_constant.AUTH, payload.data.token);
    });

    builder.addCase(login_service_auth.rejected, (state, action) => {
      state.user_login_status = asyncStatus.ERROR;
      state.user_login_error = action.error;
      // console.log("action.error",action.error.message);
      error_toast_message(action.error.message);
    });

    //  Signup =========>>>>>>>>>>>
    builder.addCase(signup_service_auth.pending, (state, action) => {
      state.user_register_status = asyncStatus.LOADING;
    });

    builder.addCase(signup_service_auth.fulfilled, (state, { payload }) => {
      state.authTokens = payload.data.token;
      state.user_register_status = asyncStatus.SUCCEEDED;
      state.user = payload.user;
      state.userAuth = true;
      success_toast_message("Signup Successfully");
      state.user_register_error = null;
      localStorage.setItem(
        save_tokens_constant.AUTH,
        JSON.stringify(payload.data.token)
      );
    });

    builder.addCase(signup_service_auth.rejected, (state, action) => {
      state.user_register_status = asyncStatus.ERROR;
      state.user_register_error = action.error;
      // console.log("action.error=====>>>>>",action.error);
      error_toast_message(action.error.message);
    });

    //  Signup Vendor=========>>>>>>>>>>>
    builder.addCase(signup_vendor_auth.pending, (state, action) => {
      state.vendor_register_status = asyncStatus.LOADING;
    });

    builder.addCase(signup_vendor_auth.fulfilled, (state, { payload }) => {
      state.authTokens = payload.token;
      state.vendor_register_status = asyncStatus.SUCCEEDED;
      state.user = payload.user;
      console.log("payload", payload);
      state.userAuth = true;
      success_toast_message("Vendor Signup Successfully");
      state.vendor_register_error = null;
      localStorage.setItem(
        save_tokens_constant.AUTH,
        JSON.stringify(payload.token)
      );
    });

    builder.addCase(signup_vendor_auth.rejected, (state, action) => {
      state.vendor_register_status = asyncStatus.ERROR;
      state.vendor_register_error = action.error;
      // console.log("action.error=====>>>>>",action.error);
      error_toast_message(action.error.message);
    });

    //  Signup Services=========>>>>>>>>>>>
    builder.addCase(get_signup_services.pending, (state, action) => {
      state.get_services_for_signup_status = asyncStatus.LOADING;
    });

    builder.addCase(get_signup_services.fulfilled, (state, { payload }) => {
      state.get_services_for_signup_status = asyncStatus.SUCCEEDED;
      state.get_services_for_signup_data = payload.data;
      state.get_services_for_signup_error = null;
    });

    builder.addCase(get_signup_services.rejected, (state, action) => {
      state.get_services_for_signup_status = asyncStatus.ERROR;
      state.get_services_for_signup_error = action.error;
      // console.log("action.error=====>>>>>",action.error);
      error_toast_message(action.error.message);
    });

    //  ADD USER =========>>>>>>>>>>>
    builder.addCase(addUserAsync.pending, (state, action) => {
      state.add_user_status = asyncStatus.LOADING;
    });

    builder.addCase(addUserAsync.fulfilled, (state, { payload }) => {
      state.add_user_status = asyncStatus.SUCCEEDED;
      state.add_user_data = payload.data;
      success_toast_message(payload.message);
    });

    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.add_user_status = asyncStatus.ERROR;
      state.add_user_error = action.error;
      // console.log("action.error=====>>>>>",action.error);
      error_toast_message(action.error.message);
    });

    // GET VENDOR STATUS   =========>>>>>>>>>>>
    builder.addCase(getVendorStatusAsync.pending, (state, action) => {
      state.get_vendor_status_status = asyncStatus.LOADING;
    });

    builder.addCase(getVendorStatusAsync.fulfilled, (state, { payload }) => {
      state.get_vendor_status_status = asyncStatus.SUCCEEDED;
      state.get_vendor_status_data = payload;
      success_toast_message(payload.message);
    });

    builder.addCase(getVendorStatusAsync.rejected, (state, action) => {
      state.get_vendor_status_status = asyncStatus.ERROR;
      state.get_vendor_status_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export const {
  setUserRole,
  setIdleStatus,
  setpageValue,
  setIdleRegisterStatus,
  setAuthState,
  setAddUserStatus,
  setAddVendorStatus,
} = user_auth_slice.actions;

export default user_auth_slice.reducer;
