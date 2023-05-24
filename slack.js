const fetch = require('node-fetch');

exports.onEvent = async function (event, context) {
  console.log(`Processing Event: ${event}`);

  if (event.type === 5008 || event.type === 5001 || event.type === 5002) {
    const body = {
      text: `💰 New Purchase: ${event.productid} for ${event.price}${event.currency_code}`,
    };

    const url = context.settings.SLACK_URL;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
