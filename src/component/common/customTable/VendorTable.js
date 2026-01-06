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
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPDFdataState } from "../../../store/slices/layoutControler";
import ButtonComp from "../ButtonComp";
import { MdEdit } from "react-icons/md";

const columns = [
  {
    id: "username",
    displayName: "User Name",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "service",
    displayName: "Service",
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
    id: "phone",
    displayName: "Phone",
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
    id: "actions",
    displayName: "Actions",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
];

export const VendorTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    get_users_list_by_role_data,
  } = useSelector((state) => state.dashboard_users);

  console.log(get_users_list_by_role_data ,"ger")

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (get_users_list_by_role_data?.length) {
      setRows([
        ...get_users_list_by_role_data?.toSorted(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
    }
  }, [get_users_list_by_role_data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusArr = [
    { label: "Approved", value: 1 },
    { label: "Rejected", value: 2 },
    { label: "Pending", value: 0 },
  ];

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    // Add navigation or modal logic here if needed
    navigate(`/vendor/edit-vendor/${id}`);
  };

  return (
    <Box sx={{ border: "1px solid lightgray", borderRadius: "10px 10px 0px 0px" }}>
      <TableContainer sx={{ borderRadius: "10px 10px 0px 0px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="globleGradientBlue" sx={{ boxShadow: "none" }}>
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

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow hover tabIndex={-1} key={i}>
                  {columns.map((column, ind) => {
                    const value = row[column.id];
                    const isStatus =
                      statusArr.find((option) => option.value === +row?.status) || null;

                    return column.id === "username" ? (
                      <TableCell key={ind} align={column.align}>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar src={row?.avatar || ""} />
                          <Typography
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
                    ) : column.id === "service" ? (
                      <TableCell key={ind} align={column.align}>
                        <Typography sx={{ color: "#5A5A5A", lineHeight: "normal" }}>
                          {row?.services[0]?.service?.name}
                        </Typography>
                      </TableCell>
                    ) : column.id === "email" ? (
                      <TableCell key={ind} align={column.align}>
                        <Typography sx={{ color: "#5A5A5A", lineHeight: "normal" }}>
                          {row?.email}
                        </Typography>
                      </TableCell>
                    ) : column.id === "phone" ? (
                      <TableCell key={ind} align={column.align}>
                        <Typography sx={{ color: "#5A5A5A", lineHeight: "normal" }}>
                          {row?.phone}
                        </Typography>
                      </TableCell>
                    ) : column.id === "status" ? (
                      <TableCell key={ind} align={column.align}>
                        <Typography
                          sx={{
                            backgroundColor: row?.status === 1 ? "#b1f3b1" : "#f5bdbd9e",
                            color: row?.status === 1 ? "green" : "red",
                            textAlign: "center",
                            borderRadius: "10px",
                            padding: "5px 3px",
                          }}
                        >
                          {isStatus.label}
                        </Typography>
                      </TableCell>
                    ) : column.id === "actions" ? (
                      <TableCell key={ind} align={column.align}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ButtonComp
                            onClick={() =>
                              navigate(`/vendor/vendor-profile/${row?.id}`)
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
                          <IconButton
                            onClick={() => handleEdit(row?.id)}
                            sx={{ color: "#5A5A5A" }}
                          >
                            <MdEdit />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    ) : null;
                  })}
                </TableRow>
              ))}
          </TableBody>
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
