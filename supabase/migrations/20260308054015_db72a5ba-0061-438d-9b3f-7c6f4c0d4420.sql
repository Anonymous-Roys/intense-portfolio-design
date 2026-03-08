
-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Anyone can read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project views counter
CREATE TABLE public.project_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  visitor_id TEXT
);

ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views
CREATE POLICY "Anyone can record project views"
  ON public.project_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anyone can read view counts
CREATE POLICY "Anyone can read project views"
  ON public.project_views FOR SELECT
  USING (true);

-- Page analytics
CREATE TABLE public.page_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  visitor_id TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics
CREATE POLICY "Anyone can record page visits"
  ON public.page_analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_project_views_slug ON public.project_views(project_slug);
CREATE INDEX idx_page_analytics_path ON public.page_analytics(page_path);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
