const config = require("./config/firebaseConfig.js");
const admin = require("firebase-admin");

admin.initializeApp(config);

// Triggers
const { onUserCreate } = require("./triggers/users/");

exports.onUserCreate = onUserCreate;
