import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, X, Send, Mail, HelpCircle, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SendMessageDialog } from '@/components/SendMessageDialog';
import { AdminCreditsDialog } from '@/components/AdminCreditsDialog';

export default function SupportBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  const handleSendMessage = async () => {
    if (!email || !subject || !message) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-message', {
        body: {
          to: 'linkteamcreators@gmail.com',
          subject: `[Suporte] ${subject}`,
          message: `
            Email do usuário: ${email}
            Assunto: ${subject}
            
            Mensagem:
            ${message}
          `
        }
      });

      if (error) {
        throw error;
      }

      toast.success('Mensagem enviada com sucesso!');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Balão de suporte */}
      {isOpen && (
        <Card className="w-80 mb-4 bg-white shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare size={20} className="text-primary" />
                Fale Conosco
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-email">Email</Label>
              <Input
                id="support-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-subject">Assunto</Label>
              <Input
                id="support-subject"
                placeholder="Como podemos ajudar?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-message">Mensagem</Label>
              <Textarea
                id="support-message"
                placeholder="Descreva sua dúvida ou problema..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="w-full"
            >
              <Send size={16} className="mr-2" />
              {isLoading ? 'Enviando...' : 'Enviar Suporte'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Botão de email acima do suporte */}
      <Button
        onClick={() => setShowMessageDialog(true)}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-white mb-2"
        size="icon"
      >
        <HelpCircle size={24} />
      </Button>

      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-white"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {/* Admin Credits Dialog */}
      <AdminCreditsDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
      />

      {/* SendMessage Dialog */}
      <SendMessageDialog 
        isOpen={showMessageDialog} 
        setIsOpen={setShowMessageDialog} 
      />
    </div>
  );
}