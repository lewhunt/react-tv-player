import ReactPlayer, { ReactPlayerProps } from "react-player";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type TVPlayerButtonAction =
  | "custom"
  | "fullscreen"
  | "like"
  | "loop"
  | "mute"
  | "next"
  | "playpause"
  | "previous"
  | "skipforward"
  | "skipback";

type TVPlayerButtonAlign = "left" | "center" | "right";

export type TVPlayerButtonProps = {
  action: TVPlayerButtonAction;
  align?: TVPlayerButtonAlign;
  label?: string;
  faIcon?: IconDefinition;
  onPress?: () => void;
  onRelease?: () => void;
  isSelectedFill?: boolean;
  disabled?: boolean;
};

export interface TVPlayerProps extends ReactPlayerProps {
  activity?: boolean;
  customButtons?: TVPlayerButtonProps[];
  customToggle?: boolean;
  likeToggle?: boolean;
  mediaIndex?: number;
  mediaCount?: number;
  player?: ReactPlayer | null;
  subTitle?: string | null;
  title?: string | null;
  withTopCover?: boolean;
  hideControlsOnArrowUp?: boolean;
}
