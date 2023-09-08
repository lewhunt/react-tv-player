import { TVPlayer, useTVPlayerStore, TVPlayerButtonProps } from "./lib";
import "./App.css";

// once built you can check the dist package locally:
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
    title: "YouTube URL Sample",
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
  const customToggle = useTVPlayerStore((s) => s.customToggle);

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
      label: "Custom",
      isSelectedFill: customToggle,
      onPress: () => actions.setCustomToggle(!customToggle),
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
        volume={undefined}
      />
    </>
  );
}

export default App;
