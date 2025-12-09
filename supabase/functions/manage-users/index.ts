import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ManageUsersRequest {
  action: "list" | "create" | "delete" | "updateRole";
  email?: string;
  password?: string;
  userId?: string;
  role?: "admin" | "editor" | "user";
  forcePasswordChange?: boolean;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Create admin client for privileged operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the requesting user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader.replace("Bearer ", "");
    
    // Use admin client to get user from JWT token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      console.error("Failed to get user:", userError);
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user is admin using the has_role function
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      console.error("User is not admin:", roleError);
      return new Response(
        JSON.stringify({ error: "Apenas administradores podem gerenciar usuários" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { action, email, password, userId, role, forcePasswordChange = true }: ManageUsersRequest = await req.json();
    console.log(`Action: ${action}, Email: ${email}, UserId: ${userId}, Role: ${role}, ForcePasswordChange: ${forcePasswordChange}`);

    switch (action) {
      case "list": {
        // Get all users from auth
        const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
          console.error("Error listing users:", listError);
          throw listError;
        }

        // Get all roles
        const { data: roles, error: rolesError } = await supabaseAdmin
          .from("user_roles")
          .select("user_id, role");

        if (rolesError) {
          console.error("Error fetching roles:", rolesError);
          throw rolesError;
        }

        // Merge users with their roles
        const usersWithRoles = authUsers.users.map((authUser) => {
          const userRole = roles?.find((r) => r.user_id === authUser.id);
          return {
            id: authUser.id,
            email: authUser.email,
            created_at: authUser.created_at,
            last_sign_in_at: authUser.last_sign_in_at,
            role: userRole?.role || "user",
          };
        });

        console.log(`Listed ${usersWithRoles.length} users`);
        return new Response(
          JSON.stringify({ users: usersWithRoles }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create": {
        if (!email || !password) {
          return new Response(
            JSON.stringify({ error: "Email e senha são obrigatórios" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (password.length < 6) {
          return new Response(
            JSON.stringify({ error: "Senha deve ter pelo menos 6 caracteres" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            force_password_change: forcePasswordChange,
          },
        });

        if (createError) {
          console.error("Error creating user:", createError);
          throw createError;
        }

        // Add role if specified
        if (role && createData.user) {
          const { error: roleInsertError } = await supabaseAdmin
            .from("user_roles")
            .insert({ user_id: createData.user.id, role });

          if (roleInsertError) {
            console.error("Error adding role:", roleInsertError);
          }
        }

        console.log(`Created user: ${email} with role: ${role}`);
        return new Response(
          JSON.stringify({ success: true, user: createData.user }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        if (!userId) {
          return new Response(
            JSON.stringify({ error: "ID do usuário é obrigatório" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Prevent self-deletion
        if (userId === user.id) {
          return new Response(
            JSON.stringify({ error: "Você não pode deletar sua própria conta" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Delete user role first
        await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);

        // Delete user from auth
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (deleteError) {
          console.error("Error deleting user:", deleteError);
          throw deleteError;
        }

        console.log(`Deleted user: ${userId}`);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "updateRole": {
        if (!userId || !role) {
          return new Response(
            JSON.stringify({ error: "ID do usuário e role são obrigatórios" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Check if role exists, upsert accordingly
        const { data: existingRole } = await supabaseAdmin
          .from("user_roles")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (existingRole) {
          const { error: updateError } = await supabaseAdmin
            .from("user_roles")
            .update({ role })
            .eq("user_id", userId);

          if (updateError) {
            console.error("Error updating role:", updateError);
            throw updateError;
          }
        } else {
          const { error: insertError } = await supabaseAdmin
            .from("user_roles")
            .insert({ user_id: userId, role });

          if (insertError) {
            console.error("Error inserting role:", insertError);
            throw insertError;
          }
        }

        console.log(`Updated role for user ${userId} to ${role}`);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Ação inválida" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: any) {
    console.error("Error in manage-users function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
