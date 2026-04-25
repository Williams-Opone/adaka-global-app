// src/app/page.tsx
import Hero from "@/components/features/Hero";
import OperationalPreview from "@/components/features/OperationalPreview";
import Services from "@/components/features/Services";
import InventoryCard from "@/components/features/InventoryCard";
import ContactSection from "@/components/features/ContactSection";




export default function Home() {
  return (
    <>
      <Hero />
      <OperationalPreview />
      <Services />
      <ContactSection />
      {/* Other sections like Services and About will go below this */}
    </>
  );
}