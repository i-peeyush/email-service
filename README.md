# Resilient Email Sending Service

A robust Node.js-based email sending service designed to handle failures gracefully by implementing retry logic, provider fallback, idempotency, rate limiting, and status tracking.

---

## Features

- **Multiple Email Providers:** Supports sending emails through two mock providers with automatic failover.
- **Retry Logic:** Implements exponential backoff to retry sending emails on failures.
- **Idempotency:** Prevents duplicate email sends by tracking unique message IDs.
- **Rate Limiting:** Limits the number of email sends to avoid abuse and comply with provider limits.
- **Status Tracking:** Logs detailed status of each send attempt for monitoring and debugging.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd email-service
