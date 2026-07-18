interface InfoFieldProps {
  label: string;
  value: string;
}

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-body">{label}</span>
      <span className="break-words text-base text-text-strong">{value}</span>
    </div>
  );
}
