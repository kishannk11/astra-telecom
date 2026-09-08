# Feature: MACC Gentue Unified Customer and Account Platform Modernization
Status: NEW
Owner: Astra
Last Updated: 2026-09-08

## Summary
MACC Gentue Unified Customer and Account Platform Modernization replaces legacy Delphi-based Customer Management (CM) and Account Management (AM) systems with a unified, cloud-ready web platform. The feature delivers a single workspace for customer and account servicing, governed AI-assisted access through Mimir, centralized authentication, auditable user and AI activity, and controlled release promotion support.

The business outcome is a modernized platform that allows authorized internal users, service agents, and specialists to complete customer lifecycle and account management work from one authenticated web experience without depending on legacy desktop screens. The expected system outcome is secure, context-preserving retrieval and presentation of governed customer, account, infrastructure, and AI-assisted information, with auditability and controlled delivery.

## Scope
### In Scope
- Unified web workspace access to customer, account, address, notes, alerts, interaction-related context, premises, assigned services, equipment, network information, bundles, and service-order inventory where supported by source stories.
- Search and open workflow for a unified customer workspace using supported identifier types.
- In-platform navigation between customer and account views and across supported servicing capabilities while preserving active customer/account context.
- Role-based access control for protected CM, AM, and Mimir functions.
- WorkOS SSO authentication and JWT-based session issuance/validation for protected platform access.
- Mimir AI-assisted capabilities for:
  - natural-language questions about customer and account data,
  - conversational assistance during servicing,
  - notes and trouble ticket summaries,
  - chart and insight generation from approved business datasets.
- Audit capture for supported customer, account, interaction, infrastructure-data access, AI-assisted actions, deployment actions, and failed validated/rejected actions where specified.
- Compliance-only retrieval of audit history with supported filters.
- Automated CI/CD pipeline support with controlled promotion gates, deployment status, release history, promotion validation, and rollback support.

### Out of Scope
- Editing equipment or network records.
- Editing bundles or service-order inventory.
- Bulk export or download of equipment or network information.
- Advanced filtering, sorting customization, or saved user preferences for equipment, network, bundles, or service-order inventory.
- Cross-account comparison of equipment or network assets.
- Launching or embedding a legacy desktop screen.
- Workflow actions that create or modify service orders.
- Cross-customer or bulk multi-account questioning in a single Mimir prompt.
- Free-form external knowledge answers not grounded in governed customer/account data.
- Agent training recommendations, automated case actions, or workflow execution from Mimir responses.
- Free-form user-uploaded spreadsheets or documents as Mimir chart data sources.
- Manual editing of generated chart JSON beyond returned result support.
- Advanced dashboard authoring, report scheduling, or personalization of saved visualizations.
- Redesign of underlying service order, payment, or trouble ticket business workflows.
- Personalized navigation layouts or user-configurable menus.
- Migration of unsupported legacy desktop features not listed in source stories.
- Long-term legal retention scheduling and purge policies beyond initial audit persistence.
- Advanced analytics dashboards or anomaly detection on audit events.
- End-user self-service export of audit history outside compliance access controls.
- Building a full CI/CD pipeline engine or authoring deployment scripts for each application component.
- Advanced approval workflow customization beyond approved release status and environment order.
- Canary, blue-green, or feature-flag deployment strategies not explicitly required by source stories.
- Advanced customization called out in stories as future work.

## Application Type & Platform Context
The feature targets a mixed platform with a primary web application plus supporting API/service capabilities.

### Source Evidence
- Feature description states a “unified, cloud-ready web platform.”
- Multiple stories require a “modern web platform,” “web application,” “single web workspace,” and “same browser session.”
- Multiple stories explicitly require “Expose API and UI,” “secure platform APIs,” and a “modernized API layer.”
- User-selected architecture style is “monolith.”

### Platform Context Contract
- The authoritative user experience is a web platform replacing legacy desktop CM and AM experiences for supported functions.
- The implementation shall support a monolith architecture style.
- The platform shall include protected APIs/services used by the web experience for data retrieval, Mimir interactions, authentication/session validation, audit persistence/retrieval, and release/deployment actions.

## Actors and Permissions
### Actors
- Service Agent
- Internal User
- Account Management Specialist
- Customer Service Manager
- System Administrator
- Compliance Administrator
- Compliance Officer
- Release Manager

### Permissions and Access Constraints
- Protected CM, AM, and Mimir functions require authenticated access through WorkOS SSO and valid JWT-based sessions.
- Service Agent access is required for:
  - unified customer workspace search/open,
  - customer addresses, notes, and alerts view,
  - Mimir question/answer assistance in customer/account workspace,
  - Mimir conversational assistance in active servicing workspace,
  - Mimir notes and trouble ticket summaries.
- Internal User access is required for:
  - customer-to-account linked navigation,
  - viewing bundles and service-order inventory,
  - Mimir chart and insight generation from approved business datasets,
  - unified visibility into customer and infrastructure-related account data where authorized.
- Account Management Specialist authorization is required for:
  - viewing premises and assigned services,
  - viewing equipment and network information for selected accounts.
- Customer Service Manager source story establishes navigation expectations across servicing capabilities; the specific permission model for those destinations is only partially stated. Capability-level authorization is explicitly required before rendering billing, payment, notes, and alerts destinations.
- Compliance-only access path is required for audit retrieval. Non-compliance operational roles cannot modify or delete returned audit records.
- Compliance reviewers must be authorized to retrieve audit history for investigations without exposing restricted business data.
- Release-management authorization is required for promotion and rollback actions.
- Unauthorized users must be blocked from viewing account infrastructure data, customer/account details, Mimir-grounded data outside authorization scope, audit records, and environment controls.

### Open Question
- The source does not define whether Compliance Administrator and Compliance Officer are distinct roles with different permissions or equivalent compliance-authorized roles.

## Feature Development Intent
This is feature-development work to build a unified modern platform that consolidates legacy CM and AM workflows into one web-based, authenticated, auditable monolith. The work must implement or change behavior in several integrated areas:

