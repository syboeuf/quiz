const functions = require("firebase-functions");
const { admin } = require("../../utils/firebase");

// on user create
exports.onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snapshot, context) => {
    const newDocument = snapshot.data();
    const userId = context.params?.userId;
    newDocument.id = userId;
    console.log(userId);
    await admin.auth().setCustomUsersClaims(userId, {
      isAdmin: true,
      isEditor: true,
      isViewer: true,
    });
    console.log("Trigger finish...");
    return true;
  });
