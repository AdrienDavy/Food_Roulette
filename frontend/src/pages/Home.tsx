import Logo from "../assets/logo_cook_recipe.png";
import useNavHeight from "../hooks/useNavHeight"; // Chemin vers ton hook

const Home = () => {
  const navHeight = useNavHeight();

  return (
    <div
      className="home flex flex-col items-center justify-center gap-4"
      style={{ height: `calc(100dvh - ${navHeight}px)` }}
    >
      <picture className=" max-w-48 max-h-48">
        <img src={Logo} alt="Logo" />
      </picture>
      <div className="flex flex-col items-center gap-4">
        <button type="button" className="primary-button">
          Je veux faire mes courses
        </button>

        <button type="button" className="primary-button">
          Je veux faire cuisiner
        </button>
      </div>
    </div>
  );
};

export default Home;
