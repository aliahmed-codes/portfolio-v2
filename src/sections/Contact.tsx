import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/aliahmed-codes' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !content || !form) return;

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

      // Form animation
      gsap.fromTo(
        form,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
            <span className="section-number">04</span>
            <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
          </div>
          <h2 className="reveal-item font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            LET'S BUILD SOMETHING
            <span className="text-gradient block mt-2">GREAT TOGETHER</span>
          </h2>
          <p className="reveal-item text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left Column - Info */}
          <div ref={contentRef}>
            <div className="space-y-8">
              {/* Email */}
              <div className="reveal-item">
                <p className="font-mono text-sm text-[#6B7280] tracking-wider mb-3">
                  EMAIL ME AT
                </p>
                <a 
                  href="mailto:aliahmed.dev1@gmail.com"
                  className="group flex items-center gap-3 text-white hover:text-[#2DD4BF] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-lg sm:text-xl font-medium">aliahmed.dev1@gmail.com</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              </div>

              {/* Social Links */}
              <div className="reveal-item">
                <p className="font-mono text-sm text-[#6B7280] tracking-wider mb-4">
                  CONNECT WITH ME
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#111827] border border-white/10 rounded-xl flex items-center justify-center text-[#9CA3AF] hover:text-[#2DD4BF] hover:border-[#2DD4BF]/50 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="reveal-item">
                <p className="font-mono text-sm text-[#6B7280] tracking-wider mb-3">
                  CURRENT STATUS
                </p>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#34D399]"></span>
                  </span>
                  <span className="text-white font-medium">Available for new projects</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="reveal-item p-6 bg-[#111827]/50 border border-white/5 rounded-2xl">
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  I typically respond within <span className="text-white font-medium">24 hours</span>. For urgent inquiries, feel free to reach out directly via email or social media.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-mono text-sm text-[#6B7280] tracking-wider mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/50 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-mono text-sm text-[#6B7280] tracking-wider mb-2">
                YOUR EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/50 transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block font-mono text-sm text-[#6B7280] tracking-wider mb-2">
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-4 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0B0F19] border-t-transparent rounded-full animate-spin" />
                  SENDING...
                </>
              ) : isSubmitted ? (
                <>
                  MESSAGE SENT!
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Success Message */}
            {isSubmitted && (
              <p className="text-center text-[#34D399] text-sm">
                Thank you! I'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
