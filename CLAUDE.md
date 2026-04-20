# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, http://localhost:5173)
npm run build      # type-check then build for production
npm run lint       # ESLint
npm run preview    # serve the production build locally
```

## Stack

- React 19 + TypeScript, bundled with Vite 8
- No routing library, no state management library, no test runner yet
- Entry: `src/main.tsx` → `src/App.tsx`

## Project status

Early scaffolding — `App.tsx` is empty. The project is a post-it notes app (name/intent from the repo name); no features have been implemented yet.

## Instructions

- Ignore the docs/prompts.txt file
