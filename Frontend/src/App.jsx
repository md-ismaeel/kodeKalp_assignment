import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import NotFound from "./Page/NotFound/NotFound";
import { useSelector } from "react-redux";


function App() {
  const { isLogin } = useSelector((state) => state.userSlice);

  const loginRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "register",
      element: <Register />,
      errorElement: <NotFound />,
    },
  ]);

  const logoutRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "register",
      element: <Register />,
      errorElement: <NotFound />,
    },
  ]);

  return (
    <RouterProvider
      router={isLogin ? loginRoutes : logoutRoutes}
    ></RouterProvider>
  );
}

export default App;
