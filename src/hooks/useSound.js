import { useCallback, useRef, useEffect, useState } from 'react';

let audioCtx = null;

function getAudioContext() {
  if (audioCtx) return audioCtx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  } catch {
    audioCtx = null;
  }
  return audioCtx;
}

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage deshabilitado */
  }
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function useSound() {
  const [enabled, setEnabled] = useState(() => safeGet('sound') !== 'off');
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const handleClick = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
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
    safeSet('sound', enabledRef.current ? 'on' : 'off');
    return enabledRef.current;
  }, []);
  
  const isEnabled = useCallback(() => enabledRef.current, []);
  
  return { playCorrect, playError, playComplete, playClick, toggleSound, isEnabled, soundEnabled: enabled };
}