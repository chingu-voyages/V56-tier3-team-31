import React from "react";
import PatientStatusUpdateClient from "./patientStatusUpdateClient";

const PatientStatusUpdatePage = async (props: {
  searchParams?: Promise<{
    patientNo?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const patientNo = searchParams?.patientNo || "";

  return (
    <div className="container mx-auto p-4">
      <PatientStatusUpdateClient patientNoFromURL={patientNo} />
    </div>
  );
};

export default PatientStatusUpdatePage;
