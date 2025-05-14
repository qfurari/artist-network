import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SPOTIFY_CLIENT_ID = "あなたのClient ID";
const REDIRECT_URI = "https://artist-network.vercel.app/callback";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    const codeVerifier = localStorage.getItem("code_verifier");
    localStorage.setItem("code_verifier", codeVerifier);
    console.log("保存するcode_verifier:", codeVerifier);

    if (code && codeVerifier) {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier,
      });

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("🔴 Callback: Spotifyトークンレスポンス:", data);
          localStorage.setItem("token", data.access_token);
          navigate("/search");
        });
    }
    
  }, [location, navigate]);

  return <h2>トークンを取得中...</h2>;
};

export default Callback;