- Replace fragmented legacy lookup/navigation with a unified customer and account workspace.
- Provide secure retrieval and display of customer, account, infrastructure, and operational data in one platform.
- Preserve customer/account context across navigation, retrieval failures, and view switching.
- Add governed Mimir AI assistance grounded only in authorized business data.
- Centralize authentication with WorkOS SSO and JWT sessions.
- Capture immutable audit history across supported business, AI, and deployment actions.
- Support controlled promotion and rollback through automated delivery workflows.

The delivered outcome must be a production-ready, cloud-ready web platform experience for supported roles that meets source acceptance criteria for authorization, validation, auditability, context preservation, and controlled error handling.

## UI Design & Interaction Contract
### Workspace and Navigation
- The platform shall provide a unified customer and account workspace in the web application.
- The workspace shall support search, result handling, and opening a unified customer workspace for authorized Service Agents.
- The workspace shall display customer and account summary information when a matching authorized record is opened.
- The workspace shall present navigation entries for:
  - customer,
  - account,
  - service order,
  - trouble ticket,
  - billing inquiry,
  - payment,
  - notes,
  - alerts.
- The navigation pattern shall be consistent across supported servicing screens.
- Navigation between supported servicing screens shall preserve the same active customerId and accountId context.
- Repeated navigation shall not create duplicate workspace sessions or lose in-progress context.
- If required context is missing for a context-dependent destination, the UI shall block the route and display a clear recoverable message.
- Customer views with linked accounts shall display navigation actions for each related account without launching any legacy application.
- Selecting a linked account shall open the corresponding account page in the same browser session.
- Returning from account view to customer view shall restore the originating customer record context without requiring a new search.

### Search UX
- Search input shall reject empty input and unsupported identifier formats before downstream queries.
- If a standard search returns a single authorized match, the workspace shall display customer and account summary information within 2 seconds.
- If no matching customer or account exists, the UI shall show a distinct no-results state and shall not open the workspace.
- Unauthorized users shall not receive customer or account summary details through search results or direct workspace navigation.

### Customer Context Views
- The unified workspace shall display customer addresses, notes, and alerts for users with required permissions.
- Active alerts shall be highlighted distinctly from general notes.

### Account and Infrastructure Views
- For authorized users, the platform shall display premises details and assigned services for an account.
- The platform shall preserve historical account context when showing migrated premises and service assignment records.
- The equipment and network information section shall:
  - load in the account workspace for a selected account,
  - display only records associated with that account,
  - show loading, success, empty, and error states,
  - preserve selected account context when loading or when retrieval errors occur.
- If no equipment or network records exist, the UI shall show a clear empty-state message instead of a blank panel or generic error.
- Bundles and service-order inventory views shall:
  - load in the unified platform for the selected account,
  - preserve selected account context when users switch between the two views,
  - show clear empty or error states without removing the user from the current account workspace.
- The unified platform shall support one authorized experience displaying related customer, account, premises, equipment, and assigned service information.

### Mimir Interaction UX
- Mimir natural-language question submission shall be available only from customer/account workspace when a customerId or accountId context is active.
- Mimir conversational assistance shall be available only from an active customer or account servicing workspace with customer/account context present.
- The interface for Mimir requests shall display distinct submitting, success, and failure states.
- A failed Mimir conversational request shall not clear the entered prompt.
- If no workspace context is selected, prompt text is empty, prompt exceeds configured maximum length, or required inputs are missing, the UI shall block submission and display a validation message identifying the issue.
- For no-confidence outcomes, the UI shall display a non-answer state explaining that no reliable answer is available and shall not fabricate details.
- Notes and trouble ticket summaries shall identify source records used for the summary.
- Chart generation success state shall display:
  - a chart,
  - textual insight output,
  - clear identification of the originating business data context.
- Mimir-related failures shall surface controlled, user-safe error states without stack traces, raw provider errors, or internal model details.
- Long-running AI requests shall not block the web session indefinitely.

### Error and Empty-State Contract
- The platform shall provide clear empty, no-results, error, access-denied, loading, success, and failure states where required by the source stories.
- Error messages shall be non-technical where the source explicitly requires non-technical or user-safe language.
- Retrieval failures shall preserve current customer/account workspace context.

### Accessibility Expectations
- No explicit accessibility standard is stated in the source context.

### Open Questions
- The source does not define exact screen layouts, component structure, wording for messages, or visual treatment beyond distinct/clear/highlighted states.
- The source does not define whether multiple-search-match results are a grid, list, or other control.
- The source does not define whether Mimir source references are inline citations, links, or another UI pattern.

## API Contract
Only source-supported API/service behaviors are specified below. No endpoint paths or HTTP methods are defined by the source.

### Authentication and Session Services
- The platform shall require WorkOS SSO authentication before granting access to protected functions.
- The platform shall issue JWT-based sessions for authenticated users.
- The platform shall validate JWT-based sessions on protected CM, AM, and Mimir requests.
- If authentication fails or session is invalid, the platform shall deny access and return a controlled error state.

### Workspace Search and Retrieval Services
- Search requests shall accept a supported identifier type/value.
- The system shall validate trimmed, non-empty, supported identifier format before querying downstream services.
- The search/retrieval layer shall aggregate customer and account summary data from existing CM and AM-backed services rather than creating duplicate records.
- Unauthorized requests shall not expose record existence or summary details.

### Customer/Account Context Retrieval
- Customer/account linked-navigation requests shall validate presence and format of customerId/accountId and confirm linkage in relationship mapping before opening destination records.
- Destination record authorization shall be applied before any linked customer/account page is rendered.
- Navigation requests for missing, malformed, unlinked, deleted, inactive, or unavailable records shall be rejected with deterministic error responses.

### Account Infrastructure Retrieval
- Premises and assigned services retrieval shall use the application database per story technical considerations.
- Equipment and network retrieval shall:
  - require valid accountId,
  - reject malformed identifiers,
  - prevent cross-account record access,
  - enforce authenticated session and role-based authorization before returning payloads,
  - return only records associated with the selected account.
