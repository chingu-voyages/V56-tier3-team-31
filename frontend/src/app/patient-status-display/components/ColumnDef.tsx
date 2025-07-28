import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
const PatientType = {
  _id: String,
  firstName: String,
  lastName: String,
  status: Number,
};
export const columns: ColumnDef<(typeof PatientType)[]>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => <div className="capitalize">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusId = row.getValue("status");
      const currentStatus = patientStatuses.find(
        (status) => status.id === statusId
      );
      return (
        <span className={`${currentStatus?.color} px-2 py-1 rounded`}>
          {currentStatus?.name}
        </span>
      );
    },
  },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const data = row.original;

  //       return (
  //         <div className="gap-2 flex items-center">
  //           <PatientModal mode="edit" patient={data} />
  //           <DeleteModal patient={data} />
  //         </div>
  //       );
  //     },
  //   },
];

import { Button } from "@/components/ui/button";
import { patientStatuses } from "@/util";
