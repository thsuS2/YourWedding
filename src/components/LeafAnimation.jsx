import { useEffect, useRef } from 'react';
import './LeafAnimation.css';

const LEAF_COLORS = ['#6D9B4B', '#5D8A3A', '#7CB342', '#8FA851', '#4A7C37', '#9CCC65'];

/**
 * 인트로용 낙엽 떨어짐 — PetalAnimation·ButterflyAnimation 등과 함께 쓰기
 */
const LeafAnimation = () => {
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

    class Leaf {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -25;
        this.speed = 0.9 + Math.random() * 1.6;
        this.swayAmp = 18 + Math.random() * 28;
        this.swayFreq = 0.008 + Math.random() * 0.018;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.045;
        this.size = 3.5 + Math.random() * 4.5;
        this.opacity = 0.32 + Math.random() * 0.38;
        this.offset = Math.random() * Math.PI * 2;
        this.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * this.swayFreq + this.offset) * 0.55;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 25) {
          this.reset();
        }
      }

      draw() {
        const w = this.size;
        const h = this.size * 1.75;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.bezierCurveTo(w * 1.15, -h * 0.35, w * 0.95, h * 0.35, 0, h * 0.95);
        ctx.bezierCurveTo(-w * 0.95, h * 0.35, -w * 1.15, -h * 0.35, 0, -h);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(60, 80, 40, 0.35)';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(0, -h * 0.85);
        ctx.lineTo(0, h * 0.75);
        ctx.stroke();

        ctx.restore();
      }
    }

    const count = 7;
    const leaves = Array.from({ length: count }, () => new Leaf());
    leaves.forEach((leaf) => {
      leaf.y = -40 + Math.random() * (canvas.height + 80);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach((leaf) => {
        leaf.update();
        leaf.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="leaf-canvas" aria-hidden />;
};

export default LeafAnimation;
