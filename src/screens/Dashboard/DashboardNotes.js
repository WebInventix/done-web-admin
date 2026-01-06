import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import add from "../../assets/add.png";
import CustomButton from "../../component/common/Button/Button";
import NotesTable from "../../component/NotesComponents/NotesTable";
import AddNoteModal from "../../component/NotesComponents/AddNoteModal";
import {
  get_notes_list,
  search_notes_by_user,
} from "../../services/NotesService";
import { themeOrange } from "../../utils/colorTheme";
import { asyncStatus } from "../../utils/asyncStatus";
import "./DashboardNotes.css";

const DashboardNotes = () => {
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const debounceTimerRef = useRef(null);

  const {
    get_notes_list_status,
    get_notes_list_data,
    search_notes_status,
    search_notes_data,
  } = useSelector((state) => state.notes);

  const isLoading = get_notes_list_status === asyncStatus.LOADING;
  const isSearching = search_notes_status === asyncStatus.LOADING;

  // Initial load of all notes
  useEffect(() => {
    dispatch(get_notes_list());
  }, [dispatch]);

  // Update displayed notes when list data changes
  useEffect(() => {
    if (get_notes_list_data && get_notes_list_data.length > 0) {
      setDisplayedNotes(get_notes_list_data);
    }
  }, [get_notes_list_data]);

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchTerm.trim() === "") {
      // If search is cleared, show all notes
      setDisplayedNotes(get_notes_list_data || []);
      return;
    }

    // Set debounce timer for search
    debounceTimerRef.current = setTimeout(() => {
      dispatch(search_notes_by_user(searchTerm));
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, dispatch, get_notes_list_data]);

  // Update displayed notes when search results change
  useEffect(() => {
    if (searchTerm.trim() && search_notes_data && search_notes_data.length > 0) {
      setDisplayedNotes(search_notes_data);
    }
  }, [search_notes_data, searchTerm]);

  const handleOpenAddModal = () => {
    setEditingNote(null);
    setOpenAddModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setEditingNote(null);
  };

  if (isLoading && get_notes_list_data.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" height="60vh">
        <CircularProgress size="30px" sx={{ color: themeOrange }} />
      </Stack>
    );
  }

  return (
    <Stack bgcolor="#FAFAFA" minHeight="100vh" pb={4}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        my={1}
      >
        <Typography className="mainHeading" sx={{ cursor: "pointer" }}>
          User Notes
        </Typography>
        <Stack
          className="globleGradientBlue"
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          <CustomButton
            style={{
              backgroundColor: "transparent",
              fontSize: "20px",
              fontWeight: "400",
              paddingTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
            onClick={handleOpenAddModal}
          >
            <img
              src={add}
              style={{ height: "24px", width: "24px", color: "white" }}
              alt="add"
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              Add Note
            </Typography>
          </CustomButton>
        </Stack>
      </Stack>

      <hr color="#D1D1D1" />

      <Container
        sx={{
          maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" },
        }}
      >
        <Stack my={2} spacing={2}>
          {/* Search Section */}
          <Stack
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#333",
                marginBottom: "12px",
              }}
            >
              Search Notes by User
            </Typography>
            <TextField
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  "&:hover fieldset": {
                    borderColor: themeOrange,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: themeOrange,
                  },
                },
              }}
              disabled={isSearching}
            />
            {isSearching && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ marginTop: "8px" }}
              >
                <CircularProgress size={16} sx={{ color: themeOrange }} />
                <Typography sx={{ fontSize: "12px", color: "#999" }}>
                  Searching...
                </Typography>
              </Stack>
            )}
          </Stack>

          {/* Notes Table */}
          <NotesTable
            notes={displayedNotes}
            onEditClick={handleEditNote}
          />
        </Stack>
      </Container>

      {/* Add/Edit Note Modal */}
      <AddNoteModal
        open={openAddModal}
        onClose={handleCloseModal}
        editData={editingNote}
      />
    </Stack>
  );
};

export default DashboardNotes;
