interface EmptyTabProps {
  message: string;
}

export function EmptyTab({ message }: EmptyTabProps) {
  return <p className="py-16 text-center text-sm text-body">{message}</p>;
}
