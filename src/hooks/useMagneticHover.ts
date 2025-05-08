import { useRef, useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

function useMagneticHover(strength: number = 30) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouse = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const element = ref.current;
    
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const radius = rect.width;
    
    if (distance < radius) {
      const x = (distanceX / radius) * strength;
      const y = (distanceY / radius) * strength;
      setPosition({ x, y });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouse, handleMouseLeave]);

  return { ref, position };
}

export default useMagneticHover; 