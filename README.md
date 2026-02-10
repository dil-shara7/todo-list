# DevOps Setup – Feature Branch


## Branch Objective
The purpose of this branch is to handle **all DevOps-related responsibilities** for the project.

This branch focuses on:
- CI/CD automation
- Repository structure validation
- Branch and merge management
- Release readiness

No application features (frontend UI logic or backend business logic) are developed in this branch.


## DevOps Tasks Completed

### Continuous Integration (CI)
- Implemented a CI pipeline using **GitHub Actions**
- CI runs automatically on:
  - Pushes to `develop` and `main`
  - Pull requests targeting `develop` and `main`
- CI ensures:
  - Repository can be checked out correctly
  - Required frontend files exist
  - Java source code compiles successfully
- Prevents broken code from being merged into production

**Workflow file:**

---

### CI Configuration Decisions
- Identified that the project does **not require Node.js**
- Removed unnecessary `npm` steps that caused CI failures
- Adjusted CI workflow to match the actual technology stack:
  - HTML
  - CSS
  - JavaScript
  - Java

This ensured stable and reliable automation.

---

### Branch Strategy & Merge Management
- Followed a GitFlow-style branching strategy:

  - Ensured all DevOps changes were:
- First merged into `develop`
- Then merged into `main` after validation
- Assisted in resolving merge conflicts during integration
- Prevented direct changes to `main`

---

### Repository Cleanup & Structure Validation
- Verified repository structure against assignment requirements
- Removed obsolete `backend` and `frontend` directories after confirmation
- Ensured `src` directory contains only required files
- Fixed incorrect merges that caused CI conflicts

---

## Scope Limitations
This branch intentionally does NOT include:
- UI feature development
- Backend business logic
- Styling or layout changes

This separation ensures:
- Clear responsibility boundaries
- Professional collaboration
- Easier troubleshooting and grading


## Outcome
After merging this branch into `develop` and `main`:
- CI pipeline runs successfully
- Repository structure matches assignment requirements
- Main branch remains stable and deployable
- DevOps contributions are clearly documented


