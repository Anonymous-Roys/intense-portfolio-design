
-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: only admins can read user_roles
CREATE POLICY "Admins can read roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to manage blog posts (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can read all blog posts (including unpublished)
CREATE POLICY "Admins can read all blog posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read contact messages
CREATE POLICY "Admins can read contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update contact messages (mark as read)
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read page analytics
CREATE POLICY "Admins can read analytics"
ON public.page_analytics FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
