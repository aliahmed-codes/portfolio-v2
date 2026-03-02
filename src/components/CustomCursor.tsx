import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Handle hover on project cards
    const handleProjectEnter = () => {
      setCursorText('VIEW');
      cursor.classList.add('active');
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const handleProjectLeave = () => {
      cursor.classList.remove('active');
      gsap.to(cursor, {
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Handle hover on links
    const handleLinkEnter = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.2,
      });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', handleProjectEnter);
      card.addEventListener('mouseleave', handleProjectLeave);
    });

    // Add listeners to links
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      projectCards.forEach((card) => {
        card.removeEventListener('mouseenter', handleProjectEnter);
        card.removeEventListener('mouseleave', handleProjectLeave);
      });
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleProjectEnter = () => {
      setCursorText('VIEW');
      cursor.classList.add('active');
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const handleProjectLeave = () => {
      cursor.classList.remove('active');
      gsap.to(cursor, {
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const observer = new MutationObserver(() => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card) => {
        card.removeEventListener('mouseenter', handleProjectEnter);
        card.removeEventListener('mouseleave', handleProjectLeave);
        card.addEventListener('mouseenter', handleProjectEnter);
        card.addEventListener('mouseleave', handleProjectLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden lg:flex"
      style={{ transform: 'translate(-50%, -50%) scale(0)' }}
    >
      <span ref={cursorTextRef} className="font-mono text-xs font-semibold text-[#0B0F19]">
        {cursorText}
      </span>
    </div>
  );
}
