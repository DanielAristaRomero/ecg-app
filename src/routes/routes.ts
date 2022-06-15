import { lazy, LazyExoticComponent } from "react";
import Home from "../pages/Home";
import Historial from "../pages/Historial";
import {
  faFileContract,
  faHeartPulse,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
  icon: IconDefinition;
}

// const lazyHome = () => import("../pages/Home");
// const lazyHistorial = lazy(() => import("../pages/Historial"));

export const routes: Route[] = [
  {
    to: "/inicio",
    path: "inicio",
    component: Home,
    name: "Inicio",
    icon: faHeartPulse,
  },
  {
    to: "/historial",
    path: "historial",
    component: Historial,
    name: "Historial",
    icon: faFileContract,
  },
];
