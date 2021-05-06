import { shallow } from "enzyme";
import Counter from "./Counter";

describe("<Counter/>", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).toMatchSnapshot();
  });
  it("has initial number", () => {
    const wrapper = shallow(<Counter />);
    //.state() : acces à la state
    expect(wrapper.state().number).toBe(0);
  });
  it("plus", () => {
    const wrapper = shallow(<Counter />);
    //.instance() : acces à la function(instance, methode)
    wrapper.instance().handlePlus(); // execute handlePlus() une fois
    expect(wrapper.state().number).toBe(1);
  });
  it("minus", () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleMinus(); // execute handleMinus() une fois
    expect(wrapper.state().number).toBe(-1);
  });
  it("call handlePlus", () => {
    //cherche node qui correspond à la condition
    const wrapper = shallow(<Counter />);
    const plusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "+1"
    );
    //simulation d'un event (click dans ce cas)
    plusButton.simulate("click");
    expect(wrapper.state().number).toBe(1);
  });
  it("call handleMinus", () => {
    //cherche node qui correspond à la condition
    const wrapper = shallow(<Counter />);
    const minusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "-1"
    );
    //simulation d'un event (click dans ce cas)
    minusButton.simulate("click");
    expect(wrapper.state().number).toBe(-1);
  });
});
