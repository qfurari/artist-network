import { generateCodeChallenge, generateRandomString } from "./pkce-utils";

const SPOTIFY_CLIENT_ID = "34c722b042f54c32aaaddab68514c165";
const REDIRECT_URI = "https://artist-network.vercel.app/callback";

const Login = () => {
  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    localStorage.setItem("code_verifier", codeVerifier);
    console.log("保存するcode_verifier:", codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: "user-read-private user-read-email",
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    

  };

  return (
    <div>
      <h1>Spotifyでログイン</h1>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default Login;
