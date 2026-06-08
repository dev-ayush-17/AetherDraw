import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "landing" | "dashboard";
}

export function Card({ children, className, variant = "landing" }: CardProps) {
  return (
    <div
      className={cn(
        variant === "dashboard" ? "glass-card-dashboard" : "glass-card",
        "rounded-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
