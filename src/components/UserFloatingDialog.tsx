import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { X, Mail, Calendar, Shield } from 'lucide-react';

interface UserFloatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserFloatingDialog: React.FC<UserFloatingDialogProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useGoogleAuth();
  const { profileData } = useUserProfile();

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-primary">
            👤 Perfil do Usuário
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Avatar e informações básicas */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage 
                src={user.user_metadata?.avatar_url} 
                alt={user.user_metadata?.full_name || user.email}
              />
              <AvatarFallback className="text-lg">
                {user.user_metadata?.full_name?.[0] || user.email?.[0] || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">
                {user.user_metadata?.full_name || 'Usuário'}
              </h3>
              <Badge variant="secondary" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Autenticado
              </Badge>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground">{profileData.email || user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cadastrado em</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo personalizável */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">🎉 Bem-vindo ao Linkchat TV!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Agora você tem acesso completo a todas as funcionalidades da plataforma.
            </p>
            <div className="space-y-2">
              <div className="text-xs bg-background/50 p-2 rounded">
                ✨ Chat em tempo real desbloqueado
              </div>
              <div className="text-xs bg-background/50 p-2 rounded">
                🔓 Acesso a conteúdo premium
              </div>
              <div className="text-xs bg-background/50 p-2 rounded">
                📸 Upload de mídia sem limitações
              </div>
            </div>
          </div>

          {/* Botão de logout */}
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            🚪 Fazer Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};