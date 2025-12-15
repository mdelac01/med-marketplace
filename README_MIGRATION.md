# Project Migration Guide

## Overview
This project has been packaged for migration. It includes all source code and the AI context (plans, tasks, walkthroughs).

## Contents
- `src/`: Source code
- `public/`: Assets and uploads
- `.gemini_context/`: Contains the AI's "Brain" for this project:
    - `task.md`: The checklist of work done.
    - `implementation_plan.md`: The technical plan.
    - `walkthrough.md`: Verification and user guide.
- `.env` (if applicable): Environment variables.

## How to Resume
1. Unzip `medical-marketplace.zip` on the new machine.
2. Ensure Node.js (v20+) is installed.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the project.

## AI History
The `.gemini_context` folder contains the history of how this project was built. You can provide these markdown files to another AI assistant to give them full context of the project's architecture and status.
