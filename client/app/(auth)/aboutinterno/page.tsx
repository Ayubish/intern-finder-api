"use client";

import Image from "next/image";
import Link from "next/link";


export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[685px]">
        <Image
          src="/aboutgroup.png"
          alt="About us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">About us</h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="px-6 md:px-16 lg:px-24 py-12">
        <h2 className="block w-full text-4xl md:text-5xl font-bold mb-10 text-center">
          <span className="text-primary">INTERNO - </span>
          Your <span className="text-primary">Gateway</span> to the Perfect{" "}
          <span className="text-primary">Internship</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Text */}
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed text-2xl">
              Welcome to{" "}
              <Link href="/" className="text-primary font-semibold hover:underline">
                Interno
              </Link>
              , the ultimate platform connecting ambitious interns with top
              companies worldwide. Powered by{" "}
              <span className="text-green-600 font-semibold">
                GoldenAge Technology PLC
              </span>
              , Interno is designed to revolutionize the internship search
              process. Whether you're a student looking for valuable work
              experience or a company seeking talented interns, Interno
              simplifies the journey, making it easier than ever to find the
              perfect match.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/about2.png"
              alt="Internship Illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Interno */}
        <section className="px-6 md:px-16 lg:px-24 py-16 space-y-12">
    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-left">
      Why Choose <span className="text-primary">INTERNO?</span>
    </h2>

    <div className="space-y-10">
      {/* Dual-Sided Reviews */}
      <div className="flex items-center gap-6">
        <Image
          src="/review.png"
          alt="Reviews"
          width={150}
          height={150}
          className="object-contain"
        />
        <p className="text-2xl text-gray-700">
          <span className="text-primary font-semibold">Dual-Sided Reviews</span>{" "}
          – Both internees and companies can rate and review each other,
          creating a transparent and trustworthy community.
        </p>
      </div>

      {/* Diverse Opportunities (Image Right, Text Centered) */}
      <div className="flex flex-row-reverse items-center gap-6">
        <Image
          src="/growth.png"
          alt="Opportunities"
          width={150}
          height={150}
          className="object-contain"
        />
        <p className="text-2xl text-gray-700 text-right lg:text-left">
          <span className="text-primary font-semibold">Diverse Opportunities</span>{" "}
          – From tech startups to established enterprises, find the right match
          for your needs.
        </p>
      </div>

      {/* Growth-Focused */}
      <div className="flex items-center gap-6">
        <Image
          src="/opportunity.png"
          alt="Growth"
          width={150}
          height={150}
          className="object-contain"
        />
        <p className="text-2xl text-gray-700">
          <span className="text-primary font-semibold">Growth-Focused</span>{" "}
          – Both internees and companies can rate and review each other,
          creating a transparent and trustworthy community.
        </p>
      </div>
    </div>
           </section>

      {/* Our Mission*/}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          Our <span className="text-primary">Mission</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Mission Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/mission.png"
              alt="Our Mission"
              width={400}
              height={300}
              className="object-contain rounded-lg"
            />
          </div>

          {/* Mission Text */}
          <div className="flex-1">
            <p className="text-2xl text-gray-700 leading-relaxed">
              At{" "}
              <Link href="/" className="text-primary font-semibold hover:underline">
                Interno
              </Link>
              , we believe that the right{" "}
              <span className="text-primary font-semibold">internship</span> can
              kickstart a career and bring fresh talent to businesses. Our goal is
              to bridge the gap between{" "}
              <span className="text-blue-600 font-semibold">students</span> and{" "}
              <span className="text-blue-600 font-semibold">companies</span>,
              making the{" "}
              <span className="text-primary font-semibold">internship</span> search
              seamless, transparent, and efficient.
            </p>
          </div>
        </div>
      </section>

          {/* Call to Action Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
            {/* Background Image */}
            <Image
              src="/handshake.png" // replace with your handshake image
              alt="Handshake"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center px-6 md:px-16 lg:px-24">
              <p className="text-3xl md:text-5xl  font-bold text-center leading-relaxed text-black">
                Join{" "}
                <span className="text-primary font-bold">Interno</span> today and take the
                first step toward a brighter future—whether you’re{" "}
                <span className="text-primary font-bold">hiring</span> or looking to gain{" "}
                <span className="text-primary font-bold">experience</span>!
              </p>
            </div>
         </section>
      {/* Footer */}
         <footer className="bg-white text-base text-gray-700 flex flex-col md:flex-row items-center justify-between border-t gap-6">
                 {/* Left: Logo  */}
                 <div className="ml-50 flex flex-col items-center md:items-start">
                   <Image
                     src="/Interno.png"
                     alt="Interno"
                     width={180}
                     height={180}
                     className="object-contain"
                   />
                   </div>
                 {/* Vertical Divider */}
               <div className="hidden md:block h-20 border-l border-black my-4"  />
         
                 {/* Center: Links & Legal */}
                 <div className="flex flex-col items-center gap-3 text-[17px] text-gray-700 text-center">
                   <div className="flex gap-6 font-medium text-lg ">
                     <a href="#" className="hover:underline">About</a>
                     <a href="#" className="hover:underline">Terms</a>
                     <a href="#" className="hover:underline">Privacy</a>
                     <a href="#" className="hover:underline">Support</a>
                   </div>
                   <span className="text-gray-500 text-base font-normal">
                     © 2025 Interno. All rights reserved.
                   </span>
                 </div>
         
                 {/* Right: Social Icons */}
                 <div className="flex gap-6">
                   <a href="#"><img src="/linkedin-icon.png" alt="LinkedIn" className="w-14 h-14" /></a>
                   <a href="#"><img src="/facebook-icon.png" alt="Facebook" className="w-14 h-14" /></a>
                   <a href="#"><img src="/telegram-icon.png" alt="Telegram" className="w-14 h-14" /></a>
                   <a href="#"><img src="/whatsapp-icon.png" alt="WhatsApp" className="w-14 h-14" /></a>
                 </div>
             </footer>
          
    </div>
  );
}
