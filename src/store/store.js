import {
    applyMiddleware,
    combineReducers,
    compose,
    configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import user_auth_slice from "./slices/user_auth_slice";
import ui_control_slice from "./slices/ui_control_slice";
import layoutControler from "./slices/layoutControler";
import admin_manage_slice from "./slices/admin_manage_slice";
import dashboard_services_slice from "./slices/dashboard_services_slice";
import dashboard_users_slice from "./slices/dashboard_users_slice";
import userJobsSlice from "./slices/UserJobsSlice";
import couponSlice from "./slices/couponSlice";
import notesSlice from "./slices/notesSlice";




let reducers = combineReducers({
    userAuth: user_auth_slice,
    uiControle: ui_control_slice,
    layout_controler: layoutControler,
    admin_manage: admin_manage_slice,
    dashaboard_services: dashboard_services_slice,
    dashboard_users: dashboard_users_slice,
    userJobsSlice: userJobsSlice,
    coupons: couponSlice,
    notes: notesSlice
});
// const rootReducer = (state, action) => {
//   if (action.type === TYPE_LOGOUT_USER) {
//     state = undefined;
//   }
//   return reducers(state, action);
// };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
    { reducer: reducers },
    composeEnhancers(applyMiddleware(thunk))
);
export default store;
