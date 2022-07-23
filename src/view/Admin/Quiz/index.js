import { useState, useEffect } from "react";
import { useFirebase } from "context/Firebase";
import { useNavigate } from "react-router-dom";
import * as routes from "utils/routes";

import useIsMounted from "hooks/useIsMounted";

import CardQuiz from "components/CardQuiz";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const filtersArray = ["All", "Genre", "popularity", ""];

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { db } = useFirebase();
  const isMounted = useIsMounted();
  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      setLoading(true);
      try {
        const snapshots = await db.collection("quiz").get();
        const quizData = snapshots.docs.map((snapshot) => ({
          ...snapshot.data(),
          id: snapshot.id,
        }));
        if (isMounted()) {
          setQuiz(quizData);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getQuiz();
  }, []);

  return (
    <Grid container spacing={3}>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      {loading && <CircularProgress />}
      <Grid item xs={12}>
        <Button onClick={() => navigate(routes.adminAddQuiz)}>Add quiz</Button>
      </Grid>
      {!loading && (
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {quiz.map((data, index) => {
              const { image, path, name } = data;
              return (
                <CardQuiz
                  click={() => console.log("navigate to /admin/quiz/{quidId}")}
                  image={image}
                  quizName={name}
                  key={index}
                />
              );
            })}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Quiz;
