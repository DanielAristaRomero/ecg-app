import DetalleAnalisis from "../../pages/DetalleAnalisis";
import { shallow } from "enzyme";

describe("Pruebas sobre DetalleAnalisis.tsx", () => {
  test("debe mostrar el componente correctamente", () => {
    const wrapper = shallow(<DetalleAnalisis />);
    const getDetalleAnalisis = jest.fn();
    getDetalleAnalisis.mockReturnValue({});

    expect(wrapper).toMatchSnapshot();
  });
});
