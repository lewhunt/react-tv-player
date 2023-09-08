import { render, screen } from "@testing-library/react";
import { TVPlayerUI } from "./TVPlayerUI";
import { TVPlayerButtonProps } from "../TVPlayerTypes";

test("render", () => {
  render(<TVPlayerUI />);
  const element = screen.getByTestId("tv-player-ui");
  expect(element).toBeInTheDocument();
});

test("renders default buttons", () => {
  const { getByTestId } = render(<TVPlayerUI />);

  expect(getByTestId("loop")).toBeInTheDocument();
  expect(getByTestId("skipback")).toBeInTheDocument();
  expect(getByTestId("playpause")).toBeInTheDocument();
  expect(getByTestId("skipforward")).toBeInTheDocument();
  expect(getByTestId("mute")).toBeInTheDocument();
});

test("renders progress bar", () => {
  const { getByTestId } = render(<TVPlayerUI />);
  expect(getByTestId("progress-bar")).toBeInTheDocument();
});

test("renders custom buttons", () => {
  const customButtons: TVPlayerButtonProps[] = [
    { action: "like" },
    { action: "previous" },
    { action: "playpause" },
    { action: "next" },
    { action: "custom", label: "More" },
  ];

  const { getByTestId, getByText } = render(
    <TVPlayerUI customButtons={customButtons} />
  );

  expect(getByTestId("like")).toBeInTheDocument();
  expect(getByTestId("previous")).toBeInTheDocument();
  expect(getByTestId("playpause")).toBeInTheDocument();
  expect(getByTestId("next")).toBeInTheDocument();
  expect(getByTestId("custom")).toBeInTheDocument();
  expect(getByText("More")).toBeInTheDocument();
});
