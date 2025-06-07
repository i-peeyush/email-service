class MockProvider2 {
  constructor() {
    this.name = "MockProvider2";
  }

  async send(email) {
    console.log(`[${this.name}] Attempting to send email...`);
    // Simulate random failure
    if (Math.random() < 0.3) {
      console.log(`[${this.name}] Failed to send email.`);
      return { provider: this.name, success: false };
    }
    console.log(`[${this.name}] Email sent successfully to ${email}`);
    return { provider: this.name, success: true };
  }
}

module.exports = MockProvider2;
