import React from 'react';
import Table from './Table';

function MapTile({ robotData, tileData, height, width }) {

  const displayTileType = (item) => {
    switch (item) {
      case 'K':
        return <div className="vh-center"><i className="fas fa-door-open"></i></div>
      case 'A':
        return <div className="vh-center"><i className="fas fa-ban" style={{color: 
        'red'}}></i></div>
      case '0': // empty tile
        return <div className="vh-center"></div>
      default:
        return <Table id={item} />
    }
  }

  const displayRobotData = (robotData) => {
    return robotData.map(robotId => <i key={robotId} className={`fas fa-robot robot-${robotId}`}></i>)
  }

  return (
    <div className="tile flex fill vh-center">
      {displayTileType(tileData)}
      {displayRobotData(robotData)}      
    </div>
  );
}

export default MapTile