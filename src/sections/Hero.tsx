import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  // Reset elements when component mounts or location changes
  useEffect(() => {
    const name = nameRef.current;
    const tagline = taglineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!name || !tagline || !subtitle || !cta || !scrollIndicator) return;

    // Reset all elements to visible state immediately
    gsap.set([name, tagline, subtitle, cta, scrollIndicator], {
      opacity: 1,
      x: 0,
      y: 0,
      clearProps: "all", // Clear any inline styles from previous animations
    });
  }, [location.pathname]);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const tagline = taglineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !name || !tagline || !subtitle || !cta || !scrollIndicator)
      return;

    const ctx = gsap.context(() => {
      // Kill any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });

      // Set initial state for entry animation only
      gsap.set([name, tagline, subtitle, cta], { opacity: 0, y: 50 });
      gsap.set(scrollIndicator, { opacity: 0 });

      // Entry animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(name, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          tagline,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          scrollIndicator,
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3",
        );

      // Scroll-triggered exit animation - only animate if not at top
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% top",
          scrub: 1,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.to([name, tagline, subtitle, cta, scrollIndicator], {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.3,
            });
          },
        },
      });

      scrollTl
        .to(name, {
          x: -100,
          opacity: 0,
          ease: "none",
        })
        .to(
          tagline,
          {
            x: 100,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          subtitle,
          {
            y: -30,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          cta,
          {
            y: -20,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          scrollIndicator,
          {
            opacity: 0,
            ease: "none",
          },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse move effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    const workSection = document.querySelector("#work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)",
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 70%)",
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45, 212, 191, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45, 212, 191, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center">
        {/* Greeting */}
        <p
          ref={taglineRef}
          className="font-mono text-[#2DD4BF] text-sm sm:text-base tracking-widest mb-6"
        >
          HI, I'M
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-heading text-[12vw] sm:text-[10vw] lg:text-[8vw] font-bold text-white leading-[0.9] tracking-tight mb-8"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <span className="inline-block">ALI</span>{" "}
          <span className="inline-block text-gradient">AHMED</span>
        </h1>

        {/* Description - Minimal */}
        <p
          ref={subtitleRef}
          className="text-[#9CA3AF] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Full-Stack Developer crafting next-gen web applications, AI-integrated
          platforms, and pixel-perfect interfaces for global clients across
          Oman, Spain & UK.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            VIEW MY WORK
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <span className="font-mono text-xs text-[#6B7280] tracking-widest">
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 text-[#2DD4BF] animate-bounce" />
      </div>

      {/* Side Decorations */}
      <div className="hidden lg:block absolute left-8 bottom-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#2DD4BF]/50" />
          <a
            href="https://github.com/aliahmed-codes "
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6B7280] hover:text-[#2DD4BF] transition-colors rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            GITHUB
          </a>
        </div>
      </div>

      <div className="hidden lg:block absolute right-8 bottom-20">
        <div className="flex flex-col items-center gap-4">
          <a
            href="mailto:aliahmed.dev1@gmail.com"
            className="font-mono text-xs text-[#6B7280] hover:text-[#2DD4BF] transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            ALIAHMED.DEV1@GMAIL.COM
          </a>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#2DD4BF]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
