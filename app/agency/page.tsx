"use client";

import React, { useState, useEffect } from "react";

// Exact Figma assets from Dev Mode MCP
const imgDiv = "/figma_assets/e1addd74cdb02adcbf31b8c1c786af8a878d9446.png";
const imgLogoA16ZPng = "/figma_assets/edd517e082bf2ce7195b01e9d537b27fa5c4725e.png";
const imgDiv1 = "/figma_assets/c795d6e12cab76855c89e1c4b236c476a40dd707.png";
const imgProjectStratum = "/figma_assets/project_stratum.png";
const imgProjectValmont = "/figma_assets/project_valmont.png";
const imgCasestudy01Jpg = "/figma_assets/70a909e8f7ae0d9fe9bd02e7142d790b3ef7c03a.png";
const imgCasestudy02Jpg = "/figma_assets/0f111cc66638eecd247e6bc5b75419fd4667a80f.png";
const imgCasestudy03Jpg = "/figma_assets/b95b6f5f24f6798a9628cb08feb1df3b4fa67f81.png";
const imgCasestudy04Jpg = "/figma_assets/3b2e78cfb6c994e03acfd8a14541837adea949d1.png";
const imgOther01Jpg = "/figma_assets/980dd90941d61c4621dddd90073b3f416be2f4ce.png";
const imgOther03Jpg = "/figma_assets/6777d050caf0cc9bdaa60c54b2498900f54e598d.png";
const imgOther04Jpg = "/figma_assets/a48d54c848aab8e9403c36955f960ed01ee938a0.png";
const imgHelp01Jpg = "/figma_assets/33c6f02b6187b1d91353b37ff77293a9579641f2.png";
const imgAbout01Jpg = "/figma_assets/9b0f83b992fbdd6aa833600a48ad9f3400bb9988.png";
const imgAbout02Jpg = "/figma_assets/60d48c2176df5c1bc28508b6650a2da844214bbd.png";
const imgAbout03Jpg = "/figma_assets/e289a5853bbda9f55806e5fdb6a7d07ce85f31fa.png";
const imgArrowBottomSvg = "/figma_assets/2fd910df87ad551605f6805ea8ca198f2e44e907.svg";
const imgGroup = "/figma_assets/731f96de60e61f017629b44999ab84800612de08.svg";
const imgLogoCoinbaseSvg = "/figma_assets/85cb479df08269571ccd97b435e2bfe5ea0d6452.svg";
const imgLogoBlockchangeSvg = "/figma_assets/9ad611e45f3c85ef42ada35519bef40c859b2f0f.svg";
const imgTextInfiniteSvg = "/figma_assets/213c4b7b72d8f20c82c1609908e2a93a973b7678.svg";
const imgGroup1 = "/figma_assets/99af09f40d5014a86f6c8bd0cc24c08984b1301c.svg";
const imgArrowLeftWhiteSvg = "/figma_assets/375b8fa0b85411c6c431796f50ff408c520e244b.svg";
const imgArrowRightWhiteSvg = "/figma_assets/586db4828da30ff0faf1bb3e9498ec6a2ed69323.svg";
const imgGroup2 = "/figma_assets/93563ec75865ec047499d3fc40cc508af98d6910.svg";
const imgGroup3 = "/figma_assets/b7f252d9bac09a998b47f49918ed656c631634a6.svg";
const imgAboutShape01Svg = "/figma_assets/2044a71f623a6f63326a161a00608c211a2ddd8b.svg";
const imgAboutShape02Svg = "/figma_assets/c0ce9a0f5a4d785d3d799ebce815a4282daed0d5.svg";
const imgAboutShape03Svg = "/figma_assets/6725600223ffa8032e4fd2e1a8fb2431b3199bcb.svg";
const imgArrowRightSvg = "/figma_assets/c3d6f476830423c9004193a20af964ac6c6ea635.svg";
const imgArrowTopSvg = "/figma_assets/495d369e1566bb416f6c96d4ea60d27861419f79.svg";
const imgLogoSvg = "/figma_assets/ba73e11773e9fc559b6e73f632b563aca6faea70.svg";
const imgMenuSvg = "/figma_assets/430a6b3926d1dbdbba56f859327037a9fdf8e3f0.svg";

