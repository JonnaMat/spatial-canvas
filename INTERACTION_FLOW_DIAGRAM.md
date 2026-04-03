Spatial Research Canvas – Interaction Flow Diagram

---
Legend / Symbols
Card: rectangle
Arrow: action/transition
Decision diamond: yes/no check
Highlight: interaction effect (shadow/scale/z-index)

---
Flow Description (Linear)
1. Cursor moves over card
Decision: Hover duration > 150ms?
Yes → bring card to front, increase shadow, slight scale
No → nothing

2. Mouse down on card
Begin drag mode
Card locks on top z-index
Ignore hover effects during drag

3. Mouse moves while down
Threshold >5px → treat as drag → update card coordinates
Else → potential click (no movement yet)

4. Mouse up
If movement >5px → end drag → card stays at dropped position, top z-index retained
Else → click → navigate to full page

5. Mouse down and drag on background (or Space+drag)
Pan canvas
Update viewport offset

6. Reset button clicked
Restore author layout positions
Reset z-index
Reset viewport

---
Additional Interaction Rules
Hover vs Drag Conflict: Hover effects disabled during drag
Overlap: Cards can freely overlap; z-index always updates based on last interaction
Visual cues:
Hovered card: medium shadow + slight scale
Dragged card: strong shadow
Base cards: low shadow

---


