"use client";

import React, { useState, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  MapPin,
  Menu,
  X
} from "lucide-react";

export default function StratumPlanningPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [activeDashboardTab, setActiveDashboardTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);

  const personas = [
    "Founders",
    "Business Owners",
    "Professionals",
    "Retirees",
    "Families",
  ];

  const serviceTabs = [
    {
      label: "Investing",
      sub: "INVESTMENTS",
      title: "Public markets, private credit, and alternative funds.",
      desc: "Institutional portfolio construction customized to your risk horizon, liquidity events, and tax bracket. We provide direct index strategies, opportunistic tax-loss harvesting, and curated access to premier venture and private credit funds.",
      inHouse: "In-house CFA® Portfolio Managers",
      image: "https://compoundplanning.com/images/membership/invest.jpg",
    },
    {
      label: "Taxes",
      sub: "TAX OPTIMIZATION",
      title: "Comprehensive year-round proactive tax planning.",
      desc: "Tax strategy shouldn't just happen in April. Our dedicated CPAs coordinate with your investment plan to maximize QSBS exclusions, exercise ISOs/NSOs cleanly, structure donor-advised funds, and minimize state tax drag.",
      inHouse: "In-house CPAs & Tax Attorneys",
      image: "https://compoundplanning.com/images/membership/tax2.png",
    },
    {
      label: "Borrowing",
      sub: "LIQUIDITY & CREDIT",
      title: "Securities-backed credit lines and bespoke financing.",
      desc: "Unlock liquidity from your equity without forcing taxable sales. Access competitive institutional margin and customized lending solutions backed by your liquid portfolios with top custodian partners.",
      inHouse: "Direct Custodial Lending Desk",
      image: "https://compoundplanning.com/images/membership/borrowing2.png",
    },
    {
      label: "Retirement",
      sub: "RETIREMENT ARCHITECTURE",
      title: "Cash-flow modeling and multi-decade longevity plans.",
      desc: "Stress-test your balance sheet through market drawdowns, healthcare inflators, and multi-generational gifting. We map optimal withdrawal sequencing across taxable, traditional IRA, and Roth buckets.",
      inHouse: "Certified Financial Planner™ Practitioners",
      image: "https://compoundplanning.com/images/membership/retire.png",
    },
    {
      label: "Estate Planning",
      sub: "ESTATE & SUCCESSION",
      title: "Trust structuring, asset protection, and succession.",
      desc: "Ensure your wealth endures and passes efficiently to family or philanthropic causes. We partner with specialized trusts and estate attorneys to build revocable living trusts, irrevocable dynasty trusts, and healthcare directives.",
      inHouse: "Dedicated Estate Counsel Partners",
      image: "https://compoundplanning.com/images/membership/estate-planning.jpg",
    },
    {
      label: "More",
      sub: "FAMILY OFFICE CONCIERGE",
      title: "Dedicated guidance for your full financial life.",
      desc: "From reviewing term sheets and insurance coverage to purchasing commercial real estate and educating the next generation, your Stratum advisory pod serves as your comprehensive financial quarterback.",
      inHouse: "Senior Wealth Advisors & Analysts",
      image: "https://compoundplanning.com/images/membership/ask-us-anything.jpg",
    },
  ];

  const advisors = [
    {
      name: "Steve Dean",
      title: "Managing Director, Wealth Advisory",
      location: "San Francisco, CA",
      experience: "Ex-First Republic, Goldman Sachs",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/efd0a793fc3e02008e390c50c538cb123e42ea26-800x800.png",
    },
    {
      name: "Sheila Ryan",
      title: "Senior Vice President, Planning",
      location: "New York, NY",
      experience: "Ex-Morgan Stanley, Bessemer",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/4ec2b6473df3b03f0b2f5b5f25a58fa49257d079-800x800.png",
    },
    {
      name: "Tim Hamilton",
      title: "Head of Tax & Private Wealth",
      location: "Austin, TX",
      experience: "Ex-PwC Private Client, J.P. Morgan",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/ec73a0cbccf3a1f26a10ae6797a731efc7793d5c-800x800.png",
    },
    {
      name: "Aaron Foster",
      title: "Senior Wealth Advisor",
      location: "Chicago, IL",
      experience: "Ex-Northern Trust, Bernstein",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/9eeeb50d2777174697ffdbb6d1ee85f1c322b7a0-800x800.png",
    },
    {
      name: "Charlotte Jones",
      title: "Director of Estate Strategy",
      location: "Boston, MA",
      experience: "Ex-Fidelity Family Office",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/1ce7f0581977759a117079a0b9432f814987fec8-800x800.png",
    },
    {
      name: "Dimitry Farberov",
      title: "Portfolio Manager, Alternatives",
      location: "Miami, FL",
      experience: "Ex-Bridgewater, Citi Private Bank",
      image: "https://cdn.sanity.io/images/m2q0p12q/production/c35756c9a35e7bb634ce5a780775d9e96f1311ff-800x800.png",
    },
  ];

  const dashboardFeatures = [
    "Net Worth Monitoring",
    "Cash Flow Planning",
    "Tax Strategy",
    "Company Equity",
    "Vault",
    "Concierge",
  ];

  const comparisonItems = [
    { name: "Fiduciary standard at all times", stratum: true, traditional: false },
    { name: "Integrated CPA tax filing & projections", stratum: true, traditional: false },
    { name: "Real-time balance sheet & net worth sync", stratum: true, traditional: false },
    { name: "Custom equity & ISO/NSO modeling engine", stratum: true, traditional: false },
    { name: "Alternative investments & private credit", stratum: true, traditional: true },
    { name: "Direct indexation & daily tax-loss harvesting", stratum: true, traditional: false },
    { name: "Dedicated CFP® lead advisor", stratum: true, traditional: true },
    { name: "Modern client portal & mobile experience", stratum: true, traditional: false },
    { name: "Zero proprietary fund commissions or kickbacks", stratum: true, traditional: false },
    { name: "Securities-backed credit lines (SBLOC)", stratum: true, traditional: true },
    { name: "Estate planning document review & trust sync", stratum: true, traditional: false },
    { name: "Direct messaging with advisory pod", stratum: true, traditional: false },
    { name: "Transparent tiered advisory fee", stratum: true, traditional: false },
    { name: "Family office governance & multi-gen accounts", stratum: true, traditional: true },
    { name: "Independent SEC RIA registration", stratum: true, traditional: false },
  ];

  const faqs = [
    {
      q: "What makes Stratum different from other wealth managers?",
      a: "Stratum unites dedicated human financial advisors, in-house CPAs, and institutional portfolio managers with modern proprietary software. You get a single trusted family-office pod that manages your investments, optimizes your taxes, models your equity, and monitors your full net worth in real time.",
    },
    {
      q: "How does Stratum charge for advisory services?",
      a: "We operate on a straightforward, transparent fee based on assets under management (AUM) or a customized wealth advisory retainer for complex family estates. We never accept product commissions, affiliate kickbacks, or hidden markups.",
    },
    {
      q: "Can Stratum help me exercise and optimize my company equity?",
      a: "Yes. Our advisors and CPAs specialize in stock options (ISOs, NSOs), RSUs, and 83(b) elections. We model alternative minimum tax (AMT) exposure, QSBS qualifications, and liquidity timing to prevent costly tax missteps.",
    },
    {
      q: "How do I transition my existing accounts to Stratum?",
      a: "Our onboarding desk handles the entire transfer process end-to-end. We use automated ACATS transfers to move your accounts seamlessly from your current brokerage without liquidating positions or triggering unexpected capital gains.",
    },
    {
      q: "Is Stratum a fiduciary?",
      a: "Yes. Stratum is an SEC-registered Investment Adviser and an independent fiduciary. We are legally bound to act in your best interest at all times and do not accept hidden third-party commissions.",
    },
    {
      q: "Who does Stratum use to custody my assets?",
      a: "We partner with tier-1 custodians such as Charles Schwab, Fidelity, and BNY Mellon Pershing. Your assets are held directly in your name at insured institutions.",
    },
  ];

  const scrollTeam = (direction: "left" | "right") => {
    if (teamScrollRef.current) {
      const scrollAmount = 350;
      teamScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans antialiased selection:bg-[#FEE7B8] selection:text-black">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="w-full bg-[#FDF8ED] border-b border-[#F5E6CC] py-2.5 px-4 text-center text-sm font-medium flex items-center justify-center gap-3">
        <span className="text-[#3E3224]">
          Introducing <strong className="font-semibold text-black">StratumAI</strong>: the AI at the core of AdvisorHQ
        </span>
        <a
          href="#announcement"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
        >
          <span>Read the announcement</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-3xl font-bold tracking-tight text-[#171717] font-serif lowercase">
              stratum
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-neutral-600">
            <a href="#clients" className="hover:text-black transition-colors">
              For Clients
            </a>
            <a href="#advisors" className="hover:text-black transition-colors">
              For Advisors
            </a>
            <a href="#dashboard" className="hover:text-black transition-colors">
              Dashboard
            </a>
            <a href="#tax-filing" className="hover:text-black transition-colors">
              Tax Filing
            </a>
            <a href="#resources" className="hover:text-black transition-colors">
              Resources
            </a>
            <a href="#company" className="hover:text-black transition-colors">
              Company
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="#signin"
              className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm"
            >
              Get started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white px-6 py-6 flex flex-col gap-4 text-base font-medium">
            <a href="#clients" onClick={() => setMobileMenuOpen(false)}>For Clients</a>
            <a href="#advisors" onClick={() => setMobileMenuOpen(false)}>For Advisors</a>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
            <a href="#tax-filing" onClick={() => setMobileMenuOpen(false)}>Tax Filing</a>
            <a href="#resources" onClick={() => setMobileMenuOpen(false)}>Resources</a>
            <a href="#company" onClick={() => setMobileMenuOpen(false)}>Company</a>
            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
              <a href="#signin" className="text-neutral-700">Sign in</a>
              <a href="#get-started" className="w-full text-center py-2.5 rounded-full bg-black text-white">Get started</a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Persona Selector, CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-normal tracking-tight text-[#171717] leading-[1.1] mb-6">
              Modern wealth management for
            </h1>

            {/* Persona Interactive Selector */}
            <div className="flex flex-col items-start gap-1.5 mb-10 w-full">
              {personas.map((persona, idx) => (
                <button
                  key={persona}
                  onClick={() => setSelectedPersona(idx)}
                  className={`text-2xl sm:text-3xl font-medium tracking-tight transition-all text-left px-3.5 py-1 rounded-md cursor-pointer ${
                    selectedPersona === idx
                      ? "bg-[#FEE7B8] text-black shadow-xs"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {persona}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#advisor-call"
                className="px-7 py-3.5 rounded-full bg-black text-white font-medium text-[15px] hover:bg-neutral-800 transition-all shadow-sm"
              >
                Talk to an advisor
              </a>
              <a
                href="#dashboard-demo"
                className="px-7 py-3.5 rounded-full bg-neutral-100 text-neutral-900 font-medium text-[15px] hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <span>Try the dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero High-Res Headshots Graphic */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              <img
                src="https://compoundplanning.com/images/hero/headshots.png"
                alt="Stratum Client Headshots"
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BIG STATEMENT & KEY METRICS SECTION */}
      <section className="py-20 bg-[#FAFAF8] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#171717] leading-tight">
              We focus on your finances, <br className="hidden sm:inline" />
              you focus on what matters most.
            </h2>
          </div>

          {/* 5 Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl border border-neutral-200/70 shadow-xs">
              <div className="text-4xl lg:text-5xl font-medium tracking-tight text-black mb-2">$5B+</div>
              <div className="text-sm font-medium text-neutral-500">Assets Under Management</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200/70 shadow-xs">
              <div className="text-4xl lg:text-5xl font-medium tracking-tight text-black mb-2">$23B+</div>
              <div className="text-sm font-medium text-neutral-500">Assets Tracked</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200/70 shadow-xs">
              <div className="text-4xl lg:text-5xl font-medium tracking-tight text-black mb-2">100+</div>
              <div className="text-sm font-medium text-neutral-500">Team Members</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200/70 shadow-xs">
              <div className="text-4xl lg:text-5xl font-medium tracking-tight text-black mb-2">50+</div>
              <div className="text-sm font-medium text-neutral-500">Seasoned Advisors</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-xl border border-neutral-200/70 shadow-xs">
              <div className="text-4xl lg:text-5xl font-medium tracking-tight text-black mb-2">~15</div>
              <div className="text-sm font-medium text-neutral-500">Years Experience / Advisor</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SERVICE CAROUSEL ("We help you...") */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Service Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {serviceTabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveServiceTab(idx)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                  activeServiceTab === idx
                    ? "bg-black text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Service Showcase Card */}
          <div className="bg-[#FAFAF8] border border-neutral-200/80 rounded-2xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-sm uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                {serviceTabs[activeServiceTab].sub}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black mb-6 leading-tight">
                {serviceTabs[activeServiceTab].title}
              </h3>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {serviceTabs[activeServiceTab].desc}
              </p>
              <div className="p-4 rounded-xl bg-white border border-neutral-200/60 text-sm text-neutral-700 font-medium flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-black shrink-0" />
                <span>{serviceTabs[activeServiceTab].inHouse}</span>
              </div>
            </div>

            {/* Right Graphic/Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm max-w-[380px] w-full">
                <img
                  src={serviceTabs[activeServiceTab].image}
                  alt={serviceTabs[activeServiceTab].title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEAM ADVISORS CAROUSEL */}
      <section className="py-24 bg-[#FAFAF8] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
                Advice from experienced professionals
              </h2>
              <p className="text-lg text-neutral-600">
                We combine the best of financial planning, investment management, and tax strategy.
              </p>
            </div>
            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <button
                onClick={() => scrollTeam("left")}
                className="w-11 h-11 rounded-full border border-neutral-300 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-700" />
              </button>
              <button
                onClick={() => scrollTeam("right")}
                className="w-11 h-11 rounded-full border border-neutral-300 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            </div>
          </div>

          {/* Scrolling Advisor Cards */}
          <div
            ref={teamScrollRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
          >
            {advisors.map((adv, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[320px] bg-white rounded-xl border border-neutral-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow shrink-0"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={adv.image}
                      alt={adv.name}
                      className="w-16 h-16 rounded-full object-cover border border-neutral-100"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-black">{adv.name}</h4>
                      <p className="text-xs text-neutral-500 font-medium">{adv.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{adv.location}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-100 mt-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {adv.experience}
                </div>
              </div>
            ))}

            {/* "We are hiring" Card */}
            <div className="min-w-[280px] sm:min-w-[320px] bg-black text-white rounded-xl p-6 flex flex-col justify-between shadow-xs shrink-0">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FEE7B8] font-semibold">Join us</span>
                <h4 className="font-semibold text-2xl text-white mt-2 mb-3">We are hiring</h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Looking for kind and ambitious wealth advisors, planners, and engineers to join our team.
                </p>
              </div>
              <a
                href="#careers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FEE7B8] hover:underline mt-6"
              >
                <span>Explore open roles</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Fiduciary Creed Callout */}
          <div className="mt-16 bg-white border border-neutral-200/80 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FDF8ED] border border-[#F5E6CC] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-black">We are a fiduciary</h4>
                <p className="text-sm text-neutral-600 max-w-3xl mt-1">
                  Stratum is an SEC-registered Investment Adviser and an independent fiduciary. We have a legal obligation to act in our clients’ best interests and eliminate conflicts with third-party products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECH PLATFORM & DASHBOARD ("Manage everything in one place") */}
      <section id="dashboard" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-black mb-4">
            Manage everything in one place
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-12">
            Stratum integrates with thousands of financial institutions so your complete balance sheet is always accurate and updated in real time.
          </p>

          {/* Dashboard Preview Graphic */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-900">
              <img
                src="https://compoundplanning.com/images/membership/desktop-bg.jpg"
                alt="Stratum Platform Monitor"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-x-8 top-8 bottom-0 rounded-t-xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://compoundplanning.com/images/membership/net-worth.webp"
                  alt="Net Worth Live Monitor"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <img
              src="https://compoundplanning.com/images/membership/monitor-stand.webp"
              alt="Stand"
              className="w-48 mx-auto -mt-1 pointer-events-none"
            />
          </div>

          {/* Dashboard Feature Pill Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
            {dashboardFeatures.map((feat, idx) => (
              <button
                key={feat}
                onClick={() => setActiveDashboardTab(idx)}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  activeDashboardTab === idx
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {feat}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="#demo"
              className="px-8 py-3.5 rounded-full bg-black text-white font-medium text-sm hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Try the Demo
            </a>
          </div>
        </div>
      </section>

      {/* 8. COMPARISON MATRIX ("Stratum vs. Traditional Firm") */}
      <section className="py-24 bg-[#FAFAF8] border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
              How Stratum compares
            </h2>
            <p className="text-lg text-neutral-600">
              Modern engineering paired with elite fiduciary planning.
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
            <div className="grid grid-cols-12 bg-neutral-50 px-6 py-4 border-b border-neutral-200 text-sm font-semibold text-neutral-600">
              <div className="col-span-8">Capability</div>
              <div className="col-span-2 text-center text-black font-bold">Stratum</div>
              <div className="col-span-2 text-center">Traditional Firm</div>
            </div>

            <div className="divide-y divide-neutral-100">
              {comparisonItems.map((item, i) => (
                <div key={i} className="grid grid-cols-12 px-6 py-3.5 items-center text-sm">
                  <div className="col-span-8 font-medium text-neutral-800">{item.name}</div>
                  <div className="col-span-2 flex justify-center">
                    {item.stratum ? (
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <Minus className="w-4 h-4 text-neutral-300" />
                    )}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {item.traditional ? (
                      <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    ) : (
                      <Minus className="w-4 h-4 text-neutral-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative: How We Measure Success */}
          <div className="mt-16 bg-white border border-neutral-200/80 rounded-2xl p-8 sm:p-12 shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-black mb-4">
              How we measure success
            </h3>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We measure our success by the impact we have on our clients’ lives. Sometimes our impact is concrete: saving an executive $500k through optimal stock option exercises, or unlocking private allocations previously reserved for institutional endowments. But just as often, it is the simple peace of mind knowing your retirement lifestyle and family succession are protected.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RESOURCES & KNOWLEDGE HUB (The Manual) */}
      <section id="resources" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
              Resources to help manage your wealth
            </h2>
            <p className="text-lg text-neutral-600">
              Explore upcoming events, market research, and our curated library of personal finance guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Upcoming Event */}
            <div className="bg-[#FAFAF8] rounded-xl border border-neutral-200/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Upcoming Briefing</span>
                <h4 className="font-semibold text-xl text-black mt-2 mb-1">Your company was acquired. Now what?</h4>
                <p className="text-xs text-neutral-500 mb-4">Executive wealth transition strategies for liquidity events.</p>
                <div className="rounded-lg overflow-hidden border border-neutral-200 mb-6">
                  <img
                    src="https://res.cloudinary.com/introvoke/image/upload/v1790781600/chvt6rbekapdg6xpbnob.png"
                    alt="Acquisition Event"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <a
                href="#signup"
                className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Sign up
              </a>
            </div>

            {/* Card 2: Market Update */}
            <div className="bg-[#FAFAF8] rounded-xl border border-neutral-200/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Market Research</span>
                <h4 className="font-semibold text-xl text-black mt-2 mb-4">Quarterly CIO Dispatches</h4>
                <div className="divide-y divide-neutral-200">
                  <div className="py-3">
                    <a href="#research1" className="text-sm font-medium text-black hover:underline block">
                      Growth Meets Its Constraints
                    </a>
                    <span className="text-xs text-neutral-400">November 2026</span>
                  </div>
                  <div className="py-3">
                    <a href="#research2" className="text-sm font-medium text-black hover:underline block">
                      Raising the Bar: Private Credit Fundamentals
                    </a>
                    <span className="text-xs text-neutral-400">October 2026</span>
                  </div>
                  <div className="py-3">
                    <a href="#research3" className="text-sm font-medium text-black hover:underline block">
                      Competing for Global Capital
                    </a>
                    <span className="text-xs text-neutral-400">September 2026</span>
                  </div>
                </div>
              </div>
              <a
                href="#market-updates"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline pt-4"
              >
                <span>View all updates</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: The Manual */}
            <div className="bg-[#FAFAF8] rounded-xl border border-neutral-200/80 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Knowledge Base</span>
                <h4 className="font-semibold text-xl text-black mt-2 mb-2">The Stratum Manual</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  The curated library of wealth planning resources for entrepreneurs, professionals, and retirees.
                </p>
                <div className="rounded-lg overflow-hidden mb-6 flex justify-center">
                  <img
                    src="https://compoundplanning.com/images/membership/the-manual-books.png"
                    alt="The Manual Books"
                    className="h-32 object-contain"
                  />
                </div>
              </div>
              <a
                href="#manual"
                className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-neutral-200 text-neutral-900 text-sm font-medium hover:bg-neutral-300 transition-colors"
              >
                Explore The Manual
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ACCORDION FAQ SECTION */}
      <section className="py-24 bg-[#FAFAF8] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Clear answers regarding our fiduciary standard and advisory model.
            </p>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-lg font-medium text-black group-hover:text-neutral-600 transition-colors">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                    {expandedFaq === idx ? (
                      <Minus className="w-4 h-4 text-neutral-700" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-700" />
                    )}
                  </div>
                </button>
                {expandedFaq === idx && (
                  <p className="mt-3 text-neutral-600 leading-relaxed text-[15px] pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BOTTOM CONVERSION CTA BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black text-white rounded-3xl p-10 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="z-10 max-w-xl">
              <span className="text-2xl font-bold font-serif lowercase text-[#FEE7B8] mb-2 block">
                stratum
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4">
                Your personal family office
              </h2>
              <p className="text-neutral-300 text-base sm:text-lg mb-8">
                Connect with an advisor today and experience institutional wealth management designed for modern lives.
              </p>
              <a
                href="#get-started"
                className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-[#FEE7B8] transition-colors shadow-lg"
              >
                Get started
              </a>
            </div>

            <div className="relative z-10 w-full md:w-auto flex justify-center">
              <img
                src="https://compoundplanning.com/images/membership/bottom-ribbon.png"
                alt="Stratum Ribbon"
                className="max-h-64 object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. INSTITUTIONAL REGULATORY FOOTER */}
      <footer className="bg-[#FAFAF8] border-t border-neutral-200 pt-16 pb-12 text-sm text-neutral-600">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Links 4-column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h5 className="font-semibold text-black uppercase tracking-wider text-xs mb-4">Resources</h5>
              <ul className="space-y-2.5">
                <li><a href="#research" className="hover:text-black transition-colors">Investment Research</a></li>
                <li><a href="#manual" className="hover:text-black transition-colors">The Manual</a></li>
                <li><a href="#archive" className="hover:text-black transition-colors">The Archive</a></li>
                <li><a href="#calculator" className="hover:text-black transition-colors">Offer Calculator</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black uppercase tracking-wider text-xs mb-4">Company</h5>
              <ul className="space-y-2.5">
                <li><a href="#team" className="hover:text-black transition-colors">Team</a></li>
                <li><a href="#about" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#careers" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#newsroom" className="hover:text-black transition-colors">Newsroom</a></li>
                <li><a href="#faq" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black uppercase tracking-wider text-xs mb-4">Legal</h5>
              <ul className="space-y-2.5">
                <li><a href="#directory" className="hover:text-black transition-colors">Directory</a></li>
                <li><a href="#privacy" className="hover:text-black transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-black transition-colors">Terms of Service</a></li>
                <li><a href="#security" className="hover:text-black transition-colors">Security Overview</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black uppercase tracking-wider text-xs mb-4">Competitors</h5>
              <ul className="space-y-2.5">
                <li><a href="#diy" className="hover:text-black transition-colors">Typical DIY</a></li>
                <li><a href="#traditional" className="hover:text-black transition-colors">Typical Financial Advisor</a></li>
                <li><a href="#robo" className="hover:text-black transition-colors">Typical Robo Advisor</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright Line */}
          <div className="py-6 border-y border-neutral-200 mb-8">
            <span className="text-xs text-neutral-500 font-medium">
              © Stratum Planning, Inc. All rights reserved.
            </span>
          </div>

          {/* Regulatory Disclosures */}
          <div className="text-xs text-neutral-500 space-y-3 leading-relaxed">
            <p>
              Stratum Planning, Inc. (“Stratum”) is an investment adviser registered with the U.S. Securities and Exchange Commission. Registration does not imply a certain level of skill or training. Stratum and its representatives may transact business or provide investment advice only in jurisdictions where they are registered, have filed required notices, or are excluded or exempt from registration. For more information about Stratum’s advisory services, fees, and conflicts of interest, see our Form ADV 2A and Form CRS.
            </p>
            <p>
              Content on this website is provided for informational and educational purposes only and is not personalized investment, tax, or legal advice. Stratum does not provide legal advice; please consult a qualified legal professional regarding your specific situation. All investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. Dashboard images and examples are for illustrative purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
