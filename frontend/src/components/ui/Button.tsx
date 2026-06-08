import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "gradient" | "secondary" | "outline" | "ghost" | "disconnect";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconRight?: boolean | React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(77,142,255,0.3)]",
  gradient:
    "bg-gradient-to-r from-blue-500 to-purple-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 group hover:shadow-[0_0_30px_rgba(77,142,255,0.4)] transition-all active:scale-95",
  secondary:
    "border border-slate-500/30 text-slate-400 px-8 py-4 rounded-xl font-bold bg-white/5 backdrop-blur-sm",
  outline:
    "border border-blue-400/30 text-[#adc6ff] bg-blue-500/10 px-6 py-2 rounded-full text-xs font-semibold hover:bg-blue-500/20 transition-all active:scale-95",
  ghost: "text-slate-300 hover:text-[#adc6ff] transition-colors",
  disconnect:
    "bg-blue-500/10 text-[#adc6ff] border border-blue-400/30 px-6 py-2 rounded-full text-xs font-semibold hover:bg-blue-500/20 transition-all active:scale-95",
};

export function Button({
  children,
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  href,
  icon,
  iconRight,
  fullWidth = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    variantStyles[variant],
    fullWidth && "w-full",
    (disabled || loading) && "cursor-not-allowed opacity-50 pointer-events-none",
    className,
  );

  const trailingIcon =
    iconRight === true ? (
      <ArrowRight
        className={cn(
          "text-[20px]",
          variant === "gradient" && "group-hover:translate-x-1 transition-transform",
        )}
      />
    ) : (
      iconRight
    );

  const content = (
    <>
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      {children}
      {!loading && trailingIcon}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  );
}
