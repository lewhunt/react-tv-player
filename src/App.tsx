import { TVPlayer, useTVPlayerStore, TVPlayerButtonProps } from "./lib";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

// locally testing built library
//import { TVPlayer, useTVPlayerStore, TVPlayerButtonProps } from "./..";

export type MediaType = {
  url: string | string[] | MediaStream;
  title?: string;
  subTitle?: string;
  preview?: string | boolean;
};

const mediaList: MediaType[] = [
  {
    url: "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4",
    title: "MP4 Sample with Styled Subtitles",
    subTitle: "Sintel",
    preview: "https://i.ytimg.com/vi/eRsGyueVLvQ/hqdefault.jpg",
  },
];

function App() {
  const actions = useTVPlayerStore((s) => s.actions);
  const mediaIndex = useTVPlayerStore((s) => s.mediaIndex) || 0;
  const likeToggle = useTVPlayerStore((s) => s.likeToggle);

  const customButtons: TVPlayerButtonProps[] = [
    { action: "loop", align: "left" },
    { action: "like", align: "left" },
    { action: "previous", align: "center" },
    { action: "playpause", align: "center" },
    { action: "next", align: "center" },
    { action: "mute", align: "right" },
    {
      action: "custom",
      align: "right",
      label: "About",
      faIcon: faGithub,
      onPress: () => {
        window.location.href = "https://github.com/lewhunt/react-tv-player";
      },
    },
  ];

  const handleLike = () => {
    console.log("like button pressed");
    // custom app logic for like
    actions.setLikeToggle(!likeToggle);
  };

  return (
    <>
      <TVPlayer
        title={mediaList[mediaIndex].title}
        subTitle={mediaList[mediaIndex].subTitle}
        url={mediaList[mediaIndex].url}
        light={mediaList[mediaIndex].preview}
        customButtons={customButtons}
        mediaCount={mediaList.length}
        mediaIndex={0}
        onLikePress={handleLike}
        playsinline={true}
        config={{
          file: {
            attributes: {
              crossOrigin: "true",
            },
            tracks: [
              {
                kind: "subtitles",
                src: "https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt",
                srcLang: "en",
                default: true,
                label: "en",
              },
              {
                kind: "subtitles",
                src: "https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-de.vtt",
                srcLang: "de",
                label: "de",
              },
              {
                kind: "subtitles",
                src: "https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-es.vtt",
                srcLang: "es",
                label: "es",
              },
            ],
          },
        }}
      />
    </>
  );
}

export default App;
