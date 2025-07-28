"use client";

import Image from "next/image";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, Globe2, ShieldCheck } from "lucide-react";

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
      <NavBar />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-10">
        {/* Left Text Block */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Find Your Perfect <span className="text-blue-600">Internship</span> Match!
          </h1>
          <p className="text-lg text-gray-700">
            Connecting ambitious students with top companies for meaningful internship{" "}
            <span className="text-blue-600">opportunities</span>.
          </p>
          <div className="flex gap-4">
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
    </div>
  );
}
