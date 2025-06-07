const MockProvider1 = require("./providers/MockProvider1");
const MockProvider2 = require("./providers/MockProvider2");
const EmailService = require("./EmailService");

async function main() {
  const provider1 = new MockProvider1();
  const provider2 = new MockProvider2();
  const emailService = new EmailService(provider1, provider2);

  try {
    const email = "user@example.com";
    const messageId = "email-12345";

    const result = await emailService.sendEmail(email, messageId);
    console.log("Final Result:", result);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
}

main();
