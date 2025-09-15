import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useGuestData } from './useGuestData';

export interface Follower {
  id: string;
  follower_id: string;
  created_at: string;
  follower_profile?: {
    display_name: string | null;
    avatar_url: string | null;
    user_id: string;
  } | null;
}

export const useFollowers = (creatorId?: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { guestData } = useGuestData();

  // Carregar status de seguimento e contagem
  useEffect(() => {
    if (!creatorId) return;

    const loadFollowData = async () => {
      try {
        // Contar seguidores
        const { data: countData } = await supabase
          .rpc('get_followers_count', { creator_uuid: creatorId });
        
        setFollowersCount(countData || 0);

        // Contar quantas pessoas o criador está seguindo
        const { count: followingCountData } = await supabase
          .from('followers')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', creatorId);
        
        setFollowingCount(followingCountData || 0);

        // Verificar se usuário atual está seguindo
        const { data: { user } } = await supabase.auth.getUser();
        const followerId = user?.id || guestData.sessionId;
        
        if (followerId) {
          const { data: followData } = await supabase
            .from('followers')
            .select('id')
            .eq('creator_id', creatorId)
            .eq('follower_id', followerId)
            .maybeSingle();

          setIsFollowing(!!followData);
        }
      } catch (error) {
        console.error('Error loading follow data:', error);
      }
    };

    loadFollowData();

    // Set up real-time subscription for followers changes
    const followersChannel = supabase
      .channel('followers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'followers',
          filter: `creator_id=eq.${creatorId}`
        },
        () => {
          // Reload follow data when followers change
          loadFollowData();
        }
      )
      .subscribe();

    // Set up real-time subscription for following changes (when creator follows someone)
    const followingChannel = supabase
      .channel('following-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'followers',
          filter: `follower_id=eq.${creatorId}`
        },
        () => {
          // Reload follow data when following changes
          loadFollowData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(followersChannel);
      supabase.removeChannel(followingChannel);
    };
  }, [creatorId]);

  // Carregar lista completa de seguidores
  const loadFollowers = async () => {
    if (!creatorId) return;

    setIsLoading(true);
    try {
      // Primeiro buscar seguidores com perfis de usuários logados
      const { data, error } = await supabase
        .rpc('get_followers_with_profiles', { creator_uuid: creatorId });

      if (error) throw error;

      // Buscar também seguidores visitantes diretamente da tabela followers
      const { data: allFollowers, error: followersError } = await supabase
        .from('followers')
        .select('follower_id, created_at')
        .eq('creator_id', creatorId);

      if (followersError) throw followersError;

      // Combinar dados dos perfis com visitantes
      const followersData = (allFollowers || []).map(follower => {
        // Verificar se já existe no resultado da RPC (usuário logado)
        const existingProfile = (data || []).find(p => p.follower_id === follower.follower_id);
        
        if (existingProfile) {
          return {
            id: `${creatorId}-${follower.follower_id}`,
            follower_id: follower.follower_id,
            created_at: follower.created_at,
            follower_profile: {
              display_name: existingProfile.display_name,
              avatar_url: existingProfile.avatar_url,
              user_id: follower.follower_id
            }
          };
        } else {
          // Visitante - tentar recuperar dados do localStorage se disponível
          const guestProfileKey = `dreamlink_guest_profile_${follower.follower_id}`;
          const guestProfile = localStorage.getItem(guestProfileKey);
          let guestData = null;
          
          try {
            guestData = guestProfile ? JSON.parse(guestProfile) : null;
          } catch (e) {
            console.error('Error parsing guest profile:', e);
          }
          
          return {
            id: `${creatorId}-${follower.follower_id}`,
            follower_id: follower.follower_id,
            created_at: follower.created_at,
            follower_profile: {
              display_name: guestData?.displayName || 'Visitante',
              avatar_url: guestData?.avatarUrl || null,
              user_id: follower.follower_id
            }
          };
        }
      });

      setFollowers(followersData);
    } catch (error) {
      console.error('Error loading followers:', error);
      toast.error('Erro ao carregar seguidores');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar lista de quem o criador está seguindo
  const loadFollowing = async () => {
    if (!creatorId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('followers')
        .select(`
          id,
          creator_id,
          created_at,
          creator_profile:profiles!followers_creator_id_fkey(
            display_name,
            avatar_url
          )
        `)
        .eq('follower_id', creatorId);

      if (error) throw error;

      setFollowing(data || []);
    } catch (error) {
      console.error('Error loading following:', error);
      toast.error('Erro ao carregar seguindo');
    } finally {
      setIsLoading(false);
    }
  };

  // Seguir/Desseguir criador
  const toggleFollow = async () => {
    if (!creatorId) return;

    const { data: { user } } = await supabase.auth.getUser();
    const followerId = user?.id || guestData.sessionId;
    
    if (!followerId) {
      toast.error('Erro ao identificar usuário');
      return;
    }

    try {
      if (isFollowing) {
        // Desseguir
        const { error } = await supabase
          .from('followers')
          .delete()
          .eq('creator_id', creatorId)
          .eq('follower_id', followerId);

        if (error) throw error;

        setIsFollowing(false);
        setFollowersCount(prev => Math.max(0, prev - 1));
        // Reload followers list to remove the unfollowed user
        await loadFollowers();
        toast.success('Você parou de seguir este criador');
      } else {
        // Seguir
        const { error } = await supabase
          .from('followers')
          .insert({
            creator_id: creatorId,
            follower_id: followerId
          });

        if (error) throw error;

        // Se é um visitante, salvar dados do perfil para que o criador possa ver
        if (!user?.id && guestData.sessionId) {
          const guestProfileKey = `dreamlink_guest_profile_${guestData.sessionId}`;
          const guestProfile = {
            displayName: guestData.displayName || 'Visitante',
            avatarUrl: guestData.avatarUrl || null,
            sessionId: guestData.sessionId,
            lastUpdate: Date.now()
          };
          localStorage.setItem(guestProfileKey, JSON.stringify(guestProfile));
        }

        setIsFollowing(true);
        setFollowersCount(prev => prev + 1);
        // Reload followers list to show the new follower
        await loadFollowers();
        toast.success('Agora você está seguindo este criador!');
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error('Erro ao processar ação');
    }
  };

  return {
    isFollowing,
    followersCount,
    followingCount,
    followers,
    following,
    isLoading,
    toggleFollow,
    loadFollowers,
    loadFollowing
  };
};