import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;

    if (!section || !header || !form) return;

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

      // Form animation
      gsap.fromTo(
        form,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
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
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div ref={headerRef}>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-number">04</span>
              <div className="h-[1px] w-12 bg-[#2DD4BF]/50" />
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              LET'S TALK
            </h2>
            
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-12 max-w-lg">
              Have a project in mind or just want to chat? I'm always open to 
              discussing new opportunities, creative ideas, or ways to help 
              bring your vision to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#6B7280] block">EMAIL</span>
                  <a 
                    href="mailto:aliahmed.dev1@gmail.com"
                    className="text-white hover:text-[#2DD4BF] transition-colors"
                  >
                    aliahmed.dev1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#6B7280] block">LOCATION</span>
                  <span className="text-white">Lahore, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="font-mono text-xs text-[#6B7280] block mb-4">FOLLOW ME</span>
              <div className="flex gap-4">
                <a
                  href="https://github.com/aliahmed-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#111827] border border-[#1F2937] rounded-lg flex items-center justify-center hover:border-[#2DD4BF]/50 hover:bg-[#2DD4BF]/10 transition-all"
                >
                  <Github className="w-5 h-5 text-[#9CA3AF] hover:text-[#2DD4BF]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#111827] border border-[#1F2937] rounded-lg flex items-center justify-center hover:border-[#2DD4BF]/50 hover:bg-[#2DD4BF]/10 transition-all"
                >
                  <Linkedin className="w-5 h-5 text-[#9CA3AF] hover:text-[#2DD4BF]" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#111827] border border-[#1F2937] rounded-lg flex items-center justify-center hover:border-[#2DD4BF]/50 hover:bg-[#2DD4BF]/10 transition-all"
                >
                  <Twitter className="w-5 h-5 text-[#9CA3AF] hover:text-[#2DD4BF]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#2DD4BF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-[#2DD4BF]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#9CA3AF]">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-mono text-xs text-[#6B7280] mb-2">
                        NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF] transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-mono text-xs text-[#6B7280] mb-2">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-mono text-xs text-[#6B7280] mb-2">
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white placeholder-[#4B5563] focus:outline-none focus:border-[#2DD4BF] transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0B0F19] border-t-transparent rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
