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
    <main className="min-h-screen pt-6">
      <div className="container mx-auto p-4">
        <PatientStatusUpdateClient patientNoFromURL={patientNo} />
      </div>
    </main>
  );
};

export default PatientStatusUpdatePage;
