"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Lock,
  Menu,
  X
} from "lucide-react";

export default function ValmontPrivateBankPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  const pillars = [
    {
      title: "Family",
      desc: "Independence keeps us unconflicted, unencumbered, undistracted. For five generations our family has stood shoulder-to-shoulder with the families we advise.",
    },
    {
      title: "Innovation",
      desc: "Adapting to the new faster, we stay ahead for longer. Combining 180 years of institutional prudence with modern portfolio architecture.",
    },
    {
      title: "Bespoke",
      desc: "We take your finances and happiness very personally. No standardized models, no proprietary product quotas, only tailor-made mandates.",
    },
    {
      title: "Reliable",
      desc: "We build wealth steadily, sustainably, and very successfully across generational transitions and macroeconomic cycles.",
    },
    {
      title: "Evolving",
      desc: "Responding quickly to different needs, jurisdictions, tax environments, and multi-generational family situations.",
    },
  ];

  const testimonials = [
    {
      quote:
        "My wealth manager is the son of my parents’ wealth manager and the grandson of my grandparents’ wealth manager. My family’s financial affairs have been managed by the same family of wealth managers for 3 generations. Our families have been closely linked for 3 generations, which creates an exceptional level of trust and advice.",
      author: "Private Client Family",
      role: "Multi-Generational Family Office",
    },
    {
      quote:
        "In a financial world dominated by transaction quotas and automated robo-advice, Valmont represents an irreplaceable institution. When liquidity events occur or complex cross-border trusts must be coordinated, their partners answer directly.",
      author: "Tech Founder & Industrialist",
      role: "Enterprise Founder",
    },
    {
      quote:
        "The true test of a private banker is not how they invest during bull markets, but how rigorously they protect capital during global dislocations. Valmont has safeguarded our philanthropic foundation for over four decades without fail.",
      author: "Family Office Trustee",
      role: "Endowment Trustee",
    },
  ];

  const articles = [
    {
      date: "5 November 2026",
      title: "Global macro realignment & private capital allocation",
      desc: "Key macro perspectives on capital reallocation, interest rate trajectories, sovereign debt fundamentals, and institutional liquidity reserves.",
      image: "https://www.bordier.com/wp-content/uploads/2025/04/us-cover.webp",
      readTime: "6 min read",
    },
    {
      date: "4 November 2026",
      title: "Tech Ledger: Navigating the next phase of the AI cycle",
      desc: "This week in Tech Ledger, we explore the transition from infrastructure capex to corporate enterprise software monetization and high-conviction technology holdings.",
      image: "https://www.bordier.com/wp-content/uploads/2026/07/Tech-Ledger.webp",
      readTime: "4 min read",
    },
    {
      date: "28 October 2026",
      title: "Preserving generational family estates in volatile markets",
      desc: "An examination of private credit fundamentals, inflation-resilient real estate allocations, and liquidity planning across multi-generational family dynasties.",
      image: "https://www.bordier.com/wp-content/uploads/2025/10/pexels-thiardini-5623083-1.jpg",
      readTime: "5 min read",
    },
  ];

  const tickerItems = [
    "Generational Wealth",
    "Social-minded",
    "Succession planning",
    "Family Governance",
    "Direct Indexing",
    "Family Alignment",
    "Lifestyle",
    "Next-Gen Stewardship",
    "Trust Structuring",
    "Philanthropic Foundations",
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-[#DA291C] selection:text-white">
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Valmont & Cie Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm bg-[#DA291C] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              <span className="text-white text-sm font-semibold tracking-tighter">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-[-0.03em] uppercase text-black font-sans leading-none">
                VALMONT &amp; CIE
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 font-medium mt-1 leading-none">
                INDEPENDENT PRIVATE BANKERS SINCE 1848
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-9 text-[15px] font-normal tracking-wide text-neutral-800">
            <a href="#about" className="hover:text-[#DA291C] transition-colors py-2">
              About us
            </a>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-[#DA291C] transition-colors py-2 cursor-pointer"
              >
                <span>Solutions</span>
                <span className="text-[10px] text-neutral-400">▾</span>
              </button>
              <div className="absolute top-full left-0 w-72 bg-white border border-neutral-200 shadow-xl rounded-lg p-3 hidden group-hover:block z-50">
                <a
                  href="#wealth-management"
                  className="block px-4 py-3 hover:bg-neutral-50 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="text-black">Wealth Management</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Discretionary &amp; advisory mandates</div>
                </a>
                <a
                  href="#private-asset-management"
                  className="block px-4 py-3 hover:bg-neutral-50 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="text-black">Private Asset Management</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Alternative &amp; co-investment desk</div>
                </a>
                <a
                  href="#family-office"
                  className="block px-4 py-3 hover:bg-neutral-50 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="text-black">Family Office Services</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Multi-generational succession &amp; trusts</div>
                </a>
              </div>
            </div>

            <a href="#spotlight" className="hover:text-[#DA291C] transition-colors py-2">
              Spotlight
            </a>
            <a href="#philosophy" className="hover:text-[#DA291C] transition-colors py-2">
              Philosophy
            </a>
            <a href="#contact" className="hover:text-[#DA291C] transition-colors py-2">
              Contact us
            </a>
          </nav>

          {/* Right Action: Client Access Pill */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#client-access"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 text-xs uppercase font-semibold tracking-widest hover:border-black hover:bg-black hover:text-white transition-all shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Client Access</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-neutral-800 hover:text-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-b border-neutral-200 bg-white px-8 py-8 flex flex-col gap-5 text-lg font-light">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About us</a>
            <a href="#wealth-management" onClick={() => setMobileMenuOpen(false)}>Wealth Management</a>
            <a href="#family-office" onClick={() => setMobileMenuOpen(false)}>Family Services</a>
            <a href="#spotlight" onClick={() => setMobileMenuOpen(false)}>Spotlight</a>
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact us</a>
            <div className="pt-6 border-t border-neutral-200 flex flex-col gap-3">
              <a
                href="#client-access"
                className="w-full text-center py-3 rounded-full bg-black text-white text-sm font-medium"
              >
                Client Access
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black text-white">
        {/* Fullscreen Architectural Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.bordier.com/wp-content/uploads/2024/07/hero-img-1.jpg"
            alt="Valmont & Cie Independent Private Bankers"
            className="w-full h-full object-cover object-center filter brightness-[0.82] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        </div>

        {/* Main Hero Giant Typographic Statement */}
        <div className="relative z-10 max-w-[1800px] w-full mx-auto px-6 sm:px-12 pt-20 sm:pt-28 pb-16 flex-1 flex flex-col justify-end">
          <div className="max-w-[1600px]">
            {/* Row 1: The world's */}
            <div className="text-[48px] sm:text-[90px] md:text-[130px] lg:text-[165px] font-light tracking-[-0.04em] leading-[0.92] text-white">
              The world’s
            </div>

            {/* Row 2: "Independent" in delicate italic serif with footnote badge, followed by "Private" and "Banker" */}
            <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-8 text-[48px] sm:text-[90px] md:text-[130px] lg:text-[165px] font-light tracking-[-0.04em] leading-[0.92] text-white mt-1">
              <span className="font-serif-italic font-normal text-[44px] sm:text-[80px] md:text-[115px] lg:text-[150px] text-white flex items-start gap-1">
                Independent
                <a
                  href="#heritage-footnote"
                  className="inline-block text-[#DA291C] text-2xl sm:text-4xl lg:text-5xl font-sans not-italic hover:underline leading-none align-super ml-1"
                  title="Fiduciary Heritage Charter"
                >
                  (”)
                </a>
              </span>
              <span>Private</span>
              <span>Banker</span>
            </div>

            {/* Row 3: Subtitle Right-Aligned in Editorial Typography */}
            <div className="mt-8 sm:mt-12 flex justify-start sm:justify-end">
              <p className="max-w-xl text-lg sm:text-2xl lg:text-3xl font-light text-neutral-200 tracking-wide leading-relaxed text-left sm:text-right">
                dedicated to private clients and their families{" "}
                <span className="font-serif-italic italic text-white font-normal">
                  for generations
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Red Precision Line Indicator at Bottom */}
        <div className="relative z-10 w-full flex justify-center pb-2">
          <div className="w-11/12 max-w-[1700px] h-[7px] sm:h-[9px] bg-[#DA291C]" />
        </div>
      </section>

      {/* 3. SECTION 1: "You’ve spent a lifetime building what you have. Plan on keeping it." */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* Left Column Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-[-0.02em] text-black leading-[1.2] mb-8">
                You’ve spent a lifetime building what you have. Plan on keeping it.
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed mb-6">
                For 5 generations the Valmont family has been preserving and growing wealth for our family, and many others around the world.
              </p>
              <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed mb-10">
                When it comes to money, our clients say they trust us more than themselves. A trust that keeps growing.
              </p>

              <a
                href="#story"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-neutral-300 text-sm font-semibold tracking-wider uppercase hover:border-[#DA291C] hover:bg-[#DA291C] hover:text-white transition-all shadow-xs"
              >
                <span>Discover our story</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right Column Editorial Portrait */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 group bg-neutral-900">
                <img
                  src="https://www.bordier.com/wp-content/uploads/2025/02/Christian-Skaanild-1.jpg"
                  alt="Valmont Managing Partner"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between">
                  <div>
                    <div className="text-white text-base font-medium">Christian Skaanild</div>
                    <div className="text-xs text-neutral-300 font-light">Managing Partner</div>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono">
                    Valmont &amp; Cie
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-4 h-1 bg-[#DA291C]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: "Align your future with ours" */}
      <section className="py-28 bg-[#FAFAF9] border-y border-neutral-200/60">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-12">
          {/* Section Heading */}
          <div className="mb-20">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-black">
              Align your <span className="font-serif-italic font-normal">future</span> with ours.
            </h2>
          </div>

          {/* 3 Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Card 1: We invest with you */}
            <div className="flex flex-col justify-between group">
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-8 border border-neutral-200 shadow-sm">
                  <img
                    src="https://www.bordier.com/wp-content/uploads/2024/08/Rectangle-223.jpg"
                    alt="We invest with you"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black mb-4">
                  We invest with you
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  Our partners make the same investments as you. We never take uncalculated risks with our family’s money. Or yours.
                </p>
              </div>
              <a
                href="#co-invest"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black group-hover:text-[#DA291C] transition-colors pt-4 border-t border-neutral-200"
              >
                <span>Our co-investment model</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2: We invest for you */}
            <div className="flex flex-col justify-between group">
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-8 border border-neutral-200 shadow-sm">
                  <img
                    src="https://www.bordier.com/wp-content/uploads/2024/08/Rectangle-224.jpg"
                    alt="We invest for you"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black mb-4">
                  We invest for you
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  We carefully select from a wider world of assets, funds, and private allocations. You can access what others can’t.
                </p>
              </div>
              <a
                href="#private-assets"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black group-hover:text-[#DA291C] transition-colors pt-4 border-t border-neutral-200"
              >
                <span>Private asset management</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: We invest beyond you */}
            <div className="flex flex-col justify-between group">
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-8 border border-neutral-200 shadow-sm">
                  <img
                    src="https://www.bordier.com/wp-content/uploads/2024/08/Rectangle-225.jpg"
                    alt="We invest beyond you"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black mb-4">
                  We invest beyond you
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  Generation to generation, we plan for longevity and legacy. We’ve been looking ahead for families for 180 years.
                </p>
              </div>
              <a
                href="#family-legacy"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black group-hover:text-[#DA291C] transition-colors pt-4 border-t border-neutral-200"
              >
                <span>Family office architecture</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: "What makes us different makes all the difference" */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          {/* Large Editorial Headline */}
          <div className="max-w-4xl mb-20">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-black leading-tight">
              What makes us <span className="font-serif-italic font-normal">different</span> makes all the difference.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left 5 Pillars Accordion */}
            <div className="lg:col-span-7 divide-y divide-neutral-200 border-y border-neutral-200">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  onClick={() => setActivePillar(idx)}
                  className="py-8 cursor-pointer group transition-all"
                >
                  <div className="flex items-baseline justify-between">
                    <h3
                      className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors ${
                        activePillar === idx ? "text-[#DA291C]" : "text-black group-hover:text-neutral-600"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                  </div>
                  {activePillar === idx && (
                    <p className="mt-4 text-lg text-neutral-600 font-light leading-relaxed max-w-2xl">
                      {pillar.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right Editorial Portrait Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 group relative bg-neutral-900">
                <img
                  src="https://www.bordier.com/wp-content/uploads/2025/02/Evrard-Bordier-1.jpg"
                  alt="Senior Partner"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between">
                  <div>
                    <div className="text-white text-base font-medium">Evrard Valmont</div>
                    <div className="text-xs text-neutral-300 font-light">Senior Partner &amp; Head of Mandates</div>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono">
                    Partnership Board
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-4 h-1 bg-[#DA291C]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 4: "What life is all about" */}
      <section className="relative py-32 sm:py-44 bg-neutral-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.bordier.com/wp-content/uploads/2024/08/cover-bgr.jpg"
            alt="Life and Wealth"
            className="w-full h-full object-cover filter brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-tight mb-8">
              What life <span className="font-serif-italic font-normal">is all about</span>.
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-200 font-light leading-relaxed mb-6">
              You are unique. So we manage your wealth to reflect exactly what you want from life.
            </p>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-10">
              We are currently creating personalized programs for unique individuals and families. Register if you’re interested in maximizing your wealth, on your terms.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-wider uppercase hover:bg-[#DA291C] hover:text-white transition-all shadow-xl"
            >
              <span>Begin a confidential conversation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="relative z-10 border-t border-white/20 pt-8 mt-12 overflow-hidden">
          <div className="flex items-center gap-12 w-max animate-marquee text-lg sm:text-2xl font-light tracking-wide text-neutral-200">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 shrink-0">
                <span>{item}</span>
                <span className="text-[#DA291C]">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 5: "Securing tomorrow today" */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-6">
            / Environmental Stewardship
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-black leading-tight mb-8">
                Securing <span className="font-serif-italic font-normal">tomorrow</span> today.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start">
              <p className="text-xl text-neutral-800 font-normal mb-4">
                The next generation should inherit something better.
              </p>
              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-8">
                From wealth to a healthier planet, Valmont continues to act as a pioneer in preservation. To leave something better behind, we’re always looking ahead.
              </p>
              <a
                href="#sustainability"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-neutral-300 text-xs font-semibold tracking-wider uppercase hover:border-[#DA291C] hover:bg-[#DA291C] hover:text-white transition-all"
              >
                <span>Our sustainability charter</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION 6: ARCHITECTURAL PANORAMA BANNER */}
      <section className="w-full overflow-hidden bg-neutral-100">
        <div className="w-full">
          <img
            src="https://www.bordier.com/wp-content/uploads/2026/04/Bordier-carousel-1024x202.webp"
            alt="Valmont Heritage Salons"
            className="w-full h-auto object-cover max-h-[380px]"
          />
        </div>
      </section>

      {/* 9. SECTION 7: "Our identity. Real success endures." */}
      <section id="philosophy" className="py-28 lg:py-36 bg-white border-b border-neutral-200">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-black leading-tight">
                Our <span className="font-serif-italic font-normal">identity</span>. <br />
                Real success <span className="font-serif-italic font-normal">endures</span>.
              </h2>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 group relative">
                <img
                  src="https://www.bordier.com/wp-content/uploads/2026/03/our-identity.webp"
                  alt="Valmont Identity"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-4 h-1 bg-[#DA291C]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION 8: VALMONT SPOTLIGHT */}
      <section id="spotlight" className="py-28 lg:py-36 bg-[#FAFAF9]">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-4">
                / Research &amp; Insights
              </div>
              <h2 className="text-4xl sm:text-6xl font-light tracking-[-0.03em] text-black">
                Valmont <span className="font-serif-italic font-normal">Spotlight</span>.
              </h2>
              <p className="text-lg text-neutral-600 font-light mt-3">
                Stay informed with our latest macroeconomic perspectives and market dispatches.
              </p>
            </div>

            <a
              href="#publications"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black hover:text-[#DA291C] transition-colors"
            >
              <span>View all publications</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {articles.map((art, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                      <span>{art.date}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-normal text-black mb-4 leading-snug group-hover:text-[#DA291C] transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                      {art.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-0">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black group-hover:text-[#DA291C] transition-colors">
                    <span>Read briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SECTION 9: CLIENT TESTIMONIAL */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-6 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              / Testimonials
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-neutral-500">
                0{testimonialIdx + 1} / 0{testimonials.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setTestimonialIdx((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setTestimonialIdx((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-5xl">
            <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-light text-black tracking-tight leading-[1.3] mb-10">
              “{testimonials[testimonialIdx].quote}”
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-[#DA291C]" />
              <div>
                <cite className="font-semibold text-black not-italic text-base sm:text-lg block">
                  {testimonials[testimonialIdx].author}
                </cite>
                <span className="text-xs text-neutral-400 font-mono">
                  {testimonials[testimonialIdx].role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. SECTION 10: "Welcome to the family" */}
      <section className="relative py-32 sm:py-48 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.bordier.com/wp-content/uploads/2024/10/Rectangle-scaled.jpg"
            alt="Alpine Valleys"
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-12 flex justify-end">
          <div className="max-w-xl bg-black/75 backdrop-blur-md p-10 sm:p-14 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] text-white leading-tight mb-4">
              Welcome to the <span className="font-serif-italic font-normal">family</span>.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light mb-8">
              Contact us to further your story. Our managing partners are available for confidential consultations.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#DA291C] text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
            >
              <span>Contact an associate partner</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-8 sm:inset-x-12 h-[7px] bg-[#DA291C]" />
      </section>

      {/* 13. INSTITUTIONAL FOOTER */}
      <footer className="bg-white border-t border-neutral-200 pt-24 pb-16 text-sm text-neutral-600">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-12">
          {/* Top 4 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-20">
            {/* Column 1: Institution */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-6">
                Institution
              </h4>
              <ul className="space-y-3 font-light">
                <li><a href="#about" className="hover:text-[#DA291C] transition-colors">About us</a></li>
                <li><a href="#partners" className="hover:text-[#DA291C] transition-colors">Our partners</a></li>
                <li><a href="#governance" className="hover:text-[#DA291C] transition-colors">Governance</a></li>
                <li><a href="#sustainability" className="hover:text-[#DA291C] transition-colors">Sustainability</a></li>
                <li><a href="#careers" className="hover:text-[#DA291C] transition-colors">Careers</a></li>
                <li><a href="#press" className="hover:text-[#DA291C] transition-colors">Press &amp; Media</a></li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-6">
                Solutions
              </h4>
              <ul className="space-y-3 font-light">
                <li><a href="#wealth-management" className="hover:text-[#DA291C] transition-colors">Wealth Management</a></li>
                <li><a href="#private-assets" className="hover:text-[#DA291C] transition-colors">Private Asset Management</a></li>
                <li><a href="#family-office" className="hover:text-[#DA291C] transition-colors">Family Office Services</a></li>
                <li><a href="#co-investment" className="hover:text-[#DA291C] transition-colors">Co-Investment Desk</a></li>
                <li><a href="#liquidity" className="hover:text-[#DA291C] transition-colors">Lending &amp; Liquidity</a></li>
              </ul>
            </div>

            {/* Column 3: Advisory Desk */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-6">
                Advisory Desk
              </h4>
              <ul className="space-y-3 font-light">
                <li><a href="#mandates" className="hover:text-[#DA291C] transition-colors">Private Client Mandates</a></li>
                <li><a href="#governance" className="hover:text-[#DA291C] transition-colors">Family Governance</a></li>
                <li><a href="#co-investment" className="hover:text-[#DA291C] transition-colors">Co-Investment Club</a></li>
                <li><a href="#syndication" className="hover:text-[#DA291C] transition-colors">Debt Syndication</a></li>
                <li><a href="#succession" className="hover:text-[#DA291C] transition-colors">Succession Planning</a></li>
                <li><a href="#philanthropy" className="hover:text-[#DA291C] transition-colors">Philanthropic Advisory</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-6">
                Subscribe to our publications
              </h4>
              <p className="text-xs text-neutral-500 font-light mb-4">
                Quarterly macro briefings, private investment memos, and generational wealth studies.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-full border border-neutral-300 text-xs focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#DA291C] transition-colors shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Large Signature Wordmark with Tagline */}
          <div className="py-12 border-y border-neutral-200 flex flex-col md:flex-row items-baseline justify-between gap-6">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] uppercase text-black font-sans">
                VALMONT &amp; CIE
              </span>
              <span className="text-lg sm:text-2xl font-serif-italic text-neutral-400">
                for generations.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-neutral-400 font-mono">
              <a href="#privacy" className="hover:text-black">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-black">Terms of Use</a>
              <span>•</span>
              <a href="#regulatory" className="hover:text-black">Regulatory Notices</a>
            </div>
          </div>

          {/* Bottom Copyright & Fiduciary Notice */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <span>© 2026 Valmont &amp; Cie Private Bankers. All rights reserved.</span>
            <span>Independent Wealth Advisory &amp; Private Banking Desk. Sovereign fiduciary standards apply.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
