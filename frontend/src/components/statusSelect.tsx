"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { patientStatuses } from "@/util";

interface StatusSelectProps {
  currentStatusId?: number;
}

const StatusSelect = ({ currentStatusId }: StatusSelectProps) => {
  const [newStatus, setNewStatus] = useState<string>();
  console.log("newStatus: ", newStatus);

  return (
    <>
      <Select
        name="newStatus"
        value={newStatus}
        onValueChange={setNewStatus}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>New Status</SelectLabel>
            {currentStatusId &&
              patientStatuses
                .filter(
                  (status) =>
                    status.id === currentStatusId - 1 ||
                    status.id === currentStatusId + 1
                )
                .map((status) => (
                  <SelectItem
                    color="0 84.2% 60.2%"
                    key={status.id}
                    value={status.value}
                  >
                    <span className={`${status.color} rounded px-2`}>
                      {status.name}
                    </span>
                  </SelectItem>
                ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <input type="hidden" name="newStatusHidden" value={newStatus} required />
    </>
  );
};

export default StatusSelect;
