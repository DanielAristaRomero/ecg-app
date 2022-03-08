import { Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { routes } from "./routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export const Navigation = () => {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <div>
          <nav className="fixed bottom-0 left-0 right-0">
            <ul className="flex">
              {routes.map(({ to, name, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-indigo-500 flex-grow text-indigo-600"
                      : "flex-grow"
                  }
                >
                  <li className="text-center py-2" key={to}>
                    <FontAwesomeIcon icon={icon} className="mr-1" />
                    {name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </nav>

          <Routes>
            {routes.map(({ path, component: Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}

            <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};
