import { shallow } from "enzyme";
import { Navbar } from "../../components/Navbar";

describe("Pruebas sobre Navbar.tsx", () => {
  const wrapper = shallow(<Navbar />);

  test("debe rendirizar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
