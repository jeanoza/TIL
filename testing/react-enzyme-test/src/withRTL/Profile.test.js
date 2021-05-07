import Profile from "../counters/Profile";
import { render } from "@testing-library/react";

describe("<Profile/>", () => {
  it("matches snapshot", () => {
    const utils = render(<Profile username="jeanoza" name="Kyubong" />);
    expect(utils.container).toMatchSnapshot();
  });
  it("shows the props correctly", () => {
    const utils = render(<Profile username="jeanoza" name="Kyubong" />);
    utils.getByText("jeanoza");
    utils.getByText("(Kyubong)");
    utils.getByText(/kyu/i); // passe avec regex
  });
});
