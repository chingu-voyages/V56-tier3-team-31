'use client";';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { deletePatient } from "@/lib/features/singlePatient/singlePatientSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";

const DeleteModal = ({ patientId }: { patientId: string }) => {
  const { isLoading } = useAppSelector((state) => state.singlePatient);
  console.log("patientId", patientId);

  const dispatch = useAppDispatch();
  if (isLoading) {
    return;
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger>
          {/* <Button variant="destructive" size="sm"> */}
          <Trash className="text-red-500 hover:cursor-pointer" />
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete
              patient's profile and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              onClick={() => {
                console.log("Deleting patient with ID:", patientId);

                dispatch(deletePatient(patientId));
              }}
              variant="destructive"
            >
              {isLoading ? <Spinner /> : "Yes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteModal;
