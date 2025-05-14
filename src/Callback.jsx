import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
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
      }
    } else {
      setToken(tokenFromStorage);
    }
  }, [location]);

  return (
    <div>
      <h2>アクセストークン取得完了</h2>
      <p>{token}</p>
    </div>
  );
};

export default Callback;
