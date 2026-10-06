import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { About } from "@/components/sections/About";
import { Atelier } from "@/components/sections/Atelier";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Portfolio />
        <Process />
        <Atelier />
        <About />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZHBjeGd0dmJtaGpnZ3hnc3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyOTk3MDQsImV4cCI6MjEwNjg3NTcwNH0.Cs9ih6zMTJnge2Egk_fMeIQWYLCaiAH3WK6u3W4Mpo4
//https://frdpcxgtvbmhjggxgspq.supabase.co