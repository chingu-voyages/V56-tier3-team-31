import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPatientThunk,
  deletePatientThunk,
  updatePatientThunk,
} from "./singlePatientThunk";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
const initialState = {
  isEdit: false,
  patientId: null,
  isLoading: false,
  no: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  telephone: "",
  email: "",
  status: 1,
};
export const createPatient = createAsyncThunk(
  "singlePatient/createPatient",
  createPatientThunk
);
export const updatePatient = createAsyncThunk(
  "singlePatient/updatePatient",
  updatePatientThunk
);
export const deletePatient = createAsyncThunk(
  "singlePatient/deletePatient",
  deletePatientThunk
);
export const singlePatientSlice = createSlice({
  name: "singlePatient",
  initialState,
  reducers: {
    handleEdit: (state, { payload }) => {
      state.isEdit = true;
      state.patientId = payload._id;
      state.no = payload.no;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.street = payload.street;
      state.city = payload.city;
      state.state = payload.state;
      state.country = payload.country;
      state.telephone = payload.telephone;
      state.email = payload.email;
      state.status = payload.status;
    },
    handlePatientInput: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handleAddPatient: (state, {}) => {
      state.isEdit = false;
      state.patientId = "";
      state.no = uuidv4().slice(0, 6).toString().toUpperCase();
      state.firstName = "";
      state.lastName = "";
      state.street = "";
      state.city = "";
      state.state = "";
      state.country = "";
      state.telephone = "";
      state.email = "";
      state.status = 1; // Assuming 1 is the default status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPatient.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(createPatient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isEdit = false;
      state.patientId = payload._id;
      toast(payload.msg || "Patient created successfully");
    });
    builder.addCase(createPatient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload || "Error occured. Please Try Again");
    });
    builder.addCase(updatePatient.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(updatePatient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isEdit = false;
      state.patientId = payload._id;
      toast(payload.msg || "Patient updated successfully");
    });
    builder.addCase(updatePatient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload || "Error occured. Please Try Again");
    });
    builder.addCase(deletePatient.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(deletePatient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast(payload.msg || "Patient deleted successfully");
    });
    builder.addCase(deletePatient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload || "Error occured. Please Try Again");
    });
  },
});

// Action creators are generated for each case reducer function
export const { handleEdit, handlePatientInput, handleAddPatient } =
  singlePatientSlice.actions;

export default singlePatientSlice.reducer;
