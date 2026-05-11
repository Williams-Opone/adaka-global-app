"use client";

import { Inter, Bebas_Neue } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { Metadata } from 'next';

// Font configurations
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const bebas = Bebas_Neue({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-bebas" 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adakaglobalinc.com'),
  title: {
    default: "ADAKA GLOBAL INC | Maritime & Engineering Industrial Excellence",
    template: "%s | ADAKA GLOBAL INC"
  },
  description: "Registered Maritime and Engineering services in Canada and Nigeria. Specialized in industrial procurement, fleet management, and engineering excellence since 2011.",
  keywords: ["Maritime Services Calgary", "Engineering Procurement Nigeria", "Industrial Equipment Sales", "ADAKA GLOBAL", "Fleet Management Canada"],
  authors: [{ name: "ADAKA GLOBAL INC" }],
  openGraph: {
    title: "ADAKA GLOBAL INC | Industrial Excellence",
    description: "Global maritime and engineering solutions serving the Canadian and Nigerian markets.",
    url: "https://www.adakaglobalinc.com",
    siteName: "ADAKA GLOBAL INC",
    images: [
      {
        url: "/public/images/adakalogo.JPG", // Create a 1200x630px image in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check if the current URL starts with /admin
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${bebas.variable}`} 
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen flex flex-col bg-primary text-secondary font-sans antialiased overflow-x-hidden w-full" 
        suppressHydrationWarning={true}
      >
        {/* Only show Navbar if NOT on an admin page */}
        {!isAdminPage && <Navbar />}

        {/* We use a conditional class for padding. 
            On admin pages, we remove 'pt-20' so your Admin Dashboard starts at the very top.
        */}
        <main className={`flex-grow ${!isAdminPage ? "pt-20" : ""}`}>
          {children}
          <Toaster position="top-right" />
        </main>

        {/* Only show Footer if NOT on an admin page */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}