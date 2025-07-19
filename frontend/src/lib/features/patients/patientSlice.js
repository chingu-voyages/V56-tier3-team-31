import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPatientsThunk } from "./patientThunk";
import { toast } from "sonner";
const initialState = {
  patients: [],
  isLoading: false,
};
export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  getAllPatientsThunk
);
export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPatients.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPatients.fulfilled, (state, { payload }) => {
      const { patients } = payload;
      state.isLoading = false;
      state.patients = patients;
    });
    builder.addCase(getAllPatients.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload || "Error occured. Please Try Again");
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = patientSlice.actions;

export default patientSlice.reducer;
