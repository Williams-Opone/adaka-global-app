"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 text-primary">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <CheckCircle2 size={80} className="mx-auto opacity-20" />
        <h1 className="font-heading text-6xl uppercase leading-none">Inquiry <br/> Received.</h1>
        <p className="font-sans text-sm uppercase tracking-widest opacity-60">
          An ADAKA GLOBAL representative will review your request and contact you shortly.
        </p>
        <Link href="/" className="inline-block bg-primary text-secondary px-10 py-4 font-heading text-xl uppercase hover:invert transition-all">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}