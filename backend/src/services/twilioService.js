const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_SECRET_KEY);

exports.sendSMS = (to, body) => {
  return client.messages.create({
    body: body,
    from: '8928027439',
    to: to
  });
};
