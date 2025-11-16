import React, { useEffect, useRef, useState } from 'react';

const musicFiles = [
  '/assets/music/cozy-relax-jazz-podcast-coffee-ambiance-271621.mp3',
  '/assets/music/jazz-in-a-gentle-coffee-shop-137710.mp3',
  '/assets/music/like-black-coffee-137708.mp3',
  '/assets/music/relaxing-jazz-podcast-coffee-shop-music-192283.mp3',
];

interface BackgroundMusicProps {
  isMuted: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isMuted }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Initialize and handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Load the current track
    audio.src = musicFiles[currentTrackIndex];
    audio.load();
    
    // Auto-play if not muted
    if (!isMuted) {
      audio.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }

    // Handle track ending
    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % musicFiles.length;
      setCurrentTrackIndex(nextIndex);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrackIndex, isMuted]);

  // Handle mute/unmute separately (pause/resume)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else {
      // Only play if we have a source loaded
      if (audio.src) {
        audio.play().catch((error) => {
          console.log('Audio playback failed:', error);
        });
      }
    }
  }, [isMuted]);

  return <audio ref={audioRef} />;
};
