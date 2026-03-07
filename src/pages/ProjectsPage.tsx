import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/project";
import { loadAllProjects } from "@/lib/projects";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load projects
    loadAllProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });

    // Scroll progress tracking
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loading) return;

    const header = headerRef.current;
    const grid = gridRef.current;

    if (!header || !grid) return;

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
        },
      );

      // Project cards animation
      const cards = grid.querySelectorAll(".project-card-wrapper");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          },
        );
      });
    });

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-[#2DD4BF] font-mono">Loading projects...</div>
      </div>
    );
  }

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen bg-[#0B0F19]">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative pt-32 pb-24">
        <div className="container-custom">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#2DD4BF] transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">BACK TO HOME</span>
          </Link>

          {/* Section Header */}
          <div ref={headerRef} className="mb-16 lg:mb-24">
            <div className="flex items-center gap-4 mb-6">
              <span className="section-number">ALL</span>
              <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              PROJECTS
            </h1>
            <p className="text-[#9CA3AF] text-lg max-w-2xl">
              A comprehensive collection of my work. Each project represents a
              unique challenge solved with creative thinking and technical
              expertise.
            </p>
          </div>

          {/* Featured Project */}
          {featuredProject && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-[#2DD4BF] tracking-wider">
                  FEATURED
                </span>
                <div className="h-[1px] flex-1 bg-[#2DD4BF]/20" />
              </div>
              <FeaturedProjectCard project={featuredProject} />
            </div>
          )}

          {/* Projects Grid */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-[#9CA3AF] tracking-wider">
                ALL PROJECTS
              </span>
              <div className="h-[1px] flex-1 bg-[#1F2937]" />
              <span className="font-mono text-xs text-[#9CA3AF]">
                {otherProjects.length}
              </span>
            </div>

            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project) => (
                <div key={project.id} className="project-card-wrapper">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(image, {
      x: x * 30,
      y: y * 30,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    if (!image) return;

    gsap.to(image, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card card-glare group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/projects/${project.id}`} className="block relative">
        {/* Image Container */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-[#111827]">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="project-card-image absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Dark Gradient Overlay - Improved for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

          {/* Additional solid overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent group-hover:from-slate-900 group-hover:via-slate-800/70 transition-all duration-500" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
            <div className="flex items-start justify-between">
              <div>
                {/* Category */}
                <span className="font-mono text-sm text-[#2DD4BF] tracking-wider mb-3 block drop-shadow-lg">
                  {project.category}
                </span>

                {/* Title */}
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-[#2DD4BF] transition-colors drop-shadow-lg">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-200 text-base sm:text-lg max-w-2xl mb-6 drop-shadow-md font-medium">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-mono text-white bg-black/60 rounded-full backdrop-blur-sm border border-white/10 shadow-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project Button */}
              <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-[#2DD4BF] text-[#0B0F19] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-8 text-sm font-mono text-gray-300 drop-shadow-md">
              <span>{project.year}</span>
              <span>{project.duration}</span>
              <span>{project.client}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(image, {
      x: x * 20,
      y: y * 20,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    if (!image) return;

    gsap.to(image, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card card-glare group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/projects/${project.id}`} className="block relative h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#111827]">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="project-card-image absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Dark Gradient Overlay - Improved for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

          {/* Additional solid overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent group-hover:from-slate-900 group-hover:via-slate-800/70 transition-all duration-500" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Category */}
            <span className="font-mono text-xs text-[#2DD4BF] tracking-wider mb-2 drop-shadow-lg">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#2DD4BF] transition-colors drop-shadow-lg">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-200 text-sm line-clamp-2 mb-4 drop-shadow-md font-medium">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-white bg-black/60 rounded-full backdrop-blur-sm border border-white/10 shadow-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View Project Link */}
            <div className="mt-4 flex items-center gap-2 text-[#2DD4BF] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="font-mono text-sm font-semibold drop-shadow-lg">
                VIEW CASE STUDY
              </span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
