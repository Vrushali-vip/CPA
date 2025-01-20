"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children }) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, 100)
            observer.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 } // Adjust the threshold as needed
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const currentObserver = observer.current;
    if (!currentObserver) return;

    Array.from(document.querySelectorAll('.animate-on-scroll')).forEach((element) => {
      currentObserver.observe(element);
    });

    return () => currentObserver.disconnect();
  }, [children]);

  return (
    <div className="animate-on-scroll-container">
      <div className="animate-on-scroll">
        {children}
        <div className="overlay"></div> {/* Overlay for the effect */}
      </div>
    </div>
  );
};

export default AnimateOnScroll;