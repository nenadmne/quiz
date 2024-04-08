import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";
import NavigationBar from "./layouts/NavigationBar";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
