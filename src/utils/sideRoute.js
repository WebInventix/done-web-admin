import { RiMessageLine } from "react-icons/ri";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiNotePencil } from "react-icons/pi";
import DashboardHome from "../screens/Dashboard/DashboardHome";
import DashboardVendor from "../screens/Dashboard/DashboardVendor";
import DashboardUsers from "../screens/Dashboard/DashboardUsers";
import DashboardService from "../screens/Dashboard/DashboardService";
import { VscTools } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import CreatOffers from "../screens/Dashboard/ServicesNestedPages/CreatOffers";
import AddVendor from "../screens/Dashboard/VendorNestedPage/AddVendor";
import VendorProfile from "../screens/Dashboard/VendorNestedPage/VendorProfile";
import AddUsers from "../screens/Dashboard/UsersNestedPages/AddUser";
import UsersProfile from "../screens/Dashboard/UsersNestedPages/UsersProfile";
import ChatScreen from "../screens/Dashboard/MessagesNestedPages/ChatScreen";
import ChatList from "../screens/Dashboard/DashboardMessage";
import DashboardServiceMain from "../screens/Dashboard/DashboardServiceMain";
import EditService from "../screens/Dashboard/ServicesNestedPages/EditService";
import { HiOutlineBriefcase } from "react-icons/hi2";
import DashboardUserJobs from "../screens/Dashboard/DashboardUserJobs";
import OrderDetails from "../screens/Dashboard/UserJobsNestedPages/OrderDetails";
import EditOrderDetail from "../screens/Dashboard/UserJobsNestedPages/EditOrderDetail";
import CouponDetails from "../screens/Dashboard/CouponNestedPages/CouponDetail";
import AddCoupon from "../screens/Dashboard/CouponNestedPages/AddCoupon";
import { MdLocalOffer } from "react-icons/md";
import DashboardCoupons from "../screens/Dashboard/DashboardCoupon";
import DashboardNotes from "../screens/Dashboard/DashboardNotes";
import { MdNotes } from "react-icons/md";

export const logoutPage = () => {
  return;
};
export const userDashboardRoutes = [
  {
    caption: "Dashboard",
    linkTo: "/",
    icon: <RxDashboard />,
    element: <DashboardHome />,
    list_in_sidebar: true,
    both: false,
    admin: true,
    user: false,
  },
  {
    caption: "Vendor",
    linkTo: "/vendor",
    icon: <PiNotePencil />,
    element: <DashboardVendor />,
    list_in_sidebar: true,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "AddVendor",
    linkTo: "/vendor/add-vendor",
    icon: <PiNotePencil />,
    element: <AddVendor />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Edit Vendor",
    linkTo: "/vendor/edit-vendor/:id",
    icon: <PiNotePencil />,
    element: <AddVendor />,
    list_in_sidebar: false, // 👈 Hides it from sidebar
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Vendor Profile",
    linkTo: "/vendor/vendor-profile/:id",
    icon: <PiNotePencil />,
    element: <VendorProfile />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Add Users",
    linkTo: "/users/add-users",
    icon: <PiNotePencil />,
    element: <AddUsers />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },

  {
    caption: "Users",
    linkTo: "/users",
    icon: <IoMdCheckboxOutline />,
    element: <DashboardUsers />,
    list_in_sidebar: true,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "User Profile",
    linkTo: "/users/user-profile/:id",
    icon: <PiNotePencil />,
    element: <UsersProfile />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  // {
  //   caption: "Users Profile",
  //   linkTo: "/users-profile",
  //   icon: <IoMdCheckboxOutline />,
  //   element: <UsersProfile />,
  //   list_in_sidebar: false,
  //   both: true,
  //   admin: true,
  //   user: true,
  // },
  {
    caption: "Services",
    linkTo: "/service-main/add-services",
    icon: <VscTools />,
    element: <DashboardService />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Edit Service",
    linkTo: "/service-main/edit-service/:id",
    icon: <VscTools />,
    element: <EditService />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Services",
    linkTo: "/service-main",
    icon: <VscTools />,
    element: <DashboardServiceMain />,
    list_in_sidebar: true,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Coupons",
    linkTo: "/coupons",
    icon: <MdLocalOffer />,
    element: <DashboardCoupons />,
    list_in_sidebar: true,
    both: false,
    admin: true,
    user: false, // Only admin can manage coupons
  },
  {
    caption: "Add Coupon",
    linkTo: "/coupons/add-coupon",
    icon: <MdLocalOffer />,
    element: <AddCoupon />,
    list_in_sidebar: false,
    both: false,
    admin: true,
    user: false,
  },
  {
    caption: "Edit Coupon",
    linkTo: "/coupons/edit-coupon/:id",
    icon: <MdLocalOffer />,
    element: <AddCoupon />,
    list_in_sidebar: false,
    both: false,
    admin: true,
    user: false,
  },
  {
    caption: "Coupon Details",
    linkTo: "/coupons/coupon-details/:id",
    icon: <MdLocalOffer />,
    element: <CouponDetails />,
    list_in_sidebar: false,
    both: false,
    admin: true,
    user: false,
  },
  {
    caption: "Notes",
    linkTo: "/notes",
    icon: <MdNotes />,
    element: <DashboardNotes />,
    list_in_sidebar: true,
    both: false,
    admin: true,
    user: false,
  },
  {
    caption: "Chat Screen",
    linkTo: "/message/chat-screen",
    icon: <RiMessageLine />,
    element: <ChatScreen />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Messages",
    linkTo: "/message",
    icon: <RiMessageLine />,
    element: <ChatList />,
    list_in_sidebar: true,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Orders",
    linkTo: "/orders",
    icon: <HiOutlineBriefcase />,
    element: <DashboardUserJobs />,
    list_in_sidebar: true,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Orders",
    linkTo: "/orders/order-detail/:id",
    icon: <HiOutlineBriefcase />,
    element: <OrderDetails />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Orders",
    linkTo: "/orders/edit-order/:id",
    icon: <HiOutlineBriefcase />,
    element: <EditOrderDetail />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  {
    caption: "Create Offers",
    linkTo: "/create-offers/:id",
    icon: <RiMessageLine />,
    element: <CreatOffers />,
    list_in_sidebar: false,
    both: true,
    admin: true,
    user: true,
  },
  // {
  //   caption: "Settings",
  //   linkTo: "/settings",
  //   icon: <IoSettingsOutline />,
  //   element: <DashboardSettings />,
  //   list_in_sidebar: true,
  //   both: true,
  //   admin: true,
  //   user: true,
  // },
];
