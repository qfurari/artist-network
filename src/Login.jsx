const SPOTIFY_CLIENT_ID = "34c722b042f54c32aaaddab68514c165";
const REDIRECT_URI = "https://artist-network.vercel.app/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Login = () => {
  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}`;
  };

  return (
    <div>
      <h1>Spotifyでログイン</h1>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default Login;
