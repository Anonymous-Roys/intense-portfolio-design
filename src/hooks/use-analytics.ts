import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const getVisitorId = () => {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('visitor_id', id);
  }
  return id;
};

export const usePageAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await supabase.from('page_analytics').insert({
          page_path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          visitor_id: getVisitorId(),
        });
      } catch (e) {
        // Silent fail for analytics
      }
    };
    trackVisit();
  }, [location.pathname]);
};

export const useProjectView = (projectSlug: string) => {
  useEffect(() => {
    if (!projectSlug) return;
    const trackView = async () => {
      try {
        await supabase.from('project_views').insert({
          project_slug: projectSlug,
          visitor_id: getVisitorId(),
        });
      } catch (e) {
        // Silent fail
      }
    };
    trackView();
  }, [projectSlug]);
};
