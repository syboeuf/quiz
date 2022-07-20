import { createContext, useReducer } from "react";

const initialState = {};

export const QuizContext = createContext(initialState);

export const reducer = (state, action) => {
  switch (action.type) {
    default:
      break;
  }
};

export function QuizProvider({ children }) {
  const [quizData, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ quizData, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

QuizContext.displayName = "UserProvider";
QuizContext.displayName = "UserContext";
