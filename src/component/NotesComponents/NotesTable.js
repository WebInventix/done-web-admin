import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";
import { delete_note_async } from "../../services/NotesService";
import { asyncStatus } from "../../utils/asyncStatus";
import { themeOrange } from "../../utils/colorTheme";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomButton from "../common/Button/Button";

dayjs.extend(relativeTime);

const NotesTable = ({ notes = [], onEditClick }) => {
  const dispatch = useDispatch();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const { delete_note_status } = useSelector((state) => state.notes);
  const isDeleting = delete_note_status === asyncStatus.LOADING;

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (noteToDelete) {
      await dispatch(delete_note_async(noteToDelete.id));
      setDeleteConfirmOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleEditClick = (note) => {
    onEditClick(note);
  };

  if (notes.length === 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        py={4}
        sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <Typography sx={{ color: "#999", fontSize: "14px" }}>
          No notes found
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  padding: "16px",
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  padding: "16px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  padding: "16px",
                }}
              >
                Note
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  padding: "16px",
                }}
              >
                Last Updated
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  padding: "16px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note, index) => (
              <TableRow
                key={note.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <TableCell sx={{ padding: "16px", fontSize: "14px" }}>
                  <Typography sx={{ fontWeight: 500, color: "#333" }}>
                    {note.first_name} {note.last_name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px", fontSize: "14px" }}>
                  <Typography sx={{ color: "#666" }}>{note.userEmail}</Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px", fontSize: "14px" }}>
                  <Typography
                    sx={{
                      color: "#666",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "300px",
                    }}
                    title={note.note}
                  >
                    {note.note}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px", fontSize: "13px" }}>
                  <Typography sx={{ color: "#999" }}>
                    {dayjs(note.updatedAt).fromNow()}
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(note)}
                      sx={{
                        color: themeOrange,
                        "&:hover": {
                          backgroundColor: "rgba(241, 90, 36, 0.1)",
                        },
                      }}
                    >
                      <MdEdit size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(note)}
                      disabled={isDeleting}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <MdDelete size={18} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this note for {noteToDelete?.userName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={() => setDeleteConfirmOpen(false)}
            disabled={isDeleting}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              padding: "8px 24px",
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            style={{
              backgroundColor: "#d32f2f",
              color: "white",
              padding: "8px 24px",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotesTable;
