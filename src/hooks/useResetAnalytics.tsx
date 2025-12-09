import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ResetOptions {
  pageViews?: boolean;
  whatsappClicks?: boolean;
}

interface ResetResult {
  success: boolean;
  deleted?: {
    pageViews: number;
    whatsappClicks: number;
  };
  message?: string;
  error?: string;
}

export function useResetAnalytics() {
  const [isResetting, setIsResetting] = useState(false);
  const queryClient = useQueryClient();

  const resetAnalytics = async (options: ResetOptions = {}): Promise<ResetResult> => {
    setIsResetting(true);

    try {
      const { data, error } = await supabase.functions.invoke("reset-analytics", {
        body: {
          pageViews: options.pageViews ?? true,
          whatsappClicks: options.whatsappClicks ?? true,
        },
      });

      if (error) {
        console.error("Reset analytics error:", error);
        toast.error("Erro ao resetar analytics");
        return { success: false, error: error.message };
      }

      if (data?.success) {
        // Invalidate all analytics-related queries
        await queryClient.invalidateQueries({ queryKey: ["analytics"] });
        await queryClient.invalidateQueries({ queryKey: ["whatsapp-analytics"] });
        
        toast.success(data.message || "Analytics resetados com sucesso!");
        return {
          success: true,
          deleted: data.deleted,
          message: data.message,
        };
      }

      return { success: false, error: data?.error || "Erro desconhecido" };
    } catch (err) {
      console.error("Reset analytics exception:", err);
      toast.error("Erro ao conectar com o servidor");
      return { success: false, error: "Erro de conexão" };
    } finally {
      setIsResetting(false);
    }
  };

  return { resetAnalytics, isResetting };
}
