import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const homeLocation = location.pathname === "/";

  return (
    <>
      <ToastContainer
        toastClassName="toast-custom"
        bodyClassName="toast-body"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {!homeLocation && (
        <header className="header">
          <NavBar />
        </header>
      )}
      <main className=" bg-primary dark:bg-primary-dark transition-200">
        <Outlet />
      </main>
    </>
  );
};

export default App;
