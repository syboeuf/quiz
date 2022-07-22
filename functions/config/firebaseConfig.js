const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firebaseConfig = {
  credential: admin.credential.cert(require("../key/serviceAccount.json")),
  apiKey: functions.config().project.apikey,
  authDomain: functions.config().project.authdomain,
  databaseURL: functions.config().project.databaseurl,
  storageBucket: functions.config().project.storagebucket,
  messagingSenderId: functions.config().project.messagingsenderid,
  appId: functions.config().project.appid,
  measurementId: functions.config().project.measurementid,
  projectId: functions.config().project.projectid,
};

module.exports = firebaseConfig;
