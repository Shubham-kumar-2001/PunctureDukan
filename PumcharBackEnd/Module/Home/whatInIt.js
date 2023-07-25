const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WhatInItSchema = new Schema({
  image: String,
  title: String,
  subTitle: String,
});

const WhatInIt = mongoose.model("WhatInIt", WhatInItSchema);
module.exports = WhatInIt;
