import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// function context() {
//     const { currentUser } = useContext(AuthContext);
//     console.log(currentUser);
// }


const router = createBrowserRouter([
{
    path: "/",
    element: <Home />,
},
{
    path: "/login",
    element: <Login />,
},
{
    path: "/register",
    element: <Register />,
},
]);

export default router