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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../ButtonComp";
import { img_url } from "../../../utils/helper/urls";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { MdUndo } from "react-icons/md";
import { baseURL, apiHandle } from "../../../config/apiHandle/apiHandle";
import { save_tokens_constant } from "../../../utils/asyncStatus";
import { 
  error_toast_message, 
  success_toast_message 
} from "../../../utils/toast_message";

const columns = [
  {
    id: "service",
    displayName: "Service Name",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "user",
    displayName: "Order By",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "user-email",
    displayName: "User Email",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "created_at",
    displayName: "Created By",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "total_amount",
    displayName: "Total Amount",
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
    minWidth: 120,
    align: "flex-end",
    sortAction: true,
  },
];

export const UserJobsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { get_all_user_jobs_status, get_all_user_jobs_data } = useSelector(
    (state) => state.userJobsSlice
  );

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Refund dialog states
  const [refundDialog, setRefundDialog] = useState({
    open: false,
    orderId: null,
    orderData: null,
  });
  const [refundReason, setRefundReason] = useState("");
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundError, setRefundError] = useState("");

  useEffect(() => {
    if (get_all_user_jobs_data?.length) {
      setRows([
        ...get_all_user_jobs_data?.toSorted(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
    }
  }, [get_all_user_jobs_data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusArr = [
    {
      label: "Approved",
      value: 1,
    },
    {
      label: "Rejected",
      value: 2,
    },
    {
      label: "Pending",
      value: 0,
    },
  ];

  const auth_token = localStorage.getItem(save_tokens_constant.AUTH);

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.get(`${baseURL}/admin/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        // Remove the deleted order from the state
        setRows(rows.filter((row) => row.id !== id));
        success_toast_message("Order deleted successfully!");
      } catch (error) {
        console.error("Failed to delete order:", error);
        error_toast_message("Failed to delete order. Please try again.");
      }
    }
  };

  // Handle opening refund dialog
  const handleRefundClick = (order) => {
    setRefundDialog({
      open: true,
      orderId: order.id,
      orderData: order,
    });
    setRefundReason("");
    setRefundError("");
  };

  // Handle closing refund dialog
  const handleRefundClose = () => {
    setRefundDialog({
      open: false,
      orderId: null,
      orderData: null,
    });
    setRefundReason("");
    setRefundError("");
  };

  // Handle refund submission
  const handleRefundSubmit = async () => {
    if (!refundReason.trim()) {
      setRefundError("Please provide a reason for the refund");
      return;
    }

    setRefundLoading(true);
    setRefundError("");

    try {
      const refundData = {
        order_id: refundDialog.orderId,
        reason: refundReason.trim(),
      };

      console.log("Sending refund request:", refundData);

      const response = await apiHandle.post("/admin/stripe/refund", refundData);
      
      console.log("Refund response:", response.data);

      if (response.data.status) {
        success_toast_message(response.data.message || "Refund processed successfully");
        handleRefundClose();
        
        // Update the order status in the table
        setRows(prevRows => 
          prevRows.map(row => 
            row.id === refundDialog.orderId 
              ? { ...row, status: "Refunded" }
              : row
          )
        );
      } else {
        setRefundError(response.data.message || "Failed to process refund");
      }
    } catch (error) {
      console.error("Refund error:", error);
      const errorMessage = error?.response?.data?.message || "Failed to process refund. Please try again.";
      setRefundError(errorMessage);
      error_toast_message(errorMessage);
    } finally {
      setRefundLoading(false);
    }
  };

  // Check if order can be refunded
   const canRefund = (order) => {
    console.log(order, 'order');
    const refundableStatuses = ["Completed", "completed", "Paid", "paid"];
    const hasValidStatus = refundableStatuses.includes(order.status);
    const hasPaymentId = order.payment_id && order.payment_id !== null && order.payment_id !== "";
    
    console.log('Status check:', hasValidStatus, 'Payment ID check:', hasPaymentId, 'Payment ID:', order.payment_id);
    
    return hasValidStatus && hasPaymentId;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
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

                          return column.id === "service" ? (
                            <TableCell key={ind} align={column.align}>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={2}
                              >
                                <Stack
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  sx={{
                                    backgroundColor: "#e9e9e9",
                                    height: "40px",
                                    width: "40px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    flexShrink: "0",
                                  }}
                                >
                                  <Avatar
                                    src={`${img_url}${row?.service?.image}`}
                                    sx={{
                                      height: "100%",
                                      width: "100%",
                                      borderRadius: "0px",
                                      objectFit: "contain",
                                    }}
                                  />
                                </Stack>

                                <Typography
                                  sx={{
                                    color: "#5A5A5A",
                                    lineHeight: "normal",
                                  }}
                                >
                                  {row?.service?.name || "-"}
                                </Typography>
                              </Stack>
                            </TableCell>
                          ) : column.id === "user" ? (
                            <TableCell key={ind} align={column.align}>
                              <Typography
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                }}
                              >
                                {`${row?.user?.first_name || "-"} ${
                                  row?.user?.last_name || ""
                                }`}
                              </Typography>
                            </TableCell>
                          ) : column.id === "user-email" ? (
                            <TableCell key={ind} align={column.align}>
                              <Typography
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                }}
                              >
                                {row?.user?.email}
                              </Typography>
                            </TableCell>
                          ) : column.id === "created_at" ? (
                            <TableCell key={ind} align={column.align}>
                              <Typography
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                }}
                              >
                                {formatDate(row?.created_at) || "-"}
                              </Typography>
                            </TableCell>
                          ) : column.id === "total_amount" ? (
                            <TableCell key={ind} align={column.align}>
                              <Typography
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                  fontWeight: "600",
                                }}
                              >
                                ${row?.total_amount ? parseFloat(row.total_amount).toFixed(2) : "0.00"}
                              </Typography>
                            </TableCell>
                          ) : column.id === "status" ? (
                            <TableCell key={ind} align={column.align}>
                              <Typography
                                sx={{
                                  color: "#5A5A5A",
                                  lineHeight: "normal",
                                  backgroundColor:
                                    row?.status === "Completed"
                                      ? "#b1f3b1"
                                      : row?.status === "Assigned"
                                      ? "#b3d9ff"
                                      : row?.status === "In-Queue"
                                      ? "#ffe5b4"
                                      : row?.status === "Refunded"
                                      ? "#ffcccb"
                                      : "#f5bdbd9e",
                                  color:
                                    row?.status === "Completed"
                                      ? "green"
                                      : row?.status === "Assigned"
                                      ? "#0056b3"
                                      : row?.status === "In-Queue"
                                      ? "#cc7000"
                                      : row?.status === "Refunded"
                                      ? "#d32f2f"
                                      : "red",
                                  textAlign: "center",
                                  borderRadius: "10px",
                                  padding: "5px 3px",
                                }}
                              >
                                {row?.status || "-"}
                              </Typography>
                            </TableCell>
                          ) : (
                            <TableCell key={ind} align={column.align}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                {/* View Order Button */}
                                <IconButton
                                  onClick={() =>
                                    navigate(`/orders/order-detail/${row?.id}`)
                                  }
                                  sx={{
                                    background:
                                      "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                                    ":hover": {
                                      background:
                                        "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                                    },
                                  }}
                                  title="View Order Details"
                                >
                                  <FaRegEye size={16} style={{ color: "white" }} />
                                </IconButton>

                                {/* Refund Button */}
                                {canRefund(row) && (
                                  <IconButton
                                    onClick={() => handleRefundClick(row)}
                                    sx={{
                                      backgroundColor: "#d32f2f",
                                      ":hover": {
                                        backgroundColor: "#b71c1c",
                                      },
                                    }}
                                    title="Process Refund"
                                  >
                                    <MdUndo size={16} style={{ color: "white" }} />
                                  </IconButton>
                                )}

                                {/* Delete Order Button */}
                                <IconButton
                                  onClick={() => handleDeleteOrder(row?.id)}
                                  sx={{
                                    backgroundColor: "#757575",
                                    ":hover": {
                                      backgroundColor: "#424242",
                                    },
                                  }}
                                  title="Delete Order"
                                >
                                  <FaTrashAlt size={16} style={{ color: "white" }} />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
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

      {/* Refund Dialog */}
      <Dialog 
        open={refundDialog.open} 
        onClose={handleRefundClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: 600 }}>
              Process Refund
            </Typography>
            {refundDialog.orderData && (
              <Typography variant="body2" color="text.secondary">
                <strong>Order ID:</strong> {refundDialog.orderId} • 
                <strong> Service:</strong> {refundDialog.orderData.service?.name} • 
                <strong> Customer:</strong> {refundDialog.orderData.user?.first_name} {refundDialog.orderData.user?.last_name} • 
                <strong> Amount:</strong> ${refundDialog.orderData.total_amount?.toLocaleString()}
              </Typography>
            )}
          </Stack>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {refundError && (
              <Alert severity="error">{refundError}</Alert>
            )}
            
            <TextField
              fullWidth
              label="Refund Reason"
              multiline
              rows={4}
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Please provide a detailed reason for this refund (e.g., customer dissatisfaction, service quality issues, etc.)"
              error={!!refundError && !refundReason.trim()}
              helperText={
                !refundReason.trim() && refundError 
                  ? "Reason is required" 
                  : "This reason will be recorded for audit purposes"
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#d32f2f",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
              }}
            />

            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Warning:</strong> This action cannot be undone. The refund will be processed immediately and the customer will be notified.
              </Typography>
            </Alert>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleRefundClose}
            disabled={refundLoading}
            sx={{ 
              color: "#666",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)"
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRefundSubmit}
            disabled={refundLoading || !refundReason.trim()}
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c"
              },
              "&:disabled": {
                backgroundColor: "#ccc"
              }
            }}
          >
            {refundLoading ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                Processing Refund...
              </>
            ) : (
              "Process Refund"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};