import { useEffect, useRef } from 'react';
import './ButterflyAnimation.css';

const SILHOUETTE_SRC = '/images/butterfly-silhouette.png';

/**
 * 제공하신 실루엣 PNG를 불러와 검은 영역만 노란색으로 칠하고,
 * 흰 배경은 투명 처리한 뒤 캔버스에 그립니다. (외부 스프라이트 아님 — public 이미지 1장)
 */
const ButterflyAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const asset = {
      /** @type {HTMLCanvasElement | null} */
      tinted: null,
      w: 1,
      h: 1,
      ready: false,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cctx = c.getContext('2d');
      if (!cctx) return;
      cctx.drawImage(img, 0, 0);
      const id = cctx.getImageData(0, 0, w, h);
      const d = id.data;
      const rY = 255;
      const gY = 236;
      const bY = 77;
      for (let i = 0; i < d.length; i += 4) {
        const lum = (d[i] + d[i + 1] + d[i + 2]) / 3;
        if (lum < 140) {
          d[i] = rY;
          d[i + 1] = gY;
          d[i + 2] = bY;
          d[i + 3] = 255;
        } else {
          d[i + 3] = 0;
        }
      }
      cctx.putImageData(id, 0, 0);
      asset.tinted = c;
      asset.w = w;
      asset.h = h;
      asset.ready = true;
    };
    img.src = SILHOUETTE_SRC;

    class Butterfly {
      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        const pad = 70;
        if (scatter) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        } else {
          const fromLeft = Math.random() < 0.5;
          this.x = fromLeft ? -pad : canvas.width + pad;
          this.y = Math.random() * canvas.height;
        }

        this.size = 10 + Math.random() * 10;
        const speed = 0.5 + Math.random() * 0.75;
        if (scatter) {
          const a = Math.random() * Math.PI * 2;
          this.vx = Math.cos(a) * speed;
          this.vy = Math.sin(a) * speed;
        } else {
          this.vx = (this.x < canvas.width / 2 ? 1 : -1) * speed * (0.9 + Math.random() * 0.25);
          this.vy = (Math.random() - 0.5) * speed * 0.55;
        }

        this.flapSpeed = 0.18 + Math.random() * 0.14;
        this.flapPhase = Math.random() * Math.PI * 2;
        this.opacity = 0.65 + Math.random() * 0.3;
      }

      update(t) {
        this.vx += Math.sin(t * 0.038 + this.flapPhase) * 0.014;
        this.vy += Math.cos(t * 0.032 + this.flapPhase * 1.15) * 0.012;

        const cap = 1.4;
        const sp = Math.hypot(this.vx, this.vy);
        if (sp > cap) {
          this.vx = (this.vx / sp) * cap;
          this.vy = (this.vy / sp) * cap;
        }

        this.x += this.vx;
        this.y += this.vy;

        const pad = 80;
        if (this.x < -pad) this.x = canvas.width + pad;
        if (this.x > canvas.width + pad) this.x = -pad;
        if (this.y < -pad) this.y = canvas.height + pad;
        if (this.y > canvas.height + pad) this.y = -pad;

        this.angle = Math.atan2(this.vy, this.vx) + Math.PI / 2;
      }

      draw(t) {
        const { tinted, ready, w: iw, h: ih } = asset;
        if (!ready || !tinted) return;

        const flap = Math.abs(Math.sin(t * this.flapSpeed + this.flapPhase));
        const wingOpen = 0.55 + flap * 0.45;

        const aspect = iw / ih;
        const drawH = this.size * 2;
        const drawW = drawH * aspect;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(wingOpen, 1);
        ctx.drawImage(tinted, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      }
    }

    const count = Math.min(14, Math.max(6, Math.floor(canvas.width / 140)));
    const butterflies = Array.from({ length: count }, () => new Butterfly());

    const animate = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      butterflies.forEach((b) => {
        b.update(time);
        b.draw(time);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="butterfly-canvas" aria-hidden />;
};

export default ButterflyAnimation;
