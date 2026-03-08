import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import FloatingOrb from '@/components/FloatingOrb';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
      setLoading(false);
      return;
    }

    // Check if user has admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'Error', description: 'Could not verify user', variant: 'destructive' });
      setLoading(false);
      return;
    }

    const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', user.id);
    const isAdmin = roles?.some(r => r.role === 'admin');

    if (!isAdmin) {
      await supabase.auth.signOut();
      toast({ title: 'Access denied', description: 'You do not have admin privileges.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    navigate('/admin');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--portfolio-dark)] min-h-screen flex items-center justify-center text-[var(--text-primary)] relative"
    >
      <FloatingOrb color="#4BDFFF" size="300px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="250px" top="60%" right="-5%" speed={-0.2} />

      <div className="glass-card p-8 w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-center mb-6 highlight-text">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border border-[var(--glass-border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-portfolio-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border border-[var(--glass-border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-portfolio-blue"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