- Bundle and service-order inventory retrieval shall:
  - use the modernized API layer,
  - require valid accountId,
  - reject malformed requests before retrieval,
  - avoid dependence on legacy desktop interaction.

### Mimir Services
- Workspace Q&A requests shall accept natural-language prompt text only when customerId or accountId context is active.
- Conversational assistance requests shall include current servicing context identifiers required for grounding.
- Mimir requests shall be limited to governed customer/account data or approved business datasets, depending on capability.
- Prompt validation shall reject:
  - empty prompt text,
  - over-limit prompt text,
  - missing active context identifiers,
  - requests outside authorized scope.
- Chart generation requests shall validate:
  - dataset identifier,
  - supported chart type,
  - bounded analysis parameters,
  - allowed metric/dimension fields,
  - bounded date ranges,
  - dataset entitlement checks.
- Unsupported data-source references, invalid parameters, unauthorized dataset requests, and Mimir processing failures shall return controlled error states.
- Mimir response handling shall support:
  - answer with source references,
  - no-answer/no-confidence outcome,
  - handled failure state within configured interaction timeout.

### Audit Services
- Audit write behavior shall support:
  - create/update/delete customer or account actions,
  - AI-assisted actions,
  - access attempts to equipment/network information,
  - access to customer interaction details where specified,
  - promotion initiation/outcome,
  - rollback initiation/outcome,
  - validation/rejection failures before business persistence where required.
- Audit retrieval shall support a compliance-only access path with filtering by:
  - date range,
  - actor,
  - entity type,
  - action type.
- Audit records shall be immutable; non-compliance operational roles shall not modify or delete returned records.

### Deployment and Release Services
- CI/CD must support automated build, test, and deployment stages.
- Promotion requests shall require approved releaseVersion and next allowed targetEnvironment.
- Promotion requests shall store releaseVersion, sourceEnvironment, targetEnvironment, initiatedBy, and changeTicketId.
- Promotion requests shall be rejected when:
  - approvalStatus is not approved,
  - targetEnvironment skips configured promotion sequence.
- Rollback readiness shall identify lastStableReleaseVersion for each environment.
- Rollback requests shall be allowed only when a previous stable version exists.
- Rollback requests shall require rollbackReason.
- Deployment state shall transition through in_progress to terminal outcome.
- Action requests should return acknowledgement quickly while latest status is exposed through status retrieval or polling behavior.

### Observability Metadata
Where specified in source stories, service operations shall capture:
- correlationId or requestId,
- accountId/customerId/datasetId/view type/environment/releaseVersion as applicable,
- response status,
- latency,
- audit-write outcome,
- retrieval result count or confidence/outcome code as applicable.

### Open Questions
- Endpoint names, request/response schemas, transport protocol details, and specific error-code models are not defined in the source.
- The source does not define the configured interaction timeout values, prompt maximum lengths, supported chartType values, approved dataset catalog, supported identifier formats, or environment sequence values.

## Business Logic & Rules
- Protected CM, AM, and Mimir functions require WorkOS SSO authentication and valid JWT session validation.
- Authorization must be role-based and capability-specific before any protected data is returned or view rendered.
- Search requests must be blocked without downstream query if input is empty or not in supported identifier format.
- Search no-result behavior must be distinct and must not open workspace.
- Unauthorized users must not retrieve customer/account summary details through search results or direct navigation.
- Unified workspace data must use current governed customer/account context and remain in-platform rather than relying on legacy desktop screens.
- Navigation from customer to account is allowed only when the customer-account relationship exists.
- Return navigation must restore the originating customer context.
- Missing required route context must block navigation and show recoverable messaging rather than incomplete data.
- Equipment and network retrieval must be account-scoped and must prevent cross-account record access.
- If selected account has no equipment/network records, show empty state rather than error.
- On equipment/network retrieval error, preserve selected account context.
- Bundles and service-order inventory must both correspond to the same selected account context when users switch views.
- View switching between bundles and service-order inventory must not change selected account context.
- Historical account context must be preserved when displaying migrated premises and service assignment records.
- Mimir customer/account Q&A and conversational assistance must only operate when an active customer/account context exists.
- Mimir must use only governed data that the requesting user is authorized to access for the active context.
- Unauthorized records must be excluded from retrieval and answer generation.
- If Mimir cannot produce an answer with sufficient confidence from governed data, the system must return a no-answer state and must not fabricate unsupported details.
- Notes/trouble-ticket summaries must exclude records the user is not authorized to view.
- Mimir chart generation is allowed only for approved business data sources that the requesting Internal User is permitted to access.
- Chart generation requests must validate supported chart type and bounded analysis parameters before invocation.
- Audit history must be immutable.
- If an audited transaction fails validation or is rejected before persistence, the system must record a failure audit event without storing invalid business data changes.
- Audit creation must add no more than one audit record per discrete action.
- When audit persistence is required for an action to complete and the audit write fails, request processing must return a non-success response and log error telemetry.
- Promotion is allowed only for approved releases and only to the next allowed environment in sequence.
- Promotion attempts that skip environment sequence or lack approval must be rejected without changing deploymentState.
- Rollback is allowed only when a previous stable version exists for the environment.
- Rollback requires rollbackReason.
- Deployment actions must transition deploymentState through in_progress to succeeded or failed terminal outcomes.

## Data Model & Validation
Only source-supported entities and fields are listed.

### Core Context Entities
- Customer
- Account
- Customer-account relationship mapping
- Address
- Note
- Alert
- Interaction context
- Premises
- Assigned service
- Equipment record
- Network information record
- Bundle
- Service-order inventory

### Authentication/Authorization Data
- Authenticated user identity
- User role
- JWT-based session
- WorkOS SSO authentication state

### Mimir Request/Response Data
- promptText
- customerId
- accountId
- interactionId
- source references used for answer
- response outcome
- confidence/outcome code
- dataset identifier / datasetId
- chartType
- bounded analysis parameters
- date range
- grouping dimension
- metric selection
- approved data source reference
- originating business data context

