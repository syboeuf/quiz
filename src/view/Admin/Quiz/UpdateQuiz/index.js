import { useState, useEffect } from "react";
import { useFirebase } from "context/Firebase";
import { useParams } from "react-router-dom";

import useIsMounted from "hooks/useIsMounted";

import UpdateQuizDesktop from "./UpdateQuizDesktop";
import GlobalContainerAdmin from "components/GlobalContainerAdmin";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UpdateQuizMobile from "./UpdateQuizMobile";

const UpdateQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { db } = useFirebase();
  const isMounted = useIsMounted();
  const { quizId } = useParams();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const getQuiz = async () => {
      setLoading(true);
      try {
        const snapshot = await db.collection("quiz").doc(quizId).get();
        if (isMounted()) {
          setQuiz({ ...snapshot.data(), id: snapshot.id });
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getQuiz();
  }, []);

  if (!quiz) {
    return <div />;
  }

  return isDesktop ? (
    <UpdateQuizDesktop quiz={quiz} />
  ) : (
    <UpdateQuizMobile quiz={quiz} />
  );
};

export default UpdateQuiz;
