# Runtime & Azure Deployment Topology

## Cloud
The platform runs on Microsoft Azure.

## Main Application
### Azure Web App — `macc-dev`
Hosts a single container containing:
- .NET 8 API
- Angular SPA

Deployment slots are used per environment/company. The source lists examples including:
- dev-470
- qa-470
- qa-83
- qa-390
- prod slots

## AI Application
### Azure Web App — `gentue-ai`
Hosts:
- Python
- Flask
- LangChain

AI responsibilities:
- Mimir chat and agent
- Chart / insight / report AI
- RAG retrieval
- Agent tools

The AI service communicates with the main application using an internal key.

## Container Registry
### Azure Container Registry — `maccdev`
Stores deployment images such as:
- `maccone-dev`
- `maccone-beta`
- `maccone-prod`

These images are deployed to Azure Web App slots.

## Data Stores
- SQL Server — CM
- SQL Server — AM
- PostgreSQL — AI
- Azure Blob Storage

## External Services
- WorkOS SSO — login and identity
- Azure AI — OpenAI + Claude models
- Twilio / IVRNet — voice and telephony
- SignalR / Teams — notifications and alerts

## Runtime Pattern

Browser
→ HTTPS
→ Azure Web App (`macc-dev`)
→ SQL Server / AI service

AI-enabled requests:
Azure Web App
→ `gentue-ai`
→ Azure AI and/or RAG
→ live-data agent tools
→ main API

## Unknowns
Exact Azure resource configuration, networking, secrets management, scaling settings, monitoring/observability configuration, and slot-to-company mapping beyond what is shown in the source are not specified.
