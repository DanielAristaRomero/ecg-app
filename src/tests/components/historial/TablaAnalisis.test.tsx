import { shallow } from "enzyme";
import TablaAnalisis from "../../../components/historial/TablaAnalisis";

describe("Pruebas sobre TablaAnalisis.tsx", () => {
  test("debe rendirizar el componente correctamente", () => {});
  test("debe rendirizar el componente correctamente", () => {});
  test("debe rendirizar el componente correctamente", () => {});
  test("debe rendirizar el componente correctamente", () => {
    const wrapper = shallow(<TablaAnalisis />);
    expect(wrapper).toMatchSnapshot();
  });
});
