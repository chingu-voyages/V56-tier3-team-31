import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./features/patients/patientSlice";
import singlePatientSlice from "./features/singlePatient/singlePatientSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      patients: patientSlice,
      singlePatient: singlePatientSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