### Audit Record Data
Supported audit records shall include, where applicable:
- actorId
- actorRole
- actionType
- entityType
- entityId
- eventTimestamp
- requestId
- changed fields summary
- outcome status
- AI capability invoked
- target customer or account record
- prompt text
- source references used for the answer
- correlation identifier
- attempted action
- failure reason category
- account identifier
- access timestamp
- releaseVersion
- sourceEnvironment
- targetEnvironment
- initiatedBy
- changeTicketId
- rollbackReason
- action result

### Deployment Metadata
- releaseVersion
- sourceEnvironment
- targetEnvironment
- approvalStatus
- deploymentState
- deployedAt
- lastStableReleaseVersion
- initiatedBy
- changeTicketId

### Validation Rules
- Search input must be trimmed, non-empty, and in a supported identifier format.
- accountId/customerId must be present where required by the requested view or Mimir capability.
- accountId/customerId requests must reject malformed identifiers.
- Navigation requests must reject missing/malformed/unlinked customerId-accountId combinations.
- Mimir promptText must not be empty and must not exceed configured maximum length.
- Chart generation must validate required fields including dataset identifier, supported chart type, and bounded analysis parameters.
- Date ranges must be bounded for chart generation.
- Audit payloads must reject missing actorId, actionType, entityType, or eventTimestamp.
- eventTimestamp must be normalized to UTC.
- changed_fields_json, if used per technical considerations, must be limited to supported tracked fields.
- Rollback requests must require rollbackReason.
- Promotion requests must require approved releaseVersion and valid next targetEnvironment.
- Requests for protected functions must have valid authenticated session and role authorization.

### Retention Expectations
- Audit records must be preserved in a manner supporting retention requirements and compliance reporting needs.
- Detailed retention schedule and purge policy are not specified.

## Functional Requirements
FR-1. The platform shall provide a unified, cloud-ready web workspace replacing supported legacy CM and AM desktop access paths for in-scope functions.

FR-2. The platform shall require WorkOS SSO authentication before granting access to protected CM, AM, and Mimir functions.

FR-3. The platform shall issue and validate JWT-based sessions for authenticated users accessing protected platform capabilities.

FR-4. The platform shall deny access and present a controlled error state when authentication fails or the session is invalid.

FR-5. The platform shall allow an authenticated Service Agent to search using a supported identifier type and open the matching unified customer workspace when authorized.

FR-6. The platform shall block search submission when input is empty or not in a supported identifier format and shall not query downstream services.

FR-7. When a standard search returns a single authorized match, the platform shall display customer and account summary information within 2 seconds.

FR-8. When no matching customer or account exists for the submitted identifier, the platform shall show a distinct no-results state and shall not open the workspace.

FR-9. The platform shall prevent users without permission from retrieving customer or account summary details through search results or direct workspace navigation.

FR-10. The unified workspace shall display customer addresses, notes, and alerts for users with required permissions.

FR-11. The unified workspace shall highlight active alerts distinctly from general notes.

FR-12. The platform shall record access to customer interaction details in audit context.

FR-13. When an authenticated Internal User opens a customer record that has linked accounts, the customer view shall display a navigation action for each related account without launching any legacy application.

FR-14. Selecting a linked account from the customer view shall open the corresponding account page within the same browser session and the destination page shall reflect the selected accountId.

FR-15. When a user navigates from a customer view to an account view and then returns, the platform shall restore the originating customer record context without requiring a new search.

FR-16. If the requested customerId-accountId relationship does not exist or the linked record is unavailable, the platform shall block navigation and display a non-technical error message while retaining the current page.

FR-17. Before rendering a linked customer or account page, the platform shall apply authorization checks for the destination record and shall return access-denied behavior without exposing destination data when permissions are insufficient.

FR-18. The web workspace shall present one consistent navigation pattern for customer, account, service order, trouble ticket, billing inquiry, payment, notes, and alerts.

FR-19. When a user opens a supported navigation target from an active customer and account record, the destination shall receive and display the same customerId and accountId context.

FR-20. Repeated navigation between supported servicing screens shall not open duplicate workspace sessions or lose existing in-progress context.

FR-21. If a required context value is missing for a context-dependent destination, the platform shall block the route and display a clear recoverable message.

FR-22. Authorized users shall be able to open supported servicing screens through web navigation with routine page transitions meeting defined response-time targets.

FR-23. The platform shall display premises details and assigned services for an account in the modern web platform for authorized users.

FR-24. The platform shall preserve historical account context when showing migrated premises and service assignment records.

FR-25. The platform shall prevent unauthorized users from viewing account infrastructure data outside their role permissions.

FR-26. The platform shall validate required inputs before retrieving premises and assigned services.

FR-27. When an authorized user opens equipment and network information for a selected account, the platform shall display only the records associated with that account.

FR-28. If the selected account has no equipment or network records, the platform shall show a clear empty-state message instead of a blank panel or generic error.

FR-29. If the request for equipment/network information is made without a valid authenticated session or required account-management authorization, the platform shall block access and shall not return equipment or network data.

FR-30. The platform shall preserve selected account context when equipment and network information is loaded or when a retrieval error occurs.

FR-31. Each successful or denied access attempt to account-linked equipment and network information shall record an audit entry containing user identity, account identifier, access timestamp, and outcome.

FR-32. For an authorized Internal User and selected account, the platform shall display bundles linked to that account in the unified platform.

FR-33. For an authorized Internal User and the same selected account, the platform shall display service-order inventory linked to that account in the unified platform.

FR-34. Bundle and service-order inventory data shall be retrieved through the modernized API layer without requiring legacy desktop access.

FR-35. When the user switches between bundles and service-order inventory views, the selected account context shall remain unchanged and displayed data shall continue to correspond to that account.

FR-36. If either view has no linked records or the data request fails, the platform shall show a clear empty or error state for that view without removing the user from the current account workspace.

FR-37. The platform shall provide unified visibility into related customer, account, premises, equipment, and assigned service information within one authorized platform experience.

FR-38. The platform shall link operational records to the correct customer and account context so inquiry handling uses current governed data.

FR-39. The platform shall record access to customer and infrastructure-related account data in audit history.

FR-40. An authenticated Service Agent shall be able to submit a natural-language Mimir question from the customer/account workspace only when a customerId or accountId context is active.

