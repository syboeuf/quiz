import { useState, useEffect } from "react";

import BoxChoice from "./BoxChoice";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const choicesArray = ["a", "b", "c", "d"];

const Questions = ({ dataQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    const { nbChoices } = dataQuiz;
    const newQuestionsData = choicesArray
      .slice(nbChoices)
      .map((choice, index) => ({
        value: "",
        label: choice,
        id: index,
      }));
    setQuestionsData(newQuestionsData);
  };

  const handleChange = (e, { id }) => {
    const newQuestionsData = questionsData.map((choice) => ({ ...choice }));
    const index = newQuestionsData.findIndex((item) => item.id === id);
    if (index !== -1) {
      const { value } = e.target;
      newQuestionsData[index].value = value;
      setQuestionsData(newQuestionsData);
    } else {
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
    if (!question.trim().length || !answer || isEmpty) {
      setError("Veuillez remplir tous les champs. Merci");
      return;
    }
    const newQuestions = questions.map((item) => ({ ...item }));
    newQuestions.push({ questions: questionsData, answer, question });
    setQuestions(newQuestions);
    initializeData();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Accordion disabled={!questions.length}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Voir les questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {questions.map((item, index) => {
              const { questions: questionsData, answer, question: text } = item;
              return (
                <Box key={index} m={1}>
                  <Typography>{`Question: ${text}`}</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {questionsData.map(({ value, label }, index) => (
                      <Typography
                        key={index}
                        sx={{ mr: 2 }}
                      >{`${label}) ${value}`}</Typography>
                    ))}
                  </Box>
                  <Typography>{`Réponse: ${answer}`}</Typography>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
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

export default Questions;
