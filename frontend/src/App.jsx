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
import Questions from "./layouts/Questions";

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
          path: "/admin",
          element: <PrivateRoute element={<AdminPage />} />,
          action: addQuestionAction,
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
