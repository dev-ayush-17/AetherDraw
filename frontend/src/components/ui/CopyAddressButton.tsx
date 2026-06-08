"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface CopyAddressButtonProps {
  address: string;
  className?: string;
}

export function CopyAddressButton({ address, className }: CopyAddressButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      title="Copy Address"
      className={cn("cursor-pointer", className)}
      onClick={() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={`Copy address ${address}`}
    >
      <Icon
        name={copied ? "check" : "content_copy"}
        className={cn(
          "text-sm hover:text-primary transition-colors",
          copied ? "text-tertiary" : "text-on-surface-variant",
        )}
      />
    </button>
  );
}
