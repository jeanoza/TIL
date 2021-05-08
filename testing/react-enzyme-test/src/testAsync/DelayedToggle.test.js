import DelayedToggle from "./DelayedToggle";

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<DelayedToggle/>", () => {
  let container;
  let toggleButton;
  beforeEach(() => {
    container = render(<DelayedToggle />).container;
    toggleButton = screen.getByText("Toggle");
  });

  it("reveals text when toggle is On", async () => {
    userEvent.click(toggleButton);
    await screen.findByText("Boom!!");
    // await waitFor(() => screen.getByText("Boom!!"));
  });
  it("toggles text On/Off", async () => {
    userEvent.click(toggleButton);

    //utilise find
    const text1 = await screen.findByText("ON");
    expect(text1).toHaveTextContent("ON");
    //utilise waitFor avec son option {timeout:}
    const text2 = await waitFor(() => screen.getByText("ON"), {
      timeout: 3000,
    });
    expect(text2).toHaveTextContent("ON");
  });
  it("changes something when button is clicked", async () => {
    userEvent.click(toggleButton);

    //   const mutations = await waitFor(() => screen.getByText("ON"));
    const mutations = await screen.findByText("ON");
    //console.log(mutations);
  });
  it("remove text when toggle is OFF", async () => {
    userEvent.click(toggleButton);
    await screen.findByText("ON"); // toggle "ON"
    userEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => screen.getByText("Boom!!"));
  });
});
