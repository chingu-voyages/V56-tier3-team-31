"use client";

import React from "react";
// import { useDebouncedCallback } from "use-debounce";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PatientSearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  let patientNoInURL = params.get("patientNo") || "";

  const handleURL = (patientNo: string) => {
    if (patientNo) {
      params.set("patientNo", patientNo);
      patientNoInURL = patientNo;
    } else {
      params.delete("patientNo");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="sm:flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const patientNo = formData.get("name") as string;
        handleURL(patientNo);
      }}
    >
      <div className="grid gap-3 w-full">
        <Label htmlFor="name-1">Search by Patient No.</Label>
        <Input
          id="name-1"
          name="name"
          placeholder="AA1234"
          defaultValue={patientNoInURL}
          required
        />
      </div>
      <Button type="submit" className="self-end mt-4 sm:mt-0">
        Search Patient
      </Button>
    </form>
  );
};

export default PatientSearchForm;
