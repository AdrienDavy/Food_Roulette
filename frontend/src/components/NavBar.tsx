import { NavLink } from "react-router-dom";
import Logo from "../assets/logo_cook_recipe.png";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="bg-primary  dark:bg-primary-dark transition-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="Cook Recipe Logo" />
          <span className="self-center text-secondary text-2xl font-semibold whitespace-nowrap dark:text-secondary-dark transition-200">
            Cook Recipe
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 underline text-tertiary dark:text-tertiary-dark hover:text-tertiary-hover dark:hover:text-tertiary-hover transition-200"
                    : "block py-2 px-3 md:p-0 text-secondary dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-hover transition-200"
                }
                aria-current="page"
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shopping-list"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 underline text-tertiary dark:text-tertiary-dark hover:text-tertiary-hover dark:hover:text-tertiary-hover transition-200"
                    : "block py-2 px-3 md:p-0 text-secondary dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-hover transition-200"
                }
                aria-current="page"
              >
                Liste de courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 underline text-tertiary dark:text-tertiary-dark hover:text-tertiary-hover dark:hover:text-tertiary-hover transition-200"
                    : "block py-2 px-3 md:p-0 text-secondary dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-hover transition-200"
                }
                aria-current="page"
              >
                Recettes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipe-creation"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 underline text-tertiary dark:text-tertiary-dark hover:text-tertiary-hover dark:hover:text-tertiary-hover transition-200"
                    : "block py-2 px-3 md:p-0 text-secondary dark:text-secondary-dark hover:text-secondary-hover dark:hover:text-secondary-hover transition-200"
                }
                aria-current="page"
              >
                Création de recettes
              </NavLink>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
