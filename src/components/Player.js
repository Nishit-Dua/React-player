import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  skiptrackHandeler,
  audioRef,
}) => {
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
  });

  //Variables
  const { audio } = currentSong;

  //Event Handelers
  const playSongHandeler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) audioRef.current.pause();
    else {
      audioRef.current.play();
    }
  };

  const timeUpdateHandeler = (e) => {
    setSongInfo({
      currentTime: Math.round(e.target.currentTime),
      duration: Math.round(e.target.duration),
    });
  };

  const dragHandeler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 100}
          value={songInfo.currentTime}
          type="range"
          name="time"
          onChange={dragHandeler}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skiptrackHandeler("BACKWARD")}
        />

        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandeler}
        />

        <FontAwesomeIcon
          className="skip-forwards"
          icon={faAngleRight}
          size="2x"
          onClick={() => skiptrackHandeler("FORWARD")}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandeler}
        onLoadedMetadata={timeUpdateHandeler}
        onEnded={() => skiptrackHandeler("FORWARD")}
        src={audio}
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default Player;
