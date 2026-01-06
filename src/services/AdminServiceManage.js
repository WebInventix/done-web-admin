import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiHandle, baseURL } from "../config/apiHandle/apiHandle";
import { type_constant } from "../utils/asyncStatus";

export const getDashboardDataAsync = createAsyncThunk(
  type_constant.GET_DASHBOARD_DATA,
  async () => {
    try {
      const response = await apiHandle.get(`/admin-dashboard`);
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
