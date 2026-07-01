# Security Policy

## Supported Versions

The following versions of Havenly currently receive security updates:

| Version | Supported          |
| ------- | ------------------ |
| latest (`main`) | ✅ Yes |
| older branches | ❌ No  |

Havenly is an actively developed open-source project. Security fixes are applied to the `main` branch only.

---

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Havenly, **please do not open a public GitHub issue**. Public disclosure of a vulnerability before a fix is available puts all users at risk.

### How to Report

1. **Email us directly** at: `security@havenly.example.com`
   - Use the subject line: `[SECURITY] Brief description of the vulnerability`
2. **Alternatively**, use GitHub's private [Security Advisory](https://github.com/akshay0611/havenly/security/advisories/new) feature to report confidentially.

### What to Include in Your Report

Please provide as much of the following as possible:

- **Description**: A clear description of the vulnerability and its potential impact.
- **Steps to Reproduce**: Detailed steps to reproduce the vulnerability.
- **Affected Component**: Which file(s), page(s), or feature(s) are affected.
- **Proof of Concept**: Code snippet, screenshot, or video demonstrating the issue (if applicable).
- **Suggested Fix**: If you have a recommended fix, feel free to include it.

---

## Response Timeline

We aim to respond to all security reports within the following timeframes:

| Stage | Timeline |
|-------|----------|
| Initial acknowledgement | Within **48 hours** |
| Triage and assessment | Within **5 business days** |
| Fix and patch release | Within **30 days** (for critical issues, sooner) |
| Public disclosure | After fix is released and deployed |

We will keep you informed throughout the process. If we need more information from you, we will reach out directly.

---

## Scope

### In Scope
The following are considered in scope for security reports:

- Authentication and authorization flaws
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- SQL/NoSQL injection
- Insecure data exposure (e.g., sensitive data in localStorage, API responses)
- Dependency vulnerabilities (via `npm audit` / `pnpm audit`)
- Server-Side Request Forgery (SSRF)
- Business logic vulnerabilities

### Out of Scope
The following are **not** in scope:

- Vulnerabilities in third-party dependencies that have already been publicly disclosed and have an available fix
- Theoretical vulnerabilities with no practical proof of concept
- Issues in development/demo-only features clearly marked as such
- Social engineering attacks
- Denial-of-service attacks that require special access

---

## Coordinated Disclosure

We follow the principle of **coordinated disclosure**. Once a fix has been deployed, we will:

1. Create a public GitHub Security Advisory
2. Credit the reporter (unless they prefer anonymity)
3. Update this `SECURITY.md` with the CVE number if applicable

Thank you for helping keep Havenly and its users safe! 🔒
