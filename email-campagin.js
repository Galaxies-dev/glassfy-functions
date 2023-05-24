const fetch = require("node-fetch");

exports.onEvent = async function (event, context) {
  console.log(`Processing Event ${event.id}`);

  // Load our secret information from the environment variables
  const CK_SEQUENCE = context.settings.CK_SEQUENCE;
  const CK_KEY = context.settings.CK_KEY;
  const GLASSFY_KEY = context.settings.GLASSFY_KEY;

  const subscriberId = event.subscriberid;

  // Fetch the subscriber information from Glassfy
  // https://docs.glassfy.io/reference/subscriber
  const response = await fetch(`https://openapi.glassfy.io/v1/subscriber?subscriberid=${subscriberId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GLASSFY_KEY}` },
  });

  const jsonData = await response.json();

  // Subscribe the user to the ConvertKit sequence
  const body = {
    email: jsonData.subscriber.email,
    api_key: CK_KEY,
  };

  await fetch(`https://api.convertkit.com/v3/sequences/${CK_SEQUENCE}/subscribe`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
};
