"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { patientStatuses } from "@/util";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen } from "lucide-react";
import {
  createPatient,
  handleAddPatient,
  handleEdit,
  handlePatientInput,
  updatePatient,
} from "@/lib/features/singlePatient/singlePatientSlice";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
type modeType = "edit" | "add";
export default function PatientModal({
  mode,
  patient,
}: {
  mode: modeType;
  patient?: any;
}) {
  const {
    isLoading,
    isEdit,
    patientId,
    no,
    firstName,
    lastName,
    street,
    city,
    state,
    country,
    telephone,
    email,
    status,
  } = useAppSelector((state) => state.singlePatient);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(handlePatientInput({ name, value }));
  };
  const patientData = {
    patientId,
    no,
    firstName,
    lastName,
    street,
    city,
    state,
    country,
    telephone,
    email,
    status,
  };
  const handleSave = () => {
    if (isEdit) {
      dispatch(updatePatient({ ...patientData, id: patientId }));
    } else {
      dispatch(createPatient(patientData));
    }
  };
  if (isLoading) {
    return;
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {mode === "edit" ? (
            <Button
              onClick={() => {
                dispatch(handleEdit(patient));
              }}
              variant="outline"
              size="sm"
            >
              <Pen />
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(handleAddPatient({}))}
              variant="outline"
            >
              New Patient
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>New patient's profile</DialogTitle>
            <DialogDescription>
              Make changes to patient's profile here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Patient No.</Label>
            <Input disabled id="name-1" name="name" defaultValue={no} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">First Name</Label>
              <Input
                onChange={handleChange}
                id="username-1"
                name="firstName"
                value={firstName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-2">Last Name</Label>
              <Input
                onChange={handleChange}
                id="username-2"
                name="lastName"
                value={lastName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="street-1">Street</Label>
              <Input
                onChange={handleChange}
                id="street-1"
                name="street"
                value={street}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city-1">City</Label>
              <Input
                onChange={handleChange}
                id="city-1"
                name="city"
                value={city}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="state-1">State</Label>
              <Input
                onChange={handleChange}
                id="state-1"
                name="state"
                value={state}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="country-1">Country</Label>
              <Input
                onChange={handleChange}
                id="country-1"
                name="country"
                value={country}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="telephone-1">Telephone</Label>
              <Input
                onChange={handleChange}
                id="telephone-1"
                name="telephone"
                value={telephone}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input
                onChange={handleChange}
                id="email-1"
                name="email"
                type="email"
                value={email}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status-1">Status</Label>
              <Select
                disabled={true}
                name="status"
                value={patientStatuses.find((s) => s.id === status)?.value}
              >
                <SelectTrigger>
                  <SelectValue
                    className="w-full"
                    placeholder="Select a fruit"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {patientStatuses.map((status) => (
                      <SelectItem
                        className="w-full"
                        key={status.id}
                        value={status.value}
                      >
                        <span className={`rounded py-1 px-2 ${status.color}`}>
                          {status.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={handleSave} type="submit">
              {isLoading ? <Spinner className="text-white" /> : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
