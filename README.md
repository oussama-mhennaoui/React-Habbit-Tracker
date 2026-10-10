# Habit Tracker

A small, responsive habit tracker built with React, TypeScript, Vite, and Tailwind CSS. Add habits, mark them complete for individual days, move between weeks, and keep progress saved in the browser.

## Features

- Add habits with validation that prevents empty names.
- Mark a habit as complete for any available day.
- See completed days with vibrant emerald styling and incomplete days with muted styling.
- Browse previous and next weeks.
- Delete habits when they are no longer needed.
- See the number of completed habits for today.
- Persist habits and completion history in `localStorage`.
- Disable future dates so progress cannot be recorded ahead of time.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- date-fns

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### Verify the project

```bash
npm run lint
npm run build
```

## Usage

1. Enter a habit name in the input.
2. Select **Add Habit**.
3. Click an available day to mark the habit complete.
4. Use **Prev** and **Next** to browse weeks.
5. Use **Delete** to remove a habit.

Progress is stored in the browser's local storage, so it remains available after refreshing the page on the same device and browser.

## Project structure

```text
src/
├── App.tsx
├── index.css
└── components/
    ├── Button.tsx
    ├── HabbitForm.tsx
    ├── HabbitList.tsx
    └── Header.tsx
```

## Future improvements

- Add habit editing.
- Add streak and weekly completion statistics.
- Add categories, reminders, and dark/light theme options.
- Add tests for habit creation, deletion, and completion tracking.
