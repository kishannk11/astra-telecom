# CI/CD, Branch Strategy & Environments

## Development-to-Production Flow

### 1. Develop
- Work on feature/fix branch
- Code in monorepo
- Push to GitHub
- Open Pull Request

### 2. CI Quality Gates
On Pull Request:
- Unit tests for changed specs
- E2E Playwright suite
- Copilot code review
- Indexes regenerated

### 3. Integrate
Merge to development:
- Auto-deploy to Dev
- Auto-deploy to Beta
- AI service deployed

### 4. Release → QA
- Build production-staging image
- Build API + frontend
- Docker → Azure Container Registry
- Deploy to QA slots
- Teams notification

### 5. Production
- Date-gated release
- Promote staged image
- Deploy to company slots
- Scheduled/manual gate
- QA sign-off

## Branch Flow

`feature/fix` → `development` → `Pre-release` → `main`

### Branch Definitions
- `feature/fix`: short-lived work branches
- `development`: integration branch
- `Pre-release`: release staging off main
- `main`: production source of truth

## Environments

| Environment | Source | Purpose | Audience |
|---|---|---|---|
| Dev | development branch | Continuous integration testing | Engineering |
| Beta | development branch | Early feature validation | Product / internal |
| QA | release container image | Validate exact production build | QA team |
| Production | approved staged image | Live service for companies | Customers |

## Release Safeguards
- Every PR must pass automated tests and review.
- QA validates the exact image that will ship.
- Production deployment is date-gated.
- Old images are automatically purged.

## Promotion Discipline
- Merge commits preserve shared history.
- `main` is synced back after every release.
- Hotfixes branch from the release tag.
- The stated goal is to keep the platform stable and releasable.
