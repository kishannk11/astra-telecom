# Implementation Requirements Checklist

**Purpose**: Provide an implementation acceptance checklist that agents can execute one item at a time.  
**Feature**: MACC Gentue Unified Customer and Account Platform Modernization

## Functional Acceptance Criteria

- [ ] Implement WorkOS SSO authentication as the required entry path to protected CM, AM, and Mimir functionality, with JWT-based session issuance and validation for authenticated users
- [ ] Implement controlled authentication failure handling so invalid SSO attempts, expired sessions, and invalid tokens deny access and show a user-safe error state
- [ ] Implement unified workspace search for authorized Service Agents using supported identifier formats, including validation that blocks empty or unsupported input before downstream queries
- [ ] Implement search behavior that returns a direct open for a single authorized match, supports selectable results when multiple matches exist, and shows a distinct no-results state when no match exists
- [ ] Implement unified customer workspace rendering with customer and account summary information loaded from CM/AM-backed services without requiring legacy desktop screens
- [ ] Implement display of customer addresses, notes, and alerts in the unified workspace for authorized users, with active alerts visually distinct from general notes
- [ ] Implement customer-to-account and account-to-customer navigation within the same authenticated web session, preserving originating context and blocking invalid or unlinked customerId/accountId transitions with a non-technical error
- [ ] Implement shared servicing navigation for customer, account, service order, trouble ticket, billing inquiry, payment, notes, and alerts using one consistent navigation pattern
- [ ] Implement context propagation so supported navigation targets receive and display the same active customerId/accountId, and repeated navigation does not create duplicate workspace sessions or lose in-progress context
- [ ] Implement account workspace views for premises and assigned services for authorized Account Management Specialists, including validation of required inputs and preservation of migrated historical account context
- [ ] Implement account workspace views for equipment and network information tied only to the selected account, with authorization enforced before data is returned
- [ ] Implement bundles and service-order inventory views for authorized Internal Users using the modernized API layer only, without launching or depending on legacy desktop screens
- [ ] Implement account-context preservation when switching between equipment, network, bundles, and service-order inventory views, including retention of the selected account on retrieval failure
- [ ] Implement unified visibility for authorized Internal Users across customer, account, premises, equipment, assigned services, bundles, and related infrastructure data within one platform experience
- [ ] Implement Mimir question submission for Service Agents only when an active customerId or accountId context exists, rejecting empty prompts, over-limit prompts, and missing-context requests with clear validation messages
- [ ] Implement governed Mimir answer generation using only customer/account data the requesting user is authorized to access for the active context, excluding unauthorized records from retrieval and answer generation
- [ ] Implement Mimir handled no-answer behavior when confidence or governed supporting data is insufficient, without fabricating unsupported content
- [ ] Implement Mimir conversational assistance in the servicing workspace with distinct submitting, success, and failure states, preserving the entered prompt on failure
- [ ] Implement Mimir note and trouble-ticket summarization for authorized customer/account context only, including source traceability and exclusion of records the requesting user is not authorized to view
- [ ] Implement Mimir chart and insight generation for authorized Internal Users only against approved business datasets, with validation of dataset identifier, supported chart type, and bounded analysis parameters before invocation
- [ ] Implement chart generation results that show both the rendered chart and textual insight output with clear originating data context, plus controlled failure states for invalid parameters, unsupported sources, and processing failures
- [ ] Implement immutable audit capture for supported create, update, and delete customer/account actions, AI-assisted actions, data-access review events, deployment promotion/rollback actions, and applicable validation-rejected attempts described by the source stories
- [ ] Implement compliance-only audit retrieval with filtering by date range, actor, entity type, and action type, while blocking modification or deletion of audit records by non-compliance roles
- [ ] Implement automated CI/CD support for build, test, and deployment stages, with controlled approval gates before production promotion and release/deployment history retained for traceability
- [ ] Implement controlled release promotion that only allows approved release versions to move to the next valid environment in sequence, storing releaseVersion, sourceEnvironment, targetEnvironment, initiatedBy, and changeTicketId
- [ ] Implement rollback readiness and rollback execution per environment, including lastStableReleaseVersion visibility, required rollbackReason, deploymentState transitions, and audit history for initiation and outcome
- [ ] Do not implement unsupported capabilities called out as out of scope, including editing equipment/network/bundles/service-order inventory through these views, bulk exports, legacy desktop launch dependencies, cross-account AI prompts, arbitrary user-uploaded Mimir datasets, or autonomous AI actions that update records

