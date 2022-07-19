import { useState } from "react";
import { questions } from "./constants";

import Responses from "./Responses";
import Question from "./Question";

import Grid from "@mui/material/Grid";

const startPage = 0;

const Page = () => {
  const [nbPage, setNbPage] = useState(startPage);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(questions[startPage]);
  const [showResponses, setShowResponses] = useState(false);

  const next = (answer) => {
    console.log(questions.length);
    const newNbPage = nbPage + 1;
    if (newNbPage >= questions.length) {
      setShowResponses(true);
    }
    setNbPage(newNbPage);
    setAnswers((prev) => [...prev, answer]);
    setQuestion(questions[newNbPage]);
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
