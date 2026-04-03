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
    <div className="w-screen h-screen overflow-hidden bg-dracula-bg">
      <div
        ref={canvasRef}
        className={`absolute inset-0 bg-dracula-bg-dark canvas-grid ${
          spaceHeld ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
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

      <div className="fixed top-4 left-4 bg-dracula-bg-light/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-dracula-comment/30">
        <p className="text-xs text-dracula-foreground/80">
          <kbd className="kbd-key">Space</kbd> + drag to pan
        </p>
      </div>

      <ResetButton />
    </div>
  );
}