## UI Acceptance Criteria

- [ ] Provide a single web workspace experience for service agents and internal users that consolidates customer and account data access without requiring legacy desktop navigation
- [ ] Implement required loading, success, empty, validation, unauthorized, no-results, and error states across workspace search, customer/account views, account infrastructure panels, Mimir panels, and chart generation flows
- [ ] Ensure empty-result states are explicit and user-friendly for equipment, network, bundles, service-order inventory, and search results instead of blank areas or generic errors
- [ ] Ensure failed retrievals preserve the active customer/account workspace context and do not remove the user from the current page
- [ ] Display active customer/account context indicators consistently across linked customer/account navigation and shared servicing screens
- [ ] Distinguish active alerts from general notes in the unified workspace so time-sensitive issues are visible during servicing
- [ ] Prevent duplicate workspace instances or duplicate-session behavior when users repeatedly navigate among supported servicing screens
- [ ] Present Mimir interaction states clearly, including blocked submission for invalid input, in-progress submission, answer/success, no-answer, and controlled failure
- [ ] Display Mimir answers, summaries, charts, and insight outputs with traceable source/business-data context where required by the source stories
- [ ] Use controlled, non-technical, user-safe error messaging that does not expose stack traces, raw provider errors, internal model details, or restricted record existence
- [ ] Follow existing product UI conventions and the applicable Golden Repo/local design-system patterns for workspace navigation, panel layout, and state handling
- [ ] Implement accessibility and responsive behavior expectations from the Golden Repo and local project conventions where they apply to the modern web workspace

## API and Integration Acceptance Criteria

- [ ] Implement monolith-aligned internal module boundaries for authentication, workspace/search, customer/account domain access, Mimir orchestration, audit, and release-management capabilities
- [ ] Integrate with WorkOS SSO for authentication and issue/validate JWT-based sessions for downstream protected APIs
- [ ] Implement API/service operations that require authenticated sessions and role-based authorization before returning customer, account, infrastructure, or AI-assisted data
- [ ] Validate required identifiers such as customerId, accountId, datasetId, releaseVersion, targetEnvironment, and related request fields before downstream processing, rejecting malformed or missing values deterministically
- [ ] Ensure search and workspace APIs aggregate customer/account summary data from existing CM and AM-backed services or modernized platform services rather than duplicating records
- [ ] Ensure bundles, service-order inventory, equipment, and network data are retrieved through the modernized API/data layer and not through legacy desktop interaction paths
- [ ] Ensure Mimir request payloads include only approved context identifiers and governed grounding fields needed for the requested capability
- [ ] Implement authorization-aware Mimir retrieval/orchestration so unauthorized customer/account records and non-approved datasets are excluded before answer, summary, or chart generation
- [ ] Implement timeout handling and controlled downstream failure handling for Mimir and data-retrieval integrations so callers receive safe responses within configured interaction limits
- [ ] Emit and propagate correlation/request identifiers across search, navigation-linked fetches, Mimir interactions, audit writes, and deployment actions for traceability
- [ ] Preserve existing external and internal contracts unless a breaking change is explicitly required by the source context; no source-supported breaking contract requirement is present
- [ ] Do not implement unspecified external integrations or provider behavior beyond WorkOS SSO and the governed Mimir/platform data integrations described in the source context

## Business Logic and Data Acceptance Criteria

