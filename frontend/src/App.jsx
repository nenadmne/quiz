import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";

import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./components/NavigationBar";

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
          path: "/gameroom",
          element: <GameRoom />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
