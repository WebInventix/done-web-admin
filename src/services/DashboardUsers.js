import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandle } from "../config/apiHandle/apiHandle";
import { type_constant } from "../utils/asyncStatus";

export const get_users_list = createAsyncThunk(
  type_constant.GET_USERS_LIST,
  async () => {
    try {
      const response = await apiHandle.get(`/admin/user-listing`);
      const res_data = await response.data;
      console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get users list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const get_users_list_by_role = createAsyncThunk(
  type_constant.GET_USERS_LIST_BY_ROLE,
  async (post_data) => {
    try {
      const response = await apiHandle.get(
        `/admin/user-listing/${post_data || 3}`
      );
      const res_data = await response.data;
      console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get users list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const getUserByIdAsync = createAsyncThunk(
  type_constant.GET_USER_BY_ID,
  async (id) => {
    try {
      const response = await apiHandle.get(`/admin/get-user/${id}`);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error from get user by id", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const updateUserByIdAsync = createAsyncThunk(
  type_constant.UPDATE_USER_BY_ID,
  async ({ id, data }) => {
    try {
      const response = await apiHandle.post(`/admin/vendor/edit/${id}`, data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error from update user", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const updateVendorStatusAsync = createAsyncThunk(
  type_constant.UPDATE_VENDOR_STATUS,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`/admin/approve-vendor`, post_data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error from update vendor status", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
