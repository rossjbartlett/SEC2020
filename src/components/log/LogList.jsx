import React from 'react';
import LogListItem from './LogListItem';

function LogList({loglist}) {
  return (
    <div id='loglist' className="col-3 fill" >
        <h4>Log</h4>
        {loglist.map(logItem => <LogListItem logItem={logItem}/>)}
    </div>
  );
}

export default LogList