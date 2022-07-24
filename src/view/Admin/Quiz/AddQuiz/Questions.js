import { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import QuestionData from "components/QuestionData";
import Alert from "@mui/material/Alert";

const Questions = ({ dataQuiz, handleNext }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const addQuestion = (questionData) => {
    const newQuestions = questions.map((item) => ({ ...item }));
    newQuestions.push({
      ...questionData,
      id: newQuestions.length,
    });
    setQuestions(newQuestions);
  };

  const nextStep = () => {
    if (!questions.length) {
      setError("Veuillez ajouter au moins une questions au questionnaire !");
      return;
    }
    handleNext({ gameData: questions });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <QuestionData
          questions={questions}
          updateQuestion={addQuestion}
          nbChoices={dataQuiz.nbChoices}
        />
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button onClick={() => nextStep()}>Suivant</Button>
      </Grid>
    </Grid>
  );
};

export default Questions;
