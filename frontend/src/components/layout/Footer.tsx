import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const footerLinks = [
  { label: "Twitter", href: "https://x.com/your_handle" },
  { label: "Discord", href: "https://discord.gg/your_invite" },
  { label: "Docs", href: "https://chain.link/vrf" },
  { label: "Etherscan", href: "https://etherscan.io" },
  { label: "Github", href: "https://github.com/dev-ayush-17/AetherDraw" },
];

interface FooterProps {
  showStatus?: boolean;
}

export function Footer({ showStatus = false }: FooterProps) {
  return (
    <footer className="w-full py-8 lg:py-10 bg-[#111417] border-t border-white/5">
      <PageContainer className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xl font-semibold text-white">Aether Draw</span>
          <p className="text-xs text-slate-400">
            © 2026 AetherDraw Protocol. Built for the decentralized future.
            <br />
            <span className="inline-flex items-center gap-1 mt-1 font-medium text-slate-300">
              Crafted with ⚡ by{" "}
              <span className="text-[#adc6ff] font-bold hover:text-[#6ffbbe] transition-colors duration-200 cursor-pointer">
                Labyrinth
              </span>
              </span>
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#6ffbbe] transition-colors text-xs font-semibold opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {showStatus && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
            <span className="text-xs font-semibold text-[#4edea3]">Protocol Operational</span>
          </div>
        )}
      </PageContainer>
    </footer>
  );
}
