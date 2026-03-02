import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'ai-equestrian',
    title: 'AI EQUESTRIAN',
    category: 'AI / Web Platform',
    description: 'Training platform for dressage riders with AI-powered video analysis using YOLO and GPT models.',
    image: '/projects/ai-equestrian.jpg',
    liveUrl: 'https://equineaintelligence.com/',
    technologies: ['React', 'Next.js', 'Python', 'YOLO', 'GPT', 'Supabase'],
    featured: true,
  },
  {
    id: 'shopmaster-pro',
    title: 'SHOPMASTER PRO',
    category: 'E-Commerce',
    description: 'Headless Shopify solution for modern retail with custom checkout and inventory management.',
    image: '/projects/shopmaster.jpg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['Shopify', 'Next.js', 'GraphQL', 'Node.js'],
  },
  {
    id: 'dr-portfolio',
    title: 'DR. PORTFOLIO',
    category: 'Medical / Web Design',
    description: 'Minimalist portfolio for a healthcare professional with appointment booking system.',
    image: '/projects/dr-portfolio.jpg',
    liveUrl: '#',
    technologies: ['React', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 'algolia-search',
    title: 'ALGOLIA SEARCH',
    category: 'Developer Tool',
    description: 'Advanced search integration with faceted filtering and real-time suggestions.',
    image: '/projects/algolia-search.jpg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['Algolia', 'React', 'TypeScript'],
  },
  {
    id: 'google-keep-clone',
    title: 'KEEP CLONE',
    category: 'Productivity App',
    description: 'Full-featured note-taking app with labels, reminders, and collaborative editing.',
    image: '/projects/keep-clone.jpg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['React', 'Firebase', 'Material UI'],
  },
  {
    id: 'spotify-profile',
    title: 'SPOTIFY PROFILE',
    category: 'Data Visualization',
    description: 'Visualize your Spotify listening history with beautiful charts and insights.',
    image: '/projects/spotify-profile.jpg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['Next.js', 'Spotify API', 'D3.js'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards animation
      const cards = grid.querySelectorAll('.project-card-wrapper');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding relative"
    >
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
            A collection of projects where code meets design. Each one crafted with attention to detail and a focus on user experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Project - Large */}
          <div className="project-card-wrapper md:col-span-2 lg:col-span-2 lg:row-span-2">
            <ProjectCard project={projects[0]} size="large" />
          </div>

          {/* Medium Projects */}
          <div className="project-card-wrapper">
            <ProjectCard project={projects[1]} size="medium" />
          </div>
          <div className="project-card-wrapper">
            <ProjectCard project={projects[2]} size="medium" />
          </div>

          {/* Small Projects */}
          <div className="project-card-wrapper">
            <ProjectCard project={projects[3]} size="small" />
          </div>
          <div className="project-card-wrapper">
            <ProjectCard project={projects[4]} size="small" />
          </div>
          <div className="project-card-wrapper md:col-span-2 lg:col-span-1">
            <ProjectCard project={projects[5]} size="small" />
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono text-sm rounded-lg hover:bg-[#2DD4BF]/10 transition-all duration-300 group"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  size: 'large' | 'medium' | 'small';
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
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;
    if (!image) return;

    gsap.to(image, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const aspectRatio = size === 'large' ? 'aspect-[16/10]' : size === 'medium' ? 'aspect-[4/3]' : 'aspect-[16/10]';
  const titleSize = size === 'large' ? 'text-2xl sm:text-3xl lg:text-4xl' : size === 'medium' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl';

  return (
    <div
      ref={cardRef}
      className="project-card card-glare group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-full"
      >
        {/* Image Container */}
        <div className={`relative ${aspectRatio} overflow-hidden rounded-2xl bg-[#111827]`}>
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="project-card-image absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="project-card-overlay" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            {/* Category */}
            <span className="font-mono text-xs sm:text-sm text-[#2DD4BF] tracking-wider mb-2">
              {project.category}
            </span>

            {/* Title */}
            <h3 className={`font-heading ${titleSize} font-bold text-white mb-2 group-hover:text-[#2DD4BF] transition-colors`}>
              {project.title}
            </h3>

            {/* Description - Only for large cards */}
            {size === 'large' && (
              <p className="text-[#9CA3AF] text-sm sm:text-base max-w-lg mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.slice(0, size === 'large' ? 4 : 3).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-[#9CA3AF] bg-black/50 rounded-full backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View Project Link */}
            <div className="mt-4 flex items-center gap-2 text-[#2DD4BF] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="font-mono text-sm">VIEW PROJECT</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
