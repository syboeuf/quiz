const config = require("./config/firebaseConfig.js");
const admin = require("firebase-admin");

admin.initializeApp(config);

// Http
const { submitQuiz } = require("./http/submitQuiz");
exports.submitQuiz = submitQuiz;

// Triggers
const { onUserCreate } = require("./triggers/users/");

exports.onUserCreate = onUserCreate;
