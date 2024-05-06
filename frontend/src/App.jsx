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
import RecievedQuestions from "./layouts/RecievedQuestions";
import AdminDashboard from "./layouts/AdminDashboard";
import AdminRoute from "./components/PrivateRoute/AdminRoute";

import "react-toastify/dist/ReactToastify.css";
import NonAdminRoute from "./components/PrivateRoute/NonAdminRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavigationBar />,
      children: [
        {
          path: "/",
          element: <NonAdminRoute element={<Homepage />} />,
        },
        {
          path: "/leaderboards",
          element: <NonAdminRoute element={<Leaderboards />} />,
        },
        {
          path: "/questions",
          element: <NonAdminRoute element={<Questions />} />,
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
              path: "/administrator",
              element: <AdminRoute element={<AdminDashboard />} />,
            },
            {
              path: "/administrator/add-question",
              element: <AdminRoute element={<AdminQuestionForm />} />,
              action: addQuestionAction,
            },
            {
              path: "/administrator/recieved-questions",
              element: <AdminRoute element={<RecievedQuestions />} />,
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
