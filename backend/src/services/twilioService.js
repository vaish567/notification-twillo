const twilio = require('twilio');

const client = twilio('ACee47205c8447f9d55a2603227334c314', '7022ec0a4c1f567db39fffc4e571d716');

exports.sendSMS = (to, body) => {
  return client.messages.create({
    body: body,
    from: '8928027439',
    to: to
  });
};
