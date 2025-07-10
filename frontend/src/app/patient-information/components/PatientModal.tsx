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

export default function PatientModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">New Patient</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to patient's profile here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Patient No.</Label>
            <Input disabled id="name-1" name="name" defaultValue="P001" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">First Name</Label>
              <Input id="username-1" name="firstName" defaultValue="Pedro" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-2">Last Name</Label>
              <Input id="username-2" name="lastName" defaultValue="Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="street-1">Street</Label>
              <Input id="street-1" name="street" defaultValue="123 Main St" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city-1">City</Label>
              <Input id="city-1" name="city" defaultValue="Springfield" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="state-1">State</Label>
              <Input id="state-1" name="state" defaultValue="IL" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="country-1">Country</Label>
              <Input id="country-1" name="country" defaultValue="USA" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="telephone-1">Telephone</Label>
              <Input id="telephone-1" name="telephone" defaultValue="62701" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input
                id="email-1"
                name="email"
                type="email"
                defaultValue="john@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
