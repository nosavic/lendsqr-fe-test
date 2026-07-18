import { Popover } from "@/components/ui/Popover";
import { ActivateUserIcon, BlacklistUserIcon, EyeIcon, MoreVerticalIcon } from "@/components/icons";

interface UserActionsMenuProps {
  onView: () => void;
}

export function UserActionsMenu({ onView }: UserActionsMenuProps) {
  return (
    <Popover
      align="right"
      className="w-44 rounded-lg border border-card-line bg-surface p-1 shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="rounded-md p-1 text-nav-inactive transition-colors hover:bg-surface-hover"
          aria-label="Row actions"
        >
          <MoreVerticalIcon className="h-5 w-5" />
        </button>
      )}
    >
      {({ close }) => (
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => {
              close();
              onView();
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-surface-hover"
          >
            <EyeIcon className="h-4 w-4" />
            View Details
          </button>
          <button
            type="button"
            onClick={close}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-surface-hover"
          >
            <BlacklistUserIcon className="h-4 w-4" />
            Blacklist User
          </button>
          <button
            type="button"
            onClick={close}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-surface-hover"
          >
            <ActivateUserIcon className="h-4 w-4" />
            Activate User
          </button>
        </div>
      )}
    </Popover>
  );
}
