import { Table } from "./components";
import { Dialog } from "@/components/ui/dialog";
export default async function Page() {
  return (
    <div className="container mx-auto p-4">
      <Dialog>
        <Table />
      </Dialog>
    </div>
  );
}
