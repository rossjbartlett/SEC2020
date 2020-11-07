import React from 'react';
import LogListItem from './LogListItem';

function LogList({loglist}) {
  return (
    <div id='loglist' className="col-3 fill" >
        <h4>Log</h4>
        {loglist.map((logItem, i) => <LogListItem key={i} logItem={logItem}/>)}
    </div>
  );
}

export default LogList