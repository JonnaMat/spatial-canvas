import { useEffect, useRef, useCallback, useState } from 'react';
import { useCanvasStore } from '../store/canvasStore';

const DRAG_THRESHOLD = 5;

export function useCardDrag(cardId: string) {
  const [isDragging, setIsDragging] = useState(false);
  const [visualPos, setVisualPos] = useState({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const startOffset = useRef({ x: 0, y: 0 });

  const card = useCanvasStore((s) => s.cards.find((c) => c.id === cardId));
  const { updateCardPosition, finalizeDrag, setDragging, bringToFront } =
    useCanvasStore();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0 || !card) return;
      e.stopPropagation();
      e.preventDefault();

      startOffset.current = {
        x: e.clientX - card.x,
        y: e.clientY - card.y,
      };
      hasMoved.current = false;
      setVisualPos({ x: card.x, y: card.y });
      setIsDragging(true);
      setDragging(cardId);
      bringToFront(cardId);
    },
    [card, cardId, setDragging, bringToFront]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - startOffset.current.x;
      const newY = e.clientY - startOffset.current.y;
      setVisualPos({ x: newX, y: newY });

      if (
        !hasMoved.current &&
        card &&
        (Math.abs(newX - card.x) > DRAG_THRESHOLD ||
          Math.abs(newY - card.y) > DRAG_THRESHOLD)
      ) {
        hasMoved.current = true;
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        if (hasMoved.current) {
          updateCardPosition(cardId, visualPos.x, visualPos.y);
          finalizeDrag(cardId);
        }
        setIsDragging(false);
        setDragging(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, card, cardId, visualPos, setDragging, updateCardPosition, finalizeDrag]);

  const currentPos = isDragging ? visualPos : { x: card?.x ?? 0, y: card?.y ?? 0 };

  return {
    isDragging,
    hasMoved: hasMoved.current,
    handleMouseDown,
    currentPos,
  };
}
