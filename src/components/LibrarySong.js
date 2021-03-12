const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying }) => {
  const selectSongHandeler = async () => {
    const selectedSong = songs.filter((songItem) => song.id === songItem.id);
    await setCurrentSong(selectedSong[0]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={selectSongHandeler}
      className={`library-song ${song.active ? "active" : ""} `}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
