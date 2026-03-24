import { Navbar } from "@/components/shared/navbar";
import { Hero } from "@/components/landing/hero";
import { ServicesGrid } from "@/components/landing/services-grid";
import { WhyUs } from "@/components/landing/why-us";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { ServiceArea } from "@/components/landing/service-area";
import { ContactForm } from "@/components/landing/contact-form";
import { MarqueeStrip } from "@/components/landing/marquee-strip";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="page-bg grain">
      {/* Floating decorative blobs — desktop only, too expensive for mobile GPUs */}
      <div className="hidden lg:block">
        <div className="deco-blob deco-blob-1" />
        <div className="deco-blob deco-blob-2" />
        <div className="deco-blob deco-blob-3" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <ServicesGrid />
        <WhyUs />
        <HowItWorks />
        <MarqueeStrip />
        <Testimonials />
        <ServiceArea />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
