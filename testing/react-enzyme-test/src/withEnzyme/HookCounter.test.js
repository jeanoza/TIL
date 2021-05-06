import { mount } from "enzyme";
import HookCounter from "../HookCounter";

describe("<Counter/>", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<HookCounter />);
    expect(wrapper).toMatchSnapshot();
  });
  it("call handlePlus", () => {
    const wrapper = mount(<HookCounter />);
    const plusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "+1"
    );
    plusButton.simulate("click");
    plusButton.simulate("click");
    //en Hook, incapable d'utiliser .state(), => trouver element HTML avec .find()
    const number = wrapper.find("h2");
    //.text() rend string
    expect(number.text()).toBe("2");

    expect(number.text()).toBe("2");
  });
  it("call handleMinus", () => {
    const wrapper = mount(<HookCounter />);
    const minusButton = wrapper.findWhere(
      (node) => node.type() === "button" && node.text() === "-1"
    );
    minusButton.simulate("click");
    minusButton.simulate("click");
    const number = wrapper.find("h2");
    expect(number.text()).toBe("-2");
  });
});
