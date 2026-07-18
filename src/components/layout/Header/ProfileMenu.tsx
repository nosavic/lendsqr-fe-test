import { useRouter } from "next/router";
import { Avatar } from "@/components/ui/Avatar";
import { Popover } from "@/components/ui/Popover";
import { ChevronDownIcon, LogoutIcon } from "@/components/icons";
import styles from "./ProfileMenu.module.scss";

const PROFILE_NAME = "Adedeji";

export function ProfileMenu() {
  const router = useRouter();

  return (
    <Popover
      className={styles.panel}
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className={styles.trigger}>
          <Avatar name={PROFILE_NAME} />
          <span className={styles.name}>{PROFILE_NAME}</span>
          <ChevronDownIcon className={styles.caret} />
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
          className={styles.logout}
        >
          <LogoutIcon className={styles.logoutIcon} />
          Logout
        </button>
      )}
    </Popover>
  );
}
