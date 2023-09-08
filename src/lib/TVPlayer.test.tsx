import { render, screen } from "@testing-library/react";
import { TVPlayer } from ".";

test("render", () => {
  render(<TVPlayer />);
  const element = screen.getByTestId("tv-player");
  expect(element).toBeInTheDocument();
  // screen.debug();
});

test("renders react-player", () => {
  render(<TVPlayer />);
  const element = screen.getByTestId("react-player");
  expect(element).toBeInTheDocument();
});

test("renders metadata and UI", () => {
  const { getByText } = render(
    <TVPlayer title="U Can't Touch This" subTitle="MC Hammer" />
  );
  const element = screen.getByTestId("tv-player-ui");
  expect(element).toBeInTheDocument();
  expect(getByText("U Can't Touch This")).toBeInTheDocument();
  expect(getByText("MC Hammer")).toBeInTheDocument();
});
