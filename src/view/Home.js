import { useState, useEffect } from "react";
import { useFirebase } from "context/Firebase";
import { useNavigate } from "react-router-dom";

import useIsMounted from "hooks/useIsMounted";

import GlobalContainer from "components/GlobalContainer";
import CardQuiz from "components/CardQuiz";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { db } = useFirebase();
  const navigate = useNavigate();
  const isMounted = useIsMounted();

  useEffect(() => {
    getQuiz();
  }, []);

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

  return (
    <GlobalContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center">Quiz</Typography>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {loading && <CircularProgress />}
        {!loading && (
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              {quiz.map((data, index) => {
                const { image, path, name } = data;
                return (
                  <CardQuiz
                    click={() => navigate(path)}
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
    </GlobalContainer>
  );
};

export default Home;
