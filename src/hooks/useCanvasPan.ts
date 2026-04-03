import { useEffect, useRef, useCallback } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export function useCanvasPan(canvasRef: React.RefObject<HTMLDivElement | null>) {
  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const { spaceHeld, pan, setSpaceHeld } = useCanvasStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setSpaceHeld(true);
      }
    },
    [setSpaceHeld]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setSpaceHeld(false);
        isPanning.current = false;
      }
    },
    [setSpaceHeld]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (spaceHeld || e.target === canvasRef.current) {
        isPanning.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      }
    },
    [spaceHeld, canvasRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPanning.current) {
        const deltaX = e.clientX - lastPos.current.x;
        const deltaY = e.clientY - lastPos.current.y;
        lastPos.current = { x: e.clientX, y: e.clientY };
        pan(-deltaX, -deltaY);
      }
    },
    [pan]
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleKeyDown, handleKeyUp, handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown);
      return () => canvas.removeEventListener('mousedown', handleMouseDown);
    }
  }, [canvasRef, handleMouseDown]);

  return { isPanning: isPanning.current || spaceHeld };
}
