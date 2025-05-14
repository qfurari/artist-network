import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = location.hash;
    const tokenFromStorage = window.localStorage.getItem("token");

    if (!tokenFromStorage && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");

      if (_token) {
        window.localStorage.setItem("token", _token);
        setToken(_token);
        navigate("/search"); // ← ★ここで /search に自動遷移させる
      }
    } else if (tokenFromStorage) {
      setToken(tokenFromStorage);
      navigate("/search");
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>アクセストークン取得完了！</h2>
    </div>
  );
};

export default Callback;
