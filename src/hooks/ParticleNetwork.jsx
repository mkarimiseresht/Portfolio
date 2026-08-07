import React, { useRef, useEffect } from "react";

// --- Tunable settings ---
const POINT_COUNT = 220;
const MIN_SPEED = 0.15; // points never fully stop
const MAX_SPEED = 1.2; // top speed while fleeing the cursor
const CONNECT_DISTANCE = 120; // px distance under which a line is drawn
const POINT_RADIUS = 2;
const POINT_COLOR = "rgba(220, 230, 255, 0.9)";
const LINE_COLOR = "180, 200, 255"; // rgb triplet, alpha added dynamically

// Mouse interaction settings
const MOUSE_REPEL_RADIUS = 130; // how close before a point starts running away
const MOUSE_REPEL_STRENGTH = 0.35; // how hard the push is
const WANDER_JITTER = 0.04; // small random nudges so idle motion feels alive
const FRICTION = 0.96; // velocity decay per frame (keeps speed in check)

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animationRef = useRef(null);
  // null when the cursor isn't over the canvas (mouse left / no touch)
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initPoints = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }));
    };

    resize();
    initPoints();

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize);

    const getRelativePos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleMouseMove = (e) => {
      mouseRef.current = getRelativePos(e.clientX, e.clientY);
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = getRelativePos(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      }
    };
    const handleTouchEnd = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const step = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const points = pointsRef.current;

      // clear (transparent, so the parent element's own background shows through)
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const mouseActive = mouse.x !== null && mouse.y !== null;

      // update velocities & positions
      for (const p of points) {
        // tiny random nudges so points keep drifting even when idle
        p.vx += (Math.random() - 0.5) * WANDER_JITTER;
        p.vy += (Math.random() - 0.5) * WANDER_JITTER;

        // steer away from the cursor when it's close
        if (mouseActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_RADIUS && dist > 0.001) {
            const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // friction keeps speed from building up forever
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // clamp to a max speed (so fleeing looks fast but controlled)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        } else if (speed < MIN_SPEED) {
          // never let a point fully stop; nudge it back up to min speed
          const angle = speed > 0.0001 ? Math.atan2(p.vy, p.vx) : Math.random() * Math.PI * 2;
          p.vx = Math.cos(angle) * MIN_SPEED;
          p.vy = Math.sin(angle) * MIN_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= w) p.vx *= -1;
        if (p.y <= 0 || p.y >= h) p.vy *= -1;

        p.x = Math.min(Math.max(p.x, 0), w);
        p.y = Math.min(Math.max(p.y, 0), h);
      }

      // draw connecting lines for nearby pairs
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const alpha = 1 - dist / CONNECT_DISTANCE;
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw points on top
      ctx.fillStyle = POINT_COLOR;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, POINT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        zIndex: -1, // sits behind the sibling content in the same parent
        pointerEvents: "auto", // keep this if you want mouse-flee to work
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}