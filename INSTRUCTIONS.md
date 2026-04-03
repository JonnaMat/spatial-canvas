Spatial Research Canvas – Developer Specification
Purpose
The canvas is a personal research workspace for exploring AI research content. Users interact with draggable, overlapping cards representing articles, deep dives, or demos. The layout is author-defined by default, but users can rearrange cards temporarily.

---
1. Canvas Specifications
Canvas Behavior
Bounded space, larger than viewport
Pannable by:
Dragging background
Holding Spacebar + drag anywhere

No zoom
Initial viewport defined by author layout
Reset button restores:
Default card positions
Default z-index
Viewport position


Technical Notes
Represent viewport offset as {x, y}
Transform canvas via transform: translate(x, y) for performance


---
2. Card Specifications
Card Types
All cards behave the same initially
Types (for potential styling/future extensions):
Deep dive article
Interactive demo

Content:
Title
Short description
Badge for type
Clickable link to full page


Card States
State	Description
Collapsed	Default preview with minimal infoExpanded	Optional inline preview (not required now)Full page	Opens full content page (triggered by click)


---
Card Interaction Rules
Hover
Delay: 150ms
Bring card to top z-index
Add visual emphasis:
Slight scale (scale(1.02))
Shadow increase

No other changes to layout or size

Click
Navigates to full page
No other state change

Drag
Drag only from inside the card
On mousedown → lock into drag mode
Card follows cursor while dragging
Card stays on top z-index while dragging
Drag threshold: if mouse moves >5px → treat as drag; else → treat as click

Z-Index Rules
Last interacted card (hover or drag) always on top
Dragged card has strongest shadow
Hovered card (not dragged) has medium shadow
Base cards have low shadow


---
3. Overlap & Visual Hierarchy
Cards can overlap freely
Visual cues:
Shadow depth corresponds to z-index
Hover → subtle scale + stronger shadow
Drag → pronounced shadow

Ensure click, drag, hover interactions respect z-index rules


---
4. Canvas Navigation
Pan:
Background drag
Space + drag anywhere

Reset:
Button restores default layout and viewport

Optional mini-map: for future release, helps users orient


---
5. State Management
Initial State
Defined in JSON:

{  "cards": [    { "id": "c1", "x": 100, "y": 200, "zIndex": 1, "state": "collapsed" },    { "id": "c2", "x": 400, "y": 100, "zIndex": 1, "state": "collapsed" }  ],  "viewport": { "offsetX": 0, "offsetY": 0 }}
User Layout
Stored in cookies
Overrides:
Position
zIndex

Temporary, no authentication required

Viewport
Stored in session memory
Updates with pan actions


---
6. Device Strategy
Desktop-first
Mobile:
Smaller cards with less info
Draggable canvas optional (consider mobile as “viewer mode”)
Tap = click (navigate)

Visual emphasis via shadow and subtle scale retained


---
7. Interaction Summary Table
Interaction	Target	Action	Notes
Hover	Card	Bring to front, shadow + scale	150ms delayClick	Card	Navigate to full page	Ignore small drag (<5px)MouseDown	Card	Enter drag mode	Locks cardDrag	Card	Move card	Top z-index, shadow strongDrag	Background	Pan canvas	Only when background or Space heldReset	Button	Restore default layout & viewport	All z-index & positions reset


---
8. Design / Visual Choices
Card style:
Clean, readable
Slight shadow
Rounded corners optional

Visual hierarchy:
Shadow depth = interaction depth
Hover scale = 1.02
Drag scale = 1.05 (optional)

Canvas background: neutral, uncluttered
Clusters defined by author for logical grouping
Max ~10 cards initially


---
9. Implementation Notes
Frontend Stack Recommendation
React
State management: Zustand or Redux
Rendering:
Cards absolutely positioned inside canvas
Canvas translated via transform: translate(x, y)

Performance:
Use CSS transforms for drag/pan (no top/left)
Minimize re-renders (drag only updates position)


Event Handling
Mouse events:
mousedown → drag
mousemove → update position
mouseup → drop

Keyboard:
Space → enables background drag



---
10. Future Extensions (Optional)
Card resizing
Mini-map
Expanded inline previews
Connections between cards (like Obsidian graph view)
User layout persistence via auth

    