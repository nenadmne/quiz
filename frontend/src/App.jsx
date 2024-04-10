import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";
import NavigationBar from "./layouts/NavigationBar";
import AdminPage, { addQuestionAction } from "./layouts/AdminPage";

import "react-toastify/dist/ReactToastify.css";
import Lobby from "./layouts/Lobby";

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
          path: "/lobby",
          element: <Lobby />,
        },
        {
          path: "/gameroom",
          element: <GameRoom />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
          action: addQuestionAction
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
