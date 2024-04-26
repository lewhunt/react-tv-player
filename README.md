<h1 align='center'>
  React TV Player
</h1>

<p align='center'>
  <a href='https://www.npmjs.com/package/react-tv-player'>
    <img src='https://img.shields.io/npm/v/react-tv-player.svg' alt='Latest npm version'>
  </a>
    <a href='https://github.com/lewhunt/react-tv-player/blob/main/LICENSE'>
    <img src='https://img.shields.io/badge/License-MIT-yellow.svg' alt='MIT License'>
  </a>
    <a href='https://www.npmjs.com/package/react-tv-player'>
    <img src='https://img.shields.io/npm/dm/react-tv-player.svg' alt='Monthly npm downloads'>
  </a>

</p>

<p align='center'>
A React media player component for TV devices. With custom UI and arrow-key navigation, it can play a variety of URLs like file paths, HLS/DASH streams and even YouTube links directly. Packaged as an npm library.</p>

[![https://lewhunt.github.io/react-tv-player/](https://repository-images.githubusercontent.com/688997852/cc39ebd0-f663-4715-b502-eccb06cc4e57)](https://lewhunt.github.io/react-tv-player/)

<p align='center'><i>Click on the image to try out the demo on a desktop browser</i>

## Installation

```bash
npm install react-tv-player
```

## Usage

Just import the player and render it in your app or page with [props](#props):

```jsx
import { TVPlayer } from "react-tv-player";

function App() {
  return (
    <>
      <TVPlayer url="https://www.youtube.com/watch?v=SkVqJ1SGeL0" />
    </>
  );
}
```

### [👉 Try out the Demo](https://lewhunt.github.io/react-tv-player/) (on TV and desktop browsers)

The demo source code <a href='https://github.com/lewhunt/react-tv-player/blob/main/src/App.tsx'>App.tsx</a> illustrates how the component can be initialised with more [props](#props) such as metadata, [custom buttons](#custom-buttons), preview images and multiple media, enabling the user to cycle through videos with next/previous buttons:

```jsx
<TVPlayer
  title={mediaList[mediaIndex].title}
  subTitle={mediaList[mediaIndex].subTitle}
  url={mediaList[mediaIndex].url}
  light={mediaList[mediaIndex].preview}
  customButtons={customButtons}
  mediaCount={mediaList.length}
  onLikePress={handleLike}
/>
```

<p>Here is a short video of the <a title="view demo" href="https://lewhunt.github.io/react-tv-player/">demo</a> runnning on a browser:</p>

https://github.com/lewhunt/react-tv-player/assets/9886284/7baa4b75-491b-49f3-8cf1-698ae7f55941

## Why Another Player?

I've dedicated years working with various OTT players on big-screen devices. During this journey, two persistent challenges surfaced time and again: performant UI and compatible media encodings. These hurdles often forced us to heavily customise libraries and tackle streaming difficulties, leading to added costs and frustrating delays. 😫

Enter ReactTVPlayer, an open-source media player component for TV devices that lowers the barrier to entry and seamlessly integrates with your React applications. :muscle:

## What Sets It Apart?

It's designed for TV experiences out of the box, complete with customisable UI buttons and intuitive cursor plus arrow key navigation. 🎮 In addition to handling HLS and Dash streams effortlessly, it tackles the formidable challenge of playing YouTube and Vimeo urls directly on TV, <b>saving you the hassle and cost of additional video encoding.</b> 🎉

## How Does It Work?

Under the hood, this component harnesses the power of open-source libraries like Norigin Media's <a href="https://github.com/NoriginMedia/Norigin-Spatial-Navigation">spatial navigation</a> hook. It builds upon the excellence of <a href="https://github.com/cookpete/react-player">React Player</a>, which utilises <a href="https://github.com/video-dev/hls.js">hls.js</a> and <a href="https://github.com/Dash-Industry-Forum/dash.js">dash.js</a>. Powered by React TypeScript (although you don't need to use TypeScript to make the most of it), this library is packaged efficiently using <a href="https://vitejs.dev/">Vite</a>, making integration a breeze. 🙌

## Key Features

- <b>Versatility</b>: Customisable UI buttons, title metadata and preview images to suit your needs. It can effortlessly handle a variety of URLs, from mp4 file paths and HLS/DASH streams to services like YouTube and Vimeo.
- <b>Intuitive Navigation</b>: The player has been designed with TV experiences in mind. Cursor and arrow-key navigation make the user experience smooth and intuitive across big-screen platforms.
- <b>YouTube Integration</b>: One of its unique strengths is its ability to play URLs directly from the likes of YouTube, Vimeo, SoundCloud and Twitch, eliminating the need for additional video encoding when it's not needed.
- <b>DRM Considerations</b>: While it supports HLS AES Encryption, it’s built with flexibility in mind, allowing for future DRM integration with hls.js and dash.js.
- <b>Broad Device Support</b>: From Amazon Fire TV, LG webOS and Samsung Tizen Smart TVs to Xbox consoles and desktop web browsers, ReactTVPlayer covers most big-screen devices running web apps with post-2017 Chromium browsers.

<hr>

## Props

The full list of props are below. Media related values such as `playing`, `loop` and `muted` are also mapped to state which can be accessed via the [useTVPlayerStore hook](#usetvplayerstore-hook) instead of updating props.

| Prop                    | Description                                                                                                                                                                                                                                                                                                                      | Default      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `url`                   | The url of the media to play <br />&nbsp; ◦ &nbsp;This can be an embedded url from YouTube/SoundCloud, a file path or a HLS or Dash manifest stream                                                                                                                                                                              |
| `playing`               | Set to `true` or `false` to pause or play the media. <br />&nbsp; ◦ &nbsp;Set to `true` to autoplay the media (muted may also be needed in some browsers)                                                                                                                                                                        | `false`      |
| `loop`                  | Set to `true` to loop the media                                                                                                                                                                                                                                                                                                  | `false`      |
| `controls`              | Set to `true` to display native HTML5 media controls instead of custom TV Player UI controls                                                                                                                                                                                                                                     | `false`      |
| `light`                 | Set to `true` or a url `string` to show a preview image, which then loads the full player on selecting play<br />&nbsp; ◦ &nbsp;Pass in true to use the default preview image associated with an embeded media url (e.g. YouTube/SoundCloud urls)<br />&nbsp; ◦ &nbsp;Pass in an image URL to override any default preview image | `false`      |
| `volume`                | Set the volume of the player, between `0` and `1`                                                                                                                                                                                                                                                                                | `null`       |
| `muted`                 | Set to `true` to mute the player<br />&nbsp; ◦ &nbsp;may be required if you intend to autoplay media                                                                                                                                                                                                                             | `false     ` |
| `playbackRate`          | Set the playback rate of the player<br />&nbsp; ◦ &nbsp;Only supported by YouTube, Wistia, and file paths                                                                                                                                                                                                                        | `1`          |
| `disableFullscreen`     | Set to true to disable the defaulted fullscreen width and height of the player. <br />&nbsp; ◦ &nbsp;Width and height values below should be defined                                                                                                                                                                             | `false`      |
| `width`                 | Set the width of the player when fullscreen is disabled                                                                                                                                                                                                                                                                          | `100%`       |
| `height`                | Set the height of the player when fullscreen is disabled                                                                                                                                                                                                                                                                         | `350px`      |
| `style`                 | Add [inline styles](https://facebook.github.io/react/tips/inline-styles.html) to the root element                                                                                                                                                                                                                                | `{}`         |
| `customButtons`         | Specify a collection of [custom buttons](#custom-buttons) for the player UI <br />&nbsp; ◦ &nbsp;A set of <a href="https://github.com/lewhunt/react-tv-player/blob/8b5bb4491b0407af518be96261398e534b50e8dd/src/lib/TVPlayerUI/TVPlayerUI.tsx#L83-L90">default buttons</a> will be used otherwise.                               | `null`       |
| `title`                 | Set a `string` title for the current media.<br />&nbsp; ◦ &nbsp;Embedded media urls such as YouTube will attempt to pull in the default media title if not overridden here.                                                                                                                                                      |              |
| `subTitle`              | Set a `string` sub-title for the current media.<br />&nbsp; ◦ &nbsp;Embedded media urls such as YouTube will attempt to pull in the default author name if not overridden here.                                                                                                                                                  |              |
| `mediaCount`            | Set the total `number` of media items if you have multiple media and want player to display next and previous buttons                                                                                                                                                                                                            | `0`          |
| `mediaIndex`            | Set the initial media index `number` if you have multiple media and want player to handle next and previous buttons                                                                                                                                                                                                              | `0`          |
| `hideControlsOnArrowUp` | Set to `true` to hide the player UI by using the up arrow key when focussed on the player buttons                                                                                                                                                                                                                                | `false`      |

<hr>

## Callback Props

Callback props take a function that gets fired on various player events and UI button actions:

| Prop                 | Description                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `onReady`            | Called when media is loaded and ready to play. If `playing` is set to `true`, media will play immediately |
| `onStart`            | Called when media starts playing                                                                          |
| `onPlay`             | Called when media starts or resumes playing after pausing or buffering                                    |
| `onPause`            | Called when media is paused                                                                               |
| `onBuffer`           | Called when media starts buffering                                                                        |
| `onEnded`            | Called when media finishes playing<br />&nbsp; ◦ &nbsp;Does not fire when `loop` is set to `true`         |
| `onError`            | Called when an error occurs whilst attempting to play media                                               |
| `onSkipBackPress`    | Called when the Skip Back button is pressed                                                               |
| `onSkipForwardPress` | Called when the Skip Forward button is pressed                                                            |
| `onPreviousPress`    | Called when the Previous button is pressed                                                                |
| `onNextPress`        | Called when the Next button is pressed                                                                    |
| `onLikePress`        | Called when the Like button is pressed                                                                    |
| `onLoopPress`        | Called when the Loop button is pressed                                                                    |
| `onMutePress`        | Called when the Mute button is pressed                                                                    |
| `onFullscreenPress`  | Called when the Fullscreen button is pressed                                                              |

<hr>

## Custom Buttons

As illustrated in the sample demo app, the player can be overridden with custom buttons. There is a selection of pre-built action types with their own icons and behaviours or you can add your own with the "custom" action type.

```jsx
import { TVPlayer, TVPlayerButtonProps } from "react-tv-player";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

<TVPlayer
  url="https://www.youtube.com/watch?v=SkVqJ1SGeL0"
  customButtons={customButtons}
/>;
```

| Button Props     | Description                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`         | Choose from `custom` or one of the pre-built actions: `like`, `loop`, `mute`,`next`,`playpause`,`previous`,`skipforward`, `skipback`, `fullscreen` |
| `align`          | Alignment of the button. Choose from `left`,`center`, `right`                                                                                      |
| `label`          | A hint text label to appear below the current button in focus. Pre-built button actions use relevent labels.                                       |
| `faIcon`         | A font-awesome icon. Pre-built button actions use relevent icons.                                                                                  |
| `onPress`        | Called when a button is pressed. Pre-built button actions have their own behaviours.                                                               |
| `onRelease`      | Called when a button is released. Currently unused.                                                                                                |
| `isSelectedFill` | Allows support of toggle behaviour (in the form of a button fill) when set to true.                                                                |
| `disable`        | Prevents button action when set to true.                                                                                                           |

<hr>

## useTVPlayerStore Hook

For more control you can import the `useTVPlayerStore` custom hook to globally access player state (zustand store). View the sample app and the `TVPlayerUI` inner component for examples of use. Below shows the basics:

```jsx
// 1. import useTVPlayerStore
import { TVPlayer, useTVPlayerStore } from "react-tv-player";

// 2. get state values (there are more availble, see TVPlayerUI.ts for reference)
const actions = useTVPlayerStore((s) => s.actions);
const playing = useTVPlayerStore((s) => s.playing);
const player = useTVPlayerStore((s) => s.player);
const likeToggle = useTVPlayerStore((s) => s.likeToggle);
s;

const logPlaybackState = () => console.log(playing);

//3. set state using the actions object
const handleLike = () => {
  console.log("like button pressed");
  actions.setLikeToggle(!likeToggle);
};

const togglePlayback = () => {
  actions.setPlaying(!playing);
};

//4. access player instance methods via the player state
const customSeek = () => player.seekTo(player.getCurrentTime() + 10);

<TVPlayer
  url="https://www.youtube.com/watch?v=SkVqJ1SGeL0"
  onLikePress={handleLike}
/>;
```

<hr>

## Instance Methods

Use the state's `player` reference - as in the above example - to call instance methods on the player.

| Method                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seekTo(amount, type)` | Seek to the given number of seconds, or fraction if `amount` is between `0` and `1`<br />&nbsp; ◦ &nbsp;`type` parameter lets you specify `'seconds'` or `'fraction'` to override default behaviour                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `getCurrentTime()`     | Returns the number of seconds that have been played<br />&nbsp; ◦ &nbsp;Returns `null` if unavailable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `getSecondsLoaded()`   | Returns the number of seconds that have been loaded<br />&nbsp; ◦ &nbsp;Returns `null` if unavailable or unsupported                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `getDuration()`        | Returns the duration (in seconds) of the currently playing media<br />&nbsp; ◦ &nbsp;Returns `null` if duration is unavailable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `getInternalPlayer()`  | Returns the internal player of whatever is currently playing<br />&nbsp; ◦ &nbsp;eg the [YouTube player instance](https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player), or the [`<video>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/video) element when playing a video file<br />&nbsp; ◦ &nbsp;Use `getInternalPlayer('hls')` to get the [hls.js](https://github.com/video-dev/hls.js) player<br />&nbsp; ◦ &nbsp;Use `getInternalPlayer('dash')` to get the [dash.js](https://github.com/Dash-Industry-Forum/dash.js) player<br />&nbsp; ◦ &nbsp;Returns `null` if the internal player is unavailable |

<hr />

### [👉 Try out the Demo](https://lewhunt.github.io/react-tv-player/) (on TV and desktop browsers)
