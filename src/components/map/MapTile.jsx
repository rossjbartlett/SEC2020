import React, { useState, useEffect } from 'react';
import Table from './Table';

function MapTile({robotData, tileData, height, width}) {

  const displayTileType = (item) => {
    switch(item) {
      case 'K':
        return <div className="vh-center"> I am kitchen </div>
      case 'A':
        return <div className="vh-center"> I am stoppy boi </div>
      case 0: // empty tile
        return <div className="vh-center"> ___ </div>
      default:        
        return <Table id={0} />
    }
  }

  return (
    <div className="tile flex fill vh-center">
        {displayTileType(tileData)}
    </div>
  );
}

export default MapTile