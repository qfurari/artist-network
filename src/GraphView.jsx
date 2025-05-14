// GraphView.jsx
import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const GraphView = ({ nodes, links, onNodeClick }) => {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
    }
  }, [nodes]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={{ nodes, links }}
      nodeLabel="name"
      nodeAutoColorBy="group"
      onNodeClick={onNodeClick}
    />
  );
};

export default GraphView;
