import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  GraduationCap, 
  ChevronDown, 
  ExternalLink, 
  Globe, 
  Heart, 
  Shield, 
  Award, 
  Stethoscope, 
  ShoppingCart, 
  Building, 
  Car, 
  Server, 
  Smartphone,
  Calendar,
  MapPin
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Highlight {
  title: string;
  description: string;
  icon: React.ElementType;
  impact: string;
}

interface Experience {
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  icon: React.ElementType;
  color: string;
  highlights: Highlight[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    type: "work",
    title: "Full-Stack Developer",
    company: "Signal Over Noise",
    location: "Remote (International Clients)",
    period: "2024 – Present",
    description:
      "Partnered with UK and Spain-based agencies to deliver enterprise solutions for Fortune 500-level clients. Managed 3 self-hosted servers overseeing deployment pipelines, security protocols, and infrastructure maintenance for 15+ active projects.",
    icon: Globe,
    color: "#2DD4BF",
    highlights: [
      {
        title: "Atelier 00/001",
        description:
          "Engineered custom Shopify theme for luxury lighting manufacturer operating across UK, US, and international markets. Built complementary Next.js dashboard for invoice generation and order management using Shopify APIs and SQLite.",
        icon: ShoppingCart,
        impact: "International Scale",
      },
      {
        title: "Appetite Creative (Spain)",
        description:
          "Technical lead for digital marketing agency serving major UK/Spain brands. Managed full project lifecycle including site migrations, security recovery (post-hack remediation for whisky brand), and multi-language accommodation booking systems.",
        icon: Shield,
        impact: "Security Recovery",
      },
      {
        title: "AI Equestrian Platform",
        description:
          "Architected complete React/Supabase training platform with Python/YOLO video analysis backend, Stripe subscriptions, and real-time performance metrics. Deployed scalable infrastructure on Dokploy handling concurrent AI processing.",
        icon: Award,
        impact: "AI Integration",
      },
      {
        title: "Medical Nutrition Dossier",
        description:
          "Implemented complex Next.js/Sanity CMS solution for medical reference platform featuring chapter-based navigation, cross-referencing system, and dynamic content templates.",
        icon: Stethoscope,
        impact: "Healthcare Tech",
      },
    ],
    technologies: [
      "Shopify Liquid",
      "Next.js",
      "React",
      "Python",
      "YOLO",
      "GPT/Gemini",
      "Supabase",
      "PostgreSQL",
      "Strapi",
      "Sanity",
      "WordPress",
      "Laravel",
      "Svelte",
    ],
  },
  {
    type: "work",
    title: "Frontend Developer",
    company: "E-Shaafi",
    location: "Pakistan",
    period: "2024",
    description:
      "Joined pioneering telehealth platform as core frontend engineer, managing UI/UX for healthcare application serving 100K+ users. Collaborated with 100+ person engineering team in agile environment with daily standups and cross-functional coordination.",
    icon: Heart,
    color: "#F472B6",
    highlights: [
      {
        title: "Healthcare Platform",
        description:
          "Maintained and optimized React-based patient consultation platform. Implemented responsive design systems for doctor-patient interaction modules. Contributed to Pakistan's leading digital healthcare infrastructure.",
        icon: Stethoscope,
        impact: "100K+ Users",
      },
    ],
    technologies: ["React", "UI/UX", "Agile", "Healthcare Tech"],
  },
  {
    type: "work",
    title: "Freelance Software Engineer",
    company: "International Clients",
    location: "Remote",
    period: "2023 – 2024",
    description:
      "Delivered end-to-end solutions for clients across Oman, UK, and Pakistan.",
    icon: Briefcase,
    color: "#A78BFA",
    highlights: [
      {
        title: "Tailor of Signboard (Oman)",
        description:
          "Corporate website for leading signage manufacturer using Next.js and Bootstrap.",
        icon: Building,
        impact: "Corporate Site",
      },
      {
        title: "RideBlack UK",
        description:
          "Chauffeur service booking platform with Google Places API integration, Stripe payment processing, and multi-service scheduling.",
        icon: Car,
        impact: "Booking Platform",
      },
      {
        title: "Dr. Hafiz Haroon",
        description:
          "Complete healthcare practice management system featuring: custom admin panel, appointment scheduling, Stream.io video consultations, PayPal/manual payment workflows, and patient review systems.",
        icon: Stethoscope,
        impact: "Full-Stack System",
      },
      {
        title: "Textcom Solutions",
        description:
          "Multiple WordPress/WooCommerce implementations with custom Elementor themes for Karachi-based startup.",
        icon: ShoppingCart,
        impact: "E-commerce",
      },
    ],
    technologies: [
      "Next.js",
      "Bootstrap",
      "Stripe",
      "Google APIs",
      "Stream.io",
      "WordPress",
      "WooCommerce",
      "Elementor",
    ],
  },
  {
    type: "work",
    title: "Junior Developer → Mid-Level",
    company: "Feature Dev Solution",
    location: "Pakistan",
    period: "2023",
    description:
      "Promoted directly to development role (bypassing internship) based on project portfolio. Delivered client solutions in service-based environment.",
    icon: Server,
    color: "#FB923C",
    highlights: [
      {
        title: "Restaurant SaaS Platform",
        description:
          "Multi-tenant kiosk management system with role-based access control and subscription-tier feature restrictions.",
        icon: Server,
        impact: "SaaS Architecture",
      },
      {
        title: "Matrimonial Application",
        description:
          "Full-stack React Native mobile app with Next.js backend, real-time chat, user blocking/reporting system, and international user support.",
        icon: Smartphone,
        impact: "Mobile App",
      },
    ],
    technologies: ["React Native", "Next.js", "Real-time Chat", "RBAC", "SaaS"],
  },
  {
    type: "education",
    title: "MERN Stack Certification",
    company: "Mian Ahmad Basit (P2P Clouds)",
    location: "Pakistan",
    period: "2023",
    description:
      "Intensive 8-month program under renowned technology educator and CEO of P2P Clouds. Completed comprehensive training in full-stack development, graduating with production-ready project portfolio including e-commerce platform, company management system, and utility applications (calculator, billing system, task manager).",
    icon: GraduationCap,
    color: "#60A5FA",
    highlights: [],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;

    if (!section || !header || !timeline) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline items animation
      const items = timeline.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Timeline line animation
      const line = timeline.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-number">03</span>
            <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            EXPERIENCE
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl">
            My professional journey from intensive training to delivering enterprise solutions for global clients.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2DD4BF] via-[#2DD4BF]/50 to-transparent origin-top hidden md:block" />

          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isExpanded = expandedIndex === index;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`timeline-item relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 ${
                    isEven ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 lg:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-[#2DD4BF] bg-[#0B0F19] z-10 hidden md:block"
                    style={{ boxShadow: `0 0 20px ${exp.color}40` }}
                  />

                  {/* Content Card */}
                  <div className={`lg:${isEven ? 'pr-16' : 'pl-16 col-start-2'}`}>
                    <div 
                      className="group relative bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-2xl overflow-hidden hover:border-[#2DD4BF]/30 transition-all duration-300"
                      style={{ 
                        boxShadow: isExpanded ? `0 0 40px ${exp.color}10` : 'none',
                        borderColor: isExpanded ? `${exp.color}40` : undefined
                      }}
                    >
                      {/* Card Header - Always Visible */}
                      <button
                        onClick={() => toggleExpand(index)}
                        className="w-full p-6 sm:p-8 text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${exp.color}15` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: exp.color }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                                  {exp.title}
                                </h3>
                                {exp.type === 'education' && (
                                  <span className="px-2 py-1 text-xs font-mono bg-[#60A5FA]/10 text-[#60A5FA] rounded">
                                    EDU
                                  </span>
                                )}
                              </div>
                              <p className="text-[#9CA3AF] font-medium mb-2">
                                {exp.company}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {exp.period}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {exp.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-6 h-6 text-[#6B7280] transition-transform duration-300 flex-shrink-0 ${
                              isExpanded ? 'rotate-180 text-[#2DD4BF]' : ''
                            }`}
                          />
                        </div>

                        {/* Brief Description */}
                        <p className="mt-4 text-[#9CA3AF] leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>
                      </button>

                      {/* Expandable Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#1F2937]">
                          {/* Full Description */}
                          <div className="pt-6">
                            <p className="text-[#9CA3AF] leading-relaxed mb-6">
                              {exp.description}
                            </p>
                          </div>

                          {/* Highlights */}
                          {exp.highlights.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-mono text-xs text-[#6B7280] tracking-wider mb-4">
                                KEY PROJECTS
                              </h4>
                              <div className="grid gap-4">
                                {exp.highlights.map((highlight, hIndex) => {
                                  const HighlightIcon = highlight.icon;
                                  return (
                                    <div 
                                      key={hIndex}
                                      className="group/highlight relative bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 hover:border-[#2DD4BF]/30 transition-all"
                                    >
                                      <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center flex-shrink-0">
                                          <HighlightIcon className="w-5 h-5 text-[#2DD4BF]" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <h5 className="font-bold text-white group-hover/highlight:text-[#2DD4BF] transition-colors">
                                              {highlight.title}
                                            </h5>
                                            <span className="px-2 py-1 text-xs font-mono bg-[#2DD4BF]/10 text-[#2DD4BF] rounded">
                                              {highlight.impact}
                                            </span>
                                          </div>
                                          <p className="text-sm text-[#9CA3AF] leading-relaxed">
                                            {highlight.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Technologies */}
                          <div>
                            <h4 className="font-mono text-xs text-[#6B7280] tracking-wider mb-3">
                              TECHNOLOGIES
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 text-sm font-mono bg-[#0B0F19] border border-[#1F2937] rounded-lg text-[#9CA3AF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-all"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden lg:block ${isEven ? 'col-start-2' : 'col-start-1 row-start-1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono text-sm rounded-lg hover:bg-[#2DD4BF]/10 transition-all group"
          >
            VIEW FULL RESUME
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}