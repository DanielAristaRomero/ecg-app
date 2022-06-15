import { render } from "@testing-library/react";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Historial from "../../pages/Historial";
import { Navigation } from "../../routes/Navigation";

describe("Pruebas sobre Historial.tsx", () => {
  test("Debe renderizar el componente correctamente", () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
  });
});
