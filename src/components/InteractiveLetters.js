import { useEffect, useRef } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

export function InteractiveLetters({
  colors = [
    'rgba(148, 163, 184, 0.16)',
    'rgba(148, 163, 184, 0.22)',
    'rgba(148, 163, 184, 0.14)',
    'rgba(175, 243, 62, 0.75)',
    'rgba(175, 243, 62, 0.45)',
  ],
  spacing = 48,
  fontSize = 18,
  repelForce = 0.6,
  repelDistance = 6000,
  returnSpeed = 1,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const glyphsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId;
    const font = `600 ${fontSize}px Inter, sans-serif`;

    const initGlyphs = () => {
      const glyphs = [];
      const effectiveSpacing =
        canvas.width < 768 ? spacing * 1.5 : spacing;
      for (let x = effectiveSpacing / 2; x < canvas.width; x += effectiveSpacing) {
        for (let y = effectiveSpacing / 2; y < canvas.height; y += effectiveSpacing) {
          glyphs.push({
            char: ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            homeX: x,
            homeY: y,
            x,
            y,
          });
        }
      }
      glyphsRef.current = glyphs;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouse = mouseRef.current;
      for (const g of glyphsRef.current) {
        const disX = g.x - mouse.x;
        const disY = g.y - mouse.y;
        const ds = disX * disX + disY * disY;

        if (ds < repelDistance && ds > 0.01) {
          const angle = Math.atan2(disY, disX);
          const push = (repelDistance / ds) * repelForce;
          g.x += Math.cos(angle) * push;
          g.y += Math.sin(angle) * push;
        } else {
          g.x += (g.homeX - g.x) * 0.02 * returnSpeed;
          g.y += (g.homeY - g.y) * 0.02 * returnSpeed;
        }

        if (g.x < -50 || g.x > canvas.width + 50) g.x = g.homeX;
        if (g.y < -50 || g.y > canvas.height + 50) g.y = g.homeY;

        ctx.fillStyle = g.color;
        ctx.fillText(g.char, g.x, g.y);
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    const handleMouseMove = (event) => {
      if (event instanceof MouseEvent) {
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        mouseRef.current.x = event.touches[0].clientX;
        mouseRef.current.y = event.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGlyphs();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGlyphs();
    rafId = requestAnimationFrame(drawFrame);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, spacing, fontSize, repelForce, repelDistance, returnSpeed]);

  const defaultStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none',
    ...style,
  };

  return <canvas ref={canvasRef} className={className} style={defaultStyle} aria-hidden="true" />;
}