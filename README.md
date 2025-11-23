# Stepper Quest

Browserbased branching quest engine with persistent peruser progress.  
Built with TypeScript and IndexedDB.

## Features

**Branching flow**:
Multiple selectable transitions (`BRANCH`)

**Randomized transitions**:
Random choice from available links (`RANDOM`)

**Final states** :
Multiple endings (`END`), full restart handling

**Back navigation** :
Rollback to previous step via history (`BACK`)

**Persistent storage** :
IndexedDB stores: `steps` schema state` user progress

**User sessions**:
Username prompt on first launch
Isolated state per user

**Progress tracking**:
Steps passed
Attempts count
Experience accumulation
Full history trail

**UI components** :
`MainContent` title, description, user switch
`Controls` transitions and navigation
`Info` statistics and history

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Live Demo

You can access the deployed version here:

```bash
**https://antontab91.github.io/stepper-test-task/**
```

### How to use

On the first launch, the application displays a session-initialization modal dialog.  
Enter any username (for example, `123`).  
After confirmation, an isolated
