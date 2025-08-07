'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
  value: number;
  label: string;
}

const stats: Stat[] = [
  { value: 281, label: 'Μελέτες' },
  { value: 172, label: 'Συνεργασίες' },
  { value: 2013, label: 'Θέσεις Στάθμευσης' },
  { value: 88, label: 'Clients' }, // Assuming "Clients" for the last one
];

const Counter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * to));
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [to]);

  return <span className="text-5xl font-bold font-headline text-primary">{count}+</span>;
};

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section ref={statsRef} id="stats" className="py-12 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              {isVisible && <Counter to={stat.value} />}
              <p className="mt-2 text-lg text-muted-foreground font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
