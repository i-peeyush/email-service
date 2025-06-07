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
   git clone https://github.com/i-peeyush/email-service
   cd email-service
2. Install Dependencies:
   ```bash
   npm install
3. Running the Service:
   ```bash
   node src/testEmailService.js

### Project Structure
src/

   index.js — Main entry point demonstrating the email sending service.

   EmailService.js — Core service implementing sending logic, retries, fallback, idempotency, and rate limiting.
   
   testEmailService.js — Script to test the email sending functionality with multiple send attempts.

   provider/

      MockProvider1.js — Mock primary email provider simulation.

      MockProvider2.js — Mock secondary email provider simulation.

### How It Works
   1. The service tries sending emails through the primary provider.

   2. If the primary fails, it falls back to the secondary provider.

   3. On failure, it retries with exponential backoff up to a set number of attempts.
   
   4. Idempotency ensures repeated requests with the same message ID don’t send duplicate emails.
   
   5. Rate limiting prevents excessive sending within a short time window.
   
   6. Each attempt's outcome is logged and returned for transparency.

### Future Improvements
   1. Integration with real email providers like SendGrid, AWS SES, or SMTP.
   
   2. Persistent storage for idempotency and rate limiting data.
   
   3. REST API interface for external applications.
   
   4. Enhanced error handling and monitoring dashboards.
   
   5. Unit and integration tests for reliability.

### Author
Peeyush Sharma
HBTU Kanpur
Email: peeyush2003sharma@gmail.com


Thank you for checking out this resilient email sending service!

Just replace `<repository-url>` and your email address where needed.

JAI RAM JI KI! 🙏
