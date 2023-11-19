
const sessionUserMap = new Map();

// key-sessionID, Value- loggedin User
function setSession(sessionID, userData){
    sessionUserMap.set(sessionID, userData);
}

//get "user" using Key
function getSession(sessionID){
    sessionUserMap.get(sessionID);
}
console.log(sessionUserMap)
module.exports = {
    setSession,
    getSession,
}