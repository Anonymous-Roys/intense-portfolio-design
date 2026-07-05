import { useEffect, useRef } from 'react';

const RainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Spawn raindrops: smaller, thinner, less visible, but more of them!
    const maxDrops = 220;
    const drops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      thickness: number;
    }> = [];

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 6 + 4, // shorter
        speed: Math.random() * 1.5 + 1.2, // slower
        opacity: Math.random() * 0.18 + 0.10, // faint/less visible
        thickness: Math.random() * 0.35 + 0.15 // thinner
      });
    }

    // Spawn particles for mouse water condensation/glow
    const mouseParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      maxLife: number;
      life: number;
    }> = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Detect dark theme dynamically to set colors
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? '197, 168, 114' : '150, 110, 50';

      // 1. Draw Rain Droplets
      drops.forEach((drop) => {
        drop.y += drop.speed;

        // Reset drop boundary checks
        if (drop.y > height) {
          drop.y = -10;
          drop.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.lineWidth = drop.thickness;
        ctx.strokeStyle = `rgba(${baseColor}, ${drop.opacity})`;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
      });

      // 2. Draw Mouse Glow & Water Droplets
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        // Draw soft radial glow
        const glowRadius = 90;
        const grad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          glowRadius
        );
        grad.addColorStop(0, `rgba(${baseColor}, 0.12)`);
        grad.addColorStop(1, `rgba(${baseColor}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Spawn tiny water droplets around mouse cursor
        if (Math.random() < 0.45) {
          mouseParticles.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 36,
            y: mouseRef.current.y + (Math.random() - 0.5) * 36,
            vx: (Math.random() - 0.5) * 0.3,
            vy: Math.random() * 0.4 + 0.1, // slowly fall/drift downwards
            radius: Math.random() * 1.8 + 0.6, // circular water bead
            opacity: Math.random() * 0.35 + 0.1,
            maxLife: Math.random() * 35 + 25,
            life: 0
          });
        }
      }

      // Update and draw mouse condensation particles
      for (let i = mouseParticles.length - 1; i >= 0; i--) {
        const p = mouseParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (1 - lifeRatio);
        const currentRadius = p.radius * (1 - lifeRatio * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${currentOpacity})`;
        ctx.fill();

        // Remove dead particles
        if (p.life >= p.maxLife) {
          mouseParticles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};

export default RainBackground;
