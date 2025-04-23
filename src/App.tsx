import { useEffect } from "react";
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
    url: "https://www.youtube.com/watch?v=SkVqJ1SGeL0",
    title: "YouTube Video Sample",
    subTitle: "Caminandes 3: Llamigos",
    preview: true,
  },
  {
    url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    title: "HLS Stream Sample",
    subTitle: "Tears of Steel",
    preview:
      "https://mango.blender.org/wp-content/gallery/4k-renders/06_barley.jpg",
  },
  {
    title: "Dash Stream Sample",
    subTitle: "Elephants Dream",
    url: "https://rdmedia.bbc.co.uk/elephants_dream/1/client_manifest-all.mpd",
    preview:
      "https://orange.blender.org/wp-content/themes/orange/images/media/gallery/s1_proog.jpg",
  },
];

function App() {
  const actions = useTVPlayerStore((s) => s.actions);
  const mediaIndex = useTVPlayerStore((s) => s.mediaIndex) || 0;
  const likeToggle = useTVPlayerStore((s) => s.likeToggle);
  const fullscreen = useTVPlayerStore((s) => s.fullscreen);

  const customButtons: TVPlayerButtonProps[] = [
    { action: "loop", align: "left" },
    { action: "like", align: "left" },
    { action: "previous", align: "center" },
    { action: "playpause", align: "center" },
    { action: "next", align: "center" },
    { action: "fullscreen", align: "right" },
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

  // Called when an error occurs whilst attempting to play media
  const handleError = (
    error: any,
    data: any,
    hlsInstance: any,
    hlsGlobal: any
  ) => {
    console.log("error: ", error);
    console.log("data (optional): ", data);
    console.log("hlsInstance (optional): ", hlsInstance);
    console.log("hlsGlobal (optional): ", hlsGlobal);
  };

  // example of toggling global CSS stylings based on fullscreen state
  useEffect(() => {
    document.body.style.background = fullscreen ? "black" : "unset";
    document.body.style.overflow = fullscreen ? "hidden" : "unset";
    document.body.style.padding = fullscreen ? "0" : "revert";
    document.body.style.margin = fullscreen ? "0" : "revert";
  }, [fullscreen]);

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
        onError={handleError}
        playsinline={true}
        hideControlsOnArrowUp={true}
        disableFullscreen={false}
        disableInitNav={false}
        disableNav={false}
      />
    </>
  );
}

export default App;
