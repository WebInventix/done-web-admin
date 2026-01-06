import { FiSettings } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { MdPrivacyTip } from "react-icons/md";
import {RiUserSettingsFill} from "react-icons/ri";
import ProviderPersonalInfo from "../pages/providerDashboard/ProviderPersonalInfo";
import ProviderSettings from "../pages/providerDashboard/ProviderSettings";
import ProviderWallet from "../pages/providerDashboard/ProviderWallet";
import ProviderPrivacy from "../pages/providerDashboard/ProviderPrivacy";
import AccountSettings from "../pages/providerDashboard/Account";


export const sideBar = [
    {
        name: "Personal info",
        linkTo: "/provider-personal-info",
        icon: <AiOutlineInfoCircle size={30} color="#fff"/>,
        element: <ProviderPersonalInfo />,
        authRequired: false,
        list_in_sidebar: true,
    },
    {
        name: "My Wallet",
        linkTo: "/provider-wallet",
        icon: <GiWallet size={30} color="#fff"/>,
        element: <ProviderWallet />,
        authRequired: false,
        list_in_sidebar: true,
    },
    {
        name: "Service settings",
        linkTo: "/provider-settings",
        icon: <FiSettings size={30} color="#fff"/>,
        element: <ProviderSettings />,
        authRequired: false,
        list_in_sidebar: true,
    },
    {
        name: "Account Settings",
        linkTo: "/account-settings",
        icon: < RiUserSettingsFill size={30} color="#fff"/>,
        element: <AccountSettings />,
        authRequired: false,
        list_in_sidebar: true,
    },
    {
        name: "Data & Privacy",
        linkTo: "/provider-privacy",
        icon: < MdPrivacyTip size={30} color="#fff"/>,
        element: <ProviderPrivacy />,
        authRequired: false,
        list_in_sidebar: true,
    },
    
   
]