import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('testimonials').select('*').eq('visible', true).order('display_order', { ascending: true });
      if (data && data.length > 0) setTestimonials(data);
    };
    fetch();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What People Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <Quote size={40} className="absolute -top-1 -left-1 text-portfolio-blue/10" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-2xl overflow-hidden">
                  {isImageUrl(t.avatar) ? (
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    t.avatar
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)]">{t.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)]'}
                  />
                ))}
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
