import { useState, useEffect } from "react";
import { useFirebase } from "context/Firebase";

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { db } = useFirebase();

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
      setQuiz(quizData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={3}>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default Quiz;
