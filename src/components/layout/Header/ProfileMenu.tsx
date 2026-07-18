import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ChevronDownIcon, LogoutIcon, MoonIcon, SunIcon } from "@/components/icons";
import { Avatar, Popover } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import styles from "./ProfileMenu.module.scss";

const PROFILE_NAME = "Adedeji";

export function ProfileMenu() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

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
        <>
          <button type="button" onClick={toggleTheme} className={styles.item}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={styles.itemIcon}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.span>
            {isDark ? "Dark mode" : "Light mode"}
          </button>

          <div className={styles.separator} role="separator" />

          <button
            type="button"
            onClick={() => {
              close();
              router.push("/login");
            }}
            className={`${styles.item} ${styles.danger}`}
          >
            <span className={styles.itemIcon}>
              <LogoutIcon />
            </span>
            Logout
          </button>
        </>
      )}
    </Popover>
  );
}
