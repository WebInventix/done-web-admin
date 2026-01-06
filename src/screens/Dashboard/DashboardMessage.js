import {
  Avatar,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import Input from "../../component/common/Input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_users_list } from "../../services/DashboardUsers";
import UsersListTable from "../../component/common/customTable/UsersListTable";
import CustomSelectBox from "../../component/common/selectComp/CustomSelectBox";

const roleOptions = [
  { value: 2, label: "Vendor" },
  { value: 3, label: "User" },
];

const ChatList = () => {
  const [usersSearch, setUsersSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { get_users_list_data } = useSelector((state) => state.dashboard_users);

  useEffect(() => {
    dispatch(get_users_list());
  }, []);

  const _handleUsersSearch = (event) => {
    setUsersSearch(event.target.value);
  };

  const handleRoleSelection = (selectedOption) => {
    setSelectedRole(selectedOption ? selectedOption.value : null);
  };

  const trimmedSearch = usersSearch.trim().toLowerCase();

  const filteredUsers = (get_users_list_data || [])
    .filter(
      (user) =>
        (user?.first_name?.toLowerCase()?.includes(trimmedSearch) ||
          user?.last_name?.toLowerCase()?.includes(trimmedSearch)) &&
        (selectedRole ? +user?.user_role === +selectedRole : true)
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  console.log("selectedRole", selectedRole);

  return (
    <Stack bgcolor={"#FAFAFA"} gap={5}>
      {/* VENDORS LIST */}
      <Stack>
        <Stack
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          }}
          alignItems={{
            xl: "center",
            lg: "center",
            md: "center",
            sm: "center",
            xs: "flex-start",
          }}
          justifyContent={"space-between"}
          gap={1}
          my={1}
          flexWrap={"wrap"}
        >
          <Typography className="mainHeading">All Users</Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            flexWrap={"wrap"}
          >
            <Stack sx={{ width: "200px" }}>
              <CustomSelectBox
                options={roleOptions}
                isMulti={false}
                value={roleOptions.find(
                  (option) => option.value === selectedRole
                )}
                onChange={handleRoleSelection}
                placeholder="Filter by Role"
              />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              sx={{ height: "40px" }}
            >
              <Input
                id={"search_field"}
                onChange={_handleUsersSearch}
                placeholder={"Search by Name..."}
                value={usersSearch}
                style={{
                  border: "1px solid #D8D8D8",
                  borderRadius: "10px",
                  paddingLeft: "10px",
                  height: "100%",
                  width: "320px",
                  marginTop: "0px",
                }}
              />
              <IconButton
                sx={{
                  border: "1px solid lightgrey",
                  p: 1,
                  height: "100%",
                  borderRadius: "10px",
                }}
              >
                <TbSearch style={{ color: "#656565", fontSize: "20px" }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <hr color={"#D1D1D1"} />
        <Container
          sx={{
            maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" },
            my: 2,
          }}
        >
          {filteredUsers?.length > 0 ? (
            <UsersListTable data={filteredUsers} />
          ) : (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ height: "40vh" }}
            >
              <Typography>No Data Found</Typography>
            </Stack>
          )}
        </Container>
      </Stack>
    </Stack>
  );
};

export default ChatList;
