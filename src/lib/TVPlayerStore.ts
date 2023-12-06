import { create } from "zustand";
import ReactPlayer from "react-player";
import { TVPlayerProps } from "./TVPlayerTypes";

const INITIAL_STATE: TVPlayerProps = {
  activity: true,
  duration: 0,
  mediaIndex: 0,
  mediaCount: 0,
  progress: {
    playedSeconds: 0,
  },
};

export const useTVPlayerStore = create<TVPlayerProps>()((set) => ({
  ...INITIAL_STATE,
  actions: {
    setActivity: (activity: boolean) => set({ activity }),
    setCustomToggle: (customToggle: boolean) => set({ customToggle }),
    setDuration: (duration: number) => set({ duration }),
    setFullscreen: (fullscreen: boolean) => set({ fullscreen }),
    setLight: (light: boolean) => set({ light }),
    setLikeToggle: (likeToggle: boolean) => set({ likeToggle }),
    setLoop: (loop: boolean) => set({ loop }),
    setMediaIndex: (mediaIndex: number) => set({ mediaIndex }),
    setMediaCount: (mediaCount: number) => set({ mediaCount }),
    setMuted: (muted: boolean) => set({ muted }),
    setPlayer: (player: ReactPlayer) => set({ player }),
    setPlaying: (playing: boolean) => set({ playing }),
    setProgress: (playedSeconds: number) =>
      set({ progress: { playedSeconds } }),
    setSubTitle: (subTitle: string) => set({ subTitle }),
    setTitle: (title: string) => set({ title }),
  },
}));
