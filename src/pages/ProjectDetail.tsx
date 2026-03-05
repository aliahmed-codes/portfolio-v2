import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User,
  Building2,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/types/project";
import { loadProject, loadAllProjects } from "@/lib/projects";
import Navigation from "@/sections/Navigation";
import Footer from "@/sections/Footer";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    // Load project and all projects for navigation
    Promise.all([loadProject(id), loadAllProjects()]).then(
      ([projectData, allProjectsData]) => {
        if (projectData) {
          setProject(projectData);
          setAllProjects(allProjectsData);
        }
        setLoading(false);
      },
    );

    // Scroll progress tracking
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  useEffect(() => {
    if (loading || !project) return;

    const hero = heroRef.current;
    const content = contentRef.current;
    const nextProject = nextProjectRef.current;

    if (!hero || !content) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        hero.querySelectorAll(".hero-animate"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Content sections animation
      const sections = content.querySelectorAll(".content-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Next project section
      if (nextProject) {
        gsap.fromTo(
          nextProject,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: nextProject,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [loading, project]);

  // Get next project for navigation
  const getNextProject = () => {
    if (!project || allProjects.length === 0) return null;
    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    const nextIndex = (currentIndex + 1) % allProjects.length;
    return allProjects[nextIndex];
  };

  const nextProject = getNextProject();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-[#2DD4BF] font-mono">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-[#2DD4BF] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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
      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex flex-col">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Enhanced Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-[#0B0F19]/40" />
            {/* Additional dark overlay at bottom for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 pt-32">
            <div className="container-custom">
              {/* Breadcrumb */}
              <div className="hero-animate flex items-center gap-2 text-sm font-mono text-gray-300 mb-8 drop-shadow-md">
                <Link to="/" className="hover:text-[#2DD4BF] transition-colors">
                  HOME
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  to="/projects"
                  className="hover:text-[#2DD4BF] transition-colors"
                >
                  PROJECTS
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#2DD4BF] font-semibold drop-shadow-lg">
                  {project.title.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-animate font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
                {project.title}
              </h1>

              {/* Category */}
              <p className="hero-animate font-mono text-[#2DD4BF] text-lg tracking-wider mb-8 drop-shadow-lg font-semibold">
                {project.category}
              </p>

              {/* Description */}
              <p className="hero-animate text-white text-xl max-w-3xl mb-12 drop-shadow-lg font-medium leading-relaxed">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="hero-animate flex flex-wrap gap-8 text-sm font-mono text-gray-200">
                <div className="flex items-center gap-2 drop-shadow-md">
                  <Calendar className="w-4 h-4 text-[#2DD4BF]" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 drop-shadow-md">
                  <Clock className="w-4 h-4 text-[#2DD4BF]" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 drop-shadow-md">
                  <Building2 className="w-4 h-4 text-[#2DD4BF]" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2 drop-shadow-md">
                  <User className="w-4 h-4 text-[#2DD4BF]" />
                  <span>{project.role}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hero-animate flex flex-wrap gap-4 mt-12">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 shadow-2xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    VIEW LIVE SITE
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 shadow-xl backdrop-blur-sm"
                  >
                    <Github className="w-5 h-5" />
                    VIEW CODE
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Project Content */}
        <section ref={contentRef} className="py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Technologies */}
                <div className="content-section mb-16">
                  <h2 className="font-heading text-2xl font-bold text-white mb-6">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case Study Content */}
                <div className="content-section markdown-content">
                  <ReactMarkdown>{project.content}</ReactMarkdown>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  {/* Project Info Card */}
                  <div className="content-section bg-[#111827] rounded-2xl p-6 border border-[#1F2937]">
                    <h3 className="font-heading text-lg font-semibold text-white mb-6">
                      Project Info
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <span className="font-mono text-xs text-[#6B7280] block mb-1">
                          YEAR
                        </span>
                        <span className="text-white">{project.year}</span>
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[#6B7280] block mb-1">
                          DURATION
                        </span>
                        <span className="text-white">{project.duration}</span>
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[#6B7280] block mb-1">
                          CLIENT
                        </span>
                        <span className="text-white">{project.client}</span>
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[#6B7280] block mb-1">
                          ROLE
                        </span>
                        <span className="text-white">{project.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="content-section bg-[#111827] rounded-2xl p-6 border border-[#1F2937]">
                    <h3 className="font-heading text-lg font-semibold text-white mb-6">
                      Links
                    </h3>

                    <div className="space-y-3">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg hover:bg-[#2DD4BF]/10 transition-colors group"
                        >
                          <span className="text-white group-hover:text-[#2DD4BF] transition-colors">
                            Live Website
                          </span>
                          <ExternalLink className="w-4 h-4 text-[#6B7280] group-hover:text-[#2DD4BF] transition-colors" />
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg hover:bg-[#2DD4BF]/10 transition-colors group"
                        >
                          <span className="text-white group-hover:text-[#2DD4BF] transition-colors">
                            Source Code
                          </span>
                          <Github className="w-4 h-4 text-[#6B7280] group-hover:text-[#2DD4BF] transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Back to Projects */}
                  <Link
                    to="/projects"
                    className="content-section flex items-center justify-center gap-2 p-4 border border-[#2DD4BF]/30 rounded-lg text-[#2DD4BF] hover:bg-[#2DD4BF]/10 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-mono text-sm">ALL PROJECTS</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Project Section */}
        {nextProject && (
          <section
            ref={nextProjectRef}
            className="py-24 border-t border-[#1F2937]"
          >
            <div className="container-custom">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-[#9CA3AF] tracking-wider">
                  NEXT PROJECT
                </span>
                <div className="h-[1px] flex-1 bg-[#1F2937]" />
              </div>

              <Link to={`/projects/${nextProject.id}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="font-mono text-sm text-[#2DD4BF] tracking-wider mb-4 block">
                      {nextProject.category}
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-[#2DD4BF] transition-colors">
                      {nextProject.title}
                    </h2>
                    <p className="text-[#9CA3AF] text-lg mb-6">
                      {nextProject.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-[#2DD4BF]">
                      <span className="font-mono text-sm">VIEW CASE STUDY</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 to-transparent" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
