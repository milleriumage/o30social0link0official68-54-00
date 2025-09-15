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
  const [followers, setFollowers] = useState<Follower[]>([]);
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
    const channel = supabase
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, [creatorId]);

  // Carregar lista completa de seguidores
  const loadFollowers = async () => {
    if (!creatorId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('get_followers_with_profiles', { creator_uuid: creatorId });

      if (error) throw error;

      const followersData = (data || []).map(follower => ({
        id: `${creatorId}-${follower.follower_id}`, // ID único
        follower_id: follower.follower_id,
        created_at: follower.created_at,
        follower_profile: {
          display_name: follower.display_name,
          avatar_url: follower.avatar_url,
          user_id: follower.follower_id
        }
      }));

      setFollowers(followersData);
    } catch (error) {
      console.error('Error loading followers:', error);
      toast.error('Erro ao carregar seguidores');
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
    followers,
    isLoading,
    toggleFollow,
    loadFollowers
  };
};