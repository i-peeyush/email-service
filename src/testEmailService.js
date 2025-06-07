const MockProvider1 = require("./providers/MockProvider1");
const MockProvider2 = require("./providers/MockProvider2");
const EmailService = require("./EmailService");

async function test() {
  const provider1 = new MockProvider1();
  const provider2 = new MockProvider2();
  const emailService = new EmailService(provider1, provider2);

  const email = "user@example.com";

  for (let i = 1; i <= 7; i++) {
    try {
      const messageId = `email-msg-${i}`;
      const result = await emailService.sendEmail(email, messageId);
      console.log(`Send attempt ${i}:`, result);
    } catch (err) {
      console.log(`Send attempt ${i} failed: ${err.message}`);
    }
  }
}

test();
