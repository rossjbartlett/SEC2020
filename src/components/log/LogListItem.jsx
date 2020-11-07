import React from 'react';
import { renderTime } from '../../utils/timeUtils';

function LogListItem({logItem}) {
  const {t, robotId, msg} = logItem
  return (
    <div className="loglistitem flex vh-center" >
        <p className='logtime'>{renderTime(t)}</p> 
        <p className='loginfo'>Robot {robotId}: {msg}</p>
    </div>
  );
}

export default LogListItem