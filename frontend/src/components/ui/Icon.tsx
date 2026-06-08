import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  title?: string;
}

export function Icon({ name, className, filled = false, title }: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined",
        filled && "material-symbols-filled",
        className,
      )}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      {name}
    </span>
  );
}
