import { useRef, useState, useEffect, useCallback } from 'react';
import { CardData } from '../data/initialCards';
import { useCardDrag } from '../hooks/useCardDrag';

interface CardProps {
  card: CardData;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  isDraggingAnother: boolean;
}

export function Card({ card, canvasRef, isDraggingAnother }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<number | null>(null);
  const { isDragging, hasMoved, handleMouseDown, currentPos } = useCardDrag(
    card.id,
    card.x,
    card.y,
    canvasRef
  );

  const handleMouseEnter = useCallback(() => {
    hoverTimeout.current = window.setTimeout(() => {
      setIsHovered(true);
    }, 150);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setIsHovered(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [hasMoved]
  );

  const shadowClass = isDragging
    ? 'shadow-2xl shadow-gray-900/50'
    : isHovered
    ? 'shadow-xl shadow-gray-900/30'
    : 'shadow-md shadow-gray-900/20';

  const scaleClass = isDragging ? 'scale-105' : isHovered ? 'scale-102' : '';

  return (
    <div
      className={`absolute w-72 bg-white rounded-lg p-4 cursor-pointer select-none
        transition-all duration-150 ease-out will-change-transform
        ${shadowClass} ${scaleClass}`}
      style={{
        left: currentPos.x,
        top: currentPos.y,
        zIndex: card.zIndex,
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={!isDraggingAnother ? handleMouseEnter : undefined}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {card.title}
        </h3>
        <span
          className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${
            card.type === 'demo'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {card.type === 'demo' ? 'Demo' : 'Article'}
        </span>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
        {card.description}
      </p>
      <div className="mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs text-blue-600 hover:text-blue-800">
          Read more →
        </span>
      </div>
    </div>
  );
}
