// src/app/page.tsx
import Hero from "@/components/features/Hero";
import OperationalPreview from "@/components/features/OperationalPreview";
import Services from "@/components/features/Services";
import InventoryCard from "@/components/features/InventoryCard";
import ContactSection from "@/components/features/ContactSection";


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "ADAKA GLOBAL INC",
  "url": "https://www.adakaglobalinc.com",
  "logo": "https://res.cloudinary.com/dotcy7lhz/image/upload/v1776879640/dzsqepd6ckgn7lqdrqos.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "addressCountry": "CA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-825-760-4125",
    "contactType": "customer service"
  }
};

// Inside your component:


export default function Home() {
  return (
    <>
        <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
      <Hero />
      <OperationalPreview />
      <Services />
      <ContactSection />
      {/* Other sections like Services and About will go below this */}
    </>
  );
}