FR-41. If no active customerId or accountId context is selected for a Mimir question request, the platform shall reject the request with a clear error.

FR-42. Mimir responses shall be generated only from governed customer and account data that the requesting agent is authorized to access for the active context.

FR-43. Unauthorized records shall be excluded from Mimir retrieval and answer generation.

FR-44. When Mimir cannot produce an answer with sufficient confidence from governed data, the UI shall display a no-answer state and shall not fabricate unsupported details.

FR-45. Each Mimir question-and-answer transaction shall record requesting user, active customer/account context, prompt text, source references used, timestamp, response outcome, and correlation identifier.

FR-46. For valid Mimir Q&A requests, the system shall return the answer or a handled failure state within the configured interaction timeout and shall surface unexpected downstream errors as a user-safe message.

FR-47. An authenticated Service Agent shall be able to submit a Mimir conversational prompt only from an active customer or account servicing workspace where required context is present.

FR-48. Mimir conversational request payloads shall include current servicing context identifiers required for grounding and shall exclude customer/account records the requesting Service Agent is not authorized to access.

FR-49. The Mimir conversational interface shall show distinct submitting, success, and failure states, and a failed request shall not clear the entered prompt.

FR-50. If the prompt is empty, exceeds configured maximum length, or servicing context is missing, the platform shall block submission and display a validation message identifying the specific issue.

FR-51. Each Mimir conversational interaction shall store an audit entry containing request identifier, requesting user, role, customer/account context references, request timestamp, response status, and governance metadata.

FR-52. The system shall allow Mimir to generate summaries of notes and trouble tickets for the selected authorized customer or account context.

FR-53. Notes and trouble-ticket summary results shall identify the source records used for the summary.

FR-54. Notes and trouble-ticket summaries shall exclude notes and trouble tickets the requesting user is not authorized to view.

FR-55. The platform shall validate required inputs before completing notes and trouble-ticket summary requests.

FR-56. Authorized Internal Users shall be able to submit a Mimir chart-generation request only for approved business data sources they are permitted to access.

FR-57. The system shall validate required chart-generation request fields including dataset identifier, supported chart type, and bounded analysis parameters before invoking Mimir.

FR-58. When chart generation succeeds, the web experience shall display a chart and textual insight output that clearly identifies the originating business data context.

FR-59. When a chart-generation request contains invalid parameters, references an unsupported data source, or Mimir processing fails, the system shall return a controlled error state without exposing internal stack traces or raw provider errors.

FR-60. Each chart-generation transaction shall write an audit record containing requesting user identity, approved data source reference, request timestamp, outcome status, and correlation identifier.

FR-61. When a user creates, updates, or deletes customer or account data through supported application APIs, the platform shall store an immutable audit record containing actorId, actorRole, actionType, entityType, entityId, eventTimestamp, requestId, and changed fields summary.

FR-62. When an AI-assisted action is invoked, the platform shall write an audit event linking the initiating user, AI capability invoked, target customer or account record, outcome status, and timestamp in the same audit store used for operational data-change events.

FR-63. Audit records shall be retrievable through a compliance-only access path supporting filtering by date range, actor, entity type, and action type.

FR-64. Non-compliance operational roles shall not be able to modify or delete audit records returned through the audit access path.

FR-65. If an audited transaction fails validation or is rejected before persistence, the platform shall record a failure audit event with actor context, attempted action, failure reason category, and timestamp without storing invalid business data changes.

FR-66. Audit event creation shall add no more than one audit record per discrete action and shall preserve request processing by handling audit-write failures with logged error telemetry and a non-success response when audit persistence is required for action completion.

FR-67. The platform shall record auditable history for customer, account, interaction, and AI-assisted activities with user and time context.

FR-68. The platform shall preserve audit records in a manner that supports retention requirements and compliance reporting needs.

FR-69. The platform shall allow authorized compliance reviewers to retrieve audit history for investigations without exposing restricted business data.

FR-70. The system shall support automated build, test, and deployment stages for the platform through CI/CD pipelines.

FR-71. The system shall require controlled approval gates before production promotion occurs.

FR-72. The system shall record deployment status and release history so production changes are auditable and traceable.

FR-73. When a Release Manager submits a promotion for an approved releaseVersion, the system shall create a deployment action for the next allowed targetEnvironment and store releaseVersion, sourceEnvironment, targetEnvironment, initiatedBy, and changeTicketId.

FR-74. The system shall reject a promotion request when approvalStatus is not approved or when the requested targetEnvironment skips the configured promotion sequence, and shall return a clear validation error without changing deploymentState.

FR-75. For each environment, the system shall expose rollback readiness by identifying lastStableReleaseVersion and shall allow a rollback action only when a previous stable version exists.

FR-76. When a rollback is submitted, the system shall require rollbackReason, update deploymentState through in_progress to a terminal outcome, and associate the rollback action with the environment and release versions involved.

FR-77. The system shall persist an audit history entry for promotion initiation, promotion outcome, rollback initiation, and rollback outcome, including actor identity, timestamps, releaseVersion, environments, and action result.

## Non-Functional Requirements
### Performance
- Standard single-record identifier searches that return a single authorized match shall display customer and account summary information within 2 seconds.
- At least 95% of standard identifier searches shall open the workspace or return results within 2 seconds.
- Equipment/network panel loading shall meet normal account-workspace response expectations.
- Bundle/service-order inventory and linked navigation shall meet normal workspace response targets.
- Core servicing page route changes shall complete within defined web response targets under routine usage.
- Mimir valid requests shall return an answer or handled no-answer/failure state within the configured interaction timeout.
- At least 95% of valid Mimir Q&A requests should return an answer or handled no-answer state within target response time.
- Chart generation should remain responsive for common dataset sizes and avoid indefinite web-session blocking.
- Audit queries by date range shall return within agreed operational latency for indexed searches.
- Deployment action requests should return acknowledgement quickly while status retrieval exposes latest deployment state.

