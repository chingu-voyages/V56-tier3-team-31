"use client";
import { Table } from "./components";
import { Dialog } from "@/components/ui/dialog";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPatients } from "@/lib/features/patients/patientSlice";
export default function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPatients());
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Table />
    </div>
  );
}
