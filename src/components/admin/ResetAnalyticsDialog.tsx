import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useResetAnalytics } from "@/hooks/useResetAnalytics";

interface ResetAnalyticsDialogProps {
  pageViewsCount: number;
  whatsappClicksCount: number;
}

export function ResetAnalyticsDialog({ 
  pageViewsCount, 
  whatsappClicksCount 
}: ResetAnalyticsDialogProps) {
  const [firstDialogOpen, setFirstDialogOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { resetAnalytics, isResetting } = useResetAnalytics();

  const handleFirstConfirm = () => {
    setFirstDialogOpen(false);
    setSecondDialogOpen(true);
  };

  const handleSecondConfirm = async () => {
    if (!confirmed || confirmText !== "CONFIRMAR") return;
    
    await resetAnalytics({ pageViews: true, whatsappClicks: true });
    
    // Reset state
    setSecondDialogOpen(false);
    setConfirmed(false);
    setConfirmText("");
  };

  const handleSecondCancel = () => {
    setSecondDialogOpen(false);
    setConfirmed(false);
    setConfirmText("");
  };

  const canProceed = confirmed && confirmText === "CONFIRMAR";

  return (
    <>
      {/* First Dialog - Initial Warning */}
      <Dialog open={firstDialogOpen} onOpenChange={setFirstDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-2" />
            Resetar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Resetar Analytics
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p>Você está prestes a apagar:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>{pageViewsCount}</strong> registros de Page Views</li>
                <li><strong>{whatsappClicksCount}</strong> registros de Cliques WhatsApp</li>
              </ul>
              <p className="text-destructive font-medium">
                Esta ação não pode ser desfeita.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setFirstDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleFirstConfirm}>
              Continuar →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Dialog - Final Confirmation */}
      <AlertDialog open={secondDialogOpen} onOpenChange={setSecondDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              CONFIRMAÇÃO FINAL
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="flex items-start space-x-3 pt-4">
                <Checkbox
                  id="confirm-checkbox"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                />
                <Label 
                  htmlFor="confirm-checkbox" 
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  Entendo que esta ação é <strong className="text-destructive">IRREVERSÍVEL</strong> e 
                  todos os dados de analytics serão permanentemente apagados.
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-text" className="text-sm">
                  Digite <strong className="text-foreground">CONFIRMAR</strong> para prosseguir:
                </Label>
                <Input
                  id="confirm-text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                  placeholder="CONFIRMAR"
                  className="font-mono"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel onClick={handleSecondCancel}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSecondConfirm}
              disabled={!canProceed || isResetting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isResetting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Apagando...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Apagar Tudo
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
