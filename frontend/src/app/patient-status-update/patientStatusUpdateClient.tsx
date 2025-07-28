"use client";

import PatientForm from "@/components/patientForm";
import PatientSearchForm from "@/components/patientSearchForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updatePatientStatus } from "@/lib/actions";
import { Patient } from "@/types/db";
import React, { useActionState, useEffect, useRef, useState } from "react";

interface PatientStatusUpdateClientProps {
  patientNoFromURL: string;
}

const PatientStatusUpdateClient = ({
  patientNoFromURL,
}: PatientStatusUpdateClientProps) => {
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState<Omit<Patient, "_id"> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const initialLoadDone = useRef(false);

  const [updateErrorMessage, updateFormAction, isUpdatePending] =
    useActionState(updatePatientStatus, undefined);

  const handleSearch = async (patientNo: string) => {
    if (!patientNo) return;

    setLoading(true);
    setError(null);
    setPatientInfo(null);

    try {
      const response = await fetch(`/api/patients/${patientNo}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Failed to fetch patient data: ${errorText}`);
        return;
      }

      const data = await response.json();
      setPatientInfo(data.patient);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setError("Failed to fetch patient data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialLoadDone.current && patientNoFromURL) {
      initialLoadDone.current = true;
      handleSearch(patientNoFromURL);
    }
  }, [patientNoFromURL]);

  return (
    <>
      <PatientSearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner className="mt-4" />}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {patientInfo && !loading && !error && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-4">Patient Found:</h2>

          <form action={updateFormAction}>
            <PatientForm isUpdateStatus={true} patientInfo={patientInfo} />
            {updateErrorMessage && (
              <p className="text-sm text-red-500 mt-4">{updateErrorMessage}</p>
            )}
            <div className="flex justify-end space-x-2 mt-8">
              <Button type="submit" disabled={isUpdatePending}>
                {isUpdatePending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default PatientStatusUpdateClient;
