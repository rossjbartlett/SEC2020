import React, { useState } from 'react';
import MapTile from './MapTile';
import { v4 } from 'uuid';

function Map({ graph }) {
  const [height, setHeight] = useState(100 / graph.length)
  return (
    <div id='map' className="col-9 p-0 fill flex column">
      {graph.map(row =>
        <div className="flex fill col-12 p-0" id={v4()} style={{ height: `${height}%` }}>
          {row.map(({tile, robots}) =>
            <MapTile id={v4()} robotData={robots} tileData={tile} />)}</div>)}
    </div>
  );
}

export default Map;