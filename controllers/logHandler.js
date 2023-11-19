const logModel = require("../Models/logModel");

//POST log ------------------------------------------------------------------------------

const handleLogIngest = async (req, res) => {
  const body = req.body;
//   if(!body){
//     return res.status(404).json("All inputs required");
//   }
  const currDate = new Date();

  try {
    const log = await logModel.create({
      level: body.level,
      message: body.message,
      timestamp: currDate,
      resourceId: body.resourceId,
      traceId: body.traceId,
      spanId: body.spanId,
      commit: body.commit,
      metadata: {
        parentResourceId: body.metadata ? body.metadata.parentResourceId : undefined,
    },
    });
    console.log("sucessfully log ingested Successfully");
    
    return res.status(201).json({ id: log._id, log });

  } catch (err) {
    console.log("Error in creation of Log Entry:", err);

    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Validation error", details: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

};

//Get Log-------------------------------------------------------------------

const handleGetLogs = async (req, res) => {
    console.log(req.query);
    
  try {

    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      parentResourceId,
      startTimestamp,
      endTimestamp,
    } = req.query;

    const dbQuery = {};

    if (level) dbQuery.level = level;
    if (message) dbQuery.message = new RegExp(message, "i"); // for case-insesnsitive
    if (resourceId) dbQuery.resourceId = resourceId;
    if (timestamp) dbQuery.timestamp = timestamp;
    if (traceId) dbQuery.traceId = traceId;
    if (spanId) dbQuery.spanId = spanId;
    if (commit) dbQuery.commit = commit;
    if (parentResourceId)
      dbQuery["metadata.parentResourceId"] = parentResourceId;

    if (startTimestamp) {
      dbQuery.timestamp = {
        $gte: startTimestamp,
      };
    }
    if (endTimestamp) {
      dbQuery.timestamp = {
        $lte: endTimestamp,
      };
    }

    const filteredLogs = await logModel.find(dbQuery);

    const logsCount = filteredLogs.length;
    if (logsCount==0) {
      console.log("No Log Found");
      return res.json({ Message: "No Logs Found" });
    }

    return res.json({log_count: logsCount, filteredLogs});
  } catch (err) {
    console.error('Error querying logs:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleLogIngest,
  handleGetLogs,
};
