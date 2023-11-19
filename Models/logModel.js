const mongoose = require("mongoose");

const currDate = new Date();
// Define the schema for the Log model
const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resourceId: String,
  timestamp: {
    type: Date,
    default: currDate,
  },
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
}, {timestamp: true}, { versionKey: false });

// Create the Log model
const LogModel = mongoose.model('LogModel', logSchema);

module.exports = LogModel;