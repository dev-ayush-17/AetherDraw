import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import  EnterRaffleButton  from "@/components/TestWallet"
import ContractTest from "@/components/TestComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111417] text-slate-100">
      <Navbar variant="dashboard" />

      <main className="relative flex-1 w-full overflow-hidden">
        <PageContainer>
          <HeroSection />
          <FeaturesSection />
        </PageContainer>
      </main>
      
      <Footer showStatus />
    </div>
  );
}
