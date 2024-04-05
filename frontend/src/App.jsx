import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import Lobby from "./layouts/Lobby";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/gameroom",
      element: <h1>Game Room </h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
