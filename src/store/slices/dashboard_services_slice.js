import { createSlice } from "@reduxjs/toolkit";
import { asyncStatus } from "../../utils/asyncStatus";
import {
  add_additional_service_offer,
  add_service,
  creat_service_offer,
  delete_addons_list,
  delete_offers_by_id,
  delete_service_by_id,
  edit_service,
  get_addons_list,
  get_offers_list,
  get_service_by_id,
  get_services_list,
} from "../../services/DashboardServices";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";

const initialState = {
  //  Add Services=========>>>>>>>>>>>
  service_add_status: asyncStatus.IDLE,
  service_add_data: null,
  service_add_error: null,

  //  Get Services List =========>>>>>>>>>>>
  get_services_list_status: asyncStatus.IDLE,
  get_services_list_data: null,
  get_services_list_error: null,

  //  Edit Services =========>>>>>>>>>>>
  edit_service_status: asyncStatus.IDLE,
  edit_service_data: null,
  edit_service_error: null,

  //  Create Service Offer =========>>>>>>>>>>>
  creat_service_offer_status: asyncStatus.IDLE,
  creat_service_offer_data: null,
  creat_service_offer_error: null,

  //  Additiona Service Offer =========>>>>>>>>>>>
  additional_service_offer_status: asyncStatus.IDLE,
  additional_service_offer_data: null,
  additional_service_offer_error: null,

  // Get Service By Id =========>>>>>>>>>>>
  get_service_by_id_status: asyncStatus.IDLE,
  get_service_by_id_data: null,
  get_service_by_id_error: null,

  // Get addons lists By Id =========>>>>>>>>>>>
  get_addons_list_by_id_status: asyncStatus.IDLE,
  get_addons_list_by_id: null,
  get_addons_list_by_id_error: null,

  // Get offers lists By Id =========>>>>>>>>>>>
  get_offers_list_by_id_status: asyncStatus.IDLE,
  get_offers_list_by_id: null,
  get_offers_list_by_id_error: null,

  // Get offer By Id =========>>>>>>>>>>>
  delete_offer_by_id_status: asyncStatus.IDLE,
  delete_offer_by_id: null,
  delete_offer_by_id_error: null,

  // Delete addons lists By Id =========>>>>>>>>>>>
  delete_addons_by_id_status: asyncStatus.IDLE,
  delete_addons_by_id: null,
  delete_addons_by_id_error: null,

  // Delete Service =========>>>>>>>>>>>
  delete_service_status: asyncStatus.IDLE,
  delete_service_data: null,
  delete_service_error: null,
};

