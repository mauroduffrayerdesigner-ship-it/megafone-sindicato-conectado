import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'editor';

interface UseAdminReturn {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  userRole: AppRole | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkAdminRole: (userId: string) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
  canAccessUsers: boolean;
  canAccessIntegrations: boolean;
}

export function useAdmin(): UseAdminReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
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

  const checkEditorRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: userId, _role: 'editor' });
      
      if (error) {
        console.error('Error checking editor role:', error);
        return false;
      }
      
      return data === true;
    } catch (err) {
      console.error('Exception checking editor role:', err);
      return false;
    }
  }, []);

  const checkUserRoles = useCallback(async (userId: string) => {
    const adminStatus = await checkAdminRole(userId);
    if (adminStatus) {
      setIsAdmin(true);
      setIsEditor(false);
      setUserRole('admin');
      return;
    }
    
    const editorStatus = await checkEditorRole(userId);
    if (editorStatus) {
      setIsAdmin(false);
      setIsEditor(true);
      setUserRole('editor');
      return;
    }
    
    setIsAdmin(false);
    setIsEditor(false);
    setUserRole(null);
  }, [checkAdminRole, checkEditorRole]);

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
        
        // Defer role check with setTimeout to avoid deadlock
        if (currentSession?.user) {
          setTimeout(async () => {
            await checkUserRoles(currentSession.user.id);
            setIsLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsEditor(false);
          setUserRole(null);
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
          
          await checkUserRoles(refreshData.session.user.id);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Exception during session init:', err);
        setIsLoading(false);
      }
    };

    initSession();

    return () => subscription.unsubscribe();
  }, [checkUserRoles]);

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
    setIsEditor(false);
    setUserRole(null);
  };

  // Computed permissions
  const canAccessUsers = isAdmin;
  const canAccessIntegrations = isAdmin;

  return {
    user,
    session,
    isAdmin,
    isEditor,
    userRole,
    isLoading,
    signIn,
    signOut,
    checkAdminRole,
    refreshSession,
    canAccessUsers,
    canAccessIntegrations,
  };
}
