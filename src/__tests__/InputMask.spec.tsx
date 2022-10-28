import React from "react";
import { render } from "@testing-library/react";

import { InputMask } from "../component";

it("correctly renders", () => {
  const { container } = render(<InputMask mask="01111-010" />);
  expect(container).toMatchSnapshot();
  expect(container.getElementsByClassName("ant-input").length).toBe(1);
});
