import React, { useState, useEffect } from 'react';
import MapTile from './MapTile';

function Map({ graph, initialGraph }) {
  const [height, setHeight] = useState(100 / initialGraph.length)
  return (
    <div id='map' className="col-9 fill flex column">
      {initialGraph.map(row =>
        <div className="flex fill col-12 p-0" style={{ height: `${height}%` }}>
          {row.map(tile =>
            <MapTile robotData={graph} tileData={tile} />)}</div>)}
    </div>
  );
}

export default Map;