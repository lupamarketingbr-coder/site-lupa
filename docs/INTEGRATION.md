# Future ORBE OS / LUPA ADMIN integration

The public website is static and contains no administration screens, tenant records, authentication secrets or client data. Public form identifiers are `LUPA Agenda` and `Rede LUPA` (data-solution). The existing Web3Forms public submission key is retained; it is not an administrator credential.

Current behavior: contact requests and partner applications go through the existing Web3Forms account, separately identified by subject and solution. No automatic provisioning, approval, payment or commission accrual is performed here.

Future server adapter: replace the form transport in assets/site.js with an HTTPS endpoint owned by LUPA ADMIN. Accept only allowlisted contact fields and solution identifiers, validate and rate-limit on the server, verify consent policy, assign an opaque submission ID and return {success:true} only after durable acceptance. Never embed service-role keys or admin tokens in this repository. Configure CORS for the exact public origin. Do not expose internal lead lists in public responses.

LUPA ADMIN must authenticate staff and authorize every administrative action. Salon data must be tenant-isolated on the backend. Partner approval, attribution, commission rules and payment statuses remain private. Provide authenticated password resets rather than displaying passwords. Add deduplication/idempotency and audit events before enabling provisioning. Keep public and private deployments separate; the public website may share branding and links, never sessions or administrative data.

Publishing: GitHub Pages currently publishes the main branch root. Keep relative asset and page links so /site-lupa/ is respected. .nojekyll makes this buildless site explicit. The canonical addresses use .html; no SPA rewrites are required.
