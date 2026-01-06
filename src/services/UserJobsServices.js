import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiHandle, baseURL } from "../config/apiHandle/apiHandle";
import { type_constant } from "../utils/asyncStatus";

export const getAllUsersJobsAsync = createAsyncThunk(
  type_constant.GET_ALL_USERS_JOBS_ASYNC,
  async () => {
    try {
      const response = await apiHandle.get(`/admin-get-orders`);
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

export const getUserJobByIdAsync = createAsyncThunk(
  type_constant.GET_USER_JOB_ID_ASYNC,
  async (id) => {
    try {
      const response = await apiHandle.get(`/admin-get-job/${id}`);
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

export const updateAdminOrderAsync = createAsyncThunk(
  "userJobs/updateAdminOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiHandle.post(`/update-admin-order/${id}`, data);

      const res_data = await response.data;
      return res_data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeVendorAsync = createAsyncThunk(
  type_constant.CHANGE_VENDOR_ASYNC,
  async (post_data) => {
    try {
      const response = await apiHandle.post(
        `/admin-change-assign-vendor`,
        post_data
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
