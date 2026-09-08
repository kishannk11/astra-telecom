# Account Management (AM)

## Purpose
AM manages premises, network, equipment and service inventory associated with customers and accounts.

## Functional Areas

### Premise
- Premise address
- Premise comments
- Location and mapping

### Network & Equipment
- Premise network and attributes
- Premise equipment and attributes
- All-equipment inventory

### Service Orders
- AM service-order inventory
- Inventory attributes
- Inventory comments

### Catalog & Services
- Bundles
- USP bundles
- Assigned services
- Items
- Broadband types

### Credits & Carriers
- Capital credit members
- Capital credit service orders
- Carriers and jurisdictions

## CM ↔ AM Integration
The documented relationship is:

CM manages customer/account operations.
AM manages physical and service inventory.

A CM service order can drive equipment and network provisioning in AM.

## Unknowns
The source does not specify the exact provisioning sequence, event mechanism, transaction boundaries, or failure/retry behavior between CM and AM.
