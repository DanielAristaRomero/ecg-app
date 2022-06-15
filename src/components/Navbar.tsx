import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileContract,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <>
      <div className="relative hidden md:flex">
        <div className="flex absolute w-full top-3 px-3">
          <h1 className="text-white text-2xl">
            <FontAwesomeIcon className="mr-1" icon={faHeartPulse} />
            Heartly
          </h1>
          <button className="text-lg ml-8 mt-1">
            <NavLink
              to="/inicio"
              className={({ isActive }) =>
                isActive
                  ? "px-2 py-1 bg-white rounded-full text-gray-900 transition-all"
                  : "px-2 py-1 rounded-full text-white transition-all"
              }
            >
              Inicio
            </NavLink>
          </button>
          <button className="text-lg ml-8 mt-1">
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                isActive
                  ? "px-2 py-1 bg-white rounded-full text-gray-900 transition-all"
                  : "px-2 py-1 rounded-full text-white transition-all"
              }
            >
              Historial
            </NavLink>
          </button>
        </div>
      </div>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <ul className="flex bg-white">
          <NavLink
            to="/inicio"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 flex-grow text-sky-500"
                : "flex-grow"
            }
          >
            <li className="text-center py-2">
              <FontAwesomeIcon icon={faHeartPulse} className="mr-1" />
              Inicio
            </li>
          </NavLink>
          <NavLink
            to="/historial"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 flex-grow text-sky-500"
                : "flex-grow"
            }
          >
            <li className="text-center py-2">
              <FontAwesomeIcon icon={faFileContract} className="mr-1" />
              Historial
            </li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};
