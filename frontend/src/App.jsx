import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";
import NavigationBar from "./layouts/NavigationBar";
import AdminPage, { addQuestionAction } from "./layouts/AdminPage";
import Lobby from "./layouts/Lobby";
import NotFound from "./layouts/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import Leaderboards, { leaderboardsLoader } from "./layouts/Leaderboards";
import Questions, { suggestQuestionAction } from "./layouts/Questions";
import AdminHome from "./layouts/AdminHome";

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
          loader: leaderboardsLoader,
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
          element: <AdminHome />,
          children: [
            {
              path: "/administrator/addQuestion",
              element: <AdminPage />,
              action: addQuestionAction,
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
