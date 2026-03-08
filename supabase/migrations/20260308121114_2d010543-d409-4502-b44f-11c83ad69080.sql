
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Anyone can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Admins can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete avatars"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND has_role(auth.uid(), 'admin'::app_role));
