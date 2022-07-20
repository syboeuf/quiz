import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Question = ({ data, next }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { question, choices } = data;

  const setAnswer = () => {
    errorMessage && setErrorMessage(null);
    if (!selectedChoice) {
      setErrorMessage("Merci de sélectionner une réponse");
      return;
    }
    next(selectedChoice);
    setSelectedChoice(null);
  };

  return (
    <Grid container spacing={3}>
      {errorMessage && (
        <Grid item xs={12}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography align="center">{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {Object.entries(choices).map(([key, value], index) => (
            <Grid
              key={index}
              item
              xs={6}
              align="center"
              onClick={() => setSelectedChoice(key)}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "1px solid black",
                  borderRadius: 1,
                  padding: 1,
                  marginLeft: 3,
                  marginRight: 3,
                  cursor: "pointer",
                  background: selectedChoice === key ? "#3f51b5" : "white",
                  color: selectedChoice === key ? "white" : "black",
                }}
              >
                <Typography>{`${key})`}</Typography>
                <Typography sx={{ marginLeft: 2 }}>{value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAnswer()}
            >
              Suivant
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
