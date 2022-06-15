import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import Home from "../../pages/Home";

describe("Pruebas sobre Home.tsx", () => {
  const wrapper = shallow(<Home />);

  test("debe renderizar componente correctamente", () => {
    render(<Home />);
  });

  test("debe rendirizar el componente correctamente", () => {});
  test("debe mostrar el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
