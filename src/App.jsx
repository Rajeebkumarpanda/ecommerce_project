import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
// import HomePage from "./pages/HomePage";
// import CartPage from "./pages/CartPage";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Suspense fallback={<h1>Loading....</h1>}><HomePage /></Suspense>,
        },
        {
          path: "cart",
          element: <Suspense fallback={<h1>Loading....</h1>}><CartPage /></Suspense>,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