### Reliability
- The platform shall provide handled empty, no-results, unauthorized, and failure states instead of blank panels or raw errors.
- Retrieval failures shall not remove users from the current customer/account workspace context.
- Audit-write failures shall be logged; when audit persistence is required for completion, the action shall return non-success.
- Failed Mimir requests shall preserve entered prompt text for conversational assistance.

### Security
- Authenticated session checks are required for protected functionality.
- Role-based authorization is required before returning protected customer, account, infrastructure, audit, Mimir, or release-management data.
- Unauthorized records must be excluded from Mimir grounding and summaries.
- Unauthorized navigation and retrieval attempts must not expose destination or hidden record data.
- Requests must use input validation and sanitization where specified.
- Error responses must not expose stack traces, raw provider errors, or internal model details.
- Audit actor identity shall be derived from authenticated session/token context.
- Environment control endpoints/actions shall not be invokable anonymously.

### Observability
The platform shall capture structured observability data where specified, including combinations of:
- correlationId/requestId,
- userId/actorId,
- role,
- customerId/accountId/datasetId/entityId,
- view type,
- response status/outcome code,
- latency,
- retrieval result count,
- upstream latency,
- audit-write outcome,
- deployment event tags.

### Data Governance and Auditability
- Audit records shall be immutable.
- AI-assisted actions shall be auditable in the same audit store used for operational data-change events.
- Audit retrieval must be compliance-only.
- Audit preservation must support retention and compliance reporting needs.

### Architecture
- Implementation shall align to the selected monolith architecture style.

### Open Questions
- Exact SLA values, timeout durations, and indexed query latency thresholds are not provided.
- Accessibility conformance standards are not specified in source context.
- Encryption, secret management, and detailed security controls beyond stated requirements are not specified.

## Acceptance Scenarios
### Unified Workspace Search
**Scenario AC-77718-1: Authorized service agent opens workspace from supported identifier**
- Given an authenticated user with Service Agent access
- And the user enters a supported identifier in valid format
- When the user submits search
- Then the system queries customer/account sources
- And when a single authorized match exists, opens the unified customer workspace
- And displays customer and account summary information within 2 seconds

**Scenario AC-77718-2: Invalid search input is blocked**
- Given an authenticated Service Agent on the search page
- When the user submits an empty search input or unsupported identifier format
- Then the system blocks submission
- And displays a validation message
- And does not query downstream services

**Scenario AC-77718-3: No matching record**
- Given an authenticated Service Agent
- When the user searches with a supported identifier that has no matching customer or account
- Then the system shows a distinct no-results state
- And does not open the workspace

**Scenario AC-77718-4: Unauthorized access attempt**
- Given a user without permission to access the unified workspace
- When the user attempts to retrieve details through search or direct navigation
- Then the system denies access
- And does not expose customer or account summary details

### Customer Context and Navigation
**Scenario AC-77726-1: View addresses, notes, and alerts**
- Given an authenticated user with required permissions
- And an active customer workspace context
- When the user opens customer context details
- Then the system displays customer addresses, notes, and alerts
- And highlights active alerts distinctly from general notes
- And records access in audit context

**Scenario AC-77735-1: Navigate from customer to linked account and back**
- Given an authenticated Internal User viewing a customer with linked accounts
- When the user selects a linked account action
- Then the system validates the relationship and authorization
- And opens the corresponding account page in the same browser session
- And reflects the selected accountId
- When the user returns to customer view
- Then the originating customer context is restored without a new search

**Scenario AC-77735-2: Invalid or unavailable customer-account link**
- Given an authenticated Internal User on a customer view
- When the user selects a non-existent or unavailable linked account
- Then the system blocks navigation
- And displays a non-technical error message
- And retains the current page

**Scenario AC-77822-1: Shared servicing navigation preserves context**
- Given an authenticated authorized user in the unified workspace with active customerId and accountId
- When the user navigates to service order, trouble ticket, billing inquiry, payment, notes, or alerts
- Then the destination receives and displays the same customerId and accountId context
- And the system uses a consistent navigation pattern

**Scenario AC-77822-2: Missing context blocks route**
- Given an authenticated authorized user
- When the user tries to open a context-dependent destination without required context identifiers
- Then the platform blocks the route
- And displays a clear recoverable message
- And does not render incomplete data

### Account Infrastructure Views
**Scenario AC-77743-1: View premises and assigned services**
- Given an authorized Account Management Specialist
- And a valid selected account
- When the user opens premises and assigned services
- Then the platform displays premises details and assigned services for that account
- And preserves historical account context for migrated records

**Scenario AC-77743-2: Unauthorized premises/service access**
- Given a user without required role permissions
- When the user attempts to view account infrastructure data
- Then the platform blocks access
- And does not display the data

**Scenario AC-77752-1: View equipment and network records for selected account**
- Given an authorized user with account-management authorization
- And a selected account with associated equipment and network records
- When the user opens equipment and network information
- Then the web application displays only records associated with that account
- And records an audit entry with user identity, account identifier, timestamp, and outcome

**Scenario AC-77752-2: Equipment/network empty state**
- Given an authorized user with account-management authorization
- And a selected account with no equipment or network records
- When the user opens equipment and network information
- Then the application shows a clear empty-state message
- And does not show a blank panel or generic error

**Scenario AC-77752-3: Equipment/network access denied**
- Given a request without a valid authenticated session or without required authorization
- When equipment and network information is requested
- Then the system blocks access
- And returns no equipment or network data
- And records a denied audit entry

**Scenario AC-77752-4: Equipment/network retrieval failure**
- Given an authorized user with a selected account
- When a retrieval error occurs while loading equipment and network information
- Then the UI shows a non-destructive error message
- And preserves the selected account context in the same workspace

**Scenario AC-77761-1: View bundles and service-order inventory**
- Given an authorized Internal User
- And a selected account
- When the user opens bundles view
- Then the application displays bundles linked to that account through the modernized API layer
- When the user switches to service-order inventory view
- Then the application displays service-order inventory linked to the same account
- And keeps the selected account context unchanged

