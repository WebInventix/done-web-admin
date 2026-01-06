import {
  Avatar,
  Box,
  IconButton,
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { themeBlue, themeOrange } from "../../../utils/colorTheme";
import { TbMessages } from "react-icons/tb";

const columns = [
  {
    id: "user-name",
    displayName: "Name",
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
  {
    id: "user_role",
    displayName: "Type",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "Chat",
    displayName: "Actions",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
];

const UsersListTable = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (data?.length) {
      setRows([...data]);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const _handleUserClick = (id, first_name, last_name, avatar) => {
    navigate("/message/chat-screen", { state: { id, first_name, last_name, avatar } });
  };

 

  return (
    <Box   sx={{ border: "1px solid lightgray", borderRadius: "10px 10px 0px 0px" }}>
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
                  const isComplete = row.status === "Completed";
                  const isInProgress = row.status === "Assigned";
                  return (
                    <TableRow hover tabIndex={-1} key={i}>
                      {columns.map((column, ind) => {
                        const value = row[column.id];
                        return column.id === "user-name" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              //   justifyContent={"space-between"}
                              gap={1}
                              sx={{
                                px: 2,
                                // py: 2,
                                // width: "100%",
                                // my: 2,
                                // cursor: "pointer",
                              }}
                            >
                              <Avatar
                                src={row?.avatar || ""}
                                sx={{ height: "40px", width: "40px" }}
                              />

                              <Stack
                                direction={"row"}
                                alignItems={"flex-start"}
                                justifyContent={"flex-start"}
                              >
                                {row?.first_name && (
                                  <Typography
                                    // className="secondSubHeading"
                                    sx={{
                                      fontSize: "16px",
                                      fontWeight: "300 !important",
                                      lineHeight: "28px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {row?.first_name || ""} &nbsp;
                                  </Typography>
                                )}
                                {row?.last_name && (
                                  <Typography
                                    // className="secondSubHeading"
                                    sx={{
                                      fontSize: "16px",
                                      //   color: themeOrange,
                                      lineHeight: "28px",
                                      fontWeight: "300 !important",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {row?.last_name || ""}
                                  </Typography>
                                )}
                              </Stack>
                            </Stack>
                          </TableCell>
                        ) : column.id === "email" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                // className="mainPara"
                                sx={{
                                  fontWeight: "300 !important",
                                  //   color: themeBlue,
                                  p: 0,
                                  lineHeight: "22px",
                                }}
                              >
                                {row?.email || "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "user_role" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                // className="mainPara"
                                sx={{
                                  fontWeight: "300 !important",
                                  p: 0,
                                  lineHeight: "22px",
                                }}
                              >
                                {row?.user_role === 2
                                  ? "Vendor"
                                  : "User" || "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              {/* <Typography
                                className="mainHeading"
                                sx={{
                                  color: themeBlue,
                                  p: 0,
                                  lineHeight: "20px",
                                }}
                              >
                                Chat
                              </Typography> */}
                              <IconButton
                                onClick={() =>
                                  _handleUserClick(
                                    row.id,
                                    row.first_name,
                                    row.last_name,
                                    row.avatar
                                  )
                                }
                                sx={{
                                  backgroundColor: themeOrange,
                                  ":hover": {
                                    backgroundColor: themeOrange,
                                  },
                                }}
                              >
                                <TbMessages
                                  size={20}
                                  style={{ color: "white" }}
                                />
                              </IconButton>
                            </Stack>
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
        rowsPerPageOptions={[10, 25, 50]}
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

export default UsersListTable;
