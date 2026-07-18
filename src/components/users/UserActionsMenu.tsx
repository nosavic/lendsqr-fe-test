import { Popover } from "@/components/ui/Popover";
import { ActivateUserIcon, BlacklistUserIcon, EyeIcon, MoreVerticalIcon } from "@/components/icons";
import styles from "./UserActionsMenu.module.scss";

interface UserActionsMenuProps {
  onView: () => void;
}

export function UserActionsMenu({ onView }: UserActionsMenuProps) {
  return (
    <Popover
      align="right"
      className={styles.panel}
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className={styles.trigger} aria-label="Row actions">
          <MoreVerticalIcon className={styles.triggerIcon} />
        </button>
      )}
    >
      {({ close }) => (
        <div className={styles.list}>
          <button
            type="button"
            onClick={() => {
              close();
              onView();
            }}
            className={styles.action}
          >
            <EyeIcon className={styles.actionIcon} />
            View Details
          </button>
          <button type="button" onClick={close} className={styles.action}>
            <BlacklistUserIcon className={styles.actionIcon} />
            Blacklist User
          </button>
          <button type="button" onClick={close} className={styles.action}>
            <ActivateUserIcon className={styles.actionIcon} />
            Activate User
          </button>
        </div>
      )}
    </Popover>
  );
}
