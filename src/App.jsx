import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProductDetails, {
  loader as productLoader,
} from "./pages/ProductDetails";
import Root from "./pages/root";
import Login from "./pages/Login";
import Register from "./pages/register";
import PasswordReset from "./pages/passwordreset";
import Profile from "./pages/profile";
// import AdminPortal from "./pages/adminPortal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: productLoader,
      },
      {
        path: "/me",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <PasswordReset />,
  },
  // {
  //   path: "/adminportal",
  //   element: <AdminPortal />,
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
