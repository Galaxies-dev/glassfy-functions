const fetch = require("node-fetch");

exports.onEvent = async function (event, context) {
  const url = context.settings.API_URL;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(event),
    headers: { "Content-Type": "application/json" },
  });
};
