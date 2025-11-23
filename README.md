# Stepper Quest

Browser-based branching quest engine with persistent per-user progress.  
Built with TypeScript and IndexedDB.

## Features

**Branching flow**
Multiple selectable transitions (`BRANCH`)

**Randomized transitions**
Random choice from available links (`RANDOM`)

**Final states**
Multiple endings (`END`), full restart handling

**Back navigation**
Rollback to previous step via history (`BACK`)

**Persistent storage**
IndexedDB stores: -`steps` — schema -`state` — user progress

**User sessions**
Username prompt on first launch
Isolated state per user

**Progress tracking**
Steps passed
Attempts count
Experience accumulation
Full history trail

**UI components**
`MainContent` — title, description, user switch
`Controls` — transitions and navigation
`Info` — statistics and history

## Scripts

```bash
npm install
npm run dev
npm run build
```
