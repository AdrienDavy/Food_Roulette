import { NavLink } from "react-router-dom";
import Logo from "../assets/logo_cook_recipe.png";
import ChefHat from "../components/ChefHat";
import useNavHeight from "../hooks/useNavHeight"; // Chemin vers ton hook

const Home = () => {
  const navHeight = useNavHeight();

  return (
    <div
      className="home flex flex-col items-center justify-center gap-4 "
      style={{ height: `calc(100dvh - ${navHeight}px)` }}
    >
      <div className=" z-10 backdrop-blur-sm bg-gradient-to-tr from-[rgba(50,50,50,0.5)] to-[rgba(255,255,255,0.1)] p-8 rounded-lg flex flex-col items-center gap-4 shadow-lg">
        <picture className=" max-w-48 max-h-48 ">
          <img src={Logo} alt="Logo" />
        </picture>
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-secondary dark:text-secondary-dark transition-200">
            Bienvenue sur Cook Recipe
          </h1>
          <p className="text-center text-2xl text-secondary dark:text-secondary-dark transition-200">
            Que souhaitez-vous faire ?
          </p>
          <NavLink to="/shopping-list" type="button" className="primary-button">
            Je veux faire mes courses
          </NavLink>

          <NavLink to="/recipes" className="primary-button">
            Je veux cuisiner
          </NavLink>
        </div>
      </div>
      <ChefHat />
    </div>
  );
};

export default Home;
