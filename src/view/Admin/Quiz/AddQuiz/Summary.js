import { useState } from "react";
import { useFirebase } from "context/Firebase";

import UpdateQuestion from "./UpdateQuestion";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Summary = ({ dataQuiz, setDataQuiz, handleBack }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openUpdateQuestion, setOpenUpdateQuestion] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { functions } = useFirebase();
  const { gameData, nbChoices } = dataQuiz;

  const handleCloseUpdateQuestion = (isUpdated, question = null) => {
    if (isUpdated && question) {
      const { id } = questionData;
      const index = gameData.findIndex((item) => item.id === id);
      const newGameData = gameData.map((item) => ({ ...item }));
      newGameData[index] = question;
      setDataQuiz((prevData) => ({ ...prevData, gameData: newGameData }));
      setQuestionData(null);
    }
    setOpenUpdateQuestion(false);
  };

  const updateQuestion = (data) => {
    setQuestionData(data);
    setOpenUpdateQuestion(true);
  };

  const deleteQuestion = (index) => {
    const newGameData = gameData.map((item) => ({ ...item }));
    newGameData.splice(index, 1);
    setDataQuiz((prevData) => ({ ...prevData, gameData: newGameData }));
    newGameData.length === 0 && handleBack();
  };

  const sendQuiz = async () => {
    error && setError(null);
    try {
      const { title, themes, gameData } = dataQuiz;
      const submitQuiz = functions.httpsCallable("submitQuiz");
      await submitQuiz({
        title,
        themes,
        gameData,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container spacing={3}>
      {openUpdateQuestion && (
        <UpdateQuestion
          open={openUpdateQuestion}
          handleClose={handleCloseUpdateQuestion}
          question={questionData}
          nbChoices={nbChoices}
        />
      )}
      <Grid item xs={12}>
        <Accordion disabled={!gameData.length}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Voir les questions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {gameData.map((item, index) => {
              const { questions, answer, question } = item;
              return (
                <Box key={index} m={1} display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <Typography>{`Question: ${question}`}</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {questions.map(({ value, label }, index) => (
                        <Typography
                          key={index}
                          sx={{ mr: 2 }}
                        >{`${label}) ${value}`}</Typography>
                      ))}
                    </Box>
                    <Typography>{`Réponse: ${answer}`}</Typography>
                  </Box>
                  <Box display="flex">
                    <IconButton onClick={() => updateQuestion(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button onClick={() => sendQuiz()}>Créér le quiz</Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
