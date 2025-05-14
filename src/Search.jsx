import React, { useState } from "react";
import GraphView from "./GraphView";

const Search = () => {
  const [artist, setArtist] = useState("");
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const token = window.localStorage.getItem("token");

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    const mainArtist = data.artists.items[0];
    if (mainArtist) {
      fetchRelated(mainArtist);
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
