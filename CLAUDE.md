# CLAUDE.md

## Summary

This is a Post-it note app. It simulates a "wall" on which post-it notes are stuck.

## Commands

```bash
npm run dev        # start dev server (Vite, http://localhost:5173)
npm run build      # type-check then build for production
npm run lint       # ESLint
npm run preview    # serve the production build locally
```

## Stack

- React 19 + TypeScript 6, bundled with Vite 8
- react-icons v5 for icons (`react-icons/md` for Material icons)
- `useLocalStorage` generic hook at `src/hooks/useLocalStorage.ts`
- No routing library, no state management library, no test runner yet
- Entry: `src/main.tsx` → `src/App.tsx`

## Project status

Core note wall implemented. Features:
- Header with title and round "+" add button
- Yellow 300×300px sticky notes with folded top-left corner
- Inline click-to-edit with multi-line text, blur-to-save, Escape-to-cancel
- Notes persisted in `localStorage` under key `"post-it-notes"`
- All base styles live in `App.css`

## Architecture

```
src/
  types.ts                        # Note interface (id, text, x, y, createdAt)
  hooks/useLocalStorage.ts        # Generic localStorage<T> hook
  components/Header/              # Header.tsx + Header.css
  components/Note/                # Note.tsx + Note.css
  App.tsx                         # Root state, wall layout, add/update handlers
  App.css                         # Base resets, #root flex layout, .wall styles
```

## TypeScript notes

- `erasableSyntaxOnly: true` is set — use `interface`/`type`, no `enum`
- `noUnusedLocals` and `noUnusedParameters` are enabled

## Instructions

- Ignore the docs/prompts.txt file
