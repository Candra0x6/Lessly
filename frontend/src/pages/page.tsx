import { Suspense } from "react";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Deploy from "@/components/sections/deploy";
import Decentralized from "@/components/sections/decentralized";
import Audience from "@/components/sections/audience";
import HowItWorks from "@/components/sections/how-it-works";
import Scale from "@/components/sections/scale";
import Cta from "@/components/sections/cta";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Pricing from "@/components/sections/pricing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <main className=" mx-auto">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Hero />
          <Features />
          <Deploy />
          <Decentralized />
          <Audience />
          <HowItWorks />
          <Scale />
          <Pricing />
          <Cta />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
