//Import Components
import { useState, useRef } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
//Data
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const audioRef = useRef(null);

  const handleSongChange = (song) => {
    setSongs(
      songs.map((songItem) => {
        if (songItem.id === song.id) {
          return { ...songItem, active: true };
        } else {
          return { ...songItem, active: false };
        }
      })
    );
  };

  const skiptrackHandeler = async (direction) => {
    const currentSongIndex = songs.findIndex(
      (songItem) => songItem.id === currentSong.id
    );
    if (direction === "FORWARD") {
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    } else if (direction === "BACKWARD") {
      await setCurrentSong(
        songs[
          currentSongIndex - 1 !== -1 ? currentSongIndex - 1 : songs.length - 1
        ]
      );
      if (isPlaying) audioRef.current.play();
    }
    handleSongChange(currentSong);
  };

  // useEffect(() => {
  //   setIsPlaying(false);
  // }, [currentSong]);

  // useEffect(() => {
  //   const playPauseListener = window.addEventListener("keypress", (e) => {
  //     if (e.key === " ") {
  //       setIsPlaying(!isPlaying);
  //       // if (isPlaying) audioRef.current.play();
  //       // else audioRef.current.pause();
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("keypress", playPauseListener);
  //   };
  // }, []);

  return (
    <div
      className={`app ${libraryStatus ? "move-for-lib" : ""} ${
        darkTheme ? "dark-theme" : ""
      } `}
    >
      <Nav
        setLibraryStatus={setLibraryStatus}
        libraryStatus={libraryStatus}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
      />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skiptrackHandeler={skiptrackHandeler}
        audioRef={audioRef}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        handleSongChange={handleSongChange}
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;