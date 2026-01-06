import { createSlice } from "@reduxjs/toolkit";
import { asyncStatus } from "../../utils/asyncStatus";
import {
  get_notes_list,
  search_notes_by_user,
  add_note_async,
  edit_note_async,
  delete_note_async,
} from "../../services/NotesService";
import {
  error_toast_message,
  success_toast_message,
} from "../../utils/toast_message";

const initialState = {
  // Get Notes List
  get_notes_list_status: asyncStatus.IDLE,
  get_notes_list_data: [],
  get_notes_list_error: null,

  // Search Notes by User
  search_notes_status: asyncStatus.IDLE,
  search_notes_data: [],
  search_notes_error: null,

  // Add Note
  add_note_status: asyncStatus.IDLE,
  add_note_data: null,
  add_note_error: null,

  // Edit Note
  edit_note_status: asyncStatus.IDLE,
  edit_note_data: null,
  edit_note_error: null,

  // Delete Note
  delete_note_status: asyncStatus.IDLE,
  delete_note_data: null,
  delete_note_error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setAsyncStatusIDLE: (state) => {
      state.add_note_status = asyncStatus.IDLE;
      state.edit_note_status = asyncStatus.IDLE;
      state.delete_note_status = asyncStatus.IDLE;
    },
    clearSearchNotes: (state) => {
      state.search_notes_status = asyncStatus.IDLE;
      state.search_notes_data = [];
      state.search_notes_error = null;
    },
  },

  extraReducers: (builder) => {
    // Get Notes List
    builder.addCase(get_notes_list.pending, (state) => {
      state.get_notes_list_status = asyncStatus.LOADING;
    });
    builder.addCase(get_notes_list.fulfilled, (state, { payload }) => {
      state.get_notes_list_status = asyncStatus.SUCCEEDED;
      state.get_notes_list_data = payload.notes;
      success_toast_message("Notes loaded successfully");
    });
    builder.addCase(get_notes_list.rejected, (state, action) => {
      state.get_notes_list_status = asyncStatus.ERROR;
      state.get_notes_list_error = action.error;
      error_toast_message(action.error.message);
    });

    // Search Notes by User
    builder.addCase(search_notes_by_user.pending, (state) => {
      state.search_notes_status = asyncStatus.LOADING;
    });
    builder.addCase(search_notes_by_user.fulfilled, (state, { payload }) => {
      state.search_notes_status = asyncStatus.SUCCEEDED;
      state.search_notes_data = payload.notes;
    });
    builder.addCase(search_notes_by_user.rejected, (state, action) => {
      state.search_notes_status = asyncStatus.ERROR;
      state.search_notes_error = action.error;
      error_toast_message(action.error.message);
    });

    // Add Note
    builder.addCase(add_note_async.pending, (state) => {
      state.add_note_status = asyncStatus.LOADING;
    });
    builder.addCase(add_note_async.fulfilled, (state, { payload }) => {
      state.add_note_status = asyncStatus.SUCCEEDED;
      state.add_note_data = payload.note;
      state.get_notes_list_data.push(payload.note);
      success_toast_message(payload.message);
    });
    builder.addCase(add_note_async.rejected, (state, action) => {
      state.add_note_status = asyncStatus.ERROR;
      state.add_note_error = action.error;
      error_toast_message(action.error.message);
    });

    // Edit Note
    builder.addCase(edit_note_async.pending, (state) => {
      state.edit_note_status = asyncStatus.LOADING;
    });
    builder.addCase(edit_note_async.fulfilled, (state, { payload }) => {
      state.edit_note_status = asyncStatus.SUCCEEDED;
      state.edit_note_data = payload.note;
      const index = state.get_notes_list_data.findIndex(
        (note) => note.id === payload.note.id
      );
      if (index !== -1) {
        state.get_notes_list_data[index] = payload.note;
      }
      success_toast_message(payload.message);
    });
    builder.addCase(edit_note_async.rejected, (state, action) => {
      state.edit_note_status = asyncStatus.ERROR;
      state.edit_note_error = action.error;
      error_toast_message(action.error.message);
    });

    // Delete Note
    builder.addCase(delete_note_async.pending, (state) => {
      state.delete_note_status = asyncStatus.LOADING;
    });
    builder.addCase(delete_note_async.fulfilled, (state, { payload }) => {
      state.delete_note_status = asyncStatus.SUCCEEDED;
      state.delete_note_data = payload;
      state.get_notes_list_data = state.get_notes_list_data.filter(
        (note) => note.id !== payload.deletedNoteId
      );
      success_toast_message(payload.message);
    });
    builder.addCase(delete_note_async.rejected, (state, action) => {
      state.delete_note_status = asyncStatus.ERROR;
      state.delete_note_error = action.error;
      error_toast_message(action.error.message);
    });
  },
});

export const { setAsyncStatusIDLE, clearSearchNotes } = notesSlice.actions;
export default notesSlice.reducer;
