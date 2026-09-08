# High-Level Architecture

## Architectural Layers

The platform is organized into four cooperating areas:
1. Client
2. .NET API
3. AI Services
4. Data

## Client
- Angular 20 SPA
- Standalone Angular components
- DevExtreme 25.1 for grids, charts and forms
- Analytics dashboard
- Mimir chat UI

## API
- .NET 8 Web API
- CM controllers
- AM controllers
- Shared controllers
- Authentication / authorization
- Dapper data providers

Middleware mentioned in the source:
- Connection
- Paging
- Data shaping
- Date/time
- Required field
- Authorization

Transport/security:
- HTTPS / REST
- JWT
- WorkOS SSO
- Internal API key for communication with the AI service

## AI Services
- Python
- Flask
- LangChain
- Mimir chat and agent
- Chart / insight generation
- Report Builder AI
- RAG retrieval

## Data
- SQL Server — CM database
- SQL Server — AM database
- PostgreSQL — AI / Mimir and RAG
- Azure Blob Storage

## External Services
- WorkOS SSO
- Azure AI: OpenAI + Anthropic / Claude
- Twilio
- IVRNet
- SignalR notifications
- WebHooks

## Standard Request Flow

User action
→ Angular shared data service
→ REST API over HTTPS with JWT
→ .NET controller + middleware
→ Dapper data provider
→ CM/AM SQL Server
→ wrapped response
→ Angular renders grid/form/chart

## AI Request Flow

User request
→ .NET API
→ Python AI service
→ LangChain + Azure model
→ RAG retrieval and/or agent tools
→ structured AI result
→ UI rendering

The AI service can call back into the API for live data through agent tools.

## Cross-Cutting Concerns
- WorkOS SSO + JWT
- API versioning through header
- Response caching for reference data
- Audit through `ChangeBy` user context

## Do Not Assume
The source does not specify:
- Exact controller names
- Exact route patterns
- DTO definitions
- Database table/column structures
- Complete authentication claims
- Detailed authorization policies
- Error response schema
