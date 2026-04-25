import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-primary text-secondary flex flex-col items-center justify-center p-6 text-center">
      {/* 404 Stamp: Scaled to fit mobile screens */}
      <h1 className="font-heading text-[12rem] sm:text-[15rem] md:text-[20rem] opacity-10 leading-none">
        404
      </h1>
      
      {/* Message: Responsive heading scale */}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter mt-[-2rem] mb-8">
        Asset Not Located.
      </h2>
      
      {/* Action: Mobile-friendly touch target */}
      <Link 
        href="/" 
        className="border border-secondary/20 px-8 py-4 font-heading text-lg md:text-xl uppercase hover:bg-secondary hover:text-primary transition-all active:scale-[0.98]"
      >
        Return to Fleet
      </Link>
    </div>
  );
}