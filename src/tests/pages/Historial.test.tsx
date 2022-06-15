import { render, screen } from "@testing-library/react";
import Historial from "../../pages/Historial";
import { shallow } from "enzyme";
import { useFetchAnalisis } from "../../hooks/useFetchAnalisis";

describe("Pruebas sobre Historial.tsx", () => {
  test("debe rendirizar el componente correctamente", () => {
    render(<Historial />);
  });
  const wrapper = shallow(<Historial />);

  test("debe mostrar el componente", () => {
    const useFetchAnalisis = jest.fn();
    const getAnalsis = jest.fn();

    getAnalsis.mockReturnValue([]);
    useFetchAnalisis.mockReturnValue({
      data: [],
      loading: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  test("debe mostrar el componente", () => {
    const useFetchAnalisis = jest.fn();
    const getAnalsis = jest.fn();

    getAnalsis.mockReturnValue([]);
    useFetchAnalisis.mockReturnValue({
      data: [],
      loading: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  test("debe mostrar 2 análisis", () => {
    const useFetchAnalisis = jest.fn();
    const analisis = [
      {
        uuid: "32d0da18-53a0-40a7-bc5f-5e94c388f7c4",
        fecha: "2022-03-21T22:03:31-06:00",
        hayPadecimientos: true,
        ptcSeguridad: 87,
        descripcion: "Se encontraron problemas con el bombeo de la sangre",
        uriECG: "https://i.blogs.es/4f78d1/18x74fr11x221/450_1000.jpg",
      },
      {
        uuid: "8ad29d5-b387-4ced-bbe6-79e7c6bf88331",
        fecha: "2022-03-21T22:03:31-06:00",
        hayPadecimientos: true,
        ptcSeguridad: 87,
        descripcion: "Se encontraron problemas con el bombeo de la sangre",
        uriECG: "https://i.blogs.es/4f78d1/18x74fr11x221/450_1000.jpg",
      },
    ];
    useFetchAnalisis.mockImplementation(() => ({
      data: analisis,
      loading: false,
    }));

    render(<Historial />);
    expect(screen.getAllByTestId("analisis-card")).toHaveLength(2);
  });

  // test("debe llamar 1 vez a la función useFetchAnalisis()", () => {
  //   const useFetchAnalisis = jest.fn();
  //   useFetchAnalisis.mockReturnValue({
  //     data: [],
  //     loading: true,
  //   });
  //   expect(useFetchAnalisis.calls.length).toBe(1);
  // });
});
