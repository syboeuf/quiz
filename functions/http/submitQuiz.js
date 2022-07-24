const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

const {
  https: { onCall, HttpsError },
} = functions;

// title String
// themes []
// gameData [{ questions: questionsData, answer, question }] question String, answer String

const answersArray = ["a", "b", "c", "d"];

const checkGameData = (gameData) => {
  return gameData.every(({ questions, question, answer }) => {
    const checkQuestion = typeof question === "string" && question.length > 0;
    const checkAnswer =
      typeof answer === "string" && answersArray.includes(answer);
    const checkQuestions = questions.every(({ value, label, id }) => {
      //console.log({ value, label, id });
      const checkValue = typeof value === "string" && value.length > 0;
      const checkLabel = typeof label === "string" && label.length > 0;
      const checkId = typeof id === "number";
      //console.log({ checkValue, checkLabel, checkId });
      return checkValue && checkLabel && checkId;
    });
    console.log({
      checkQuestion,
      checkAnswer,
      checkQuestions,
    });
    return checkQuestion && checkAnswer && checkQuestions;
  });
};

exports.submitQuiz = onCall(async (data, context) => {
  const { title, themes, gameData } = data;
  const titleLength = title.length;
  if (typeof title !== "string" || titleLength > 50 || titleLength < 0) {
    throw new HttpsError("invalid-argument", "Le titre n'est pas bon.");
  }
  if (typeof themes !== "object" || themes.length <= 0) {
    throw new HttpsError("invalid-argument", "Les themes ne sont pas bons");
  }
  console.log(!checkGameData(gameData));
  if (!checkGameData(gameData)) {
    console.log("I pass here");
    throw new HttpsError("invalid-argument", "Le plus relou n'est pas bon");
  }
  try {
    const newDate = new Date();
    await db.collection("quiz").doc().set({
      bestPlayer: null,
      bestScore: null,
      bestTime: null,
      createdBy: "Sylvain",
      createdDate: newDate,
      gameData,
      image: "https://wallpaperaccess.com/full/32351.jpg",
      lastUpdatedDate: newDate,
      name: title,
      nbPlaying: 0,
      path: "marvel", // A définir, surement par l'id
      themes,
    });
    console.log("success");
    return true;
  } catch (error) {
    throw new HttpsError(
      "invalid-argument",
      "Les dates que vous avez sélectionnées ne semblent pas correctes. Merci de réessayer ou bien de contacter le support."
    );
  }
});
