import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Integration {
  id: string;
  name: string;
  type: string;
  config: Json;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const useIntegrations = () => {
  const queryClient = useQueryClient();

  const { data: integrations, isLoading, error } = useQuery({
    queryKey: ["integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .order("name", { ascending: true });
      
      if (error) throw error;
      return data as Integration[];
    },
  });

  const createIntegration = useMutation({
    mutationFn: async (integration: { name: string; type: string; config: Json; active: boolean }) => {
      const { data, error } = await supabase
        .from("integrations")
        .insert([integration])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });

  const updateIntegration = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; config?: Json; active?: boolean }) => {
      const { data, error } = await supabase
        .from("integrations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });

  const deleteIntegration = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("integrations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });

  return {
    integrations: integrations || [],
    isLoading,
    error,
    createIntegration,
    updateIntegration,
    deleteIntegration,
  };
};
