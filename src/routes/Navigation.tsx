import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { v4 as uuidv4 } from "uuid";
import DetalleAnalisis from "../pages/DetalleAnalisis";
import { Navbar } from "../components/Navbar";

export const Navigation = () => {
  useEffect(() => {
    if (!localStorage.getItem("key-aut-ecg-app")) {
      localStorage.setItem("key-aut-ecg-app", uuidv4());
    }
  }, []);

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Navbar />
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}

        <Route path="/historial/detalle/:id" element={<DetalleAnalisis />} />
        <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
      </Routes>
    </Suspense>
  );
};
