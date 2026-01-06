import {
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { themeBlue, themeOrange } from "../../../utils/colorTheme";
import { img_url } from "../../../utils/helper/urls";

const columns = [
  {
    id: "serial_no",
    displayName: "No",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "name",
    displayName: "Service",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  //   {
  //     id: "service",
  //     displayName: "Services",
  //     minWidth: 100,
  //     align: "flex-end",
  //     sortAction: true,
  //   },
  {
    id: "price",
    displayName: "Price",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "date",
    displayName: "Date",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  //   {
  //     id: "amount",
  //     displayName: "Amount",
  //     minWidth: 100,
  //     align: "flex-end",
  //     sortAction: true,
  //   },
];

const VendorServicesTable = ({ data }) => {
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

    // return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} (${period})`;
    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
  };

  const formatTwoDigits = (num) => String(num).padStart(2, "0");
  return (
    <Box mb={1}>
      <TableContainer
        sx={{ maxHeight: 700, borderRadius: "10px 10px 0px 0px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              boxShadow: "none",
            }}
          >
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: themeOrange,
                    background: `white`,
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
                        return column.id === "serial_no" ? (
                          <TableCell key={ind} align={column.align}>
                            <Typography color={"#5A5A5A"} className="subPara">
                              {formatTwoDigits(i + 1)}
                            </Typography>
                          </TableCell>
                        ) : column.id === "name" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack direction={"row"} alignItems={"center"}>
                              <Stack>
                                <img
                                  style={{ width: "36px", borderRadius: "3px" }}
                                  src={`${img_url}${row?.service?.image}`}
                                />
                              </Stack>
                              <Stack px={2}>
                                <Typography
                                  color={"#5A5A5A"}
                                  className="subPara"
                                >
                                  {row?.service?.name}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                        ) : column.id === "price" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography color={"#5A5A5A"} className="subPara">
                                ${row?.service?.price}
                              </Typography>
                            </Stack>
                          </TableCell>
                        ) : column.id === "date" ? (
                          <TableCell key={ind} align={column.align}>
                            <Stack
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography
                                className="mainPara"
                                sx={{
                                  fontWeight: "200 !important",
                                  color:"#5A5A5A"
                                }}
                              >
                                {formatDate(row.service?.created_at) || "-"}
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
                                $
                                {(+row?.service?.price)?.toLocaleString() ?? ""}
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

export default VendorServicesTable;
