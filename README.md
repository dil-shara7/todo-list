# Feature Branch: DevOps Setup

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

**CI workflow file:** .github/workflows/ci.yml
 Deployment Workflow
- Added a deployment workflow triggered automatically on pushes to the `main` branch
- Ensures production deployment happens only after successful integration

.github/workflows/deploy.yml
  ### Repository Configuration
- Added `.gitignore` to exclude unnecessary and sensitive files
- Added `package.json` to support CI execution and scripting
- Ensured repository structure follows assignment requirements

### Branch & Merge Management
- Followed a GitFlow-style workflow:

### feature → develop → main
- Synced the DevOps branch with the latest `develop` branch
- Managed merges safely without disrupting application development
- Resolved merge conflicts when required

  ### What Is NOT Included in This Branch
- No UI feature development
- No backend or business logic
- No styling or layout changes

This separation ensures clear responsibility boundaries and professional collaboration.

### Outcome
After merging this branch into `develop`:
- The project has automated CI validation
- Deployment is automated for production releases
- The repository follows industry-standard DevOps practices
