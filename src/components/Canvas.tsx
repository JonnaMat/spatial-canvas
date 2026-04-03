import { useRef, useEffect } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { Card } from './Card';
import { ResetButton } from './ResetButton';

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { cards, viewport, spaceHeld, loadFromCookie, pan } = useCanvasStore();
  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    loadFromCookie();
  }, [loadFromCookie]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        useCanvasStore.getState().setSpaceHeld(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        useCanvasStore.getState().setSpaceHeld(false);
        isPanning.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || spaceHeld) {
      isPanning.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning.current) {
      const deltaX = e.clientX - lastPos.current.x;
      const deltaY = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      pan(-deltaX, -deltaY);
    }
  };

  const handleCanvasMouseUp = () => {
    isPanning.current = false;
  };

  const draggedCardId = cards.find(
    (c) => c.zIndex === Math.max(...cards.map((card) => card.zIndex))
  )?.id;

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-50">
      <div
        ref={canvasRef}
        className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 ${
          spaceHeld ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        <div
          className="relative w-[1400px] h-[900px]"
          style={{
            transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px)`,
            willChange: 'transform',
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              canvasRef={canvasRef}
              isDraggingAnother={draggedCardId !== card.id && !!draggedCardId}
            />
          ))}
        </div>
      </div>

      <div className="fixed top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-xs text-gray-600">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 font-medium">
            Space
          </kbd>{' '}
          + drag to pan
        </p>
      </div>

      <ResetButton />
    </div>
  );
}
