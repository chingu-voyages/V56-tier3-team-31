import React from "react";
import PatientSearchForm from "@/components/patientSearchForm";
import PatientForm from "@/components/patientForm";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";

const PatientStatusUpdatePage = async (props: {
  searchParams?: Promise<{
    patientNo?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const patientNo = searchParams?.patientNo || "";

  let patientInfo;

  if (patientNo) {
    const headersObj = await headers();
    const host = headersObj.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const cookie = headersObj.get("cookie") || "";

    const response = await fetch(
      `${protocol}://${host}/api/patients/${patientNo}`,
      {
        headers: {
          Cookie: cookie,
        },
        credentials: "include", // required for cookie to be sent
        cache: "no-store", // optional: skip caching for up-to-date data
      }
    );

    if (!response.ok) {
      return console.error(
        "Failed to fetch patient data:",
        response.statusText
      );
    }
    const data = await response.json();
    patientInfo = data.patient;
  }

  return (
    <div className="container mx-auto p-4">
      <PatientSearchForm />

      <h2 className="text-2xl font-bold mt-6 mb-4">Patient Found:</h2>

      <form>
        <PatientForm isUpdateStatus={true} patientInfo={patientInfo} />
        <div className="flex justify-end space-x-2 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default PatientStatusUpdatePage;
