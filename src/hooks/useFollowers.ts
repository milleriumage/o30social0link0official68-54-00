import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
        if (user) {
          const { data: followData } = await supabase
            .from('followers')
            .select('id')
            .eq('creator_id', creatorId)
            .eq('follower_id', user.id)
            .maybeSingle();

          setIsFollowing(!!followData);
        }
      } catch (error) {
        console.error('Error loading follow data:', error);
      }
    };

    loadFollowData();
  }, [creatorId]);

  // Carregar lista completa de seguidores
  const loadFollowers = async () => {
    if (!creatorId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('followers')
        .select(`
          id,
          follower_id,
          created_at
        `)
        .eq('creator_id', creatorId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar perfis dos seguidores separadamente
      const followersWithProfiles = await Promise.all(
        (data || []).map(async (follower) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, avatar_url, user_id')
            .eq('user_id', follower.follower_id)
            .maybeSingle();

          return {
            ...follower,
            follower_profile: profile
          };
        })
      );

      setFollowers(followersWithProfiles);
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
    if (!user) {
      toast.error('Faça login para seguir criadores');
      return;
    }

    if (user.id === creatorId) {
      toast.error('Você não pode seguir a si mesmo');
      return;
    }

    try {
      if (isFollowing) {
        // Desseguir
        const { error } = await supabase
          .from('followers')
          .delete()
          .eq('creator_id', creatorId)
          .eq('follower_id', user.id);

        if (error) throw error;

        setIsFollowing(false);
        setFollowersCount(prev => Math.max(0, prev - 1));
        toast.success('Você parou de seguir este criador');
      } else {
        // Seguir
        const { error } = await supabase
          .from('followers')
          .insert({
            creator_id: creatorId,
            follower_id: user.id
          });

        if (error) throw error;

        setIsFollowing(true);
        setFollowersCount(prev => prev + 1);
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