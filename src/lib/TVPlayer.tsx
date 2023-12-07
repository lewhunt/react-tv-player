import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { useTVPlayerStore } from "./TVPlayerStore";
import { TVPlayerProps } from "./TVPlayerTypes";
import { TVPlayerUI } from "./TVPlayerUI";

import "./tv-player.scss";

function extractYouTubeIdFromUrl(url: string) {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const TVPlayer: React.FC<TVPlayerProps> = (props) => {
  init({
    debug: false,
    visualDebug: false,
    throttle: 100,
    // options
  });

  const { onReady, onStart, onPause, onPlay, onError, onEnded, onBuffer } =
    props;

  const playerRef = useRef<ReactPlayer>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const ytPreviewRef = useRef<HTMLImageElement>(null);
  const [ytPreviewError, setYtPreviewError] = useState<boolean>(true);

  const actions = useTVPlayerStore((s) => s.actions);
  const light = useTVPlayerStore((s) => s.light);
  const loop = useTVPlayerStore((s) => s.loop);
  const muted = useTVPlayerStore((s) => s.muted);
  const playing = useTVPlayerStore((s) => s.playing);
  const activity = useTVPlayerStore((s) => s.activity);
  const fullscreen = useTVPlayerStore((s) => s.fullscreen);

  const youtubeId =
    typeof props.url === "string" && extractYouTubeIdFromUrl(props.url);

  const withTopCover = props.withTopCover || !!youtubeId;

  const fetchUrlData = async (url: string) => {
    const response = await fetch(`https://noembed.com/embed?url=${url}`);
    const data: any = await response.json();
    !props.title && data.title && actions.setTitle(data.title);
    !props.subTitle &&
      data.author_name &&
      actions.setSubTitle(data.author_name);
    data.error && youtubeId && actions.setLight(false);
    if (ytPreviewRef.current && youtubeId && !!props.light) {
      ytPreviewRef.current.src =
        typeof props.light === "string"
          ? props.light
          : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    }
  };

  useEffect(() => {
    actions.setLight(props.light);
    typeof props.url === "string"
      ? fetchUrlData(props.url)
      : actions.setLight(false);
    actions.setProgress(0);
    actions.setDuration(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url, props.light]);

  useEffect(() => {
    actions.setPlaying(props.playing);
    props.playing && actions.setLight(false);
  }, [props.playing]);

  useEffect(() => actions.setTitle(props.title), [props.title]);
  useEffect(() => actions.setSubTitle(props.subTitle), [props.subTitle]);
  useEffect(() => {
    actions.setFullscreen(!props.disableFullscreen);
  }, [props.disableFullscreen]);
  useEffect(() => actions.setLoop(props.loop), [props.loop]);
  useEffect(() => actions.setMuted(props.muted), [props.muted]);
  useEffect(() => actions.setMediaCount(props.mediaCount), [props.mediaCount]);
  useEffect(() => {
    setTimeout(() => actions.setMediaIndex(props.mediaIndex));
  }, [props.mediaIndex]);

  useEffect(() => {
    document.body.style.background = fullscreen ? "black" : "unset";
    document.body.style.overflow = fullscreen ? "hidden" : "unset";
    document.body.style.padding = fullscreen ? "0" : "revert";
    document.body.style.margin = fullscreen ? "0" : "revert";
    wrapperRef.current!.style.height = fullscreen ? "100vh" : "unset";
  }, [fullscreen]);

  const handlePreview = () => {
    actions.setPlaying(true);
    actions.setLight(false);
  };

  const handlePause = () => {
    actions.setPlaying(false);
    onPause?.();
  };

  const handlePlay = () => {
    actions.setPlaying(true);
    actions.setLight(false);
    onPlay?.();
  };

  const handleReady = (player: ReactPlayer) => {
    actions.setPlayer(player);
    onReady?.(player);
  };

  const handleError = (
    error: any,
    data?: any,
    hlsInstance?: any,
    hlsGlobal?: any
  ) => {
    onError?.(error, data, hlsInstance, hlsGlobal);
  };

  const handleEnded = () => {
    actions.setPlaying(false);
    actions.setActivity(true);
    onEnded?.();
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    actions.setProgress(progress.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    actions.setDuration(duration);
  };

  const handleYtPreviewLoad = () => {
    if (ytPreviewRef.current) {
      if (
        (typeof props.light === "boolean" &&
          ytPreviewRef.current.naturalWidth >= 1280) ||
        typeof props.light === "string"
      )
        setYtPreviewError(false);
      else setYtPreviewError(true);
    }
  };

  return (
    <div
      className="tv-player"
      data-testid="tv-player"
      ref={wrapperRef}
      style={props.style}
    >
      <ReactPlayer
        data-testid="react-player"
        ref={playerRef}
        url={props.url}
        width={fullscreen ? "100%" : props.width || "100%"}
        height={fullscreen ? "100%" : props.height || "350px"}
        light={!playing && light}
        controls={props.controls}
        playIcon={props.playIcon || <></>}
        loop={loop}
        muted={muted}
        playing={playing}
        playbackRate={props.playbackRate}
        progressInterval={activity ? 200 : props.progressInterval}
        playsinline={props.playsinline}
        volume={props.volume}
        onPlay={handlePlay}
        onReady={handleReady}
        onStart={() => onStart?.()}
        onBuffer={() => onBuffer?.()}
        onEnded={handleEnded}
        onPause={handlePause}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onClickPreview={handlePreview}
        onError={handleError}
        config={
          props.config || {
            file: {
              attributes: {
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                },
              },
            },
          }
        }
      />
      <img
        ref={ytPreviewRef}
        onError={() => setYtPreviewError(true)}
        onLoad={handleYtPreviewLoad}
        alt=""
        style={{
          width: fullscreen ? "100%" : props.width || "100%",
          height: fullscreen ? "100%" : props.height || "350px",
        }}
        className={cn("yt-preview", {
          show: !ytPreviewError && light && youtubeId && !playing,
        })}
      />
      {!props.controls && <TVPlayerUI withTopCover={withTopCover} {...props} />}
    </div>
  );
};
