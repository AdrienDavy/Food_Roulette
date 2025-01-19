import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ShoppingList from "./pages/ShoppingList.tsx";
import Page404 from "./pages/Page404.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Recipes from "./pages/Recipes.tsx";
import Recipe from "./pages/Recipe.tsx";
import RecipeCreation from "./pages/RecipeCreation.tsx";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_URL}`,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shopping-list",
        element: <ShoppingList />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipes/:id",
        element: <Recipe />,
      },
      {
        path: "/recipe-creation",
        element: <RecipeCreation />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
