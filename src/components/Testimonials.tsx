import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Kwame Mensah', role: 'Product Manager, TechStartup GH', avatar: '🧑‍💼', rating: 5, text: 'David delivered an exceptional EdTech platform ahead of schedule. His technical depth and communication skills are outstanding.' },
  { id: '2', name: 'Sarah Johnson', role: 'Senior Developer, CloudNine', avatar: '👩‍💻', rating: 5, text: 'Working with David on our cloud migration was a great experience. He brought deep AWS expertise and mentored our junior devs along the way.' },
  { id: '3', name: 'Ama Owusu', role: 'CTO, EduConnect', avatar: '👩‍🏫', rating: 5, text: 'David built our entire learning management system from scratch. The code quality and architecture were impressive — scalable and maintainable.' },
  { id: '4', name: 'Michael Chen', role: 'Team Lead, DevOps Inc.', avatar: '🧑‍🔧', rating: 4, text: 'David set up our CI/CD pipelines and Docker infrastructure. Very knowledgeable and always willing to explain his approach.' },
];

const isImageUrl = (str: string) => str.startsWith('http') || str.startsWith('/');

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('testimonials').select('*').eq('visible', true).order('display_order', { ascending: true });
      if (data && data.length > 0) setTestimonials(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (idx: number) => {
    const total = testimonials.length;
    if (total === 0) return {};
    
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const xOffset = isMobile ? '80%' : '55%';

    // Active focused card
    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto' as const
      };
    }
    
    // Right peeking card
    if (diff === 1 || (diff === - (total - 1) && total > 2)) {
      return {
        x: xOffset,
        scale: 0.85,
        opacity: 0.35,
        zIndex: 20,
        pointerEvents: 'none' as const
      };
    }

    // Left peeking card
    if (diff === -1 || (diff === (total - 1) && total > 2)) {
      return {
        x: `-${xOffset}`,
        scale: 0.85,
        opacity: 0.35,
        zIndex: 20,
        pointerEvents: 'none' as const
      };
    }

    // Hidden cards on sides
    return {
      x: diff > 0 ? '120%' : '-120%',
      scale: 0.7,
      opacity: 0,
      zIndex: 10,
      pointerEvents: 'none' as const
    };
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('testimonials.title')}
        </motion.h2>

        {/* Carousel Area */}
        <div className="relative w-full h-[280px] sm:h-[220px] mt-12 flex items-center justify-center">
          {testimonials.map((t, idx) => {
            const active = idx === activeIndex;
            return (
              <motion.div
                key={t.id}
                animate={getCardStyle(idx)}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="absolute w-[85%] sm:w-[500px] h-[220px] sm:h-[180px] glass-card p-6 flex flex-col justify-between select-none cursor-grab active:cursor-grabbing shadow-lg"
                drag={active ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) handleNext();
                  else if (info.offset.x > 60) handlePrev();
                }}
              >
                <Quote size={40} className="absolute -top-1 -left-1 text-portfolio-blue/10 pointer-events-none" />
                
                <div className="flex items-center gap-3 relative z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-2xl overflow-hidden">
                    {isImageUrl(t.avatar) ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.avatar
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">{t.name}</h4>
                    <p className="text-[11px] sm:text-xs text-[var(--text-secondary)]">{t.role}</p>
                  </div>
                </div>

                <div className="my-2 pointer-events-none">
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic line-clamp-3">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2 pointer-events-none">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)]'}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation & Progress Panel */}
        <div className="max-w-md mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev} 
              className="p-2 rounded-full glass-card hover:bg-muted text-[var(--text-primary)] transition-colors border border-[var(--glass-border)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-[var(--text-secondary)] select-none">
              {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button 
              onClick={handleNext} 
              className="p-2 rounded-full glass-card hover:bg-muted text-[var(--text-primary)] transition-colors border border-[var(--glass-border)]"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex ? "w-6 bg-portfolio-blue" : "w-1.5 bg-border hover:bg-portfolio-blue/40"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Progress line indicator */}
          <div className="w-48 h-[2px] bg-border/30 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-portfolio-blue"
              animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
