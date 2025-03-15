'use client';

import { useEffect, useState } from '@/shared/react-imports';

interface MouseXY {
  [key: string]: number | null;
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MouseXY>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
