import { createAsyncThunk } from "@reduxjs/toolkit";
import { type_constant } from "../utils/asyncStatus";
import { apiHandle } from "../config/apiHandle/apiHandle";


export const add_service = createAsyncThunk(
  type_constant.ADD_SERVICE,
  async (post_data) => {
      try {
          const response = await apiHandle.post(`/service-add-edit`, post_data);
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

export const get_services_list = createAsyncThunk(
  type_constant.GET_SERVICES_LIST,
  async () => {
    try {
      const response = await apiHandle.get(`/service-listing`);
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get services list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const edit_service = createAsyncThunk(
  type_constant.EDIT_SERVICES,
  async (edit_data) => {
    const { edited_data, id } = edit_data;
    // console.log("edit_dataaaaaaaaaaaaaaaaaaaa",edit_data);
    try {
      const response = await apiHandle.post(
        `/service-add-edit/${id}`,
        edited_data
      );
      const res_data = await response.data;
      // console.log("res_data", res_data);
      return res_data;
    } catch (error) {
      console.log("error from edit services", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const creat_service_offer = createAsyncThunk(
  type_constant.CREATE_SERVICE_OFFER,
  async (create_offer_data) => {
    try {
      const response = await apiHandle.post(`/add-offers`, create_offer_data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error from creat service offer", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const add_additional_service_offer = createAsyncThunk(
  type_constant.ADD_ADDITIONAL_SERVICE_OFFER,
  async (additiona_service) => {
    try {
      const response = await apiHandle.post(`/addons-add`, additiona_service);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      console.log("error from creat service offer", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const get_addons_list = createAsyncThunk(
  type_constant.GET_ADDONS_LIST,
  async (id) => {
    try {
      const response = await apiHandle.get(`/addons-listing/${id}`);
      const res_data = await response.data;
      // console.log("addons list", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get addons list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const delete_addons_list = createAsyncThunk(
  type_constant.DELETE_ADDONS_LIST,
  async (id) => {
    try {
      const response = await apiHandle.post(`/addons-delete/${id}`);
      const res_data = await response.data;
      // console.log("addons list", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get addons list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const get_offers_list = createAsyncThunk(
  type_constant.GET_OFFERS_LIST,
  async (id) => {
    try {
      const response = await apiHandle.get(`/offers-listing/${id}`);
      const res_data = await response.data;
      // console.log("get_offers", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get offers list", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const delete_offers_by_id = createAsyncThunk(
  type_constant.DELETE_OFFERS_BY_ID,
  async (id) => {
    try {
      const response = await apiHandle.post(`/delete-offers/${id}`);
      const res_data = await response.data;
      // console.log("get_offers", res_data);
      return res_data;
    } catch (error) {
      console.log("error from delete offers by id", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const get_service_by_id = createAsyncThunk(
  type_constant.GET_SERVICE_BY_ID,
  async (id) => {
    try {
      const response = await apiHandle.get(`/service-detail/${id}`);
      const res_data = await response.data;
      // console.log("res_data==================>>>>>", res_data);
      return res_data;
    } catch (error) {
      console.log("error from get service by id", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


export const delete_service_by_id = createAsyncThunk(
  type_constant.DELETE_SERVICE,
  async (id) => {
    try {
      const response = await apiHandle.delete(`/service-delete/${id}`);
      const res_data = await response.data;
      // console.log("res_data==================>>>>>", res_data);
      return res_data;
    } catch (error) {
      console.log("ERROR FROM DELETE SERVICE BY ID", error);
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);


