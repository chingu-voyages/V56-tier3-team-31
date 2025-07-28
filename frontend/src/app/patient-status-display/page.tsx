"use client";
import { useAppDispatch } from "@/lib/hook";
import { Table } from "./components";
import React, { useEffect } from "react";
import {
  addPaitentToStatusBoard,
  displayPatientStatus,
  removePatientFromStatusBoard,
  updatePaitentStatusBoard,
} from "@/lib/features/patients/patientSlice";
import { socket } from "@/util/socket";

export default function Page() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(displayPatientStatus({}));
  }, []);
  useEffect(() => {
    socket.on("updatePatientStatus", (patient) => {
      dispatch(updatePaitentStatusBoard(patient));
    });
    socket.on("addPatientStatus", (patient) => {
      console.log("addPatientStatus");

      dispatch(addPaitentToStatusBoard(patient));
    });
    socket.on("removePatientFromBoard", (patient) => {
      console.log("removePatientFromBoard");
      dispatch(removePatientFromStatusBoard(patient));
    });

    return () => {
      socket.off("updatePatientStatus");
      socket.off("addPatientStatus");
      socket.off("removePatientFromBoard");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Table />
    </div>
  );
}
