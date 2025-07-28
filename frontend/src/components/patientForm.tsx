import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientStatuses } from "@/util";
import StatusSelect from "./statusSelect";

interface PatientFormProps {
  isUpdateStatus: boolean;
  patientId?: string;
  patientInfo?: {
    no: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    telephone: string;
    email: string;
    status: number;
  };
}

const PatientForm = (props: PatientFormProps) => {
  const { isUpdateStatus, patientInfo } = props;

  return (
    <>
      {isUpdateStatus && patientInfo?.no && (
        <input
          type="hidden"
          name="patientNoForFormData"
          value={patientInfo.no}
        />
      )}

      <div className="grid gap-3">
        <Label htmlFor="name-1">Patient No.</Label>
        <Input
          disabled
          id="name-1"
          name="name"
          placeholder="AA1234"
          defaultValue={patientInfo?.no || "-"}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div className="grid gap-3">
          <Label htmlFor="username-1">First Name</Label>
          <Input
            id="username-1"
            name="firstName"
            placeholder="Pedro"
            defaultValue={patientInfo?.firstName || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-2">Last Name</Label>
          <Input
            id="username-2"
            name="lastName"
            placeholder="Duarte"
            defaultValue={patientInfo?.lastName || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="street-1">Street</Label>
          <Input
            id="street-1"
            name="street"
            placeholder="123 Main St"
            defaultValue={patientInfo?.street || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="city-1">City</Label>
          <Input
            id="city-1"
            name="city"
            placeholder="Springfield"
            defaultValue={patientInfo?.city || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="state-1">State</Label>
          <Input
            id="state-1"
            name="state"
            placeholder="IL"
            defaultValue={patientInfo?.state || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="country-1">Country</Label>
          <Input
            id="country-1"
            name="country"
            placeholder="USA"
            defaultValue={patientInfo?.country || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="telephone-1">Telephone</Label>
          <Input
            id="telephone-1"
            name="telephone"
            placeholder="62701"
            defaultValue={patientInfo?.telephone || "-"}
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email</Label>
          <Input
            id="email-1"
            name="email"
            type="email"
            placeholder="john@example.com"
            defaultValue={patientInfo?.email || "-"}
            disabled={isUpdateStatus}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="grid gap-3">
          <Label htmlFor="currentStatus">Current Status</Label>
          <Select
            name="currentStatus"
            disabled
            value={
              patientInfo?.status
                ? patientStatuses.find(
                    (status) => status.id === patientInfo.status
                  )?.value
                : "checked-in"
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Current Status</SelectLabel>
                {patientStatuses.map((status) => (
                  <SelectItem key={status.id} value={status.value}>
                    <span className={`${status.color} rounded px-2`}>
                      {status.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {isUpdateStatus && (
          <div className="grid gap-3">
            <Label htmlFor="newStatus">New Status</Label>
            {/* <Select name="newStatus" required={isUpdateStatus} defaultValue="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>New Status</SelectLabel>
                  {patientInfo?.status &&
                    patientStatuses
                      .filter(
                        (status) =>
                          status.id === patientInfo.status - 1 ||
                          status.id === patientInfo.status + 1
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
            </Select> */}
            <StatusSelect currentStatusId={patientInfo?.status} />
          </div>
        )}
      </div>
    </>
  );
};

export default PatientForm;
