import { useEffect } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export function ResetButton() {
  const { reset, spaceHeld } = useCanvasStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reset]);

  return (
    <button
      onClick={reset}
      className="fixed bottom-6 right-6 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg
        hover:bg-gray-700 transition-colors shadow-lg z-[9999]
        disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={spaceHeld}
      title="Reset layout (Esc)"
    >
      Reset Layout
    </button>
  );
}
