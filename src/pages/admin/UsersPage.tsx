import { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, Trash2, Shield, Edit2, UserCog, Loader2, RefreshCw, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type UserRole = "admin" | "editor" | "user";

interface UserToDelete {
  id: string;
  email: string;
}

interface UserToEdit {
  id: string;
  email: string;
  role: UserRole;
}

export default function UsersPage() {
  const { users, isLoading, error, refetch, createUser, deleteUser, updateUserRole } = useUsers();
  const { user: currentUser, refreshSession } = useAdmin();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const success = await refreshSession();
    if (success) {
      await refetch();
    }
    setIsRefreshing(false);
  };

  const handleRelogin = () => {
    navigate("/admin/login");
  };

  // Check for session errors
  const isSessionError = error?.message?.includes("Sessão expirada") || 
                          error?.message?.includes("autenticado");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete | null>(null);
  const [userToEdit, setUserToEdit] = useState<UserToEdit | null>(null);
  
  // Create form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [forcePasswordChange, setForcePasswordChange] = useState(true);

  const handleCreateUser = async () => {
    if (!email || password.length < 6) return;
    
    await createUser.mutateAsync({
      email,
      password,
      role,
      forcePasswordChange,
    });
    
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    await deleteUser.mutateAsync(userToDelete.id);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleUpdateRole = async () => {
    if (!userToEdit) return;
    
    await updateUserRole.mutateAsync({
      userId: userToEdit.id,
      role: userToEdit.role,
    });
    
    setIsEditDialogOpen(false);
    setUserToEdit(null);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setRole("user");
    setForcePasswordChange(true);
  };

  const openDeleteDialog = (user: UserToDelete) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (user: UserToEdit) => {
    setUserToEdit(user);
    setIsEditDialogOpen(true);
  };

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, { label: string; className: string }> = {
      admin: { label: "Admin", className: "bg-primary text-primary-foreground" },
      editor: { label: "Editor", className: "bg-secondary text-secondary-foreground" },
      user: { label: "Usuário", className: "bg-muted text-muted-foreground" },
    };
    
    const { label, className } = variants[role] || variants.user;
    return <Badge className={className}>{label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show session error with action buttons
  if (isSessionError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <UserCog className="w-7 h-7" />
            Gerenciamento de Usuários
          </h1>
        </div>
        
        <Alert variant="destructive">
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span>Sua sessão expirou. Faça login novamente para continuar.</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Tentar Novamente
              </Button>
              <Button size="sm" onClick={handleRelogin}>
                <LogIn className="w-4 h-4 mr-2" />
                Fazer Login
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <UserCog className="w-7 h-7" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os usuários e permissões do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Atualizar
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Último acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {user.last_sign_in_at 
                      ? format(new Date(user.last_sign_in_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : "Nunca"
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog({ 
                          id: user.id, 
                          email: user.email, 
                          role: user.role 
                        })}
                        title="Editar role"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {currentUser?.id !== user.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog({ id: user.id, email: user.email })}
                          title="Deletar usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Info */}
      <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Sobre as permissões:</p>
          <ul className="mt-1 space-y-1">
            <li><strong>Admin:</strong> Acesso total ao painel administrativo</li>
            <li><strong>Editor:</strong> Pode criar e editar conteúdo do blog</li>
            <li><strong>Usuário:</strong> Acesso básico ao sistema</li>
          </ul>
        </div>
      </div>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Adicione um novo usuário ao sistema
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha Temporária *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Esta será a senha inicial do usuário.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Permissão *</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin - Acesso total</SelectItem>
                  <SelectItem value="editor">Editor - Gerencia conteúdo</SelectItem>
                  <SelectItem value="user">Usuário - Acesso básico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="forcePasswordChange"
                checked={forcePasswordChange}
                onCheckedChange={(checked) => setForcePasswordChange(checked === true)}
              />
              <Label htmlFor="forcePasswordChange" className="font-normal cursor-pointer text-sm">
                Forçar troca de senha no primeiro login (recomendado)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateUser}
              disabled={!email || password.length < 6 || createUser.isPending}
            >
              {createUser.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Criar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Permissão</DialogTitle>
            <DialogDescription>
              Altere a permissão de {userToEdit?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Nova permissão</Label>
              <Select 
                value={userToEdit?.role} 
                onValueChange={(v) => setUserToEdit(prev => prev ? { ...prev, role: v as UserRole } : null)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin - Acesso total</SelectItem>
                  <SelectItem value="editor">Editor - Gerencia conteúdo</SelectItem>
                  <SelectItem value="user">Usuário - Acesso básico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRole} disabled={updateUserRole.isPending}>
              {updateUserRole.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o usuário <strong>{userToDelete?.email}</strong>?
              <br /><br />
              Esta ação é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUser.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