**Scenario AC-77761-2: Bundle or inventory empty/error state**
- Given an authorized Internal User with a selected account
- When either bundles or service-order inventory has no linked records or the request fails
- Then the application shows a clear empty or error state for that view
- And does not remove the user from the current account workspace

### Mimir AI Assistance
**Scenario AC-77769-1: Valid Mimir Q&A request with context**
- Given an authenticated Service Agent
- And an active customerId or accountId context in the workspace
- And authorized access to governed data for that context
- When the agent submits a natural-language question
- Then the system retrieves only permitted governed customer/account data
- And returns an answer with source references or a handled no-answer outcome within configured timeout
- And records the transaction with user, context, prompt, references, timestamp, outcome, and correlation identifier

**Scenario AC-77769-2: Mimir Q&A blocked without context**
- Given an authenticated Service Agent without active customerId or accountId context
- When the agent submits a natural-language question
- Then the system rejects the request
- And displays a clear error message

**Scenario AC-77769-3: Mimir no-confidence outcome**
- Given an authenticated Service Agent with valid context
- When governed data does not support a sufficiently confident answer
- Then the UI displays a non-answer state explaining that no reliable answer is available
- And the system does not fabricate unsupported details

**Scenario AC-77839-1: Conversational assistance from servicing workspace**
- Given an authenticated user with Service Agent access
- And an active customer or account servicing workspace with required context
- When the agent submits a prompt
- Then the request includes current servicing context identifiers
- And excludes unauthorized customer/account records from grounding
- And the interface shows submitting then success or failure state
- And the interaction is audited with request identifier, user, role, context references, timestamp, response status, and governance metadata

**Scenario AC-77839-2: Conversational prompt validation failure**
- Given an authenticated Service Agent in the servicing workspace
- When the agent submits an empty prompt, over-length prompt, or prompt without required context
- Then the system blocks submission
- And displays a specific validation message
- And does not clear the entered prompt on failed request

**Scenario AC-77778-1: Summarize notes and trouble tickets**
- Given an authenticated authorized Service Agent
- And a selected authorized customer or account context
- When the agent requests a notes and trouble-ticket summary
- Then the system generates a summary from authorized notes and trouble tickets only
- And identifies the source records used for the summary

**Scenario AC-77787-1: Generate chart and insights from approved dataset**
- Given an authorized Internal User
- And an approved business dataset the user is permitted to access
- When the user submits a chart-generation request with valid dataset identifier, supported chart type, and bounded analysis parameters
- Then the system invokes Mimir
- And displays a chart and textual insights
- And clearly identifies the originating business data context
- And writes an audit record for the transaction

**Scenario AC-77787-2: Invalid chart-generation request**
- Given an authorized Internal User
- When the request contains invalid parameters, unsupported data source, or Mimir processing fails
- Then the system returns a controlled error state
- And does not expose internal stack traces or raw provider errors

### Authentication and Audit
**Scenario AC-77796-1: WorkOS SSO authentication required**
- Given a user attempts to access protected platform functions
- When the user is not authenticated through WorkOS SSO or presents an invalid session
- Then the system denies access
- And presents a controlled error state

**Scenario AC-77805-1: Audit operational data change**
- Given an authenticated operational user performs a supported create, update, or delete action on customer or account data
- When the action is processed through supported application APIs
- Then the platform stores one immutable audit record containing actorId, actorRole, actionType, entityType, entityId, eventTimestamp, requestId, and changed fields summary

**Scenario AC-77805-2: Audit rejected action**
- Given an authenticated operational user submits a transaction that fails validation before business persistence
- When the platform rejects the transaction
- Then the platform records a failure audit event with actor context, attempted action, failure reason category, and timestamp
- And does not store invalid business data changes

**Scenario AC-77805-3: Compliance-only audit retrieval**
- Given an authorized compliance reviewer
- When the reviewer queries audit history by date range, actor, entity type, or action type
- Then the system returns immutable audit records through a compliance-only access path
- And non-compliance operational users cannot modify or delete the records

### Delivery and Release Control
**Scenario AC-77813-1: Automated pipeline with controlled gate**
- Given a buildable platform change
- When the CI/CD pipeline runs
- Then the system supports automated build, test, and deployment stages
- And requires controlled approval gates before production promotion

**Scenario AC-77856-1: Valid release promotion**
- Given an authenticated Release Manager
- And an approved releaseVersion
- And the next allowed targetEnvironment
- When the manager submits a promotion with required metadata including changeTicketId
- Then the system creates a deployment action
- And stores releaseVersion, sourceEnvironment, targetEnvironment, initiatedBy, and changeTicketId
- And updates deploymentState through in_progress to a terminal outcome
- And records audit history for initiation and outcome

**Scenario AC-77856-2: Invalid release promotion**
- Given an authenticated Release Manager
- When the manager submits a promotion for a release that is not approved or skips the configured environment sequence
- Then the system rejects the request
- And returns a clear validation error
- And does not change deploymentState

**Scenario AC-77856-3: Rollback to last stable release**
- Given an authenticated Release Manager
- And an environment with a previous stable version
- When the manager submits a rollback with rollbackReason
- Then the system allows the rollback action
- And associates the rollback with the environment and involved release versions
- And updates deploymentState through in_progress to a terminal outcome
- And records audit history for rollback initiation and outcome

