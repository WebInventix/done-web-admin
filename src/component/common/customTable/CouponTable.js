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
  IconButton,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../ButtonComp";
import { MdEdit, MdDelete } from "react-icons/md";
import { deleteCouponAsync } from "../../../services/CouponService";

// Table column configuration
const columns = [
  {
    id: "code",
    displayName: "Coupon Code",
    minWidth: 120,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "discount",
    displayName: "Discount",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "type",
    displayName: "Type",
    minWidth: 100,
    align: "flex-end",
    sortAction: true,
  },
  {
    id: "validity",
    displayName: "Valid Until",
    minWidth: 120,
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
    minWidth: 150,
    align: "flex-end",
    sortAction: false,
  },
];

export const CouponTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Updated selectors to match the new slice structure
  const {
    get_all_coupons_data,
  } = useSelector((state) => state.coupons);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Use actual data from Redux store
    const couponsData = get_all_coupons_data;
    
    if (couponsData?.length) {
      // Transform backend data to frontend format
      const transformedData = couponsData.map(coupon => {
        // Determine discount type and value based on new backend format
        let discountValue = 0;
        let discountType = "percentage"; // default
        
        if (coupon.type === 0 && coupon.fixedAmount !== null) {
          // Fixed amount discount
          discountValue = coupon.fixedAmount;
          discountType = "fixed";
        } else if (coupon.type === 1 && coupon.percentage !== null) {
          // Percentage discount
          discountValue = coupon.percentage;
          discountType = "percentage";
        }
        
        return {
          id: coupon.id,
          code: coupon.name, // Backend uses 'name', frontend expects 'code'
          discount: discountValue,
          type: discountType, // "percentage" or "fixed"
          validUntil: coupon.expiry_date,
          status: new Date(coupon.expiry_date) > new Date() ? 1 : 0, // Auto-calculate status
          createdAt: coupon.created_at,
          updated_at: coupon.updated_at,
        };
      });

      setRows([
        ...transformedData.toSorted(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      ]);
    } else {
      // No data available
      setRows([]);
    }
  }, [get_all_coupons_data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Status configuration for coupons
  const statusArr = [
    { label: "Inactive", value: 0 },
    { label: "Active", value: 1 },
    { label: "Expired", value: 2 },
  ];

  // Helper function to determine coupon status
  const getCouponStatus = (coupon) => {
    const currentDate = new Date();
    const validUntilDate = new Date(coupon.validUntil);
    
    if (validUntilDate < currentDate) {
      return { label: "Expired", value: 2, color: "error" };
    } else if (coupon.status === 1) {
      return { label: "Active", value: 1, color: "success" };
    } else {
      return { label: "Inactive", value: 0, color: "default" };
    }
  };

  // Helper function to format discount display
  const formatDiscount = (discount, type) => {
    if (type === "percentage") {
      return `${discount}%`;
    } else {
      return `$${discount}`;
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (id) => {
    console.log("Edit coupon clicked for ID:", id);
    navigate(`/coupons/edit-coupon/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete coupon clicked for ID:", id);
    // Add delete confirmation logic here
    dispatch(deleteCouponAsync(id));
  };

  const handleViewDetails = (id) => {
    console.log("View coupon details for ID:", id);
    navigate(`/coupons/coupon-details/${id}`);
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
              .map((row, i) => {
                const couponStatus = getCouponStatus(row);

                console.log(row ,"row")
                
                return (
                  <TableRow hover tabIndex={-1} key={i}>
                    {columns.map((column, ind) => {
                      return column.id === "code" ? (
                        <TableCell key={ind} align={column.align}>
                          <Typography
                            sx={{
                              color: "#5A5A5A",
                              lineHeight: "normal",
                              fontWeight: "600",
                              textTransform: "uppercase",
                            }}
                          >
                            {row?.code}
                          </Typography>
                        </TableCell>
                      ) : column.id === "discount" ? (
                        <TableCell key={ind} align={column.align}>
                          <Typography sx={{ color: "#5A5A5A", lineHeight: "normal", fontWeight: "500" }}>
                            {formatDiscount(row?.discount, row?.type)}
                          </Typography>
                        </TableCell>
                      ) : column.id === "type" ? (
                        <TableCell key={ind} align={column.align}>
                          <Chip
                            label={row?.type === "percentage" ? "Percentage" : "Fixed Amount"}
                            size="small"
                            variant="outlined"
                            sx={{
                              backgroundColor: row?.type === "percentage" ? "#e3f2fd" : "#f3e5f5",
                              color: row?.type === "percentage" ? "#1976d2" : "#7b1fa2",
                              borderColor: row?.type === "percentage" ? "#1976d2" : "#7b1fa2",
                            }}
                          />
                        </TableCell>
                      ) : column.id === "validity" ? (
                        <TableCell key={ind} align={column.align}>
                          <Typography sx={{ color: "#5A5A5A", lineHeight: "normal" }}>
                            {formatDate(row?.validUntil)}
                          </Typography>
                        </TableCell>
                      )  : column.id === "status" ? (
                        <TableCell key={ind} align={column.align}>
                          <Chip
                            label={couponStatus.label}
                            size="small"
                            color={couponStatus.color}
                            sx={{
                              minWidth: "70px",
                            }}
                          />
                        </TableCell>
                      ) : column.id === "actions" ? (
                        <TableCell key={ind} align={column.align}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <ButtonComp
                              onClick={() => handleViewDetails(row?.id)}
                              label={"View Details"}
                              style={{
                                width: "auto",
                                height: "auto",
                                padding: "5px 15px",
                                background:
                                  "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                                fontSize: "12px",
                              }}
                            />
                            <IconButton
                              onClick={() => handleEdit(row?.id)}
                              sx={{ color: "#1976d2" }}
                              title="Edit Coupon"
                            >
                              <MdEdit />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row?.id)}
                              sx={{ color: "#d32f2f" }}
                              title="Delete Coupon"
                            >
                              <MdDelete />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      ) : null;
                    })}
                  </TableRow>
                );
              })}
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