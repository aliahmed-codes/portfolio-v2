import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        content.querySelectorAll(".animate-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Image animation
      gsap.fromTo(
        image,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Skills animation
      const skillItems = content.querySelectorAll(".skill-item");
      gsap.fromTo(
        skillItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillItems[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6 animate-item">
              <span className="section-number">02</span>
              <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 animate-item">
              ABOUT ME
            </h2>

            <div className="space-y-6 text-[#9CA3AF] text-lg leading-relaxed">
              <p className="animate-item">
                I'm Ali Ahmed, a Full-Stack Developer based in Pakistan with
                proven experience delivering enterprise solutions for UK,
                Spanish, and Middle Eastern markets. My development journey
                began with school-day curiosity, accelerated through intensive
                training under renowned mentor Mian Ahmad Basit, and matured
                through real-world pressure—shipping production code for
                international clients from day one.
              </p>
              <p className="animate-item">
                <b> My sweet spot:</b> Projects that require both technical
                versatility and cross-cultural communication. I've worked
                directly with UK design agencies (TM Studio), Spanish marketing
                firms (Appetite Creative), and Oman-based
                manufacturers—translating their visions into functional,
                high-performance applications.
              </p>
              <p className="animate-item">Recent highlights:</p>
              <ul>
                <li>
                  Built custom Shopify theme for Atelier 00, a luxury lighting
                  company operating across UK/US markets
                </li>
                <li>
                  Developed AI Equestrian platform with real-time video analysis
                  using Python/YOLO/GPT stack
                </li>
                <li>
                  Implemented pixel-perfect WordPress theme for HKR Architects
                  from award-winning UK agency designs
                </li>
                <li>
                  Manage 3 production servers, handling deployments and security
                  for 15+ active projects
                </li>
              </ul>
            </div>

            {/* Skills */}
            <div className="mt-12 animate-item">
              <h3 className="font-mono text-sm text-[#6B7280] tracking-wider mb-4">
                TECHNOLOGIES I WORK WITH
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="skill-item tech-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#2DD4BF]/30 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#2DD4BF]/10 rounded-full blur-2xl" />

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#111827] aspect-[4/5]">
                <img
                  src="/about-portrait.png"
                  alt="Ali Ahmed"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent" />
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-8 -left-8 bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="font-heading text-3xl font-bold text-[#2DD4BF]">
                      2+
                    </span>
                    <p className="font-mono text-xs text-[#6B7280] mt-1">
                      YEARS EXP
                    </p>
                  </div>
                  <div>
                    <span className="font-heading text-3xl font-bold text-[#2DD4BF]">
                      25+
                    </span>
                    <p className="font-mono text-xs text-[#6B7280] mt-1">
                      PROJECTS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
