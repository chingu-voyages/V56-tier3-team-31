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

// need to get from db
const patientDetails = {
  patientNo: "P001",
  firstName: "Pedro",
  lastName: "Duarte",
  street: "123 Main St",
  city: "Springfield",
  state: "IL",
  country: "USA",
  telephone: "62701",
  email: "john@example.com",
  currentStatusId: 2,
};

interface PatientFormProps {
  isUpdateStatus: boolean;
  patientId?: string;
}

const PatientForm = (props: PatientFormProps) => {
  const { isUpdateStatus, patientId } = props;

  // fetch patient details from db if patientId is provided

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="name-1">Patient No.</Label>
        <Input disabled id="name-1" name="name" defaultValue="P001" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div className="grid gap-3">
          <Label htmlFor="username-1">First Name</Label>
          <Input
            id="username-1"
            name="firstName"
            placeholder="Pedro"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-2">Last Name</Label>
          <Input
            id="username-2"
            name="lastName"
            placeholder="Duarte"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="street-1">Street</Label>
          <Input
            id="street-1"
            name="street"
            placeholder="123 Main St"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="city-1">City</Label>
          <Input
            id="city-1"
            name="city"
            placeholder="Springfield"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="state-1">State</Label>
          <Input
            id="state-1"
            name="state"
            placeholder="IL"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="country-1">Country</Label>
          <Input
            id="country-1"
            name="country"
            placeholder="USA"
            disabled={isUpdateStatus}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="telephone-1">Telephone</Label>
          <Input
            id="telephone-1"
            name="telephone"
            placeholder="62701"
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
            disabled={isUpdateStatus}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Current Status</Label>
          {/* <Input
            id="currentStatus"
            name="currentStatus"
            type="currentStatus"
            placeholder="john@example.com"
            disabled={isUpdateStatus}
          /> */}
          <Select
            name="currentStatus"
            disabled
            value={
              patientStatuses.find(
                (status) => status.id === patientDetails.currentStatusId
              )?.value
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
            <Label htmlFor="email-1">New Status</Label>
            <Select name="newStatus">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>New Status</SelectLabel>
                  {patientStatuses
                    .filter(
                      (status) =>
                        status.id === patientDetails.currentStatusId - 1 ||
                        status.id === patientDetails.currentStatusId + 1
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
          </div>
        )}
      </div>
    </>
  );
};

export default PatientForm;
