//Import Components
import { useState, useRef, useEffect } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
//Data
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const audioRef = useRef(null);

  const handleSongChange = (song) => {
    setSongs((songs) =>
      songs.map((songItem) => {
        if (songItem.id === song.id) {
          return { ...songItem, active: true };
        } else {
          return { ...songItem, active: false };
        }
      })
    );
  };

  useEffect(() => {
    handleSongChange(currentSong);
  }, [currentSong]);

  const skiptrackHandeler = async (direction, currentSong) => {
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
  };

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
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;
