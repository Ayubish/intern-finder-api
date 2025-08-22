"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, Globe2, ShieldCheck,MapPin, LayoutTemplate } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Feedback-Friendly Platform",
      description:
        "Your voice matters! We encourage honest reviews to improve our platform and help future candidates.",
      icon: CheckCircle,
    },
    {
      title: "Paid Internships",
      description:
        "We partner with companies that value your contributions and ensure fair compensation.",
      icon: Briefcase,
    },
    {
      title: "Ultimate Flexibility",
      description:
        "Whether in-office or remote, access top-tier internships tailored to your goals and location.",
      icon: Globe2,
    },
    {
      title: "Scam-Free, Verified Listings",
      description:
        "All listings are verified through rigorous checks so you can apply with confidence.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20  gap-10">
        {/* Left Text Block */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Find Your Perfect <span className="text-blue-600">Internship</span> Match!
          </h1>
          <p className="text-4xl font-bold leading-tight">
            Connecting ambitious students with top companies for meaningful internship{" "}
            <span className="text-blue-600">opportunities</span>.
          </p>
          <div className="flex gap-30 mt-20 ">
            <Button>Browse Internships</Button>
            <Button variant="outline">Post an Internship</Button>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/discuss.png"
            alt="Internship team"
            width={500}
            height={400}
            className="object-contain"
          />
        </div>
      </section>

      {/* Why Choose Interno Section */}
    <section className="px-6 md:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Why Choose <span className="text-blue-600">INTERNO</span>
          </h2>
          <p className="text-gray-700 text-base max-w-md">
            Interno helps students find the best internships with personalized matches, verified listings, and expert support.
          </p>
          <Image
            src="/smile.png"
            alt="Group of interns"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-12">
          <div className="text-center flex flex-col items-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-semibold">Feedback-Friendly Platform</h3>
            <p className="text-sm text-gray-600 max-w-sm">
              Your voice matters! We encourage honest reviews to refine our offerings and guide future candidates. Your feedback shapes a better internship ecosystem for everyone.
            </p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-lg font-semibold">Paid Internships</h3>
            <p className="text-sm text-gray-600 max-w-sm">
              We partner with companies that value your work, ensuring competitive compensation and real-world experience. You're rewarded fairly for your efforts.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-12">
          <div className="text-center flex flex-col items-center">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-lg font-semibold">Ultimate Flexibility</h3>
            <p className="text-sm text-gray-600 max-w-sm">
              Prefer remote or hybrid roles? We’ve got you. Explore global internships tailored to your location, lifestyle, and goals.
            </p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-lg font-semibold">Scam-Free, Verified Listings</h3>
            <p className="text-sm text-gray-600 max-w-sm">
              Every opportunity is vetted for legitimacy and clarity—no fake listings. Apply with total confidence.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* blue page */}
    
    <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-[#1269db] to-[#e0e7ff]">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-white shadow text-gray-700 font-medium text-sm mb-4">
          How it <span className="text-blue-600 font-semibold">Works</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          3 steps to <span className="text-blue-600">Find</span> an Internship
        </h2>
      </div>

      {/* Find Internship Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Create your profile",
            step: "1",
            description: "Showcase your education, skills, and goals.",
            image: "/create-profile.png",
          },
          {
            title: "Browse internship listing",
            step: "2",
            description: "From tech startups to global companies.",
            image: "/browser-listing.png",
          },
          {
            title: "Apply instantly",
            step: "3",
            description: "Get noticed and take your first step into the real world.",
            image: "/apply-instantly.png",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between text-left"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
              <span className="text-gray-500 font-semibold text-sm">{item.step}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Post Internship Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          3 steps to <span className="text-blue-600">Post</span> an Internship
        </h2>
      </div>

      {/* Post Internship Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Post your internship",
            step: "1",
            description: "Reach thousands of aspiring talents.",
            image: "/post-internship.png",
          },
          {
            title: "Review applications",
            step: "2",
            description: "Filter by skills, education & more.",
            image: "/review-application.png",
          },
          {
            title: "Build your future team",
            step: "3",
            description: "Invest in potential, grow your impact.",
            image: "/build-team.png",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between text-left"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
              <span className="text-gray-500 font-semibold text-sm">{item.step}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
    {/* Ratings & Reviews Section */}
       <section className="px-6 md:px-20 py-16 bg-white">
            <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Ratings & Reviews</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Star breakdown */}
                <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((star) => {
                  const ratingsData: { [key: number]: { percent: number; count: string } } = {
                    5: { percent: 30, count: "930" },
                    4: { percent: 85, count: "4.5K" },
                    3: { percent: 10, count: "50" },
                    2: { percent: 5, count: "16" },
                    1: { percent: 2, count: "8" },
                  };

                  const data = ratingsData[star];

                  return (
                    <div key={star} className="flex items-center gap-3 text-sm text-gray-700">
                      {/* Star number and icon */}
                      <div className="w-12 flex items-center justify-end gap-1 font-semibold">
                        <span>{star}</span>
                        <span className="text-yellow-400 text-lg">★</span>
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${data.percent}%` }}
                        />
                      </div>

                      {/* Count */}
                      <div className="w-12 text-right font-bold text-gray-800">
                        {data.count}
                      </div>
                    </div>
                  );
                })}
              </div>
              
            {/* Ratings summary box */}
            <div className="bg-gray-100 shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Ratings */}
              <div className="flex flex-col md:flex-row gap-10">
                <div className="text-center space-y-1">
                  <p className="text-4xl font-bold text-gray-900">4.3</p>
                  <div className="text-yellow-400 text-2xl">★★★★★</div>
                  <p className="text-sm text-gray-500">All Ratings</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-4xl font-bold text-gray-900">4.8</p>
                  <div className="text-yellow-400 text-2xl">★★★★★</div>
                  <p className="text-sm text-gray-500">Last Month</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 items-end">
                <button className="bg-[#3D5AFE] text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
                  Write a Review
                </button>
                
                <button className="bg-white border text-black font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">
                        See all Reviews
                </button>
              
              </div>
            </div>
          </div>

          {/* Most Helpful Review */}
          <div className="border-t pt-10 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Most helpful review</h3>

            <div className="flex justify-between text-sm text-gray-600">
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <div className="text-right text-sm text-gray-800">
                <p className="font-semibold">John Smith</p>
                <p className="text-gray-500 text-xs">July 24, 2025</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 max-w-4xl">
              I just wanted to thank you for your excellent service! Your platform made finding the perfect internship (or intern) quick and easy.
              The matches were spot-on, and the support was fantastic. Highly recommend your services—keep up the great work!
            </p>

            <div className="flex justify-between items-center mt-6 text-sm">
              <span className="text-gray-800 font-semibold">51 reviews</span>
              <div className="flex items-center gap-2 text-gray-600">
                <span>Sort by:</span>
                <select className="bg-white border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          </div>
         </section>

    {/* Internships Section */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Centered Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
              <span className="text-[#3D5AFE] drop-shadow">Internships</span>{' '}
              You May Be Interested In
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm">
              Discover exciting internship opportunities tailored to your skills and career goals! Browse handpicked roles from top companies and startups across various industries. Whether you’re looking for remote, hybrid, or on-site positions, find the perfect match to kickstart your professional journey.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Digital Marketer',
                company: 'AliExpress',
                location: 'Beijing ,Chine',
                category: 'Marketing',
                type: 'Internship',
                time: '1 Hr Ago',
                logo: '/aliexpress.png',
                favorited: false,
              },
              {
                title: 'Graphic Designer',
                company: 'Golden Age Tech',
                location: 'Remote',
                category: 'Graphics',
                type: 'Internship',
                time: '3 Hr Ago',
                logo: '/graphic.png',
                favorited: true,
              },
              {
                title: 'Web Developer',
                company: 'Google',
                location: 'Remote',
                category: 'Development',
                type: 'Internship',
                time: '15 Hr Ago',
                logo: '/google.png',
                favorited: true,
              },
              {
                title: 'Data Entry',
                company: 'X',
                location: 'New York, USA',
                category: 'Data Entry',
                type: 'Internship',
                time: '1 Hr Ago',
                logo: '/x.png',
                favorited: false,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9] rounded-2xl shadow-md px-6 py-5 flex items-center justify-between gap-4"
              >
                {/* Logo */}
                <img src={item.logo} alt={item.company} className="w-14 h-14 object-contain" />

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    Via{' '}
                    <span className="text-blue-600 hover:underline hover:cursor-pointer no-underline">
                      {item.company}
                    </span>
                  </p>
                  <div className="text-sm text-gray-700 space-y-1 mt-2">
                    <div className="flex items-center gap-1">
                      <span><MapPin className="w-4 h-4 text-gray-600" /></span>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span><LayoutTemplate className="w-4 h-4 text-gray-600" /></span>
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💼</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </div>

                {/* Apply + Heart */}
                <div className="flex flex-col items-center gap-2">
                  <button className="bg-[#3D5AFE] hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow-lg">
                    Apply
                  </button>
                  <div className="flex flex-col items-center gap-1">
                    <button>
                      {item.favorited ? (
                        <span className="text-[#3D5AFE] text-xl">💙</span>
                      ) : (
                        <span className="text-gray-400 text-xl">🤍</span>
                      )}
                    </button>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Background Image Section (with Glass Form) */}
        <section
                className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat "
                style={{ backgroundImage: "url('/support-bg.png')" }}
              >
                {/* Centered Glass Form */}
                <div className="flex items-center justify-center min-h-screen px-4">
                  <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                      Need <span className="text-[#3D5AFE]">Support?</span>
                    </h2>
                    <p className="text-sm text-gray-800 mb-6">
                      Contact us if you need further assistance.
                    </p>

                    <form className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-800 mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-800 mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-800 mb-1">
                          Please enter the detail of your request.
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]"
                        ></textarea>
                      </div>

                      {/* Submit Button  */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#3D5AFE] hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow transition"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
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
