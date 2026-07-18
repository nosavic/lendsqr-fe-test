import { motion } from "framer-motion";

interface TabsProps {
  tabs: readonly string[];
  active: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-card-line overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`relative shrink-0 whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors md:px-6 ${
              isActive ? "text-secondary" : "text-body hover:text-primary"
            }`}
          >
            {tab}
            {isActive && (
              <motion.span
                layoutId="tabs-underline"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-secondary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
