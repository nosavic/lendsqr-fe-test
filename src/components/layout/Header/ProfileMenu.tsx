import { useRouter } from "next/router";
import { Avatar } from "@/components/ui/Avatar";
import { Popover } from "@/components/ui/Popover";
import { ChevronDownIcon, LogoutIcon } from "@/components/icons";

const PROFILE_NAME = "Adedeji";

export function ProfileMenu() {
  const router = useRouter();

  return (
    <Popover
      align="right"
      className="w-40 overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-lg"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-surface-hover"
        >
          <Avatar name={PROFILE_NAME} />
          <span className="hidden text-[0.975rem] font-medium text-primary sm:inline">{PROFILE_NAME}</span>
          <ChevronDownIcon className="hidden h-3 w-3 text-primary sm:inline" />
        </button>
      )}
    >
      {({ close }) => (
        <button
          type="button"
          onClick={() => {
            close();
            router.push("/login");
          }}
          className="flex w-full items-center gap-2 px-4 py-3 text-sm text-text-strong transition-colors hover:bg-surface-hover"
        >
          <LogoutIcon className="h-4 w-4" />
          Logout
        </button>
      )}
    </Popover>
  );
}
