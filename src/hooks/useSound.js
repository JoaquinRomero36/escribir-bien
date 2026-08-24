import { useCallback, useRef, useEffect, useState } from 'react';

const AUDIO_CONTEXT = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  if (!AUDIO_CONTEXT) return;
  
  const oscillator = AUDIO_CONTEXT.createOscillator();
  const gainNode = AUDIO_CONTEXT.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(AUDIO_CONTEXT.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(volume, AUDIO_CONTEXT.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, AUDIO_CONTEXT.currentTime + duration);
  
  oscillator.start(AUDIO_CONTEXT.currentTime);
  oscillator.stop(AUDIO_CONTEXT.currentTime + duration);
}

export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  
  useEffect(() => {
    const handleClick = () => {
      if (AUDIO_CONTEXT && AUDIO_CONTEXT.state === 'suspended') {
        AUDIO_CONTEXT.resume();
      }
    };
    document.addEventListener('click', handleClick, { once: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);
  
  const playCorrect = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(523.25, 0.15, 'sine', 0.25); // C5
    setTimeout(() => playTone(659.25, 0.15, 'sine', 0.25), 80); // E5
    setTimeout(() => playTone(783.99, 0.2, 'sine', 0.25), 160); // G5
  }, []);
  
  const playError = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(200, 0.3, 'sawtooth', 0.2); // Low buzz
    setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.15), 100);
  }, []);
  
  const playComplete = useCallback(() => {
    if (!enabledRef.current) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.15, 'sine', 0.2), i * 100);
    });
  }, []);
  
  const playClick = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(800, 0.05, 'square', 0.1);
  }, []);
  
  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    setEnabled(enabledRef.current);
    return enabledRef.current;
  }, []);
  
  const isEnabled = useCallback(() => enabledRef.current, []);
  
  return { playCorrect, playError, playComplete, playClick, toggleSound, isEnabled, soundEnabled: enabled };
}