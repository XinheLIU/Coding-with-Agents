# Security and Permission Boundaries

- **Give the agent a dedicated account and role** – use a separate email and IAM Role for easy isolation, audit, and permission scoping; prefer testing access to external systems in non-production environments first
- **Use dev / staging environments, not production** – keep the agent's environment consistent with the engineering test environment but completely isolated from production to prevent accidents
- **Use read-only keys wherever possible** – when interacting with external services, prefer read-only access; write operations should be triggered by a human running a script; don't give the agent full write access to production systems
