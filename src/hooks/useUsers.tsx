import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: "admin" | "editor" | "user";
}

interface CreateUserParams {
  email: string;
  password?: string;
  role: "admin" | "editor" | "user";
  sendInvite: boolean;
}

export function useUsers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error("Não autenticado");
      }

      const response = await supabase.functions.invoke("manage-users", {
        body: { action: "list" },
      });

      if (response.error) {
        throw new Error(response.error.message || "Erro ao listar usuários");
      }

      return response.data.users as User[];
    },
  });

  const createUser = useMutation({
    mutationFn: async ({ email, password, role, sendInvite }: CreateUserParams) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error("Não autenticado");
      }

      const action = sendInvite ? "invite" : "create";
      const body: Record<string, unknown> = { action, email, role };
      
      if (!sendInvite && password) {
        body.password = password;
      }

      const response = await supabase.functions.invoke("manage-users", {
        body,
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
        description: variables.sendInvite 
          ? `Convite enviado para ${variables.email}`
          : `Usuário ${variables.email} criado com sucesso`,
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
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error("Não autenticado");
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
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error("Não autenticado");
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
    createUser,
    deleteUser,
    updateUserRole,
  };
}