- [ ] Enforce role-based access for Service Agent, Internal User, Account Management Specialist, Compliance Administrator/Officer, System Administrator, and Release Manager capabilities according to the behaviors described in the source stories
- [ ] Enforce that unauthorized users cannot view customer/account summaries, premises, assigned services, equipment, network, bundles, service-order inventory, or Mimir-grounded data outside their permitted scope
- [ ] Preserve customer/account context across search result opening, linked navigation, view switching, retrieval errors, and servicing workflow transitions
- [ ] Ensure equipment, network, bundles, and service-order inventory retrieval always returns records only for the selected account and prevents cross-account data leakage
- [ ] Preserve historical account context when displaying migrated premises and service assignment records
- [ ] Reject empty searches, unsupported identifier formats, missing context-dependent navigation values, malformed account/customer identifiers, empty prompts, over-length prompts, invalid chart parameters, unsupported data sources, non-approved release promotions, skipped environment sequences, and rollback requests missing rollbackReason
- [ ] Persist immutable audit records with the required fields where source-supported, including actor identity, role, action/outcome, entity/context references, timestamp, request/correlation identifier, and change summary or governance metadata as applicable
- [ ] Store failure audit events for rejected or validation-failed audited transactions where required, without persisting invalid business-data changes
- [ ] Use a dedicated append-only or immutable audit persistence approach separate from mutable customer/account operational data, with retrieval filters and indexed query support where source-supported
- [ ] Ensure audit creation adds no more than one audit record per discrete action where explicitly required
- [ ] Handle audit-write failures according to action criticality: log telemetry always, and return a non-success response when audit persistence is required for the action to complete
- [ ] Maintain deployment state transitions for promotion and rollback actions, including in_progress and terminal outcomes, with stable-version tracking per environment
- [ ] Do not implement legal retention duration, purge policy details, or compliance-reporting behavior beyond what is explicitly stated; retention specifics are not fully defined and must not be assumed beyond supporting retention/compliance retrieval behavior already source-supported

## Non-Functional Acceptance Criteria

- [ ] Meet the source-supported response expectations for standard workspace search and summary loading within 2 seconds for common single-record lookups under expected load
- [ ] Meet interactive SLA expectations for Mimir question answering, summarization, and chart generation using bounded retrieval, timeout handling, and user-safe failures
- [ ] Avoid unnecessary duplicate fetches when reusing the same account/customer context during one session or when toggling between related account views where safe
- [ ] Ensure security controls cover authenticated session checks, JWT validation, input validation/sanitization, authorization enforcement, and restricted-data redaction/exclusion for AI-assisted flows
- [ ] Ensure observability includes structured logging/metrics for correlationId or requestId, user/context identifiers as permitted, response status, latency, audit-write outcomes, authorization denials, navigation failures, and deployment events
- [ ] Ensure reliability behavior preserves user context during recoverable failures and prevents partial success that would expose protected data or leave deployment/audit state inconsistent
- [ ] Follow Golden Repo architecture guidance as applicable to a cloud-ready monolith, including module separation by business capability and avoiding unnecessary distributed-service assumptions
- [ ] Cover highest-risk behavior with tests or verification steps, especially authorization boundaries, context preservation, audit immutability, Mimir governed data filtering, authentication/session handling, and promotion/rollback validations

## Traceability

- [ ] Every implemented change maps back to the feature’s user-story acceptance criteria and described happy-path, alternate, and failure behaviors
- [ ] Every implemented search, workspace, infrastructure, Mimir, audit, authentication, and release-management behavior can be traced to a source-supported story in this feature
- [ ] Every non-blocking Open Question that was implemented has a recorded decision + one-line rationale in specs/<slug>/assumptions.md (no Open Question is silently assumed)
- [ ] No BLOCKING Open Question was implemented as an assumption; specifically, any unresolved details such as exact supported identifier types beyond the examples given, exact Mimir confidence thresholds, exact approved dataset catalog, exact interaction timeout values, exact role-to-entitlement mappings, exact audit retention durations, and exact environment promotion sequence names must not be silently assumed if required to complete implementation

## Notes

- Never resolve an Open Question silently. In an unattended run, record the chosen assumption + rationale in specs/<slug>/assumptions.md; blocking questions must instead hold the feature at needs-clarification.
- Mark an item complete only after verifying actual implementation code and behavior.