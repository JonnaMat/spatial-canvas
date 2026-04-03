import Cookies from 'js-cookie';
import { create } from 'zustand';
import { CardData, DEFAULT_CARDS, DEFAULT_VIEWPORT, MAX_Z_INDEX } from '../data/initialCards';

const COOKIE_KEY = 'research-canvas-layout';
const COOKIE_EXPIRY = 30;

interface CanvasStore {
  cards: CardData[];
  viewport: { offsetX: number; offsetY: number };
  draggedCardId: string | null;
  maxZIndex: number;
  spaceHeld: boolean;
  loadFromCookie: () => void;
  saveToCookie: () => void;
  clearCookie: () => void;
  bringToFront: (cardId: string) => void;
  updateCardPosition: (cardId: string, x: number, y: number) => void;
  finalizeDrag: (cardId: string) => void;
  setDragging: (cardId: string | null) => void;
  setSpaceHeld: (held: boolean) => void;
  pan: (deltaX: number, deltaY: number) => void;
  reset: () => void;
}

const loadCardsFromCookie = (): CardData[] | null => {
  const saved = Cookies.get(COOKIE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  cards: DEFAULT_CARDS,
  viewport: DEFAULT_VIEWPORT,
  draggedCardId: null,
  maxZIndex: 1,
  spaceHeld: false,

  loadFromCookie: () => {
    const savedCards = loadCardsFromCookie();
    if (savedCards) {
      set({ cards: savedCards });
    }
  },

  saveToCookie: () => {
    const { cards } = get();
    Cookies.set(COOKIE_KEY, JSON.stringify(cards), { expires: COOKIE_EXPIRY });
  },

  clearCookie: () => {
    Cookies.remove(COOKIE_KEY);
  },

  bringToFront: (cardId: string) => {
    const { cards, maxZIndex, draggedCardId } = get();
    if (draggedCardId) return;

    const newMaxZ = Math.min(maxZIndex + 1, MAX_Z_INDEX);
    set({
      cards: cards.map((c) => (c.id === cardId ? { ...c, zIndex: newMaxZ } : c)),
      maxZIndex: newMaxZ,
    });
  },

  updateCardPosition: (cardId: string, x: number, y: number) => {
    const { cards, maxZIndex } = get();
    const newMaxZ = Math.min(maxZIndex + 1, MAX_Z_INDEX);
    set({
      cards: cards.map((c) =>
        c.id === cardId ? { ...c, x, y, zIndex: newMaxZ } : c
      ),
      maxZIndex: newMaxZ,
    });
  },

  finalizeDrag: (_cardId: string) => {
    get().saveToCookie();
  },

  setDragging: (cardId: string | null) => {
    set({ draggedCardId: cardId });
  },

  setSpaceHeld: (held: boolean) => {
    set({ spaceHeld: held });
  },

  pan: (deltaX: number, deltaY: number) => {
    const { viewport } = get();
    set({
      viewport: {
        offsetX: viewport.offsetX + deltaX,
        offsetY: viewport.offsetY + deltaY,
      },
    });
  },

  reset: () => {
    set({
      cards: DEFAULT_CARDS.map((c) => ({ ...c })),
      viewport: DEFAULT_VIEWPORT,
      maxZIndex: 1,
      draggedCardId: null,
    });
    get().clearCookie();
  },
}));
