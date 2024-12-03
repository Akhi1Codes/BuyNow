import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProductDetails, {
  loader as productLoader,
} from "./pages/product/ProductDetails";
import Root from "./pages/root";
import Login from "./pages/user/Login";
import Register from "./pages/user/register";
import PasswordReset from "./pages/user/passwordreset";
import Profile from "./pages/user/profile";
// import AdminPortal from "./pages/admin/adminPortal";

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
