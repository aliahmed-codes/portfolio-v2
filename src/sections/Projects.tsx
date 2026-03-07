import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/project";
import { loadAllProjects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAllProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

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
    }, section);

    return () => ctx.revert();
  }, [loading]);

  const featuredProject = projects.find((p) => p.featured);
  const displayProjects = projects.filter((p) => !p.featured).slice(0, 5);

  if (loading) {
    return (
      <section ref={sectionRef} id="work" className="section-padding relative">
        <div className="container-custom">
          <div className="text-center text-[#2DD4BF] font-mono">
            Loading projects...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="work" className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-number">01</span>
            <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            SELECTED WORK
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl">
            A collection of projects where code meets design. Each one crafted
            with attention to detail and a focus on user experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Featured Project - Large */}
          {featuredProject && (
            <div className="project-card-wrapper md:col-span-2 lg:col-span-2 lg:row-span-2">
              <ProjectCard project={featuredProject} size="large" />
            </div>
          )}

          {/* Other Projects */}
          {displayProjects.slice(0, 2).map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard project={project} size="medium" />
            </div>
          ))}

          {displayProjects.slice(2, 5).map((project) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard project={project} size="small" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono text-sm rounded-lg hover:bg-[#2DD4BF]/10 transition-all duration-300 group"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  size: "large" | "medium" | "small";
}

function ProjectCard({ project, size }: ProjectCardProps) {
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

  const aspectRatio =
    size === "large"
      ? "aspect-[16/10]"
      : size === "medium"
        ? "aspect-[4/3]"
        : "aspect-[16/10]";
  const titleSize =
    size === "large"
      ? "text-2xl sm:text-3xl lg:text-4xl"
      : size === "medium"
        ? "text-xl sm:text-2xl"
        : "text-lg sm:text-xl";

  return (
    <div
      ref={cardRef}
      className="project-card card-glare group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/projects/${project.id}`} className="block relative h-full">
        {/* Image Container */}
        <div
          className={`relative ${aspectRatio} overflow-hidden rounded-2xl bg-[#111827]`}
        >
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
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            {/* Category */}
            <span className="font-mono text-xs sm:text-sm text-[#2DD4BF] tracking-wider mb-2 drop-shadow-lg">
              {project.category}
            </span>

            {/* Title */}
            <h3
              className={`font-heading ${titleSize} font-bold text-white mb-2 group-hover:text-[#2DD4BF] transition-colors drop-shadow-lg`}
            >
              {project.title}
            </h3>

            {/* Description - Only for large cards */}
            {size === "large" && (
              <p className="text-gray-200 text-sm sm:text-base max-w-lg mb-4 line-clamp-2 drop-shadow-md font-medium">
                {project.description}
              </p>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies
                .slice(0, size === "large" ? 4 : 3)
                .map((tech) => (
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
