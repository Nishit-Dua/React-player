import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  handleSongChange,
  libraryStatus,
  audioRef,
  isPlaying,
}) => {
  return (
    <div className={`library ${libraryStatus ? "library-active" : ""} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              song={song}
              setCurrentSong={setCurrentSong}
              key={song.id}
              songs={songs}
              currentSong={currentSong}
              handleSongChange={handleSongChange}
              audioRef={audioRef}
              isPlaying={isPlaying}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
