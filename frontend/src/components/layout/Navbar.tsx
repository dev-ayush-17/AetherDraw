"use client";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/layout/PageContainer";
import { MOCK_NETWORK, MOCK_WALLET_ADDRESS } from "@/lib/mock-data";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { usePathname } from "next/navigation";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Raffle", href: "/raffle" },
  { label: "Results", href: "/winners" },
];

interface NavbarProps {
  variant?: "landing" | "dashboard";
}

export function Navbar({ variant = "landing" }: NavbarProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111417]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_0_20px_rgba(173,198,255,0.1)]">

      <PageContainer className="flex justify-between items-center h-20">
        <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-black text-[#adc6ff] tracking-tighter shrink-0"
          >
            Aether Draw
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              // 4. Dynamically calculate if this specific link is active
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    isActive
                      ? "text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 text-base"
                      : "text-slate-300 font-medium hover:text-blue-400 transition-colors duration-200 text-base"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {variant === "dashboard" ? (
            <>
              <button type="button" className="hidden md:block" aria-label="Settings">
                <Settings className="p-1 text-slate-300 hover:text-[#adc6ff] transition-colors" />
              </button>
              <ConnectButton />
            </>
          ) : (
            <>
              <button type="button" className="hidden md:block" aria-label="Settings">
                <Settings className="p-1 text-slate-300 hover:text-[#adc6ff] transition-colors" />
              </button>
              <ConnectButton />
            </>
          )}
        </div>
      </PageContainer>
    </header>
  );
}
