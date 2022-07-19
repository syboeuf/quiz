import { useState, useEffect } from "react";
import { questions } from "./constants";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

const Responses = ({ answers }) => {
  const [goodAnswersLength, setGoodAnswerslength] = useState(0);

  useEffect(() => {
    let sumGoodAnswers = 0;
    answers.forEach((choice, index) => {
      if (choice === questions[index].answer) {
        sumGoodAnswers++;
      }
    });
    setGoodAnswerslength(sumGoodAnswers);
  }, []);

  return (
    <Box sx={{ padding: 2 }} display="flex">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography align="center">
            {`Votre score : ${goodAnswersLength}/${questions.length}`}
          </Typography>
        </Grid>
        {questions.map(({ answer, choices }, index) => (
          <Grid item xs={8} key={index}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid black",
                borderRadius: 1,
                borderColor: answer === answers[index] ? "green" : "red",
              }}
              display="flex"
            >
              {answer === answers[index] ? <DoneAllIcon /> : <CloseIcon />}
              {answer === answers[index] && (
                <Typography sx={{ marginLeft: 2 }}>
                  {choices[answer]}
                </Typography>
              )}
              {answer !== answers[index] && (
                <Box sx={{ marginLeft: 2 }}>
                  <Box display="flex" alignItems="center">
                    <Typography>Votre réponse :</Typography>
                    <Typography sx={{ marginLeft: 2 }}>
                      {choices[answers[index]]}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography>Bonne réponse : </Typography>
                    <Typography sx={{ marginLeft: 2 }}>
                      {choices[answer]}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Responses;
