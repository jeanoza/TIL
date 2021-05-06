import React from "react";
import { mount } from "enzyme";
import Profile from "../Profile";

describe("<Profile/>", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<Profile username="jeanoza" name="kyubong" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders username and name", () => {
    //.props(): acces au props
    const wrapper = mount(<Profile username="jeanoza" name="kyubong" />);
    console.log(wrapper.props()); //{ username: 'jeanoza', name: 'kyubong' }
    expect(wrapper.props().username).toBe("jeanoza");
    expect(wrapper.props().name).toBe("kyubong");
    //.find() : comme querySelector("") en DOM
    const boldElement = wrapper.find("b");
    expect(boldElement.contains("jeanoza")).toBe(true);
  });
});
