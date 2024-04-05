import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import GameRoom from "./layouts/GameRoom";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/gameroom",
      element: <GameRoom />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
