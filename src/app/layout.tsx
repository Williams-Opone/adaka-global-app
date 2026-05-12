import { Inter, Bebas_Neue } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper"; 
import FooterWrapper from "@/components/layout/FooterWrapper"; 
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
        url: "/images/adakalogo.JPG", // Removed /public prefix (Next.js refers to public folder from the root /)
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
        {/* The Wrappers handle the "isAdminPage" logic internally now */}
        <NavbarWrapper />

        <main className="flex-grow">
          {children}
          <Toaster position="top-right" />
        </main>

        <FooterWrapper />
      </body>
    </html>
  );
}