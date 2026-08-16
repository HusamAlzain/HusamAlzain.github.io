import { useEffect, useRef } from "react";

const AuroraField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    let frame;
    let points = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: 28 }, (_, index) => ({
        x: (index / 27) * window.innerWidth,
        y: window.innerHeight * (0.12 + (index % 5) * 0.16),
        speed: 0.08 + (index % 4) * 0.018,
        phase: index * 1.8,
      }));
    };

    const draw = (time) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";
      points.forEach((point, index) => {
        const y = point.y + Math.sin(time * 0.0005 * point.speed + point.phase) * 18;
        const gradient = context.createRadialGradient(point.x, y, 0, point.x, y, 170);
        gradient.addColorStop(0, index % 3 === 0 ? "rgba(87, 212, 255, .14)" : "rgba(159, 112, 255, .09)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(point.x, y, 170, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas aria-hidden="true" className="aurora-field" ref={canvasRef} />;
};

export default AuroraField;
