import { useState, useEffect, useContext } from "react";
import quiz from "utils/quiz";
import { useParams } from "react-router-dom";
import { QuizProvider } from "context/quiz";

import Responses from "Responses";
import Question from "view/Question";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const startPage = 0;

const Page = () => {
  const params = useParams();
  const theme = params.quizName;
  const [nbPage, setNbPage] = useState(startPage);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(quiz[theme].gameData[startPage]);
  const [showResponses, setShowResponses] = useState(false);
  const data = useContext(QuizProvider);

  useEffect(() => {
    console.log("*** data ***");
    console.log(data);
  }, []);

  const next = (answer) => {
    console.log(quiz[theme].gameData.length);
    const newNbPage = nbPage + 1;
    if (newNbPage >= quiz[theme].gameData.length) {
      setShowResponses(true);
    }
    setNbPage(newNbPage);
    setAnswers((prev) => [...prev, answer]);
    setQuestion(quiz[theme].gameData[newNbPage]);
  };

  const joker = () => {
    const newQuestion = { ...question };
    const allChoices = Object.keys(newQuestion.choices).map((key) => key);
    for (let i = 0; i < 2; i++) {
      const random = Math.floor(Math.random() * allChoices.length);
      const letter = allChoices[random];
      if (letter === question.answer) {
        i--;
        continue;
      }
      newQuestion.choices[letter] = "";
      allChoices.splice(random, 1);
    }
    setQuestion(newQuestion);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <img
          src={`${process.env.PUBLIC_URL}/logo.jpeg`}
          alt="logo marvel"
          width="720"
          height="360"
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => joker()}>50:50</Button>
      </Grid>
      <Grid item xs={12}>
        {!showResponses ? (
          <Question data={question} next={next} />
        ) : (
          <Responses answers={answers} />
        )}
      </Grid>
    </Grid>
  );
};

export default Page;
