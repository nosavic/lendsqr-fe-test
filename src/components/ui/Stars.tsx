import { StarIcon } from "@/components/icons";

interface StarsProps {
  value: number;
  max?: number;
}

export function Stars({ value, max = 3 }: StarsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <StarIcon
          key={index}
          className={`h-4 w-4 ${index < value ? "text-[#e9b200]" : "text-border-strong"}`}
        />
      ))}
    </div>
  );
}
