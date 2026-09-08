# Mimir — AI Assistant

## Purpose
Mimir is the AI assistance layer of MACC Gentue.

It converts natural-language requests into grounded answers, charts, insights, report drafts, or summaries.

## Request Flow

1. User submits a question, chart, insight or report request in plain language.
2. .NET API forwards the request to the Python AI service using an internal API key and user context.
3. LangChain uses an Azure model (OpenAI / Claude) to select the appropriate approach and tools.
4. The AI service grounds the request using RAG retrieval and/or agent tools.
5. A structured result is returned and rendered by the UI.

## Capabilities

### Mimir Chat
Conversational Q&A with memory.

### Mimir Agent
Tool-backed live data lookups.

### AI Charts
Charts generated from natural-language requests.

### AI Insights
Trends and explanations based on data.

### Report Builder AI
Drafting and editing report configurations.

### Summaries
Condensing notes and trouble tickets.

## Data Grounding
The documented AI data path includes:
- PostgreSQL for RAG retrieval
- Agent tools that call back into the .NET API for live data

## AI Models
The source identifies:
- Azure OpenAI
- Anthropic / Claude through Azure AI

## Safety & Governance
Documented controls include:
- Internal-key authentication
- SQL validation on AI-generated queries
- Per-company agent enablement
- Request logging
- Token logging
- Tool-call logging
- Full traceability

## AI Development Rules
AI-generated behavior must remain grounded in available application data and documented tools.

Never assume that an AI response may directly access databases unless the existing implementation explicitly provides that capability.
