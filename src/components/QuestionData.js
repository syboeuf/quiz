import { useState, useEffect } from "react";

import BoxChoice from "./BoxChoice";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const choicesArray = ["a", "b", "c", "d"];

const QuestionData = ({ data = null, updateQuestion, nbChoices = 2 }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setQuestion(data.question);
      setAnswer(data.answer);
      setQuestionsData(data.questions);
    } else {
      initializeData();
    }
  }, []);

  const initializeData = () => {
    const newQuestionsData = choicesArray
      .slice(0, nbChoices)
      .map((choice, index) => ({
        value: "",
        label: choice,
        id: index,
      }));
    setQuestionsData(newQuestionsData);
    setQuestion("");
    setAnswer("");
  };

  const handleChange = (e, { id }) => {
    const newQuestionsData = questionsData.map((choice) => ({ ...choice }));
    const index = newQuestionsData.findIndex((item) => item.id === id);
    if (index !== -1) {
      const { value } = e.target;
      newQuestionsData[index].value = value;
      setQuestionsData(newQuestionsData);
    } else {
      error && setError(null);
      setError("L'index de la question n'a pas été trouvé !");
    }
  };

  const addQuestion = () => {
    let isEmpty = false;
    questionsData.forEach(({ value }) => {
      if (!value.trim().length) {
        isEmpty = true;
      }
    });
    error && setError(null);
    if (!question.trim().length || !answer || isEmpty) {
      setError("Veuillez remplir tous les champs. Merci");
      return;
    }
    updateQuestion({ questions: questionsData, answer, question });
    initializeData();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 2 }}>Question</Typography>
        <TextField
          required
          fullWidth
          placeholder="Quelle est la capitale de la France ?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {questionsData.map((choice, index) => {
            const { value, label } = choice;
            return (
              <Grid item xs={12} md={6} key={index}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ mr: 2 }}>{`${label})`}</Typography>
                  <TextField
                    required
                    fullWidth
                    value={value}
                    onChange={(e) => handleChange(e, choice)}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex">
          {questionsData.map(({ label }, index) => (
            <BoxChoice
              key={index}
              setChoice={setAnswer}
              selectChoice={label}
              choice={answer}
            />
          ))}
        </Box>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button onClick={() => addQuestion()}>Ajouter</Button>
      </Grid>
    </Grid>
  );
};

export default QuestionData;