const dashboardServices = createSlice({
  name: "dashboardServices",
  initialState: initialState,
  reducers: {
    setAdd_service_status: (state, action) => {
      state.service_add_status = asyncStatus.IDLE;
    },
    setEdit_service_status: (state, action) => {
      state.edit_service_status = asyncStatus.IDLE;
    },
    setCreat_service_offer_status: (state, action) => {
      state.creat_service_offer_status = asyncStatus.IDLE;
    },
  },

  extraReducers: (builder) => {
    //  Add Services=========>>>>>>>>>>>
    builder.addCase(add_service.pending, (state, action) => {
      state.service_add_status = asyncStatus.LOADING;
    });

    builder.addCase(add_service.fulfilled, (state, { payload }) => {
      state.service_add_status = asyncStatus.SUCCEEDED;
      state.service_add_data = payload;
      state.service_add_error = null;
      success_toast_message(payload.msg);
    });

    builder.addCase(add_service.rejected, (state, action) => {
      state.service_add_status = asyncStatus.ERROR;
      state.service_add_error = action.error;
      error_toast_message(action.error.message);
    });

    //  Get Services List =========>>>>>>>>>>>
    builder.addCase(get_services_list.pending, (state, action) => {
      state.get_services_list_status = asyncStatus.LOADING;
    });
    builder.addCase(get_services_list.fulfilled, (state, { payload }) => {
      state.get_services_list_status = asyncStatus.SUCCEEDED;
      state.get_services_list_data = payload.service;
      state.get_services_list_error = null;
    });
    builder.addCase(get_services_list.rejected, (state, action) => {
      state.get_services_list_status = asyncStatus.ERROR;
      state.get_services_list_error = action.error;
      state.get_services_list_data = null;
      error_toast_message(action.error.message);
    });

    //  Edit Service =========>>>>>>>>>>>
    builder.addCase(edit_service.pending, (state, action) => {
      state.edit_service_status = asyncStatus.LOADING;
    });
    builder.addCase(edit_service.fulfilled, (state, { payload }) => {
      state.edit_service_status = asyncStatus.SUCCEEDED;
      state.edit_service_data = payload;
      state.edit_service_error = null;
      success_toast_message(payload?.msg);
    });
    builder.addCase(edit_service.rejected, (state, action) => {
      state.edit_service_status = asyncStatus.ERROR;
      state.edit_service_error = action.error;
      state.edit_service_data = null;
      error_toast_message(action.error.message);
    });

    //  Create Service offer =========>>>>>>>>>>>
    builder.addCase(creat_service_offer.pending, (state, action) => {
      state.creat_service_offer_status = asyncStatus.LOADING;
    });
    builder.addCase(creat_service_offer.fulfilled, (state, { payload }) => {
      state.creat_service_offer_status = asyncStatus.SUCCEEDED;
      state.creat_service_offer_data = payload;
      state.creat_service_offer_error = null;
      success_toast_message(payload?.msg);
    });
    builder.addCase(creat_service_offer.rejected, (state, action) => {
      state.creat_service_offer_status = asyncStatus.ERROR;
      state.creat_service_offer_error = action.error;
      state.creat_service_offer_data = null;
      error_toast_message(action.error.message);
    });

    // Add additional Service offer =========>>>>>>>>>>>
    builder.addCase(add_additional_service_offer.pending, (state, action) => {
      state.additional_service_offer_status = asyncStatus.LOADING;
    });
    builder.addCase(
      add_additional_service_offer.fulfilled,
      (state, { payload }) => {
        state.additional_service_offer_status = asyncStatus.SUCCEEDED;
        state.additional_service_offer_data = payload;
        state.additional_service_offer_error = null;
        success_toast_message(payload?.msg);
      }
    );
    builder.addCase(add_additional_service_offer.rejected, (state, action) => {
      state.additional_service_offer_status = asyncStatus.ERROR;
      state.additional_service_offer_error = action.error;
      state.additional_service_offer_data = null;
      error_toast_message(action.error.message);
    });

    // Get addons listing =========>>>>>>>>>>>
    builder.addCase(get_addons_list.pending, (state, action) => {
      state.get_addons_list_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(get_addons_list.fulfilled, (state, { payload }) => {
      state.get_addons_list_by_id_status = asyncStatus.SUCCEEDED;
      state.get_addons_list_by_id = payload.addons;
      // console.log("addons", payload);
      state.get_addons_list_by_id_error = null;
      //   success_toast_message(payload?.msg);
    });
    builder.addCase(get_addons_list.rejected, (state, action) => {
      state.get_addons_list_by_id_status = asyncStatus.ERROR;
      state.get_addons_list_by_id_error = action.error;
      state.get_addons_list_by_id = null;
      error_toast_message(action.error.message);
    });

    // Delete addon by Id =========>>>>>>>>>>>
    builder.addCase(delete_addons_list.pending, (state, action) => {
      state.delete_addons_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(delete_addons_list.fulfilled, (state, { payload }) => {
      state.delete_addons_by_id_status = asyncStatus.SUCCEEDED;
      state.delete_addons_by_id = payload.addons;
      state.delete_addons_by_id_error = null;
      success_toast_message(payload?.msg);
    });
    builder.addCase(delete_addons_list.rejected, (state, action) => {
      state.delete_addons_by_id_status = asyncStatus.ERROR;
      state.delete_addons_by_id_error = action.error;
      state.delete_addons_by_id = null;
      error_toast_message(action.error.message);
    });

    // Get offers listing =========>>>>>>>>>>>
    builder.addCase(get_offers_list.pending, (state, action) => {
      state.get_offers_list_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(get_offers_list.fulfilled, (state, { payload }) => {
      state.get_offers_list_by_id_status = asyncStatus.SUCCEEDED;
      state.get_offers_list_by_id = payload.addons;
      state.get_offers_list_by_id_error = null;
    });
    builder.addCase(get_offers_list.rejected, (state, action) => {
      state.get_offers_list_by_id_status = asyncStatus.ERROR;
      state.get_offers_list_by_id_error = action.error;
      state.get_offers_list_by_id = null;
      error_toast_message(action.error.message);
    });

    // Delete offer by Id =========>>>>>>>>>>>
    builder.addCase(delete_offers_by_id.pending, (state, action) => {
      state.delete_offer_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(delete_offers_by_id.fulfilled, (state, { payload }) => {
      state.delete_offer_by_id_status = asyncStatus.SUCCEEDED;
      state.delete_offer_by_id = payload.addons;
      state.delete_offer_by_id_error = null;
      success_toast_message(payload?.msg);
    });
    builder.addCase(delete_offers_by_id.rejected, (state, action) => {
      state.delete_offer_by_id_status = asyncStatus.ERROR;
      state.delete_offer_by_id_error = action.error;
      state.delete_offer_by_id = null;
      error_toast_message(action.error.message);
    });

    // Get Service By Id =========>>>>>>>>>>>
    builder.addCase(get_service_by_id.pending, (state, action) => {
      state.get_service_by_id_status = asyncStatus.LOADING;
    });
    builder.addCase(get_service_by_id.fulfilled, (state, { payload }) => {
      state.get_service_by_id_status = asyncStatus.SUCCEEDED;
      state.get_service_by_id_data = payload;
      state.get_service_by_id_error = null;
      //   success_toast_message(payload?.msg);
    });
    builder.addCase(get_service_by_id.rejected, (state, action) => {
      state.get_service_by_id_status = asyncStatus.ERROR;
      state.get_service_by_id_error = action.error;
      state.get_service_by_id_data = null;
      error_toast_message(action.error.message);
    });

    // Delete Service By Id =========>>>>>>>>>>>
    builder.addCase(delete_service_by_id.pending, (state, action) => {
      state.delete_service_status = asyncStatus.LOADING;
    });
    builder.addCase(delete_service_by_id.fulfilled, (state, { payload }) => {
      state.delete_service_status = asyncStatus.SUCCEEDED;
      state.delete_service_data = payload;
      //   success_toast_message(payload?.msg);
    });
    builder.addCase(delete_service_by_id.rejected, (state, action) => {
      state.delete_service_status = asyncStatus.ERROR;
      state.delete_service_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export const {
  setEdit_service_status,
  setCreat_service_offer_status,
  setAdd_service_status,
} = dashboardServices.actions;

export default dashboardServices.reducer;
