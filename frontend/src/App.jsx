import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";
import NavigationBar from "./layouts/NavigationBar";
import AdminQuestionForm, {
  addQuestionAction,
} from "./layouts/AdminQuestionForm";
import Lobby from "./layouts/Lobby";
import NotFound from "./layouts/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Leaderboards from "./layouts/Leaderboards";
import Questions, { suggestQuestionAction } from "./layouts/Questions";
import Admin from "./layouts/Admin";
import "react-toastify/dist/ReactToastify.css";
import RecievedQuestions from "./layouts/RecievedQuestions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavigationBar />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/leaderboards",
          element: <Leaderboards />,
        },
        {
          path: "/questions",
          element: <Questions />,
          action: suggestQuestionAction,
        },
        {
          path: "/lobby",
          element: <PrivateRoute element={<Lobby />} />,
        },
        {
          path: "/gameroom",
          element: <PrivateRoute element={<GameRoom />} />,
        },
        {
          path: "/administrator",
          element: <Admin />,
          children: [
            {
              path: "/administrator/addQuestion",
              element: <AdminQuestionForm />,
              action: addQuestionAction,
            },
            {
              path: "/administrator/recievedQuestions",
              element: <RecievedQuestions />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
