import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiHandle, baseURL } from "../config/apiHandle/apiHandle";
import { type_constant } from "../utils/asyncStatus";

export const check_auth = createAsyncThunk(
  type_constant.CHECK_AUTH,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/auth/check-token`, post_data);
      const res_data = await response.data;
      console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const login_service_auth = createAsyncThunk(
  type_constant.LOGIN,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/auth/login`, post_data);
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
export const signup_service_auth = createAsyncThunk(
  type_constant.SIGNUP,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/auth/register`, post_data);
      const res_data = await response.data;
      console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const signup_vendor_auth = createAsyncThunk(
  type_constant.SIGNUP_VENDOR,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/vendor-signup`, post_data);
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
export const get_signup_services = createAsyncThunk(
  type_constant.SIGNUP_SERVICES_GET,
  async (post_data) => {
    const { services, city, states } = post_data;
    try {
      const response = await apiHandle.get(
        `/get-general-data?services=${services}&cities=${city}&states=${states}`
      );
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const addVendorAsync = createAsyncThunk(
  type_constant.ADD_VENDOR_ASYNC,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/admin-add-vendor`, post_data);
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const addUserAsync = createAsyncThunk(
  type_constant.ADD_USER_ASYNC,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/admin-add-user`, post_data);
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const getVendorStatusAsync = createAsyncThunk(
  type_constant.GET_VENDOR_STATUS_ASYNC,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/stripe-account-status-vendor`,post_data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("ERROR GET VENDOR STATUS", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
