import { useEffect, useRef } from 'react';
import './SnowParticleAnimation.css';

/**
 * 하얀 눈송이 — 원형 + 방사형 그라데이션(가장자리로 갈수록 투명·부드럽게)
 * IntroSection 등에서 PetalAnimation 대신 import 하여 교체 가능
 */
const SnowParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Snowflake {
      constructor() {
        this.reset(true);
      }

      /** @param {boolean} scatter 초기 화면 분산 */
      reset(scatter = false) {
        this.x = Math.random() * canvas.width;
        this.y = scatter ? -20 + Math.random() * (canvas.height + 40) : -20;
        this.radius = 1.5 + Math.random() * 4;
        this.speedY = 0.4 + Math.random() * 1.2;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.wobbleFreq = 0.008 + Math.random() * 0.012;
        this.wobbleAmp = 15 + Math.random() * 25;
        this.wobblePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * this.wobbleFreq + this.wobblePhase) * 0.25;

        if (this.y > canvas.height + this.radius * 2) {
          this.reset(false);
        }
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
      }

      draw() {
        const { x, y, radius } = this;
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        g.addColorStop(0.45, 'rgba(255, 255, 255, 0.45)');
        g.addColorStop(0.85, 'rgba(255, 255, 255, 0.08)');
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000) + 25);
    const flakes = Array.from({ length: count }, () => new Snowflake());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        f.update();
        f.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-particle-canvas" aria-hidden />;
};

export default SnowParticleAnimation;
