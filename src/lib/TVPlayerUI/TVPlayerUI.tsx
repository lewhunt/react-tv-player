import cn from "classnames";
import React, { CSSProperties, useEffect } from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { use100vh } from "react-div-100vh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faPlay,
  faPause,
  faRepeat,
  faVolumeHigh,
  faVolumeMute,
  faEllipsis,
  faForwardStep,
  faBackwardStep,
  faExpand,
  faCompress,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { useTVPlayerActivity } from "../TVPlayerActivity";
import { useTVPlayerStore } from "../TVPlayerStore";
import { TVPlayerProps, TVPlayerButtonProps } from "../TVPlayerTypes";

import "./tv-player-ui.scss";

const formatTime = (value: number) => {
  if (isNaN(value)) {
    return;
  }
  let totalSeconds = value;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = String(Math.floor(totalSeconds / 60));
  let seconds = String(Math.floor(totalSeconds % 60));
  seconds = seconds.padStart(2, "0");
  if (hours > 0) {
    minutes = minutes.padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

export const TVPlayerUI: React.FC<TVPlayerProps> = (props) => {
  const {
    onLoopPress,
    onLikePress,
    onPreviousPress,
    onSkipBackPress,
    onSkipForwardPress,
    onSkipReleasePress,
    onNextPress,
    onMutePress,
    onFullscreenPress,
    withTopCover,
    customButtons,
    disableFullscreen,
    hideControlsOnArrowUp,
  } = props;
  const { focusKey, ref } = useFocusable();

  useTVPlayerActivity();

  const div100vh = use100vh();

  const actions = useTVPlayerStore((s) => s.actions);
  const activity = useTVPlayerStore((s) => s.activity);
  const duration = useTVPlayerStore((s) => s.duration);
  const fullscreen = useTVPlayerStore((s) => s.fullscreen);
  const light = useTVPlayerStore((s) => s.light);
  const likeToggle = useTVPlayerStore((s) => s.likeToggle);
  const loop = useTVPlayerStore((s) => s.loop);
  const mediaIndex = useTVPlayerStore((s) => s.mediaIndex) || 0;
  const mediaCount = useTVPlayerStore((s) => s.mediaCount);
  const muted = useTVPlayerStore((s) => s.muted);
  const player = useTVPlayerStore((s) => s.player);
  const playing = useTVPlayerStore((s) => s.playing);
  const progress = useTVPlayerStore((s) => s.progress);
  const subTitle = useTVPlayerStore((s) => s.subTitle);
  const title = useTVPlayerStore((s) => s.title);

  const skipIncrement = duration / 30;

  const hasMedias = mediaCount && mediaCount > 1;

  const currentButtons: TVPlayerButtonProps[] = (customButtons !== null &&
    customButtons) || [
    { action: "loop", align: "left" },
    { action: hasMedias ? "previous" : "skipback" },
    { action: "playpause" },
    { action: hasMedias ? "next" : "skipforward" },
    { action: disableFullscreen ? "fullscreen" : "mute", align: "right" },
  ];

  const toggleLoop = () => {
    actions.setLoop(!loop);
    onLoopPress?.();
  };

  const togglePlay = () => {
    actions.setPlaying(!playing);
    actions.setLight(false);
  };

  const toggleMuted = () => {
    actions.setMuted(!muted);
    onMutePress?.();
  };

  const toggleFullscreen = () => {
    actions.setFullscreen(!fullscreen);
    onFullscreenPress?.();
  };

  const handlePrevious = () => {
    mediaIndex && mediaIndex > 0 && actions.setMediaIndex(mediaIndex - 1);
    onPreviousPress?.();
  };

  const handleSkipBack = () => {
    player && player.seekTo(player.getCurrentTime() - skipIncrement);
    onSkipBackPress?.();
  };

  const handleSkipForward = () => {
    player && player.seekTo(player.getCurrentTime() + skipIncrement);
    onSkipForwardPress?.();
  };

  const handleNext = () => {
    mediaCount &&
      mediaIndex < mediaCount - 1 &&
      actions.setMediaIndex(mediaIndex + 1);
    onNextPress?.();
  };

  const handleSkipRelease = () => {
    !playing && togglePlay();
    onSkipReleasePress?.();
  };

  const buttonMap: Record<string, TVPlayerButtonProps> = {
    loop: {
      action: "loop",
      label: loop ? "Looping" : "Loop",
      onPress: toggleLoop,
      faIcon: faRepeat,
      isSelectedFill: loop,
    },
    like: {
      action: "like",
      label: likeToggle ? "Liked" : "Like",
      onPress: onLikePress,
      faIcon: likeToggle ? faHeartSolid : faHeart,
    },
    previous: {
      action: "previous",
      label: "Previous",
      onPress: handlePrevious,
      faIcon: faBackwardStep,
      disabled: mediaIndex === 0,
    },
    skipback: {
      action: "skipback",
      label: "Skip Back",
      onPress: handleSkipBack,
      onRelease: handleSkipRelease,
      faIcon: faBackward,
    },
    playpause: {
      action: "playpause",
      label: playing ? "Pause" : "Play",
      onPress: togglePlay,
      faIcon: playing ? faPause : faPlay,
    },
    skipforward: {
      action: "skipforward",
      label: "Skip Forward",
      onPress: handleSkipForward,
      onRelease: handleSkipRelease,
      faIcon: faForward,
    },
    next: {
      action: "next",
      label: "Next",
      onPress: handleNext,
      faIcon: faForwardStep,
      disabled: mediaCount ? mediaIndex === mediaCount - 1 : false,
    },
    mute: {
      action: "mute",
      label: muted ? "Muted" : "Mute",
      onPress: toggleMuted,
      faIcon: muted ? faVolumeMute : faVolumeHigh,
    },
    fullscreen: {
      action: "fullscreen",
      label: fullscreen ? "Minimise" : "Fullscreen",
      onPress: toggleFullscreen,
      faIcon: fullscreen ? faCompress : faExpand,
    },
    custom: {
      action: "custom",
      label: "Custom",
    },
  };

  const renderButtons = (align: string) => {
    return (
      <>
        {currentButtons.map((button, index) => {
          if (button.align === align || (!button.align && align === "center")) {
            return (
              <ControlButton
                className={cn({
                  "selected-fill":
                    button.isSelectedFill ||
                    buttonMap[button.action].isSelectedFill,
                })}
                focusKey={button.action}
                handlePress={
                  button.onPress ||
                  buttonMap[button.action].onPress ||
                  undefined
                }
                handleRelease={
                  button.onRelease ||
                  buttonMap[button.action].onRelease ||
                  undefined
                }
                key={index}
                disabled={button.disabled || buttonMap[button.action].disabled}
                handleArrowPress={(dir) => {
                  if (hideControlsOnArrowUp && dir === "up") {
                    actions.setActivity(false);
                  }
                  return true;
                }}
              >
                <FontAwesomeIcon
                  icon={
                    button.faIcon ||
                    buttonMap[button.action].faIcon ||
                    faEllipsis
                  }
                />

                <small>{button.label || buttonMap[button.action].label}</small>
              </ControlButton>
            );
          }
        })}
      </>
    );
  };

  return (
    <div
      className="tv-player-ui"
      data-testid="tv-player-ui"
      style={{
        width: fullscreen ? "100%" : props.width || "100%",
        height: fullscreen ? div100vh || "100%" : props.height || "350px",
      }}
    >
      <div
        className={cn("tv-player-ui__cover", {
          hide: !activity,
          "with-top-cover": withTopCover || !light,
          "light-cover": light && !playing,
        })}
      />
      {activity && (
        <>
          <div className="metadata-wrapper">
            <div className="metadata metadata--title">{title}</div>
            <div className="metadata metadata--subTitle">{subTitle}</div>
          </div>

          <FocusContext.Provider value={focusKey}>
            <div className="buttons" ref={ref}>
              <div className="buttons__left">{renderButtons("left")}</div>

              <div className="buttons__center">{renderButtons("center")}</div>

              <div className="buttons__right">{renderButtons("right")}</div>
            </div>
          </FocusContext.Provider>

          <ProgressBar
            currentTime={progress.playedSeconds}
            duration={duration}
            player={player}
            handleSkipForward={handleSkipForward}
            handleSkipBack={handleSkipBack}
          />
        </>
      )}
    </div>
  );
};

function ProgressBar(props: any) {
  const { currentTime, duration, player, handleSkipForward, handleSkipBack } =
    props;
  const progressPercentage = (currentTime / duration) * 100;

  const handleSeekToPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    const innerDiv = event.currentTarget;
    const clickX = event.nativeEvent.offsetX;
    const calculatedPercentage = clickX / innerDiv.offsetWidth;
    player && player.seekTo(calculatedPercentage * duration);
  };

  const disabled =
    !player || !duration || currentTime >= 86400 || duration >= 86400;

  return (
    <div
      className={cn("progress-bar", {
        hide: disabled,
      })}
      data-testid="progress-bar"
    >
      <span data-testid="current-time" className="time">
        {player && formatTime(currentTime)}
      </span>
      <span
        className="bar-wrapper"
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={handleSeekToPosition}
      >
        <div className="bar">
          {!disabled && (
            <ControlButton
              style={{ left: `${progressPercentage}%` }}
              className="progress-bar-button"
              focusKey="progress-bar-button"
              key="progress-bar-button"
              handleArrowPress={(dir) => {
                if (dir === "up" || dir === "down") return true;
                dir === "left" ? handleSkipBack() : handleSkipForward();
                return false;
              }}
            />
          )}
          <span
            className="fill"
            style={{ width: `${progressPercentage}%` }}
          ></span>
        </div>
      </span>

      <span data-testid="duration" className="time time--duration">
        {player && formatTime(duration)}
      </span>
    </div>
  );
}

type ControlButtonProps = {
  children?: React.ReactNode;
  handlePress?: () => void | undefined;
  handleRelease?: () => void | undefined;
  handleArrowPress?: (dir: string) => boolean;
  focusKey: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

function ControlButton(props: ControlButtonProps) {
  const {
    children,
    handlePress,
    handleRelease,
    handleArrowPress = () => true,
    focusKey,
    className,
    style,
    disabled,
  } = props;
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: !disabled ? handlePress : undefined,
    onEnterRelease: !disabled ? handleRelease : undefined,
    onArrowPress: handleArrowPress,
  });
  useEffect(() => {
    focusKey === "playpause" && focusSelf();
  }, [focusSelf, focusKey]);
  return (
    <button
      style={style}
      data-testid={focusKey}
      className={cn(className, { focused, disabled })}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      focus-key={focusKey}
      ref={ref}
      onMouseEnter={focusSelf}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
