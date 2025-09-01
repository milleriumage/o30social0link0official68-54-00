import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function ProtectedAccess({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState<null | boolean>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<number>(Date.now());

  useEffect(() => {
    const verifyAccess = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log('UID do usuário:', userData?.user?.id);
      if (userError || !userData.user) {
        setHasAccess(false);
        setUserId(null);
        return;
      }

      const userUid = userData.user.id;
      setUserId(userUid);

      console.log({ hasAccess, userId: userUid });
      const { data, error } = await supabase
        .from('usuarios')
        .select('id')
        .eq('user_id', userUid)
        .eq('acesso', true)
        .single();

      console.log({ data, error });

      if (error || !data) {
        console.log('Acesso negado - usuário não encontrado ou sem permissão');
        setHasAccess(false);
        // Forçar bloqueio imediato se dados estão inconsistentes
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setHasAccess(true);
      }
    };

    verifyAccess();
    setLastCheck(Date.now());
  }, []);

  // Polling de fallback para verificar mudanças a cada 5 segundos
  useEffect(() => {
    if (!userId || hasAccess === null) return;

    const interval = setInterval(async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select('acesso')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        const currentAccess = data.acesso;
        // Se o acesso mudou para false e não foi detectado pelo realtime
        if (hasAccess === true && currentAccess === false) {
          // Força reload da página se o realtime falhou
          window.location.reload();
        } else if (hasAccess !== currentAccess) {
          setHasAccess(currentAccess);
        }
      }
    }, 5000); // Verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, [userId, hasAccess]);

  // Realtime subscription para mudanças na tabela usuarios
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('usuarios-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'usuarios',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          // Verifica se o acesso foi alterado
          const newAccess = payload.new?.acesso;
          if (typeof newAccess === 'boolean') {
            setHasAccess(newAccess);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">
        ⏳ Verificando acesso...
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-destructive text-destructive-foreground text-lg">
        ❌ Acesso negado.
      </div>
    );
  }

  return <>{children}</>;
}