import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Gift, DollarSign, Clock, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useReferralSystem } from "@/hooks/useReferralSystem";

interface ReferralDialogProps {
  disabled?: boolean;
}

export const ReferralDialog = ({ disabled = false }: ReferralDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [stripeEmail, setStripeEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const { user } = useGoogleAuth();
  
  const {
    referralStats,
    paymentSettings,
    sendGift,
    updatePaymentSettings,
    isLoading,
    getUserReferralLink
  } = useReferralSystem();

  const referralLink = getUserReferralLink();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("🔗 Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar link");
    }
  };

  const handleSavePaymentSettings = async () => {
    if (!paypalEmail && !stripeEmail) {
      toast.error("Informe pelo menos um email de pagamento");
      return;
    }

    const success = await updatePaymentSettings(paypalEmail, stripeEmail);
    if (success) {
      toast.success("💳 Configurações de pagamento salvas!");
    }
  };

  const handleSendGift = async () => {
    if (referralStats.referredUsersCount === 0) {
      toast.error("Você não possui usuários cadastrados via sua página");
      return;
    }

    const success = await sendGift();
    if (success) {
      toast.success("🎁 Presente enviado com sucesso!");
    }
  };

  useEffect(() => {
    if (paymentSettings) {
      setPaypalEmail(paymentSettings.paypal_email || "");
      setStripeEmail(paymentSettings.stripe_email || "");
    }
  }, [paymentSettings]);

  const daysRemaining = referralStats.commissionReleaseDate ? 
    Math.max(0, Math.ceil((new Date(referralStats.commissionReleaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  if (!user) {
    return (
      <Button size="sm" variant="ghost" className="w-full justify-start bg-background hover:bg-secondary border-0 text-foreground p-2 h-auto rounded-none" disabled>
        <Users className="w-4 h-4 mr-2" />
        <span>Referral Page (Login necessário)</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="w-full justify-start bg-background hover:bg-secondary border-0 text-foreground p-2 h-auto rounded-none" disabled={disabled}>
          <Users className="w-4 h-4 mr-2" />
          <span>Referral Page</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md border-border/50 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Referral Page - Sistema de Indicações
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Estatísticas principais */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-200/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{referralStats.referredUsersCount}</div>
              <p className="text-muted-foreground">
                🎉 usuários já se cadastraram usando sua página! 
                Incentive eles a assinarem um plano VIP e receba 5% de comissão! 🚀
              </p>
            </div>
          </div>

          {/* Link de compartilhamento */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">🔗 Seu Link de Indicação</Label>
            <div className="flex gap-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="font-mono text-xs"
              />
              <Button 
                onClick={handleCopyLink}
                size="sm"
                variant="outline"
                className="px-3"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Compartilhe este link para que novos usuários se cadastrem através da sua indicação
            </p>
          </div>

          {/* Comissões */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-200/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Comissões
              </span>
              {referralStats.commissionPending > 0 && (
                <div className="flex items-center gap-1 text-orange-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Liberação em {daysRemaining} dias</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Comissão Total</div>
                <div className="font-bold text-green-600">R$ {referralStats.totalCommission.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Pendente</div>
                <div className="font-bold text-orange-600">R$ {referralStats.commissionPending.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Configuração de Pagamento */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4" />
              <span className="font-semibold">💳 Configuração de Pagamento</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paypal" className="flex items-center gap-2">
                  <span className="text-blue-600">📧</span>
                  PayPal Email
                </Label>
                <Input
                  id="paypal"
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <span className="text-purple-600">💳</span>
                  Stripe Email
                </Label>
                <Input
                  id="stripe"
                  type="email"
                  value={stripeEmail}
                  onChange={(e) => setStripeEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSavePaymentSettings} 
              disabled={isLoading}
              className="w-full"
            >
              Salvar Configurações de Pagamento
            </Button>
          </div>

          {/* Envio de Presentes */}
          <div className="border rounded-lg p-4 space-y-4">
            <Button 
              onClick={handleSendGift}
              disabled={isLoading || referralStats.referredUsersCount === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              size="lg"
            >
              <Gift className="w-5 h-5 mr-2" />
              Enviar Presente 🎁 100 créditos
            </Button>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <div className="font-semibold mb-2">ℹ️ Como funciona o presente:</div>
                <ul className="space-y-1 text-xs">
                  <li>• Um usuário ALEATÓRIO da sua base de cadastrados receberá 100 créditos</li>
                  <li>• A mensagem será de BOAS-VINDAS com incentivo para virar assinante VIP</li>
                  <li>• Este presente é uma forma de engajamento para aumentar suas chances de receber comissões</li>
                  <li>• O usuário poderá agradecer e será redirecionado para sua página</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};