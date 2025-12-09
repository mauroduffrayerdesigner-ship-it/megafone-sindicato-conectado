import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: "admin" | "editor" | "user";
}

interface CreateUserParams {
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
  forcePasswordChange?: boolean;
}

export function useUsers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSessionError = async () => {
    // Clear all queries and sign out
    queryClient.clear();
    await supabase.auth.signOut();
    toast({
      title: "Sessão expirada",
      description: "Faça login novamente para continuar",
      variant: "destructive",
    });
    navigate("/admin/login");
  };

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Try to refresh the session first
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError || !refreshData.session) {
        console.error("Session refresh failed:", refreshError);
        await handleSessionError();
        throw new Error("Sessão expirada");
      }

      const response = await supabase.functions.invoke("manage-users", {
        body: { action: "list" },
      });

      if (response.error) {
        // Check if it's an auth error
        if (response.error.message?.includes("401") || 
            response.error.message?.includes("Não autenticado") ||
            response.error.message?.includes("Usuário não autenticado")) {
          await handleSessionError();
          throw new Error("Sessão expirada");
        }
        throw new Error(response.error.message || "Erro ao listar usuários");
      }

      // Check for error in response data
      if (response.data?.error) {
        if (response.data.error.includes("autenticado") || response.data.error.includes("autorizado")) {
          await handleSessionError();
          throw new Error("Sessão expirada");
        }
        throw new Error(response.data.error);
      }

      return response.data.users as User[];
    },
    retry: false, // Don't retry on auth errors
    staleTime: 30000, // 30 seconds
  });

  const createUser = useMutation({
    mutationFn: async ({ email, password, role, forcePasswordChange = true }: CreateUserParams) => {
      // Refresh session before mutation
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        await handleSessionError();
        throw new Error("Sessão expirada");
      }

      const response = await supabase.functions.invoke("manage-users", {
        body: { 
          action: "create", 
          email, 
          password, 
          role, 
          forcePasswordChange 
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Erro ao criar usuário");
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário criado",
        description: `Usuário ${variables.email} criado com sucesso`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar usuário",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      // Refresh session before mutation
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        await handleSessionError();
        throw new Error("Sessão expirada");
      }

      const response = await supabase.functions.invoke("manage-users", {
        body: { action: "delete", userId },
      });

      if (response.error) {
        throw new Error(response.error.message || "Erro ao deletar usuário");
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário deletado",
        description: "O usuário foi removido com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar usuário",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | "editor" | "user" }) => {
      // Refresh session before mutation
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        await handleSessionError();
        throw new Error("Sessão expirada");
      }

      const response = await supabase.functions.invoke("manage-users", {
        body: { action: "updateRole", userId, role },
      });

      if (response.error) {
        throw new Error(response.error.message || "Erro ao atualizar role");
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Role atualizada",
        description: "A permissão do usuário foi atualizada",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar role",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    users,
    isLoading,
    error,
    refetch,
    createUser,
    deleteUser,
    updateUserRole,
  };
}
