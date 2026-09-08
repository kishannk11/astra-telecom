# Development Guidelines for AI Coding Agents

## 1. Preserve the Existing Architecture
When implementing features, prefer the documented architecture:
- Angular frontend
- .NET 8 API
- Dapper data providers
- SQL Server CM/AM databases
- Python/Flask/LangChain AI service
- PostgreSQL for AI/RAG
- Azure deployment

Do not introduce a replacement framework or database without an explicit requirement.

## 2. Respect Layer Boundaries
Frontend responsibilities:
- UI
- Forms
- Grids
- Charts
- User interaction
- Calling shared API services

API responsibilities:
- Authentication/authorization
- Request validation
- Business/application orchestration
- Data access through documented providers
- Integration with AI service

AI service responsibilities:
- Natural-language processing
- LangChain orchestration
- RAG
- AI tools
- Structured AI results

## 3. Authentication & Security
The documented request path uses:
- WorkOS SSO
- JWT on REST calls
- Internal API key between .NET and AI service

Do not bypass authorization or create unauthenticated production endpoints unless explicitly required.

## 4. Data Access
The source documents Dapper as the API data-provider technology.

Do not invent table names or schemas. Inspect the actual database access layer before implementing queries.

## 5. AI Features
AI functionality should be grounded in:
- RAG retrieval where applicable
- Explicit agent tools
- Live API data where supported

Do not assume direct unrestricted database access for Mimir.

## 6. Validation & Audit
The platform documents:
- Required-field middleware
- Authorization middleware
- SQL validation for AI-generated queries
- `ChangeBy` audit context
- Request/token/tool-call logging for AI

Preserve these controls when extending functionality.

## 7. API Compatibility
The platform uses REST APIs and API versioning through headers.

When changing an existing API:
- Check existing consumers.
- Preserve response contracts unless a breaking change is explicitly approved.
- Follow the existing versioning convention in source code.

## 8. Testing
The documented CI gates include:
- Unit tests
- Playwright E2E tests
- Code review

New functionality should include appropriate automated coverage consistent with the existing project.

## 9. Deployment
Do not treat a successful local build as equivalent to a production release.

The documented release path is:
feature/fix → development → pre-release → main → QA validation → production promotion.

## 10. Handling Missing Information
If a requirement cannot be implemented from the available source:
1. Inspect the existing codebase.
2. Look for an existing analogous implementation.
3. Do not invent business behavior.
4. Mark unresolved requirements as TBD.
5. Ask for clarification when the ambiguity affects correctness or data integrity.
