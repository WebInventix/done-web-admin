import {
  Box,
  Paper,
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
import { themeBlue } from "../../../utils/colorTheme";

const columns = [
  {
    id: "date",
    displayName: "Date",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "service",
    displayName: "Services",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "status",
    displayName: "Status",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "amount",
    displayName: "Amount",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
];

const UserOrdersTable = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (data?.length) {
      setRows([...data]);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatMonth = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
  };

  const formatDay = (isoDate) => {
    const date = new Date(isoDate);
    return date.getDate(); // Gets the day of the month (1 to 31)
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Format the date as "Tue, Feb 27, 2024"
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const dayOfMonth = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
    }).format(date);
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      date
    );

    // Format the time part for morning/afternoon
    const hours = date.getHours();
    const period = hours < 12 ? "Mor" : "Aft"; // "Mor" for Morning and "Aft" for Afternoon

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} (${period})`;
  };

  return (
    <Box
      sx={{ border: "1px solid lightgray", borderRadius: "10px 10px 0px 0px" }}
      mb={1}
    >
      <TableContainer
        sx={{ maxHeight: 700, borderRadius: "10px 10px 0px 0px" }}
      >
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
                  // className="globleGradientBlue"
                  style={{
                    minWidth: column.minWidth,
                    color: "white",
                    border: "none",
                    background: `var(
    --Blue-colour,
    linear-gradient(180deg, #071d5b 0%, #031444 100%)
  )`,
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
                        return column.id === "date" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"center"}
                              justifyContent={"center"}
                              sx={{ width: "35px" }}
                            >
                              <Typography
                                className="mainHeading"
                                sx={{
                                  color: themeBlue,
                                  p: 0,
                                  lineHeight: "20px",
                                }}
                              >
                                {formatDay(row?.created_at) || "-"}
                              </Typography>
                              <Typography
                                className="mainPara"
                                sx={{
                                  fontWeight: "200 !important",
                                  color: "#BFBFBF",
                                  p: 0,
                                  lineHeight: "20px",
                                }}
                              >
                                {formatMonth(row?.created_at) || "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "service" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                className="mainPara"
                                sx={{
                                  fontWeight: "200 !important",
                                  color: "#333333",
                                  p: 0,
                                  lineHeight: "22px",
                                }}
                              >
                                {row.service?.name || "-"}
                              </Typography>
                              <Typography
                                className="mainPara"
                                sx={{
                                  fontWeight: "200 !important",
                                  color: "#333333",
                                  p: 0,
                                  lineHeight: "22px",
                                }}
                              >
                                {formatDate(row.created_at) || "-"}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "status" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                className="mainPara"
                                sx={{
                                  fontWeight: "200 !important",
                                  color: "white",
                                  px: 6,
                                  py: 0.7,
                                  lineHeight: "22px",
                                  backgroundColor: isComplete
                                    ? "#52C24A"
                                    : isInProgress
                                    ? themeBlue
                                    : "#FFA07D",
                                  borderRadius: "10px",
                                }}
                              >
                                {row.status ?? ""}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                className="mainHeading"
                                sx={{
                                  color: "#333333",
                                  p: 0,
                                  lineHeight: "20px",
                                }}
                              >
                                ${(+row?.total_amount)?.toLocaleString() ?? ""}
                              </Typography>
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

export default UserOrdersTable;
