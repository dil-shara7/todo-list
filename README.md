# Feature Branch: DevOps Setup

## Branch Name
feature/devop-setup


## Purpose of This Branch
This branch is dedicated exclusively to **DevOps and Release Management tasks** for the project.

No application-level features (UI components, backend logic, or styling changes) are implemented in this branch.  
Its purpose is to configure, automate, and manage the infrastructure and workflows that support the application.


## Role
**DevOps / Release Manager**

## DevOps Tasks Implemented

### Continuous Integration (CI)
- Implemented a CI pipeline using **GitHub Actions**
- CI runs automatically on:
  - Pushes to `feature/*`, `develop`, and `main`
  - Pull requests targeting `develop` and `main`
- CI validates:
  - Repository structure
  - Presence of required frontend files and folders
- Ensures code is ready before integration or release

**CI workflow file:**
