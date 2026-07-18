interface AvatarProps {
  name: string;
  className?: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-avatar-bg font-medium text-primary ${className ?? "h-10 w-10 text-sm"}`}
    >
      {initials(name)}
    </span>
  );
}
