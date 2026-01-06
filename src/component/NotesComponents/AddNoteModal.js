import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
  Autocomplete,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { add_note_async, edit_note_async } from "../../services/NotesService";
import { get_users_list_by_role } from "../../services/DashboardUsers";
import { asyncStatus } from "../../utils/asyncStatus";
import { themeOrange } from "../../utils/colorTheme";
import CustomButton from "../common/Button/Button";

const AddNoteModal = ({ open, onClose, editData = null }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const { add_note_status, edit_note_status } = useSelector(
    (state) => state.notes
  );
  const { get_users_list_by_role_data } = useSelector(
    (state) => state.dashboard_users
  );

  const isLoading =
    add_note_status === asyncStatus.LOADING ||
    edit_note_status === asyncStatus.LOADING;

  useEffect(() => {
    if (editData) {
      setSelectedUser({
        id: editData.userId,
        full_name: editData.userName,
        email: editData.userEmail,
      });
      setNoteText(editData.note);
    } else {
      setSelectedUser(null);
      setNoteText("");
    }
  }, [editData, open]);

  useEffect(() => {
    if (open && !get_users_list_by_role_data) {
      setLoadingUsers(true);
      dispatch(get_users_list_by_role(3)).finally(() => {
        setLoadingUsers(false);
      });
    }
    if (get_users_list_by_role_data) {
      setUsers(get_users_list_by_role_data);
    }
  }, [open, dispatch, get_users_list_by_role_data]);

  const handleAddNote = async () => {
    if (!selectedUser || !noteText.trim()) {
      alert("Please select a user and enter a note");
      return;
    }

    const noteData = {
      userId: selectedUser.id,
      userName: selectedUser.full_name,
      userEmail: selectedUser.email,
      note: noteText,
    };

    if (editData) {
      await dispatch(edit_note_async({ id: editData.id, data: noteData }));
    } else {
      await dispatch(add_note_async(noteData));
    }

    if (add_note_status !== asyncStatus.ERROR && edit_note_status !== asyncStatus.ERROR) {
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedUser(null);
    setNoteText("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "18px", color: "#333" }}>
        {editData ? "Edit Note" : "Add New Note"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name} (${option.email})`
            }
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            loading={loadingUsers}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                placeholder="Search by name or email"
                disabled={loadingUsers}
              />
            )}
          />

          <TextField
            label="Note"
            multiline
            rows={6}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note here..."
            fullWidth
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={handleClose}
          disabled={isLoading}
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333",
            padding: "8px 24px",
            fontSize: "14px",
          }}
        >
          Cancel
        </CustomButton>
        <Box sx={{ position: "relative" }}>
          <CustomButton
            onClick={handleAddNote}
            disabled={isLoading}
            style={{
              background: `linear-gradient(180deg, ${themeOrange} 0%, #C53F10 100%)`,
              color: "white",
              padding: "8px 24px",
              fontSize: "14px",
            }}
          >
            {editData ? "Update Note" : "Add Note"}
          </CustomButton>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: themeOrange,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddNoteModal;
