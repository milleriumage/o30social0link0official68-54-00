import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useMediaLikes } from '@/hooks/useMediaLikes';
import { cn } from '@/lib/utils';

interface MediaLikeButtonProps {
  mediaId: string;
  className?: string;
}

export const MediaLikeButton: React.FC<MediaLikeButtonProps> = ({ 
  mediaId, 
  className 
}) => {
  const { isLiked, isLoading, toggleLike } = useMediaLikes(mediaId);

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike();
      }}
      disabled={isLoading}
      className={cn(
        "h-8 w-8 p-0 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/20 transition-all duration-300 hover:scale-110",
        isLiked && "bg-red-500/20 hover:bg-red-500/40 border-red-500/30",
        className
      )}
      title={isLiked ? "Descurtir" : "Curtir"}
    >
      <Heart 
        className={cn(
          "w-4 h-4 transition-colors",
          isLiked ? "text-red-500 fill-red-500" : "text-white"
        )} 
      />
    </Button>
  );
};