import { useEffect, useRef, useCallback, useState } from 'react';
import { useCanvasStore } from '../store/canvasStore';

const DRAG_THRESHOLD = 5;

export function useCardDrag(
  cardId: string,
  initialX: number,
  initialY: number,
  canvasRef: React.RefObject<HTMLDivElement | null>
) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: initialX, y: initialY });
  const startPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const { updateCardPosition, finalizeDrag, setDragging, bringToFront } =
    useCanvasStore();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      startPos.current = { x: e.clientX, y: e.clientY };
      hasMoved.current = false;
      setDragOffset({ x: offsetX, y: offsetY });
      setCurrentPos({ x: initialX, y: initialY });
      setIsDragging(true);
      setDragging(cardId);
      bringToFront(cardId);
    },
    [cardId, initialX, initialY, setDragging, bringToFront]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      if (!hasMoved.current && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
        hasMoved.current = true;
      }

      if (hasMoved.current && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - canvasRect.left - dragOffset.x;
        const newY = e.clientY - canvasRect.top - dragOffset.y;
        setCurrentPos({ x: newX, y: newY });
        updateCardPosition(cardId, newX, newY);
      }
    },
    [isDragging, cardId, dragOffset, canvasRef, updateCardPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragging(null);
      if (hasMoved.current) {
        finalizeDrag(cardId);
      }
    }
  }, [isDragging, cardId, setDragging, finalizeDrag]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setCurrentPos({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  return {
    isDragging,
    hasMoved: hasMoved.current,
    handleMouseDown,
    currentPos,
  };
}
