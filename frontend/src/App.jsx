import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./layouts/Homepage";
import Lobby from "./layouts/Lobby";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/lobby",
      element: <Lobby />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
