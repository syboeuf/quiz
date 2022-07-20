import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "context/quiz";

import Home from "view/Home";
import Page from "view/Page";

import * as routes from "utils/routes";

const App = () => (
  <QuizProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.page} element={<Page />} />
      </Routes>
    </BrowserRouter>
  </QuizProvider>
);

export default App;
