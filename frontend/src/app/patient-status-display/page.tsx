"use client";
import { useAppDispatch } from "@/lib/hook";
import { Table } from "./components";
import React, { useEffect } from "react";
import { displayPatientStatus } from "@/lib/features/patients/patientSlice";

export default function page() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(displayPatientStatus({}));
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Table />
    </div>
  );
}
