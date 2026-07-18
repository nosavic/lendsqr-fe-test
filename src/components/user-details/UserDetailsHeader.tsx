import { Button } from "@/components/ui/Button";

export function UserDetailsHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-medium text-primary">User Details</h1>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline-danger" className="h-10">
          Blacklist User
        </Button>
        <Button variant="outline-secondary" className="h-10">
          Activate User
        </Button>
      </div>
    </div>
  );
}
