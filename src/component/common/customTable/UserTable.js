import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
// import { PaginationSkeleton } from '../../assets/PaginationSkeleton'
// import { RefressButton } from '../../assets/buttons/RefressButton'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { asyncStatus } from '../../utils/async_status'

import { IoMdShareAlt } from "react-icons/io";
import { setPDFdataState } from "../../../store/slices/layoutControler";
import CustomButton from "../Button/Button";
import tble_img_1 from "../../../assets/tble_img_1.png";
import tble_img_2 from "../../../assets/tble_img_2.png";
import tble_img_3 from "../../../assets/tble_img_3.png";
import { img_url } from "../../../utils/helper/urls";
import ButtonComp from "../ButtonComp";
// import { Show_Message_Center } from '../ShowMessage/showMessageCenter'

const tableData = [
  {
    img: tble_img_1,
    username: "johnnc001",
    name: "John Cooper",
    service: "BBQ Cleaning and Repairing",
    email: "jonnc001@gmail.com",
    actions: "Button",
  },
  {
    img: tble_img_2,
    username: "johnnc001",
    name: "John Cooper",
    service: "BBQ Cleaning and Repairing",
    email: "jonnc001@gmail.com",
    actions: "Button",
  },
  {
    img: tble_img_3,
    username: "johnnc001",
    name: "John Cooper",
    service: "BBQ Cleaning and Repairing",
    email: "jonnc001@gmail.com",
    actions: "Button",
  },
];

const columns = [
  {
    id: "username",
    displayName: "User Name",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  // {
  //   id: "name",
  //   displayName: "Name",
  //   minWidth: 100,
  //   align: "flex-end",
  //   sortAction: true,
  // },
  // {
  //   id: "service",
  //   displayName: "Service",
  //   minWidth: 100,
  //   align: "flex-end",
  //   sortAction: true,
  // },
  {
    id: "email",
    displayName: "Email",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "phone",
    displayName: "Phone",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "actions",
    displayName: "Actions",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
];

export const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { get_all_data_status, get_all_data_error, get_all_data ,pdf_local_data} = useSelector((state) => state.payment);

  const {
    get_users_list_by_role_status,
    get_users_list_by_role_data,
    get_users_list_by_role_error,
  } = useSelector((state) => state.dashboard_users);

  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (get_users_list_by_role_data?.length) {
      setRows([
        ...get_users_list_by_role_data?.toSorted(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
    }
  }, [get_users_list_by_role_data]);

  // console.log("rows===========>>>>", rows)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{ border: "1px solid lightgray", borderRadius: "10px 10px 0px 0px" }}
    >
      <TableContainer sx={{ borderRadius: "10px 10px 0px 0px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            className="globleGradientBlue"
            sx={{
              boxShadow: "none",
            }}
          >
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  className="globleGradientBlue"
                  style={{
                    minWidth: column.minWidth,
                    color: "white",
                    border: "none",
                  }}
                >
                  {column.displayName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows ? (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover tabIndex={-1} key={i}>
                      {columns.map((column, ind) => {
                        const value = row[column.id];
                        return column.id === "username" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={2}
                            >
                              <Avatar src={row?.avatar || ""} />

                              <Typography
                                // className="subpara"
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                  textTransform: "capitalize",
                                }}
                              >
                                {`${row?.first_name} ${row?.last_name}`}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "email" ? (
                          <TableCell key={ind} align={column.align}>
                            <Typography
                              // className="subpara"
                              sx={{
                                color: "#5A5A5A",
                                lineHeight: "normal",
                              }}
                            >
                              {row?.email || "-"}
                            </Typography>
                          </TableCell>
                        ) : column.id === "phone" ? (
                          <TableCell key={ind} align={column.align}>
                            <Typography
                              // className="subpara"
                              sx={{
                                color: "#5A5A5A",
                                lineHeight: "normal",
                              }}
                            >
                              {row?.phone || "-"}
                            </Typography>
                          </TableCell>
                        ) : (
                          <TableCell key={ind} align={column.align}>
                            {/* <Typography
                                // className="subpara"
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                }}
                              >
                                
                              </Typography> */}
                            <ButtonComp
                              onClick={() =>
                                navigate(`/users/user-profile/${row?.id}`)
                              }
                              label={"View Profile"}
                              style={{
                                width: "auto",
                                height: "auto",
                                padding: "5px 15px",
                                background:
                                  "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                              }}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {/* {!rows.length ? <Show_Message_Center lengthOfColumns={columns.length} message="No Admission Found" co /> : null} */}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
