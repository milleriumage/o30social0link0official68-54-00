import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SupportDialog = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          email: 'linkteamcreators@gmail.com',
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            💬 Suporte Geral
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Entre em contato conosco para dúvidas ou problemas
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="support-email">Email</Label>
            <Input
              id="support-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="support-subject">Assunto</Label>
            <Input
              id="support-subject"
              placeholder="Como podemos ajudar?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div>
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
            {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};