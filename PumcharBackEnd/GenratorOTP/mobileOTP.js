const fast2sms = require("fast-two-sms");

module.exports.sendMessage = async ({ message, mobilenumber }, next) => {
  try {
    const response = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS,
      message: message,
      numbers: [mobilenumber],
    });
    console.log(response, "response");
  } catch (err) {
    next(err);
  }
};
