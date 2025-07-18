import React from "react";
import PatientForm from "@/components/patientForm";
import { Button } from "@/components/ui/button";

const PatientStatusUpdatePage = () => {
  return (
    <div className="container mx-auto p-4">
      <form>
        <PatientForm isUpdateStatus={true} patientId="P001" />
        <div className="flex justify-end space-x-2 mt-8">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default PatientStatusUpdatePage;
