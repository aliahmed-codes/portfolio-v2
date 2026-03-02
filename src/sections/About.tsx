import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 
  'Python', 'PostgreSQL', 'AWS', 'Docker',
  'GraphQL', 'Tailwind', 'Figma', 'Git'
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const svgRect = svgRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // Content animation
      const contentElements = content.querySelectorAll('.reveal-item');
      gsap.fromTo(
        contentElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        image,
        { x: 50, opacity: 0, rotate: -5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // SVG border draw animation
      if (svgRect) {
        const length = svgRect.getTotalLength();
        gsap.set(svgRect, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(svgRect, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: image,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Tech stack pills animation
      const pills = content.querySelectorAll('.tech-pill');
      gsap.fromTo(
        pills,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: pills[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-heading text-[20vw] font-bold text-transparent opacity-[0.03] select-none"
          style={{
            WebkitTextStroke: '1px rgba(45, 212, 191, 0.3)',
          }}
        >
          ABOUT
        </span>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-number">02</span>
          <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            ABOUT ME
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* SVG Border */}
              <svg
                className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
                viewBox="0 0 400 500"
                fill="none"
              >
                <rect
                  ref={svgRef}
                  x="10"
                  y="10"
                  width="380"
                  height="480"
                  stroke="#2DD4BF"
                  strokeWidth="2"
                  fill="none"
                  rx="16"
                />
              </svg>

              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111827]">
                <img
                  src="/about-portrait.jpg"
                  alt="Ali Ahmed"
                  className="w-full h-full object-cover img-grayscale"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-[#2DD4BF]/30 rounded-br-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-[#2DD4BF]/30 rounded-tl-2xl" />

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-8 px-4 py-2 bg-[#111827] border border-[#2DD4BF]/30 rounded-lg animate-float">
                <span className="font-mono text-sm text-[#2DD4BF]">5+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <div className="space-y-6">
              <p className="reveal-item text-[#9CA3AF] text-lg leading-relaxed">
                I'm a <span className="text-white font-medium">full-stack developer</span> who believes in the power of clean code and thoughtful design. With over 5 years of experience, I've helped startups and agencies build products that scale.
              </p>

              <p className="reveal-item text-[#9CA3AF] text-lg leading-relaxed">
                My approach is simple: <span className="text-white font-medium">understand the problem</span>, craft a solution, and polish until it's pixel-perfect. I specialize in building modern web applications using React, Next.js, and Node.js.
              </p>

              <p className="reveal-item text-[#9CA3AF] text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I'm always excited to take on new challenges and create meaningful digital experiences.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-10">
              <p className="reveal-item font-mono text-sm text-[#6B7280] tracking-wider mb-4">
                TECHNOLOGIES I USE
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="reveal-item mt-10 grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#2DD4BF]">50+</p>
                <p className="font-mono text-xs text-[#6B7280] mt-1">PROJECTS</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#2DD4BF]">30+</p>
                <p className="font-mono text-xs text-[#6B7280] mt-1">CLIENTS</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#2DD4BF]">5+</p>
                <p className="font-mono text-xs text-[#6B7280] mt-1">YEARS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
