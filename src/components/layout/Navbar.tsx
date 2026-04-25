"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Inventory", href: "/inventory" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F0F4EF] border-b border-[#0D1821]/10 w-full">
      {/* REMOVE max-w-7xl here if it's causing the squeeze on tablet, 
          or ensure the children are flex-wrap friendly */}
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between w-full">
        
        {/* LOGO LINK */}
        <Link href="/" className="flex items-center gap-2 sm:gap-4 shrink-0 group">
          <div className="relative w-24 sm:w-40 h-12 flex items-center justify-start">
            <img 
              src="https://res.cloudinary.com/dotcy7lhz/image/upload/v1776435563/adakalogo_q2di5h.jpg" 
              alt="ADAKA GLOBAL Logo"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          
          {/* Hide the text slightly on very small screens if it's too cramped */}
          <div className="hidden sm:flex flex-col justify-center leading-none">
            <span className="font-heading text-lg sm:text-2xl tracking-tighter uppercase text-[#0D1821]">
              ADAKA GLOBAL
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-bold">
              Engineering Excellence
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center md:space-x-6 lg:space-x-12 shrink-0">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="relative font-heading text-xl uppercase group overflow-hidden h-7">
              <motion.div className="transition-transform duration-300 group-hover:-translate-y-7">
                <span className="block h-7">{link.name}</span>
                <span className="block h-7 text-[#0D1821]/40">{link.name}</span>
              </motion.div>
            </Link>
          ))}
          <Link 
      href="/contact" 
      className="bg-[#0D1821] text-[#F0F4EF] px-4 lg:px-8 py-2 font-heading text-lg lg:text-xl uppercase hover:scale-105 transition-transform whitespace-nowrap"
    >
            Contact
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute top-20 left-0 w-full bg-[#F0F4EF] border-b border-[#0D1821]/10 p-10 flex flex-col space-y-8 md:hidden"
        >
          {/* Map your existing links */}
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="font-heading text-4xl uppercase"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Manually add the Contact link so it's always there */}
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)} 
            className="bg-[#0D1821] text-[#F0F4EF] px-8 py-4 font-heading text-2xl uppercase text-center w-full"
          >
            Contact Us
          </Link>
        </motion.div>
      )}
    </nav>
  );
}