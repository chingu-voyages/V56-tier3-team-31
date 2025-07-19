import { customFetch } from "@/util";
import { getAllPatients } from "../patients/patientSlice";

export const createPatientThunk = async (patientData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`patients`, patientData);
    thunkAPI.dispatch(getAllPatients());
    return data;
  } catch (error) {
    console.log(error);
    return (
      thunkAPI.rejectWithValue(error.response.data.msg) ||
      "Error occured. Please Try Again"
    );
  }
};
export const updatePatientThunk = async (patientData, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(
      `patients/${patientData.id}`,
      patientData
    );
    thunkAPI.dispatch(getAllPatients());
    return data;
  } catch (error) {
    console.log(error);
    return (
      thunkAPI.rejectWithValue(error.response.data.msg) ||
      "Error occured. Please Try Again"
    );
  }
};
export const deletePatientThunk = async (patientId, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`patients/${patientId}`);
    thunkAPI.dispatch(getAllPatients());
    return data;
  } catch (error) {
    console.log(error);
    return (
      thunkAPI.rejectWithValue(error.response.data.msg) ||
      "Error occured. Please Try Again"
    );
  }
};
