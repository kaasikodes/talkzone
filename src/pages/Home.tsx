import { Outlet, Link, useLocation } from "react-router-dom";
import background from "../images/background.png";
import logo from "../images/talkzone_logo.svg";

const Home = () => {
  const path = useLocation().pathname;

  return (
    <div
      className="home w-full h-screen bg-no-repeat bg-auto bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="heading pt-4 mb-10 container mx-auto px-4 flex justify-start">
        <Link
          to="/"
          className="logo uppercase flex flex-col mr-6"
          style={{ width: "150px" }}
        >
          <img
            src={logo}
            alt="talkzone logo"
            style={{ objectFit: "contain" }}
          />
          <h1
            className="ml-4 font-bold text-blue-900"
            style={{ letterSpacing: "0.38em" }}
          >
            Talkzone
          </h1>
        </Link>

        <nav className="pt-1.5 flex">
          <Link to="login" className="text-white ml-8">
            Login
            {path === `/login` && (
              <div className="h-0.5 mt-1 w-6 bg-white"></div>
            )}
          </Link>
          <Link to="signup" className="text-white ml-8">
            Sign up
            {path === `/signup` && (
              <div className="h-0.5 mt-1 w-6 bg-white"></div>
            )}
          </Link>
        </nav>
      </div>
      <div className="content container mx-auto px-4 flex justify-center md:justify-end md:pr-52 relative">
        <div
          className="card px-8 py-4 w-96 h-100 bg-white shadow-md rounded-xl"
          style={{ height: "26rem" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