## Traceability Matrix
| Source ID | Requirement | Acceptance Criteria | Test Coverage |
|---|---|---|---|
| Feature 77700 / US 77703 | FR-1 | Unified single web workspace for customer/account access across CM and AM | Web workspace integration tests |
| US 77718 | FR-5, FR-6, FR-7, FR-8, FR-9 | Search authorized workspace open, validation, 2-second summary load, no-results, unauthorized block | UI search validation tests, API search auth tests, performance tests |
| US 77726 | FR-10, FR-11, FR-12 | Display addresses/notes/alerts, distinguish active alerts, audit access | UI rendering tests, audit event tests |
| US 77735 | FR-13, FR-14, FR-15, FR-16, FR-17 | Linked account actions, same-session navigation, restore context, invalid link handling, auth checks | Navigation tests, auth tests, context restoration tests |
| US 77743 | FR-23, FR-24, FR-25, FR-26 | Premises/services display, historical context preservation, unauthorized block, input validation | Account infrastructure UI/API tests, auth tests |
| US 77752 | FR-27, FR-28, FR-29, FR-30, FR-31 | Account-scoped equipment/network view, empty state, auth/session block, context preservation, access audit | Retrieval tests, empty/error state tests, audit tests |
| US 77761 | FR-32, FR-33, FR-34, FR-35, FR-36 | Bundles and inventory display via modernized API, account context preserved, empty/error states | UI switching tests, API source tests, context tests |
| US 77769 | FR-40, FR-41, FR-42, FR-43, FR-44, FR-45, FR-46 | Active context required, governed authorized data only, no-answer state, audited Q&A, timeout-safe failure | Mimir request validation tests, authorization filtering tests, audit tests |
| US 77778 | FR-52, FR-53, FR-54, FR-55 | Notes/ticket summaries for authorized context, source identification, exclusion of unauthorized records, validation | AI summary tests, citation/source tests, auth filtering tests |
| US 77787 | FR-56, FR-57, FR-58, FR-59, FR-60 | Approved dataset access, request validation, chart+insight output, controlled failure, audit | AI chart validation tests, UI render tests, audit tests |
| US 77796 | FR-2, FR-3, FR-4 | WorkOS SSO required, JWT session issuance/validation, controlled auth failure state | SSO integration tests, session validation tests |
| US 77805 | FR-61, FR-62, FR-63, FR-64, FR-65, FR-66 | Immutable audit records for business and AI actions, compliance retrieval, failure auditing, one record per action, audit-write failure handling | Audit persistence tests, compliance auth tests, negative-path tests |
| US 77813 | FR-70, FR-71, FR-72 | Automated build/test/deploy stages, approval gates, deployment/release history | Pipeline integration tests, release-history tests |
| US 77822 | FR-18, FR-19, FR-20, FR-21, FR-22 | Consistent navigation pattern, context propagation, no duplicate sessions, missing-context block, response-time target | Navigation integration tests, session/context tests, performance tests |
| US 77830 | FR-37, FR-38, FR-39 | Unified visibility into customer/account/premises/equipment/services, governed context linkage, audit access history | Cross-domain workspace tests, audit tests |
| US 77839 | FR-47, FR-48, FR-49, FR-50, FR-51 | Service-agent conversational access only in active workspace, grounded context payload, UI states, validation, audit metadata | Conversational AI tests, UI state tests, audit tests |
| US 77847 | FR-67, FR-68, FR-69 | Auditable history for customer/account/interaction/AI activities, retained for compliance needs, authorized retrieval | Audit retention/retrieval tests, authorization tests |
| US 77856 | FR-73, FR-74, FR-75, FR-76, FR-77 | Controlled promotion, rejection of invalid promotion, rollback readiness and action, deployment state transitions, audit history | Release-control API tests, state-transition tests, audit tests |

## Open Questions
1. What are the exact supported identifier types and format rules for unified workspace search beyond examples of customer number, account number, phone number, and email address?
2. What exact customer and account summary fields must be shown when the unified workspace opens?
3. What exact fields comprise premises details, assigned services, equipment records, network information, bundles, and service-order inventory?
4. What exact UI copy must be used for no-results, empty-state, access-denied, validation, and user-safe failure messages?
5. What is the exact maximum prompt length for Mimir conversational and Q&A requests?
6. What is the configured interaction timeout target for Mimir responses?
7. What confidence threshold or decision rule determines the Mimir no-answer state?
8. What exact source-reference format should Mimir answers and summaries use in the UI?
9. What approved business datasets are in scope for Internal User chart generation?
10. What chart types are supported for Mimir chart generation?
11. What analysis parameters, metrics, dimensions, and date-range bounds are supported for chart generation?
12. What specific governance metadata must be stored for Mimir conversational interactions beyond the listed audit fields?
13. Are Compliance Administrator and Compliance Officer distinct permissioned roles, and if so, how do their retrieval privileges differ?
14. What exact compliance-only access path UI or API should be provided for audit retrieval?
15. What restricted business data, if any, must be masked or excluded when compliance reviewers retrieve audit history?
16. What retention duration and purge/archival policy applies to audit records?
17. Which customer, account, and interaction actions are considered “supported application APIs” for mandatory audit capture in this feature scope?
18. What are the exact environment names and promotion sequence enforced for release management?
19. What constitutes “approved release status” operationally, and where is that status sourced?
20. What deployment status/release history fields must be visible to Release Managers in the UI?
21. What exact page-load or navigation response-time targets apply where the source references “defined response-time target” or “normal workspace expectations”?
22. What Golden Repo monolith constraints or conventions from `01-product-overview.md` and `02-architecture.md` materially affect module boundaries, session handling, audit implementation, and API composition for this feature?

## Source References
- Feature ID 77700 — MACC Gentue Unified Customer and Account Platform Modernization
- User Story 77703 — Unified Customer and Account Workspace
- User Story 77718 — Search and open unified customer workspace
- User Story 77726 — View customer addresses, notes, and alerts together
- User Story 77735 — Navigate between customer and account views
- User Story 77743 — View premises and assigned services
- User Story 77752 — Review equipment and network information
- User Story 77761 — View bundles and service-order inventory
- User Story 77769 — Ask Mimir questions about customer and account data
- User Story 77778 — Mimir summarizes notes and trouble tickets
- User Story 77787 — Mimir generates charts and insights from business data
- User Story 77796 — WorkOS SSO authentication for protected platform functions
- User Story 77805 — Audit user activity and data changes
- User Story 77813 — Automated CI/CD pipelines with controlled promotion gates
- User Story 77822 — Modern web navigation across customer servicing capabilities
- User Story 77830 — Unified visibility into customer and infrastructure-related account data
- User Story 77839 — Mimir conversational assistance during customer servicing
- User Story 77847 — Auditable history for customer, account, interaction, and AI-assisted activities
- User Story 77856 — Controlled promotion and rollback support across environments
- Golden Repo references cited by source: `01-product-overview.md`, `02-architecture.md`