// const fast2sms = require("fast-two-sms");
const springedge = require("springedge");
module.exports.sendMessage = async ({ message, mobilenumber }, next) => {
  try {
    // const response = await fast2sms.sendMessage({
    //   authorization: process.env.FAST2SMS,
    //   message: message,
    //   numbers: [mobilenumber],
    // });
    // console.log(response, "response");
    var params = {
      apikey: `${process.env.SPRINGEDGE}`, // API Key
      sender: "SEDEMO", // Sender Name
      to: [mobilenumber],
      message: message,
      format: "json",
    };
    springedge.messages.send(params, 5000, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });
  } catch (err) {
    next(err);
  }
};
