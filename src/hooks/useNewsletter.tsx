import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const { data: subscribers, isLoading, error } = useQuery({
    queryKey: ["newsletter_subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      
      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });

  const updateSubscriber = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<NewsletterSubscriber> & { id: string }) => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] });
    },
  });

  const deleteSubscriber = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] });
    },
  });

  const stats = {
    total: subscribers?.length || 0,
    active: subscribers?.filter(s => s.active).length || 0,
    inactive: subscribers?.filter(s => !s.active).length || 0,
  };

  return {
    subscribers: subscribers || [],
    isLoading,
    error,
    updateSubscriber,
    deleteSubscriber,
    stats,
  };
};

export const subscribeToNewsletter = async (email: string) => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
