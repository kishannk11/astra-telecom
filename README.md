# MACC Gentue Platform — Golden Repository Context

## Purpose
This repository contains the canonical Markdown context for AI-assisted development of the MACC Gentue Platform.

The platform modernizes the legacy Delphi Customer Management (CM) and Account Management (AM) software into a cloud-ready, AI-enabled web application.

## Product Areas
- Customer Management (CM)
- Account Management (AM)
- AI Assistant — Mimir
- Reporting & Analytics

## Source of Truth
This documentation is derived from the supplied **MACC Gentue Platform — Functional Flow & High-Level Architecture** management document (June 2026).

## Important Rule for AI Agents
Do not invent business rules, API contracts, database schemas, permissions, workflows, or integrations that are not documented here or in the actual source code.

When implementation details are missing, explicitly mark them as **TBD / Not specified in source documentation**.

## Repository Map
- `01-product-overview.md` — product scope and capabilities
- `02-architecture.md` — high-level technical architecture
- `03-customer-management.md` — CM functional flow
- `04-account-management.md` — AM functional flow
- `05-mimir-ai.md` — Mimir architecture and behavior
- `06-technology-stack.md` — technology and delivery stack
- `07-cicd-and-environments.md` — branches, environments and release pipeline
- `08-runtime-topology.md` — Azure deployment topology
- `09-development-guidelines.md` — AI/developer implementation guardrails
- `10-glossary.md` — project terminology

## Key Principle
The platform is a unified web workspace for customer and account operations, with AI assistance available across supported workflows.
