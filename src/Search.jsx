import React, { useState } from "react";
import GraphView from "./GraphView";
import { useEffect } from "react";
const Search = () => {
  const [artist, setArtist] = useState("");
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const token = window.localStorage.getItem("token");

  const handleSearch = async () => {
    if (!token) {
      alert("Spotify認証が切れています。再ログインしてください。");
      window.location.href = "/";
      return;
    }
  
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!res.ok) {
        if (res.status === 401) {
          alert("トークンが無効になっています。再ログインしてください。");
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        throw new Error(`Spotify API エラー: ${res.status}`);
      }
  
      const data = await res.json();
      const mainArtist = data.artists?.items?.[0];
  
      if (!mainArtist) {
        alert("アーティストが見つかりませんでした。");
        return;
      }
  
      fetchRelated(mainArtist);
    } catch (err) {
      console.error("検索エラー:", err);
      alert("検索に失敗しました。ネットワークやAPIの状態を確認してください。");
    }
  };
  

  const fetchRelated = async (mainArtist) => {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${mainArtist.id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    const related = data.artists.slice(0, 6);

    const newNodes = [mainArtist, ...related].map((a) => ({
      id: a.id,
      name: a.name,
      group: 1,
    }));

    const newLinks = related.map((a) => ({
      source: mainArtist.id,
      target: a.id,
    }));

    setGraph({ nodes: newNodes, links: newLinks });
  };
  useEffect(() => {
    if (!token) {
      alert("Spotify認証が切れているため、再ログインしてください。");
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <h2>アーティスト検索 & グラフ表示</h2>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="アーティスト名を入力"
      />
      <button onClick={handleSearch}>検索</button>

      {graph.nodes.length > 0 && (
        <div style={{ height: "600px" }}>
          <GraphView
            nodes={graph.nodes}
            links={graph.links}
            onNodeClick={(node) => {
              // 今後の拡張ポイント：ノードクリックでさらに関連を展開する
              console.log("ノードクリック:", node);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
