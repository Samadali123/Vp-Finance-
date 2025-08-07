
import { createSlice } from "@reduxjs/toolkit";
import {
  createClientFirstForm,
  completeClientForm,
  getAllFullClients,
  updateAddClientForm,
  deleteAddClientForm,
  fetchByidCompleteForm,
} from "./ClientThunx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  clients: [],
  client: null,
  step: 1,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClientState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.step = 1;
    },
  },
  extraReducers: (builder) => {
    // 🔹 Step 1: Client First Form
    builder
      .addCase(createClientFirstForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientFirstForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.client = action.payload;
        state.clients.unshift(action.payload);
        state.step = 2;
      })
      .addCase(createClientFirstForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Step 2: Complete AddClientForm
    builder
      .addCase(completeClientForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeClientForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients.unshift(action.payload);
      })
      .addCase(completeClientForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Get all clients
    builder
      .addCase(getAllFullClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFullClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getAllFullClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get complete form

      .addCase(fetchByidCompleteForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByidCompleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(fetchByidCompleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateAddClientForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddClientForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.clients.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateAddClientForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Delete AddClientForm
    builder
      .addCase(deleteAddClientForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddClientForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload.id
        );
      })
      .addCase(deleteAddClientForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })    
  },



});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
