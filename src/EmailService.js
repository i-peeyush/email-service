class EmailService {
  constructor(primaryProvider, secondaryProvider) {
    this.primary = primaryProvider;
    this.secondary = secondaryProvider;
    this.sentMessages = new Set(); // For idempotency
    this.rateLimit = {
      maxRequests: 5,
      intervalMs: 60000,
      timestamps: [],
    };
  }

  async _rateLimitCheck() {
    const now = Date.now();
    this.rateLimit.timestamps = this.rateLimit.timestamps.filter(
      (t) => now - t < this.rateLimit.intervalMs
    );
    if (this.rateLimit.timestamps.length >= this.rateLimit.maxRequests) {
      throw new Error("Rate limit exceeded. Please try later.");
    }
    this.rateLimit.timestamps.push(now);
  }

  async _sendWithRetries(provider, email, maxRetries = 3) {
    let attempt = 0;
    let delay = 500; // 500ms initial delay

    while (attempt < maxRetries) {
      try {
        console.log(`[Attempt ${attempt + 1}] Using ${provider.name}`);
        const result = await provider.send(email);
        if (result.success) {
          return result;
        }
      } catch (err) {
        // Ignore errors for retry
      }
      attempt++;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2; // exponential backoff
    }

    return { provider: provider.name, success: false };
  }

  async sendEmail(email, messageId) {
    if (!messageId) throw new Error("Message ID is required for idempotency.");

    if (this.sentMessages.has(messageId)) {
      console.log(`[Idempotent] Message ID ${messageId} already processed.`);
      return { provider: "none", success: true };
    }

    await this._rateLimitCheck();

    console.log("Trying Primary Provider...");
    let result = await this._sendWithRetries(this.primary, email);

    if (!result.success) {
      console.log("Primary failed. Trying Secondary Provider...");
      result = await this._sendWithRetries(this.secondary, email);

      if (!result.success) {
        console.log("Both providers failed to send email.");
        return { provider: "none", success: false };
      }
    }

    this.sentMessages.add(messageId);

    return result;
  }
}

module.exports = EmailService;
