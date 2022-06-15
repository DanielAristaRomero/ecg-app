import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardAnalisis } from "../../../components/historial/CardAnalisis";

describe("Pruebas sobre CardAnalisis.tsx", () => {
  test("debe rendirizar el componente correctamente", () => {
    render(
      <MemoryRouter>
        <CardAnalisis
          uuid="8ad29d5-b387-4ced-bbe6-79e7c6bf88331"
          fecha="022-03-21T22:03:31-06:00"
          hayPadecimientos={true}
          ptcSeguridad={89}
        />
      </MemoryRouter>
    );
  });
});
