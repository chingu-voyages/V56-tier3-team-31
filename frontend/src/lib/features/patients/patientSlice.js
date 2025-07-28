import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayPatientStatusThunk, getAllPatientsThunk } from "./patientThunk";
import { toast } from "sonner";
const initialState = {
  patients: [],
  displayPatientStatus: [],
  isLoading: false,
};
export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  getAllPatientsThunk
);
export const displayPatientStatus = createAsyncThunk(
  "patients/displayPatientStatus",
  displayPatientStatusThunk
);
export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    updatePaitentStatusBoard: (state, { payload }) => {
      let newDisplay = [];
      const updatedPatient = state.displayPatientStatus.find(
        (patient) => patient._id === payload._id
      );
      if (updatedPatient) {
        newDisplay = state.displayPatientStatus.map((patient) => {
          if (patient._id === payload._id) {
            return payload;
          } else {
            return patient;
          }
        });
      } else {
        newDisplay = [...state.displayPatientStatus, payload];
      }

      state.displayPatientStatus = newDisplay || [];
      toast("Patient Status Board Updated");
    },
    addPaitentToStatusBoard: (state, { payload }) => {
      const newDisplay = [...state.displayPatientStatus, payload];

      state.displayPatientStatus = newDisplay || [];
      toast("Patient Status Board Updated");
    },
    removePatientFromStatusBoard: (state, { payload }) => {
      const newDisplay = state.displayPatientStatus.filter(
        (patient) => patient._id !== payload._id
      );
      state.displayPatientStatus = newDisplay || [];
      toast("Patient Status Board Updated");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPatients.pending, (state) => {
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
    builder.addCase(displayPatientStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(displayPatientStatus.fulfilled, (state, { payload }) => {
      const { patients } = payload;
      state.isLoading = false;
      state.displayPatientStatus = patients;
    });
    builder.addCase(displayPatientStatus.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload || "Error occured. Please Try Again");
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  updatePaitentStatusBoard,
  addPaitentToStatusBoard,
  removePatientFromStatusBoard,
} = patientSlice.actions;

export default patientSlice.reducer;
