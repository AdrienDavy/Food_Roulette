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
      <div className=" z-10 backdrop-blur-sm bg-gradient-to-tr from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.1)] p-8 rounded-lg flex flex-col items-center gap-4 shadow-lg">
        <picture className=" max-w-48 max-h-48 ">
          <img src={Logo} alt="Logo" />
        </picture>
        <div className="flex flex-col items-center gap-4 ">
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
