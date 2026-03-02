import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 'signal-over-noise',
    role: 'Senior Full-Stack Developer',
    company: 'Signal Over Noise',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Leading development of AI-powered web applications. Architecting scalable solutions using React, Next.js, and Python. Managing a team of 4 developers and collaborating with design teams to deliver award-winning products.',
    technologies: ['React', 'Next.js', 'Python', 'AWS', 'PostgreSQL'],
  },
  {
    id: 'textcom-solutions',
    role: 'Web Developer',
    company: 'Textcom Solutions',
    location: 'Lahore, Pakistan',
    period: '2020 - 2022',
    description: 'Developed custom WordPress themes and plugins. Built e-commerce solutions with WooCommerce and Shopify. Implemented headless CMS architectures for enterprise clients.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Shopify', 'MySQL'],
  },
  {
    id: 'future-dev',
    role: 'Junior Developer',
    company: 'Future Dev Solutions',
    location: 'Lahore, Pakistan',
    period: '2019 - 2020',
    description: 'Started my professional journey building responsive websites and learning modern web technologies. Collaborated on multiple client projects and gained hands-on experience with frontend frameworks.',
    technologies: ['HTML/CSS', 'JavaScript', 'React', 'Bootstrap'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;

    if (!section || !header || !timeline) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      const items = timeline.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        
        gsap.fromTo(
          item,
          { 
            x: isEven ? -50 : 50, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
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
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-heading text-[18vw] font-bold text-transparent opacity-[0.02] select-none"
          style={{
            WebkitTextStroke: '1px rgba(45, 212, 191, 0.2)',
          }}
        >
          WORK
        </span>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-number">03</span>
            <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            EXPERIENCE
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl">
            My professional journey so far. Each role has taught me something valuable and helped me grow as a developer.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2DD4BF]/50 via-[#2DD4BF] to-[#2DD4BF]/50 transform -translate-x-1/2 origin-top timeline-line" />

          {/* Timeline Line - Mobile */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2DD4BF]/50 via-[#2DD4BF] to-[#2DD4BF]/50" />

          {/* Experience Items */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:pb-16' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-[#2DD4BF] rounded-full transform -translate-x-1/2 border-4 border-[#0B0F19] z-10" />

                {/* Content */}
                <div
                  className={`pl-12 lg:pl-0 ${
                    index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="bg-[#111827]/50 border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-[#2DD4BF]/30 transition-colors duration-300">
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-[#2DD4BF]" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <p className="text-[#2DD4BF] font-medium">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-[#6B7280] ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#9CA3AF] leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono text-[#9CA3AF] bg-[#0B0F19] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
