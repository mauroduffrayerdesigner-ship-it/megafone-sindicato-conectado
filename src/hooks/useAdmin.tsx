import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UseAdminReturn {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkAdminRole: (userId: string) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
}

export function useAdmin(): UseAdminReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: userId, _role: 'admin' });
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      return data === true;
    } catch (err) {
      console.error('Exception checking admin role:', err);
      return false;
    }
  }, []);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data.session) {
        console.error('Session refresh failed:', error);
        return false;
      }
      setSession(data.session);
      setUser(data.session.user);
      return true;
    } catch (err) {
      console.error('Exception refreshing session:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle specific events
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }
        
        // Defer admin check with setTimeout to avoid deadlock
        if (currentSession?.user) {
          setTimeout(async () => {
            const adminStatus = await checkAdminRole(currentSession.user.id);
            setIsAdmin(adminStatus);
            setIsLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    const initSession = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }

        if (existingSession) {
          // Try to refresh to ensure token is valid
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError || !refreshData.session) {
            console.warn('Session exists but refresh failed, clearing session');
            await supabase.auth.signOut();
            setIsLoading(false);
            return;
          }

          setSession(refreshData.session);
          setUser(refreshData.session.user);
          
          const adminStatus = await checkAdminRole(refreshData.session.user.id);
          setIsAdmin(adminStatus);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Exception during session init:', err);
        setIsLoading(false);
      }
    };

    initSession();

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { error: error as Error | null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return {
    user,
    session,
    isAdmin,
    isLoading,
    signIn,
    signOut,
    checkAdminRole,
    refreshSession,
  };
}
