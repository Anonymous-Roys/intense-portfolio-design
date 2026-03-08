
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  avatar text NOT NULL DEFAULT '🧑‍💼',
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible testimonials"
  ON public.testimonials FOR SELECT
  USING (visible = true);

CREATE POLICY "Admins can read all testimonials"
  ON public.testimonials FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default testimonials
INSERT INTO public.testimonials (name, role, avatar, rating, text, display_order) VALUES
  ('Kwame Mensah', 'Product Manager, TechStartup GH', '🧑‍💼', 5, 'David delivered an exceptional EdTech platform ahead of schedule. His technical depth and communication skills are outstanding.', 1),
  ('Sarah Johnson', 'Senior Developer, CloudNine', '👩‍💻', 5, 'Working with David on our cloud migration was a great experience. He brought deep AWS expertise and mentored our junior devs along the way.', 2),
  ('Ama Owusu', 'CTO, EduConnect', '👩‍🏫', 5, 'David built our entire learning management system from scratch. The code quality and architecture were impressive — scalable and maintainable.', 3),
  ('Michael Chen', 'Team Lead, DevOps Inc.', '🧑‍🔧', 4, 'David set up our CI/CD pipelines and Docker infrastructure. Very knowledgeable and always willing to explain his approach.', 4);
