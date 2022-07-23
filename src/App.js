import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "context/quiz";
import { FirebaseContext, Firebase } from "context/Firebase";

import Home from "view/Home";
import Page from "view/Page";
import Admin from "view/Admin";
import Quiz from "view/Admin/Quiz";
import AddQuiz from "view/Admin/Quiz/AddQuiz";

import * as routes from "utils/routes";

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.page} element={<Page />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.adminQuiz} element={<Quiz />} />
          <Route path={routes.adminAddQuiz} element={<AddQuiz />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  </FirebaseContext.Provider>
);

export default App;
