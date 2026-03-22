import { useEffect, useRef } from 'react';
import './PetalAnimation.css';

const PetalAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 꽃잎 클래스
    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = 1 + Math.random() * 2;
        this.amplitude = 20 + Math.random() * 30;
        this.frequency = 0.01 + Math.random() * 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.size = 3 + Math.random() * 3;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * this.frequency + this.offset) * 0.5;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // 꽃잎 모양 그리기 (위쪽 둥글고 아래쪽 뽀족한 형태)
        ctx.fillStyle = '#FADADD';
        ctx.beginPath();
        
        const width = this.size;
        const height = this.size * 1.5;
        
        // 위쪽 중앙에서 시작
        ctx.moveTo(0, -height);
        
        // 왼쪽 위 곡선
        ctx.quadraticCurveTo(-width * 1.2, -height * 0.6, -width * 0.6, height * 0.2);
        
        // 왼쪽 아래 곡선 (뽀족한 끝으로)
        ctx.quadraticCurveTo(-width * 0.6, height * 1.6, 0, height);
        
        // 오른쪽 아래 곡선 (뽀족한 끝에서)
        ctx.quadraticCurveTo(width * 0.6, height * 0.6, width * 1.2, height * 0.2);
        
        // 오른쪽 위 곡선
        ctx.quadraticCurveTo(width * 1.2, -height * 0.6, 0, -height);
        
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    // 꽃잎 객체들 생성 후 초기 y를 화면 높이에 분산 (한꺼번에 떨어지는 느낌 방지)
    const petals = Array.from({ length: 20 }, () => new Petal());
    petals.forEach((petal) => {
      petal.y = -30 + Math.random() * (canvas.height + 60);
    });

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 클린업
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" />;
};

export default PetalAnimation;

