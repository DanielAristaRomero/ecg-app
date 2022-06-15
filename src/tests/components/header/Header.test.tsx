import { shallow } from "enzyme";
import { Header } from "../../../components/header/Header";

describe("Pruebas sobre Header.tsx", () => {
  test("debe rendirizar el componente correctamente", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
