import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../ButtonComp";

const columns = [
  {
    id: "type",
    displayName: "Type",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "name",
    displayName: "User Name",
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
    id: "email",
    displayName: "Email",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
];

const DashboardNewUsersVendorsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { get_dashboard_data_status, get_dashboard_data_data } = useSelector(
    (state) => state.admin_manage
  );

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    if (get_dashboard_data_data?.data?.users?.length > 0) {
      setRows([
        ...get_dashboard_data_data?.data?.users
          ?.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((data) => ({
            type: data?.type,
            avatar: data?.avatar,
            name: `${data?.first_name} ${data?.last_name}`,
            email: data?.email,
            phone: data?.phone,
          })),
      ]);
    }
  }, [get_dashboard_data_data]);

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
                        return column.id === "type" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              sx={{
                                width: "20%",
                                height: "100%",
                              }}
                            >
                              <Typography
                                className="subpara"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {row.type || "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "name" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={1.5}
                              px={2}
                            >
                              <Stack
                                sx={{
                                  height: "50px",
                                  width: "50px",
                                  overflow: "hidden",
                                  borderRadius: "100%",
                                }}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <Avatar
                                  src={row.avatar || ""}
                                  sx={{ height: "100%", width: "100%" }}
                                />
                                {/* <img
                                  src={ || ""}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                  }}
                                /> */}
                              </Stack>
                              <Typography
                                // className="mainPara"
                                sx={{
                                  lineHeight: "28px",
                                  color: "#5A5A5A",
                                }}
                              >
                                {row.name || "-"}
                              </Typography>
                            </Stack>
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
                        ) : (
                          <TableCell key={ind} align={column.align}>
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
        rowsPerPageOptions={[5, 10, 20]}
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

export default DashboardNewUsersVendorsTable;
