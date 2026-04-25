"use client";

import { Inter, Bebas_Neue } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

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