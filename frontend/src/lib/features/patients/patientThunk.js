import { customFetch } from "@/util";

export const getAllPatientsThunk = async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`patients`);
    return data;
  } catch (error) {
    console.log(error);
    return (
      thunkAPI.rejectWithValue(error.response.data.msg) ||
      "Error occured. Please Try Again"
    );
  }
};
