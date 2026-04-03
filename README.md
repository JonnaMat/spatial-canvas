# Spatial Research Canvas

A draggable, pannable canvas for organizing research content as overlapping cards. Perfect for personal knowledge management, research tracking, or creating interactive bibliographies.

![Preview](https://via.placeholder.com/800x400?text=Spatial+Research+Canvas+Preview)

## Features

- **Draggable Cards** - Grab and move cards anywhere on the canvas
- **Pan Navigation** - Drag the canvas background to explore
- **Z-Index Management** - Hover for 150ms to bring cards to front
- **Persistent Layout** - Your arrangement is saved automatically
- **Dark Theme** - Dracula-inspired color palette

## Quick Start

### Use as Template

1. Click **"Use this template"** on GitHub
2. Clone your new repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run locally:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

The `dist/` folder can be deployed directly to GitHub Pages or any static host.

### Customization

**Add your own cards** in `src/data/initialCards.ts`:

```typescript
{
  id: 'c1',
  x: 100,
  y: 200,
  zIndex: 1,
  title: 'Your Article Title',
  description: 'Brief description of the content.',
  type: 'article', // or 'demo'
  link: 'https://your-link.com',
}
```

**Modify styling** in `tailwind.config.js` and `src/index.css`.

## Tech Stack

- React 18
- Zustand (state management)
- Tailwind CSS
- Vite
- TypeScript

## License

This template is available under **CC BY 4.0**.

You are free to:
- **Use** for personal or commercial projects
- **Modify** to suit your needs
- **Share** with others

You must:
- **Credit** Jonna Matthiesen as the original author

See [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) for details.

---

Built with care by [Jonna Matthiesen](https://www.linkedin.com/in/jonna-matthiesen-920243221/)
