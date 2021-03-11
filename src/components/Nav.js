import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = ({ setLibraryStatus, libraryStatus, setDarkTheme, darkTheme }) => {
  return (
    <nav>
      <h1>Music Player</h1>
      <div className="button-controls">
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
        <button onClick={() => setDarkTheme(!darkTheme)}>Theme</button>
      </div>
    </nav>
  );
};

export default Nav;