export default function AdvisorSolutionAgency() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  // Responsive scaling to preserve exact Figma coordinate fidelity on screens < 1440px
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 1440) {
        setScale(w / 1440);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsAppAudit = () => {
    const text = encodeURIComponent(
      "Hi Hari, I am reviewing your Advisor Solution agency website. Let us schedule a 15-minute digital desk audit for our firm."
    );
    window.open(`https://wa.me/919345619428?text=${text}`, "_blank");
  };

  const tabContents = [
    {
      title: "Lead Generation",
      heading: "Turn cold impressions and referral traffic into high-intent HNI inquiries with specialized digital entry points.",
      bullets: [
        "targeted RIA teardowns & viral hook distribution",
        "frictionless net-worth screening calculators",
        "instant WhatsApp qualification dispatch",
      ],
    },
    {
      title: "Lead Conversion",
      heading: "Replace 14-page physical PDF risk questionnaires with an interactive 60-second sovereign digital intake desk.",
      bullets: [
        "liquid net-worth & risk-profiling spam wall",
        "automated portfolio mandate & fee-drag calculator",
        "seamless 1-click consultation scheduler",
      ],
    },
    {
      title: "Customer Retention",
      heading: "Lock in multi-generational wealth relationships with sovereign client portals and automated compliance.",
      bullets: [
        "institutional client dashboard & mandate tracker",
        "automated SEBI compliance & SCORES redressal rails",
        "continuous portfolio governance & quarterly reports",
      ],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      tagline: "Stage 01 // Deep Practice & Compliance Audit",
      timeline: "24 – 48 Hours",
      description:
        "We audit your existing client acquisition funnel, drop-off points in your intake questionnaires, and SEBI (IA) regulatory compliance posture.",
      bullets: [
        "Teardown of current website, brochure PDFs, and risk profiling workflow",
        "AUM threshold qualification logic (screening out retail queries below ₹50L)",
        "SEBI (IA) 2013 audit checklist & CeFCoM compliance gap analysis",
      ],
      cta: "Book Discovery Audit",
    },
    {
      step: "02",
      title: "Concept Development",
      tagline: "Stage 02 // Bespoke Desk & Wireframe Architecture",
      timeline: "Day 3 – 5",
      description:
        "We design custom intake wireframes, interactive fee-drag calculators, and high-trust neo-brutalist visual systems tailored to your RIA brand.",
      bullets: [
        "Interactive Figma wireframe prototype of the custom digital intake desk",
        "Institutional design system: typography, offset backing, obsidian/cream palette",
        "Pre-qualification simulator: liquid net-worth dials & investor persona switches",
      ],
      cta: "Review Concept Architecture",
    },
    {
      step: "03",
      title: "Feedback and Revisions",
      tagline: "Stage 03 // Partner Walkthrough & Compliance Lock",
      timeline: "Day 6 – 7",
      description:
        "Collaborative review with your partners and compliance team to lock copy, regulatory notices, and HNI positioning with zero friction.",
      bullets: [
        "Loom video walkthrough covering desktop, mobile, and simulator states",
        "Sub-24-hour iteration turnaround for all feedback and wording adjustments",
        "Partner sign-off on SEBI disclosures, booking triggers, and WhatsApp hooks",
      ],
      cta: "Schedule Feedback Call",
    },
    {
      step: "04",
      title: "Design & Development",
      tagline: "Stage 04 // Production React/Next.js Engineering",
      timeline: "Sprint Week 2",
      description:
        "We engineer clean Next.js, TypeScript, and Tailwind code with bank-grade encryption, sub-second loads, and zero third-party tracking.",
      bullets: [
        "Ultra-fast responsive frontend engineered for desktop, tablet, and mobile",
        "Instant WhatsApp webhook firing full HNI lead dossiers directly to your phone",
        "Native SEBI regulatory disclosure modals, audit logs, and complaint tables",
      ],
      cta: "Explore Development Stack",
    },
    {
      step: "05",
      title: "Final Delivery and possible iterations",
      tagline: "Stage 05 // Global Edge Deployment & Stress Testing",
      timeline: "Sprint Week 2 – 3",
      description:
        "Production deployment to high-speed global edge network (Vercel), custom DNS linking, and rigorous device and browser stress tests.",
      bullets: [
        "Live deployment on custom domain with SSL hardening & 99.99% uptime guarantee",
        "Full cross-device testing across iOS Safari, Android Chrome, and desktop browsers",
        "Immediate iteration sprint to polish micro-interactions and transitions",
      ],
      cta: "Launch Live Desk",
    },
    {
      step: "06",
      title: "Post delivery Support",
      tagline: "Stage 06 // Ongoing Fiduciary Partnership",
      timeline: "Ongoing Partnership",
      description:
        "Continuous maintenance, conversion rate tracking, and rapid content updates as SEBI regulations or your advisory offerings evolve.",
      bullets: [
        "30 days of complimentary priority bug fixes, tweaks, and copy adjustments",
        "Quarterly SEBI regulatory disclosure updates (complaint table audits)",
        "Direct WhatsApp access with founder Hari Narayan for technical guidance",
      ],
      cta: "Connect on WhatsApp",
    },
  ];

  const carouselItems = [
    {
      title: "Risk Profiling Spam Wall",
      desc: "Filters out sub-₹50L retail leads automatically before calendar booking.",
      tag: "SEBI COMPLIANCE",
      img: imgOther01Jpg,
    },
    {
      title: "CeFCoM Fee Gate Interface",
      desc: "Simulates regulatory centralized fee collection mechanism with audit trail.",
      tag: "PAYMENT RAILS",
      img: imgOther03Jpg,
    },
    {
      title: "Aadhaar e-KYC Verification",
      desc: "Seamless OTP verification and digital onboarding in under 60 seconds.",
      tag: "IDENTITY VERIFICATION",
      img: imgOther04Jpg,
    },
    {
      title: "Multi-Asset Mandate Engine",
      desc: "Dynamic public equities, private credit, and direct indexing toggles.",
      tag: "PORTFOLIO DESK",
      img: imgOther01Jpg,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center overflow-x-hidden selection:bg-[#53A0FD] selection:text-black">
      {/* Mobile / Screen Scaling Wrapper */}
      <div
        style={{
          width: 1440,
          height: 7175 * scale,
          position: "relative",
          overflow: "hidden",
        }}
        className="shrink-0"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: 1440,
            height: 7175,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          className="bg-black relative select-none"
          data-node-id="27:5935"
          data-name="thirdweb.studio"
        >
          {/* ========================================================
              1. TOP NAVIGATION (Figma node 27:6188, h=60px)
              ======================================================== */}
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute h-[60px] left-1/2 top-[38px] w-[1440px] z-50 px-6 flex items-center justify-between"
            data-node-id="27:6188"
            data-name="div"
          >
            {/* Logo Mark + Agency Name */}
            <a
              href="#hero"
              className="-translate-y-1/2 absolute content-stretch flex items-center gap-3 left-[24px] top-1/2 cursor-pointer group"
              data-node-id="27:6189"
              data-name="logo.svg"
            >
              <div className="h-[50px] relative shrink-0 w-[52px]" data-node-id="27:6190" data-name="logo.svg">
                <img alt="Advisor Solution" className="absolute block inset-0 max-w-none size-full" src={imgLogoSvg} />
              </div>
              <span className="font-['Inter:Medium'] text-sm tracking-widest text-white/90 group-hover:text-[#53A0FD] transition-colors">
                ADVISOR SOLUTION
              </span>
            </a>

            {/* Nav Links */}
            <div
              className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center left-[calc(50%-6.44px)] top-[calc(50%+8.5px)] gap-2"
              data-node-id="27:6194"
              data-name="ul"
            >
              <a
                href="#hero"
                className="content-stretch flex items-start px-5 py-[8px] relative shrink-0 hover:text-[#53A0FD] transition-colors cursor-pointer"
                data-node-id="27:6195"
                data-name="a"
              >
                <div className="font-['Inter:Regular'] text-[18px] text-center text-white whitespace-nowrap">
                  Home
                </div>
              </a>
              <a
                href="#process"
                className="content-stretch flex items-start px-5 py-[8px] relative shrink-0 hover:text-[#53A0FD] transition-colors cursor-pointer"
                data-node-id="27:6197"
                data-name="a"
              >
                <div className="font-['Inter:Regular'] text-[18px] text-center text-white whitespace-nowrap">
                  Process
                </div>
              </a>
              <a
                href="#projects"
                className="content-stretch flex items-start px-5 py-[8px] relative shrink-0 hover:text-[#53A0FD] transition-colors cursor-pointer"
                data-node-id="27:6199"
                data-name="a"
              >
                <div className="font-['Inter:Regular'] text-[18px] text-center text-white whitespace-nowrap">
                  Projects
                </div>
              </a>
              <a
                href="#capabilities"
                className="content-stretch flex items-start px-5 py-[8px] relative shrink-0 hover:text-[#53A0FD] transition-colors cursor-pointer"
              >
                <div className="font-['Inter:Regular'] text-[18px] text-center text-white whitespace-nowrap">
                  Capabilities
                </div>
              </a>
              <a
                href="#contact"
                className="content-stretch flex items-start px-5 py-[8px] relative shrink-0 hover:text-[#53A0FD] transition-colors cursor-pointer"
              >
                <div className="font-['Inter:Regular'] text-[18px] text-center text-white whitespace-nowrap">
                  Contact
                </div>
              </a>
            </div>

            {/* Right Action: Audit CTA + Menu */}
            <div
              className="-translate-y-1/2 absolute h-[43px] left-[1250.13px] top-1/2 flex items-center gap-6"
              data-node-id="27:6205"
            >
              <button
                onClick={openWhatsAppAudit}
                className="px-4 py-1.5 rounded-full bg-white text-black font-['Inter:Medium'] text-[14px] hover:bg-[#3EFFB4] transition-all cursor-pointer font-medium"
              >
                Audit Desk
              </button>

              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="font-['Inter:Regular'] text-[18px] text-white">Menu</span>
                <div className="h-[13px] relative shrink-0 w-[21px]" data-node-id="27:6208" data-name="menu.svg">
                  <img alt="Menu" className="absolute block inset-0 max-w-none size-full" src={imgMenuSvg} />
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Mobile/Drawer Menu */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-12 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                  [ADVISOR SOLUTION // NAVIGATION]
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-[#53A0FD] text-lg font-mono px-4 py-2 border border-white/20 rounded-full"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex flex-col gap-6 max-w-xl">
                <a
                  href="#hero"
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-light hover:text-[#53A0FD] transition-colors"
                >
                  01. Home
                </a>
                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-light hover:text-[#53A0FD] transition-colors"
                >
                  02. Projects
                </a>
                <a
                  href="#capabilities"
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-light hover:text-[#53A0FD] transition-colors"
                >
                  03. Capabilities
                </a>
                <a
                  href="#process"
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-light hover:text-[#53A0FD] transition-colors"
                >
                  04. Process
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-6xl font-light hover:text-[#53A0FD] transition-colors"
                >
                  05. Direct Contact
                </a>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm text-white/60">
                <span>Hari Narayan // Founder</span>
                <a href="tel:+919345619428" className="text-white hover:underline">
                  +91 93456 19428
                </a>
              </div>
            </div>
          )}

          {/* ========================================================
              2. HERO SECTION (Figma node 27:5936, h=810px)
              ======================================================== */}
          <div id="hero" className="absolute h-[810px] left-0 right-0 top-0" data-node-id="27:5936" data-name="div">
            {/* Phone Mockup in Hand */}
            <div
              className="absolute bottom-[-129.59px] h-[810px] right-0 w-[1008px]"
              data-node-id="27:5937"
              data-name="div"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="Client Desk Mockup" className="absolute h-[88.34%] left-0 max-w-none top-0 w-full" src={imgDiv} />
              </div>
            </div>

            {/* Staggered Headline */}
            <div
              className="absolute h-[320px] left-0 right-[600px] top-[245px] z-10"
              data-node-id="27:5938"
              data-name="div"
            >
              {/* Line 1: Digital Solutions */}
              <div
                className="absolute h-[102px] left-[115.19px] top-0 w-[800px]"
                data-node-id="27:5939"
                data-name="div"
              >
                <div
                  className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[100px] justify-center leading-[0] left-0 not-italic text-[82px] text-white top-[51px] whitespace-nowrap"
                  data-node-id="27:5940"
                >
                  <p className="leading-[92px]">Digital Solutions</p>
                </div>
              </div>

              {/* Line 2: for Wealth Managers */}
              <div
                className="absolute content-stretch flex items-start left-[320px] top-[102px]"
                data-node-id="27:5941"
                data-name="div"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[82px] text-white whitespace-nowrap"
                  data-node-id="27:5942"
                >
                  <p className="leading-[92px]">for Wealth Managers</p>
                </div>
              </div>

              {/* Line 3: and Founders */}
              <div
                className="absolute content-stretch flex items-start left-[200px] top-[204px]"
                data-node-id="27:5943"
                data-name="div"
              >
                <div
                  className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[82px] text-white whitespace-nowrap"
                  data-node-id="27:5944"
                >
                  <p className="leading-[92px]">and Founders</p>
                </div>
              </div>
            </div>

            {/* Bottom Arrow & Subtitle */}
            <div className="absolute inset-[723px_0_48px_0]" data-node-id="27:5945" data-name="div">
              <div
                onClick={() => scrollToSection("what-is")}
                className="-translate-y-1/2 absolute h-[39px] left-[24px] top-1/2 w-[40px] cursor-pointer hover:translate-y-[-40%] transition-transform"
                data-node-id="27:5946"
                data-name="a"
              >
                <div className="absolute h-[39px] left-0 top-0 w-[40px]" data-node-id="27:5947" data-name="arrow-bottom.svg">
                  <img alt="Scroll Down" className="absolute block inset-0 max-w-none size-full" src={imgArrowBottomSvg} />
                </div>
              </div>
              <div
                className="[word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal inset-[-5.5px_700px_-5.5px_115.19px] justify-center leading-[0] not-italic text-[19px] text-[rgba(255,255,255,0.6)]"
                data-node-id="27:5950"
              >
                <p className="leading-[30px]">
                  We engineer sovereign client intake desks and high-trust portals for SEBI RIAs and boutique wealth managers.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              3. WHAT IS ADVISOR SOLUTION (Figma node 27:5976, h=821.188px)
              ======================================================== */}
          <div
            id="what-is"
            className="absolute h-[821.188px] left-0 overflow-clip right-0 top-[810px]"
            data-node-id="27:5976"
            data-name="div"
          >
            {/* Ambient Aurora Glow Orb */}
            <div
              className="absolute h-[1009px] right-[-530px] top-[-120px] w-[830px] pointer-events-none"
              data-node-id="27:5977"
              data-name="div"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[98.69%] left-0 max-w-none top-0 w-full" src={imgDiv1} />
              </div>
            </div>

            {/* Left Content */}
            <div
              className="[word-break:break-word] absolute h-[245.188px] leading-[0] left-0 not-italic right-[720px] top-[288px]"
              data-node-id="27:5978"
              data-name="div"
            >
              <div
                className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium'] font-medium h-[36px] justify-center left-[115.19px] text-[34px] text-white top-[21px] w-[460px]"
                data-node-id="27:5979"
              >
                <p className="leading-[43.2px]">What is Advisor Solution?</p>
              </div>
              <div
                className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular'] font-normal h-[140px] justify-center left-[115.19px] text-[19px] text-[rgba(255,255,255,0.6)] top-[154.19px] w-[539.247px]"
                data-node-id="27:5980"
              >
                <p className="leading-[30px]">
                  Wealth management in India is undergoing a massive fiduciary shift. High-net-worth investors are leaving
                  commission brokers and demanding pure fee-only advisory. Unfortunately, onboarding for top RIAs is still
                  trapped in physical PDFs and generic GoDaddy pages. We engineer custom client intake desks to close HNIs
                  in 60 seconds. And this is where your practice scales.
                </p>
              </div>
            </div>

            {/* Right Side Infinity Wireframe Loop */}
            <div
              className="absolute h-[245.188px] left-[720px] right-0 top-[288px]"
              data-node-id="27:5981"
              data-name="div"
            >
              <div
                className="absolute content-stretch flex inset-[14.09px_5.41px] items-start px-[57.594px]"
                data-node-id="27:5982"
                data-name="text-infinite.svg"
              >
                <div
                  className="h-[217px] relative shrink-0 w-[594px]"
                  data-node-id="27:5983"
                  data-name="text-infinite.svg"
                >
                  <img alt="Infinity Loop" className="absolute block inset-0 max-w-none size-full" src={imgTextInfiniteSvg} />
                </div>
              </div>
              <div
                className="absolute h-[217px] left-0 overflow-clip right-0 top-[14.09px]"
                data-node-id="27:6037"
                data-name="svg"
              >
                <div
                  className="-translate-x-1/2 absolute h-[217px] left-1/2 top-0 w-[720px]"
                  data-node-id="27:6038"
                  data-name="Frame"
                >
                  <div className="absolute inset-[0_8.96%_0.72%_8.75%]" data-node-id="27:6039" data-name="Group">
                    <div className="absolute inset-[-0.23%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              4. PROJECTS MASONRY (Figma node 27:6041, h=1290.281px)
              FEATURING STRATUM PLANNING & VALMONT & CIE
              ======================================================== */}
          <div
            id="projects"
            className="absolute h-[1290.281px] left-0 right-0 top-[1746.38px]"
            data-node-id="27:6041"
            data-name="div#projects"
          >
            {/* Title */}
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[120px] justify-center leading-[0] left-[40px] not-italic text-[111px] text-white top-[72px] w-[434.731px]"
              data-node-id="27:6042"
            >
              <p className="leading-[144px]">Projects</p>
            </div>

            {/* Masonry Columns */}
            <div
              className="absolute content-stretch flex items-start left-0 px-[40px] top-[212px]"
              data-node-id="27:6043"
              data-name="div"
            >
              {/* Left Column (w=680px) */}
              <div className="h-[1060px] relative shrink-0 w-[680px]" data-node-id="27:6044" data-name="div">
                {/* PROJECT 1: Stratum Planning */}
                <a
                  href="/stratum"
                  target="_blank"
                  rel="noreferrer"
                  className="-translate-y-1/2 absolute h-[429.891px] left-0 top-[calc(50%-315.05px)] w-[668px] overflow-hidden rounded-[14px] cursor-pointer group border border-white/[0.12] hover:border-[#53A0FD] hover:shadow-[0_12px_40px_rgba(83,160,253,0.18)] transition-all duration-300 bg-[#0B0F19] flex flex-col"
                  data-node-id="27:6045"
                  data-name="casestudy-01.jpg"
                >
                  {/* macOS Browser Header Chrome */}
                  <div className="h-[36px] bg-[#121624] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 group-hover:bg-[#FF5F56] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 group-hover:bg-[#FFBD2E] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 group-hover:bg-[#27C93F] transition-colors" />
                    </div>
                    <div className="bg-black/50 border border-white/10 px-3 py-0.5 rounded-full text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#53A0FD]">🔒</span>
                      <span>stratum.advisorsolution.com</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#53A0FD]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#53A0FD] animate-pulse" />
                      <span className="tracking-wider">LIVE DESK</span>
                    </div>
                  </div>

                  {/* Unobstructed Crisp Website Preview */}
                  <div className="relative flex-1 overflow-hidden bg-[#FBF9F5]">
                    <img
                      alt="Stratum Planning // Digital Wealth Mandate Desk"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                      src={imgProjectStratum}
                    />
                  </div>

                  {/* Sleek Bottom Metadata Dock */}
                  <div className="h-[84px] bg-[#0E1322] border-t border-white/[0.08] px-5 py-3 flex items-center justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#53A0FD]/15 border border-[#53A0FD]/30 text-[#53A0FD] text-[10px] font-mono font-bold tracking-wider uppercase">
                          AWWWARDS CANDIDATE
                        </span>
                        <span className="text-[11px] font-mono text-white/50">
                          ₹100 CR+ AUM BENCHMARK
                        </span>
                      </div>
                      <h4 className="text-[17px] font-['Inter:Medium'] font-medium text-white group-hover:text-[#53A0FD] transition-colors">
                        Stratum Planning // Wealth Mandate Desk
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#53A0FD] group-hover:bg-[#53A0FD]/10 transition-all">
                      <span className="text-xs font-mono text-white/80 group-hover:text-[#53A0FD]">Launch Site</span>
                      <span className="text-sm text-[#53A0FD] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </a>

                {/* PROJECT 3: Aurum Fiduciary Client Desk */}
                <a
                  href="https://sebi-advisor-solution.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="-translate-y-1/2 absolute h-[409.313px] left-0 top-[calc(50%+128.55px)] w-[668px] overflow-hidden rounded-[14px] cursor-pointer group border border-white/[0.12] hover:border-[#3EFFB4] hover:shadow-[0_12px_40px_rgba(62,255,180,0.18)] transition-all duration-300 bg-[#0B0F19] flex flex-col"
                  data-node-id="27:6046"
                  data-name="casestudy-03.jpg"
                >
                  {/* macOS Browser Header Chrome */}
                  <div className="h-[36px] bg-[#121624] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 group-hover:bg-[#FF5F56] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 group-hover:bg-[#FFBD2E] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 group-hover:bg-[#27C93F] transition-colors" />
                    </div>
                    <div className="bg-black/50 border border-white/10 px-3 py-0.5 rounded-full text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#3EFFB4]">🔒</span>
                      <span>aurum.advisorsolution.com</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#3EFFB4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3EFFB4] animate-pulse" />
                      <span className="tracking-wider">SEBI DESK</span>
                    </div>
                  </div>

                  {/* Unobstructed Device / Mockup Preview */}
                  <div className="relative flex-1 overflow-hidden bg-[#00D46A] flex items-center justify-center p-2">
                    <img
                      alt="Aurum Fiduciary Wealth Desk"
                      className="w-full h-full object-contain object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      src={imgCasestudy01Jpg}
                    />
                  </div>

                  {/* Sleek Bottom Metadata Dock */}
                  <div className="h-[84px] bg-[#0E1322] border-t border-white/[0.08] px-5 py-3 flex items-center justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#3EFFB4]/15 border border-[#3EFFB4]/30 text-[#3EFFB4] text-[10px] font-mono font-bold tracking-wider uppercase">
                          SEBI RIA PORTAL
                        </span>
                        <span className="text-[11px] font-mono text-white/50">
                          HIGH-FRICTION RPQ QUALIFIER
                        </span>
                      </div>
                      <h4 className="text-[17px] font-['Inter:Medium'] font-medium text-white group-hover:text-[#3EFFB4] transition-colors">
                        Aurum Fiduciary // Sovereign Client Desk
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#3EFFB4] group-hover:bg-[#3EFFB4]/10 transition-all">
                      <span className="text-xs font-mono text-white/80 group-hover:text-[#3EFFB4]">Open Portal</span>
                      <span className="text-sm text-[#3EFFB4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </a>

                {/* Card: 72-Hour Rapid Deployment Pilot */}
                <div
                  onClick={openWhatsAppAudit}
                  className="absolute h-[172.797px] left-0 right-[12px] top-[887.2px] rounded-[14px] cursor-pointer group border border-white/[0.12] hover:border-[#53A0FD] hover:shadow-[0_12px_40px_rgba(83,160,253,0.18)] transition-all duration-300 bg-gradient-to-r from-[#0C1527] via-[#0E1A33] to-[#080E1A] p-6 flex flex-col justify-between"
                  data-node-id="27:6047"
                  data-name="div"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="px-2.5 py-0.5 rounded-full bg-[#53A0FD]/15 border border-[#53A0FD]/30 text-[#53A0FD] text-[10px] font-mono font-bold tracking-wider uppercase">
                        FAST-ACTION SPRINT // ONLY 2 SLOTS PER WEEK
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/40">TURNAROUND: 72 HOURS</span>
                  </div>

                  <div>
                    <h3 className="text-[26px] font-['Inter:Medium'] font-medium text-white leading-tight">
                      72-Hour Rapid Deployment Pilot
                    </h3>
                    <p className="text-xs text-white/60 mt-1 font-['Inter:Regular']">
                      Replace outdated brochure sites with an institutional client intake desk in 3 business days.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-xs text-white/70 font-mono">
                      <span>✓ Liquid Net-Worth Qualifier</span>
                      <span>✓ WhatsApp Instant Dispatch</span>
                    </div>
                    <div className="bg-[#0038C8] group-hover:bg-[#53A0FD] text-white group-hover:text-black font-semibold text-xs px-5 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,56,200,0.4)]">
                      <span>Book 72h Sprint</span>
                      <span className="text-sm">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (w=680px) */}
              <div className="h-[1078.281px] relative shrink-0 w-[680px]" data-node-id="27:6052" data-name="div">
                {/* PROJECT 2: Valmont & Cie Private Bank */}
                <a
                  href="https://advisor-solution-private-bank.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute h-[677.547px] left-[12px] top-0 w-[668px] overflow-hidden rounded-[14px] cursor-pointer group border border-white/[0.12] hover:border-[#DA291C] hover:shadow-[0_12px_40px_rgba(218,41,28,0.22)] transition-all duration-300 bg-[#0B0F19] flex flex-col"
                  data-node-id="27:6053"
                  data-name="casestudy-02.jpg"
                >
                  {/* macOS Browser Header Chrome */}
                  <div className="h-[36px] bg-[#121624] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 group-hover:bg-[#FF5F56] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 group-hover:bg-[#FFBD2E] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 group-hover:bg-[#27C93F] transition-colors" />
                    </div>
                    <div className="bg-black/50 border border-white/10 px-3 py-0.5 rounded-full text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#DA291C]">🔒</span>
                      <span>valmont-cie.advisorsolution.com</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#DA291C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DA291C] animate-pulse" />
                      <span className="tracking-wider">PRIVATE BANK</span>
                    </div>
                  </div>

                  {/* Unobstructed Website Preview - Perfectly Framed 1200x960 capture! */}
                  <div className="relative flex-1 overflow-hidden bg-[#0A070B]">
                    <img
                      alt="Valmont & Cie // Sovereign Private Banking Desk"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                      src={imgProjectValmont}
                    />
                  </div>

                  {/* Sleek Bottom Metadata Dock */}
                  <div className="h-[96px] bg-[#0E1322] border-t border-white/[0.08] px-6 py-3.5 flex items-center justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#DA291C]/15 border border-[#DA291C]/30 text-[#DA291C] text-[10px] font-mono font-bold tracking-wider uppercase">
                          AWWWARDS PRIVATE BANK
                        </span>
                        <span className="text-[11px] font-mono text-white/50">
                          GENEVA & ZURICH FAMILY OFFICE
                        </span>
                      </div>
                      <h4 className="text-[18px] font-['Inter:Medium'] font-medium text-white group-hover:text-[#DA291C] transition-colors">
                        Valmont &amp; Cie // Sovereign Private Bank
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5 font-['Inter:Regular']">
                        Monumental grotesque typography, Newsreader italic accents & co-investment clubs.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 group-hover:border-[#DA291C] group-hover:bg-[#DA291C]/15 transition-all shrink-0">
                      <span className="text-xs font-mono text-white/80 group-hover:text-[#DA291C]">Launch Experience</span>
                      <span className="text-sm text-[#DA291C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </a>

                {/* PROJECT 4: Echvee Finserv Mobile Intake */}
                <div
                  onClick={openWhatsAppAudit}
                  className="-translate-y-1/2 absolute h-[352.734px] left-[12px] top-[calc(50%+338.77px)] w-[668px] overflow-hidden rounded-[14px] cursor-pointer group border border-white/[0.12] hover:border-[#A78BFA] hover:shadow-[0_12px_40px_rgba(167,139,250,0.18)] transition-all duration-300 bg-[#0B0F19] flex flex-col"
                  data-node-id="27:6054"
                  data-name="casestudy-04.jpg"
                >
                  {/* macOS Browser Header Chrome */}
                  <div className="h-[36px] bg-[#121624] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 group-hover:bg-[#FF5F56] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 group-hover:bg-[#FFBD2E] transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 group-hover:bg-[#27C93F] transition-colors" />
                    </div>
                    <div className="bg-black/50 border border-white/10 px-3 py-0.5 rounded-full text-[11px] font-mono text-white/70 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#A78BFA]">🔒</span>
                      <span>echvee.advisorsolution.com</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A78BFA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
                      <span className="tracking-wider">DELHI NCR</span>
                    </div>
                  </div>

                  {/* Unobstructed Device / Mockup Preview */}
                  <div className="relative flex-1 overflow-hidden bg-[#D4C3FA] flex items-center justify-center p-2">
                    <img
                      alt="Echvee Finserv Digital Intake Desk"
                      className="w-full h-full object-contain object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      src={imgCasestudy02Jpg}
                    />
                  </div>

                  {/* Sleek Bottom Metadata Dock */}
                  <div className="h-[84px] bg-[#0E1322] border-t border-white/[0.08] px-5 py-3 flex items-center justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#A78BFA] text-[10px] font-mono font-bold tracking-wider uppercase">
                          DELHI NCR CASE
                        </span>
                        <span className="text-[11px] font-mono text-white/50">
                          REBRAND TEARDOWN FOR CAPT. VARMA
                        </span>
                      </div>
                      <h4 className="text-[17px] font-['Inter:Medium'] font-medium text-white group-hover:text-[#A78BFA] transition-colors">
                        Echvee Finserv // HNI Intake Wireframe
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#A78BFA] group-hover:bg-[#A78BFA]/10 transition-all">
                      <span className="text-xs font-mono text-white/80 group-hover:text-[#A78BFA]">Review Wireframe</span>
                      <span className="text-sm text-[#A78BFA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              5. OTHER PROJECTS CAROUSEL (Figma node 27:6055, h=761px)
              ======================================================== */}
          <div
            className="absolute h-[761px] left-0 top-[3209.45px] w-[1440px]"
            data-node-id="27:6055"
            data-name="div"
          >
            {/* Title */}
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] left-[24px] not-italic text-[114px] text-white top-[72px] whitespace-nowrap"
              data-node-id="27:6056"
            >
              <p className="leading-[144px]">Other projects</p>
            </div>

            {/* Slider Viewport */}
            <div
              className="absolute bg-black h-[549px] left-0 right-0 top-[212px]"
              data-node-id="27:6057"
              data-name="div"
            >
              <div
                className="absolute h-[348px] left-0 overflow-clip top-0 w-[1440px]"
                data-node-id="27:6058"
                data-name="div"
              >
                <div
                  style={{
                    transform: `translateX(-${carouselIndex * 488}px)`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute h-[348px] left-[24px] top-0 flex gap-[24px]"
                  data-node-id="27:6059"
                  data-name="div"
                >
                  {carouselItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="h-[348px] w-[464px] shrink-0 rounded-[8px] overflow-hidden relative group border border-white/10"
                    >
                      <img alt={item.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                        <span className="font-mono text-[10px] tracking-wider text-[#3EFFB4] uppercase font-bold mb-1">
                          {item.tag}
                        </span>
                        <h5 className="text-xl font-['Inter:Medium'] text-white">
                          {item.title}
                        </h5>
                        <p className="text-xs text-white/70 mt-1 font-['Inter:Regular']">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Repeat items for endless feel */}
                  {carouselItems.slice(0, 2).map((item, idx) => (
                    <div
                      key={`rep-${idx}`}
                      className="h-[348px] w-[464px] shrink-0 rounded-[8px] overflow-hidden relative group border border-white/10"
                    >
                      <img alt={item.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                        <span className="font-mono text-[10px] tracking-wider text-[#3EFFB4] uppercase font-bold mb-1">
                          {item.tag}
                        </span>
                        <h5 className="text-xl font-['Inter:Medium'] text-white">
                          {item.title}
                        </h5>
                        <p className="text-xs text-white/70 mt-1 font-['Inter:Regular']">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Next / Prev Navigation */}
              <div
                className="absolute content-stretch flex gap-[20px] items-start left-[1320px] pt-[17px] top-[372px]"
                data-node-id="27:6063"
                data-name="div"
              >
                <div
                  onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
                  className="h-[40px] relative shrink-0 w-[38px] cursor-pointer hover:opacity-70 transition-opacity"
                  data-node-id="27:6064"
                  data-name="Previous"
                >
                  <div
                    className="absolute h-[40px] left-0 top-0 w-[38px]"
                    data-node-id="27:6065"
                    data-name="arrow-left-white.svg"
                  >
                    <img alt="Previous" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeftWhiteSvg} />
                  </div>
                </div>

                <div
                  onClick={() => setCarouselIndex((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0))}
                  className="h-[40px] relative shrink-0 w-[38px] cursor-pointer hover:opacity-70 transition-opacity"
                  data-node-id="27:6067"
                  data-name="Next"
                >
                  <div
                    className="absolute h-[40px] left-0 top-0 w-[38px]"
                    data-node-id="27:6068"
                    data-name="arrow-right-white.svg"
                  >
                    <img alt="Next" className="absolute block inset-0 max-w-none size-full" src={imgArrowRightWhiteSvg} />
                  </div>
                </div>
              </div>

              {/* Slider Dash Indicators */}
              <div
                className="absolute h-[24px] left-[24px] top-[396px] w-[260px] flex items-center gap-[10px]"
                data-node-id="27:6070"
                data-name="div"
              >
                {carouselItems.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    style={{
                      width: idx === carouselIndex ? 40 : 20,
                      backgroundColor: idx === carouselIndex ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                      height: 2,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              6. HOW WE HELP GROW (Figma node 27:6079, h=1325.047px)
              ======================================================== */}
          <div
            id="capabilities"
            className="absolute h-[1325.047px] left-0 right-0 top-[4085.64px]"
            data-node-id="27:6079"
            data-name="div"
          >
            {/* Ambient Aurora Glow Orb Left */}
            <div
              className="absolute h-[1009px] left-[-500px] top-[500px] w-[830px] pointer-events-none"
              data-node-id="27:6080"
              data-name="div"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[98.69%] left-0 max-w-none top-0 w-full" src={imgDiv1} />
              </div>
            </div>

            {/* Abstract Wireframe Divider Graphic */}
            <div
              className="absolute h-[586.656px] left-0 overflow-clip right-0 top-0 pointer-events-none"
              data-node-id="27:6081"
              data-name="div"
            >
              <div
                className="-translate-x-1/2 -translate-y-1/2 absolute h-[586.656px] left-[calc(50%+80px)] top-1/2 w-[1600px]"
                data-node-id="27:6082"
                data-name="divider.svg"
              >
                <div
                  className="-translate-x-1/2 -translate-y-1/2 absolute h-[586.656px] left-1/2 overflow-clip top-1/2 w-[1599.972px]"
                  data-node-id="27:6083"
                  data-name="divider.svg"
                >
                  <div className="absolute inset-[15.98%_0.03%_15.84%_0.03%]" data-node-id="27:6084" data-name="Group">
                    <div className="absolute inset-[-0.1%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup2} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute h-[704px] left-0 overflow-clip top-[-60px] w-[1600px]"
                data-node-id="27:6097"
                data-name="svg"
              >
                <div
                  className="-translate-x-1/2 absolute h-[704px] left-1/2 top-0 w-[1600px]"
                  data-node-id="27:6098"
                  data-name="Frame"
                >
                  <div className="absolute inset-[21.38%_0_21.47%_-0.16%]" data-node-id="27:6099" data-name="Group">
                    <div className="absolute inset-[-0.1%_0]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[238px] justify-center leading-[0] left-[67.19px] not-italic text-[114px] text-white top-[815.05px] w-[666.934px] whitespace-pre-wrap"
              data-node-id="27:6109"
            >
              <p className="leading-[118px] mb-0">{`How we can `}</p>
              <p className="leading-[118px]">help grow</p>
            </div>

            {/* Tabs + Dossier Panel */}
            <div
              className="absolute h-[288px] left-0 right-0 top-[1037.05px]"
              data-node-id="27:6110"
              data-name="div"
            >
              {/* Vertical Pills Tabs */}
              <div
                className="absolute h-[258px] left-[115.19px] right-[880px] top-0 flex flex-col justify-between"
                data-node-id="27:6111"
                data-name="div#v-pills-tab"
              >
                {tabContents.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className="relative flex items-center cursor-pointer group py-[10px]"
                  >
                    {activeTab === idx && (
                      <div className="absolute bg-white left-[-20px] rounded-[4px] size-[8px]" />
                    )}
                    <div
                      style={{ color: activeTab === idx ? "#FFFFFF" : "rgba(255,255,255,0.6)" }}
                      className="font-['Inter:Regular'] text-[34px] transition-colors whitespace-nowrap"
                    >
                      {tab.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side Content Panel */}
              <div
                className="absolute h-[288px] left-[550.06px] top-0 w-[780px]"
                data-node-id="27:6117"
                data-name="div"
              >
                {/* Photo of Hands Sketching Wireframes */}
                <div
                  className="-translate-y-1/2 absolute h-[221.5px] left-0 top-[calc(50%-13.25px)] w-[317.875px] rounded-[8px] overflow-hidden"
                  data-node-id="27:6118"
                  data-name="help01.jpg"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="Digital Architecture" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgHelp01Jpg} />
                  </div>
                </div>

                {/* Text & Bullets */}
                <div
                  className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal h-[248px] leading-[0] left-[360px] not-italic right-0 top-[15px]"
                  data-node-id="27:6119"
                  data-name="div"
                >
                  <div
                    className="-translate-y-1/2 absolute flex flex-col h-[90px] justify-center left-0 text-[23px] text-white top-[45px] w-[420px]"
                    data-node-id="27:6120"
                  >
                    <p className="leading-[32px]">{tabContents[activeTab].heading}</p>
                  </div>
                  <div
                    className="absolute content-stretch flex flex-col items-start left-0 pl-[20px] text-[rgba(255,255,255,0.6)] top-[136px] whitespace-nowrap"
                    data-node-id="27:6121"
                    data-name="ul"
                  >
                    {tabContents[activeTab].bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 relative shrink-0 text-[23px] mb-1">
                        <span className="text-[#3EFFB4]">●</span>
                        <p className="leading-[32px]">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              7. PROCESS SECTION (Native Dark Timeline on Site)
              ======================================================== */}
          <div
            id="process"
            className="absolute h-[850px] left-0 right-0 top-[5520px] px-[40px]"
            data-node-id="27:6125"
            data-name="section#process"
          >
            {/* Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#53A0FD] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#53A0FD] tracking-widest uppercase">
                    EXECUTION PROTOCOL // 6 STAGES
                  </span>
                </div>
                <h2 className="text-[111px] font-['Inter:Medium'] font-medium text-white leading-[120px] tracking-tight">
                  Process
                </h2>
              </div>
              <p className="text-sm font-['Inter:Regular'] text-white/60 max-w-md pb-4 leading-relaxed text-right">
                Our structured fiduciary delivery framework engineered to turn RIA practices into institutional digital onboarding desks.
              </p>
            </div>

            {/* HORIZONTAL TIMELINE BAR (From User Image 2) */}
            <div className="relative mb-14 select-none px-6">
              {/* Timeline Horizontal Line */}
              <div className="absolute top-[16px] left-[32px] right-[32px] h-[1px] bg-white/20" />

              {/* Active Progress Fill */}
              <div
                className="absolute top-[16px] left-[32px] h-[1.5px] bg-[#53A0FD] transition-all duration-500 ease-out shadow-[0_0_12px_#53A0FD]"
                style={{
                  width: `calc(${(activeProcessStep / (processSteps.length - 1)) * 100}% - 48px)`,
                }}
              />

              {/* 6 Dots Spaced Evenly */}
              <div className="relative flex items-center justify-between">
                {processSteps.map((step, idx) => {
                  const isActive = idx === activeProcessStep;
                  const isPassed = idx <= activeProcessStep;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveProcessStep(idx)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      {/* Dot */}
                      <div className="relative flex items-center justify-center size-[32px]">
                        {isActive ? (
                          <div className="size-3.5 rounded-full bg-[#53A0FD] shadow-[0_0_16px_#53A0FD] ring-4 ring-[#53A0FD]/25 scale-125 transition-all" />
                        ) : (
                          <div
                            className={`rounded-full transition-all ${
                              isPassed
                                ? "size-2.5 bg-white group-hover:bg-[#53A0FD] group-hover:scale-125"
                                : "size-2 bg-white/40 group-hover:bg-white group-hover:scale-125"
                            }`}
                          />
                        )}
                      </div>

                      {/* Step Number & Label */}
                      <span
                        className={`text-[11px] font-mono mt-1.5 transition-colors ${
                          isActive ? "text-[#53A0FD] font-bold" : "text-white/40 group-hover:text-white/80"
                        }`}
                      >
                        {step.step}
                      </span>
                      <span
                        className={`text-xs font-['Inter:Regular'] mt-1 text-center max-w-[130px] transition-colors line-clamp-1 ${
                          isActive ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VERTICAL STEPS LIST & ACCORDION (From User Image 1) */}
            <div className="border-t border-white/15">
              {processSteps.map((item, idx) => {
                const isActive = idx === activeProcessStep;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveProcessStep(idx)}
                    className="border-b border-white/10 transition-colors group cursor-pointer"
                  >
                    {/* Step Header Row */}
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <span
                          className={`text-sm font-mono transition-colors ${
                            isActive ? "text-[#53A0FD] font-bold" : "text-white/30 group-hover:text-white/60"
                          }`}
                        >
                          {item.step}
                        </span>
                        <h3
                          className={`text-2xl font-['Inter:Regular'] transition-colors ${
                            isActive
                              ? "text-white font-medium text-[26px]"
                              : "text-white/60 group-hover:text-white"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-xs font-mono text-white/40 hidden sm:inline">
                          {item.timeline}
                        </span>
                        <span
                          className={`text-lg transition-transform duration-300 ${
                            isActive
                              ? "text-[#53A0FD] rotate-90"
                              : "text-white/30 group-hover:text-white group-hover:translate-x-1"
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>

                    {/* Expandable Active Drawer */}
                    {isActive && (
                      <div className="pb-6 pt-1 pl-14 pr-4 grid grid-cols-12 gap-8 items-start">
                        <div className="col-span-7">
                          <p className="text-sm text-white/70 font-['Inter:Regular'] leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-white/10 text-white/80 text-[11px] font-mono uppercase">
                              {item.tagline}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-5 bg-white/[0.03] border border-white/10 rounded-[8px] p-4">
                          <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block mb-2 font-semibold">
                            Deliverables
                          </span>
                          <div className="space-y-1.5">
                            {item.bullets.map((b, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-white/80 leading-relaxed font-mono">
                                <span className="text-[#53A0FD]">✓</span>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={openWhatsAppAudit}
                            className="mt-4 w-full py-2 rounded bg-[#0038C8] hover:bg-[#53A0FD] hover:text-black text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>{item.cta}</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              8. FOOTER WITH GLOWING CIRCLES (Figma node 27:6147, h=554.391px)
              ======================================================== */}
          <div
            id="contact"
            className="absolute h-[554.391px] left-0 overflow-clip right-0 top-[6621.08px]"
            data-node-id="27:6147"
            data-name="footer#contact"
          >
            {/* The 3 Iconic Glowing Overlapping Circles */}
            <div
              className="absolute bg-[#3effb4] bottom-[-360px] left-[281px] rounded-[295px] size-[590px] pointer-events-none"
              data-node-id="27:6148"
              data-name="div"
            />
            <div
              className="absolute bg-[#53a0fd] bottom-[-10px] left-[741px] rounded-[195px] size-[390px] pointer-events-none"
              data-node-id="27:6149"
              data-name="div"
            />
            <div
              className="absolute bg-[#3023ae] bottom-[-360px] left-[713px] rounded-[295px] size-[590px] pointer-events-none"
              data-node-id="27:6150"
              data-name="div"
            />

            {/* Left Content */}
            <div
              className="absolute content-stretch flex flex-col gap-[79px] items-start left-[24px] pb-[7px] top-[143px] z-10"
              data-node-id="27:6151"
              data-name="div"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[8.594px] items-start leading-[0] not-italic pr-[1.766px] relative shrink-0 whitespace-nowrap"
                data-node-id="27:6152"
                data-name="div"
              >
                <div
                  className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[47px] text-white"
                  data-node-id="27:6153"
                >
                  <p className="leading-[57.6px]">Advisor Solution</p>
                </div>
                <div
                  className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)]"
                  data-node-id="27:6154"
                >
                  <p className="leading-[30px] mb-0 whitespace-pre">Ready to upgrade your advisory practice?</p>
                  <p className="leading-[30px] whitespace-pre">{`Schedule a 15-minute digital desk audit with Hari.`}</p>
                </div>
              </div>

              {/* Direct Contact Button */}
              <div
                onClick={openWhatsAppAudit}
                className="h-[26px] relative shrink-0 w-[420px] group cursor-pointer"
                data-node-id="27:6155"
                data-name="a"
              >
                <div
                  className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-0 not-italic text-[26px] text-white top-[13.5px] whitespace-nowrap group-hover:text-[#3EFFB4] transition-colors"
                  data-node-id="27:6156"
                >
                  <p className="leading-[39px]">+91 93456 19428</p>
                </div>
                <div
                  className="absolute h-[40px] left-[230.05px] top-[-9px] w-[38px] group-hover:translate-x-2 transition-transform"
                  data-node-id="27:6157"
                  data-name="i"
                >
                  <div className="absolute h-[40px] left-0 top-0 w-[39px]" data-node-id="27:6158" data-name="arrow-right.svg">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowRightSvg} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Columns */}
            <div
              className="absolute content-stretch flex gap-[115.188px] items-start left-[612.95px] pl-[115.188px] top-[144px] z-10"
              data-node-id="27:6161"
              data-name="div"
            >
              {/* Column 1: Solutions */}
              <div className="h-[237.594px] relative shrink-0 w-[180px]" data-node-id="27:6162" data-name="div">
                <div
                  className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-0 not-italic text-[20px] text-white top-[15px] whitespace-nowrap"
                  data-node-id="27:6163"
                >
                  <p className="leading-[30px]">Solutions</p>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[62px]" data-node-id="27:6164">
                  <div
                    onClick={() => scrollToSection("capabilities")}
                    className="[word-break:break-word] font-['Inter:Regular'] text-[19px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Lead Generation
                  </div>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[96px]" data-node-id="27:6166">
                  <div
                    onClick={() => scrollToSection("capabilities")}
                    className="[word-break:break-word] font-['Inter:Regular'] text-[19px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Lead Conversion
                  </div>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[130px]" data-node-id="27:6168">
                  <div
                    onClick={() => scrollToSection("capabilities")}
                    className="[word-break:break-word] font-['Inter:Regular'] text-[20px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Customer Retention
                  </div>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[164px]" data-node-id="27:6170">
                  <div
                    onClick={() => scrollToSection("projects")}
                    className="[word-break:break-word] font-['Inter:Regular'] text-[19px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    72-Hour Rapid Pilots
                  </div>
                </div>
              </div>

              {/* Column 2: Direct Reach */}
              <div className="h-[237.594px] relative shrink-0 w-[180px]" data-node-id="27:6172" data-name="div">
                <div
                  className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-0 not-italic text-[19px] text-white top-[15px] whitespace-nowrap"
                  data-node-id="27:6173"
                >
                  <p className="leading-[30px]">Connect</p>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[62px]">
                  <a
                    href="https://wa.me/919345619428"
                    target="_blank"
                    rel="noreferrer"
                    className="font-['Inter:Regular'] text-[19px] text-[rgba(255,255,255,0.6)] hover:text-[#3EFFB4] transition-colors whitespace-nowrap"
                  >
                    WhatsApp Chat
                  </a>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[96px]">
                  <a
                    href="https://linkedin.com/in/harinarayanfintech"
                    target="_blank"
                    rel="noreferrer"
                    className="font-['Inter:Regular'] text-[20px] text-[rgba(255,255,255,0.6)] hover:text-[#53A0FD] transition-colors whitespace-nowrap"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[130px]">
                  <a
                    href="https://sebi-advisor-solution.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="font-['Inter:Regular'] text-[20px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Live RIA Client Portal
                  </a>
                </div>
                <div className="absolute content-stretch flex items-start left-0 top-[164px]">
                  <a
                    href="tel:+919345619428"
                    className="font-['Inter:Regular'] text-[20px] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors whitespace-nowrap"
                  >
                    +91 93456 19428
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Top Link (Far Right) */}
            <div
              onClick={scrollToTop}
              className="absolute content-stretch flex inset-[144px_24px_364.39px_1376px] items-start pb-[7px] cursor-pointer group z-20"
              data-node-id="27:6182"
              data-name="a"
            >
              <div className="h-[39px] relative shrink-0 w-[40px] group-hover:-translate-y-1 transition-transform" data-node-id="27:6183" data-name="i">
                <div className="absolute h-[39px] left-0 top-0 w-[40px]" data-node-id="27:6184" data-name="arrow-top.svg">
                  <img alt="Back to top" className="absolute block inset-0 max-w-none size-full" src={imgArrowTopSvg} />
                </div>
              </div>
              <div
                className="absolute bottom-[-29.2px] flex items-center justify-center right-[136.47px] top-[55px] translate-x-full w-[106.469px]"
                data-node-id="27:6187"
                style={{ containerType: "size" } as React.CSSProperties}
              >
                <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                  <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative size-full text-[13px] text-[rgba(255,255,255,0.3)] group-hover:text-white transition-colors">
                    <p className="leading-[30px]">Back to top</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
