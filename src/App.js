import React, { useState, useEffect } from 'react';
import Map from './components/map/Map';
import LogList from './components/log/LogList';
import { renderTime } from './utils/timeUtils'
import './App.scss';

const test_initial_graph =
  [ // test, todo RM
    [{ tile: 'K', robots: [1] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }],
    [{ tile: '0', robots: [2] }, { tile: '0', robots: [] }, { tile: 'A', robots: [] }, { tile: '4', robots: [] }, { tile: '0', robots: [] }, { tile: '8', robots: [] }, { tile: '0', robots: [] }, { tile: '12', robots: [] }],
    [{ tile: 'A', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }],
    [{ tile: '0', robots: [] }, { tile: '1', robots: [] }, { tile: '0', robots: [] }, { tile: '5', robots: [] }, { tile: '0', robots: [] }, { tile: '9', robots: [] }, { tile: '0', robots: [] }, { tile: '13', robots: [] }],
    [{ tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: 'A', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }],
    [{ tile: '0', robots: [] }, { tile: '2', robots: [] }, { tile: 'A', robots: [] }, { tile: '6', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '14', robots: [] }],
    [{ tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: '0', robots: [] }, { tile: 'A', robots: [] }, { tile: '0', robots: [] }],
    [{ tile: '0', robots: [] }, { tile: '3', robots: [] }, { tile: '0', robots: [] }, { tile: '7', robots: [] }, { tile: '0', robots: [] }, { tile: '1', robots: [] }, { tile: '0', robots: [] }, { tile: '15', robots: [] }]
  ]

const test_log = [
  { t: 29, robotId: 1, msg: 'Waiting' },
  { t: 63, robotId: 2, msg: 'Arrived at Table x' },
  { t: 138, robotId: 1, msg: 'Waiting' },
  { t: 29, robotId: 1, msg: 'Waiting' },
  { t: 63, robotId: 2, msg: 'Arrived at Table x' },
  { t: 138, robotId: 1, msg: 'Waiting' },
  { t: 29, robotId: 1, msg: 'Waiting' },
  { t: 63, robotId: 2, msg: 'Arrived at Table x' },
  { t: 138, robotId: 1, msg: 'Waiting' },
  { t: 29, robotId: 1, msg: 'Waiting' },
  { t: 63, robotId: 2, msg: 'Arrived at Table x' },
  { t: 138, robotId: 1, msg: 'Waiting' },
  { t: 29, robotId: 1, msg: 'Waiting' },
  { t: 63, robotId: 2, msg: 'Arrived at Table x' },
  { t: 138, robotId: 1, msg: 'Waiting' },
]

function App({ socket }) {
  const [graph, setGraph] = useState(test_initial_graph); // todo []
  const [loglist, setLoglist] = useState(test_log); // todo []
  const [time, setTime] = useState(412); // todo 0

  useEffect(() => {
    socket.on('graph', g => setGraph(g));
    socket.on('time', t => setTime(t));
    socket.on('log', l => setLoglist(l));
  }, [socket]);

  const restart = () => {
    socket.emit('input-file')
  }

  const handleInputFile = (event) => {
    const formData = new FormData();
    const file = event.target.files[0]
    formData.append("file", file);
    socket.emit('input-file', formData);    
  }

  return (
    <div id='app'>
      <div id ='header' className='col-12 p-0 flex'>
        <button 
        style={{ fontSize: 25, cursor: 'pointer' }}
          className='btn btn-primary float-left col-2'
          onClick={restart}>
          Restart
          <i className='pl-2 fas fa-undo' 
          style={{ color: 'blue', fontSize: 25 }}
          />
        </button>
        <div className='row flex col-8 p-0 vh-center'>
          <h1>Time: {renderTime(time)}</h1>
        </div>
        <div id='filepicker' className='row flex col-2 p-0 vh-center'>
          <input type='file' name='inputFile' accept='.txt, .dat' onChange={handleInputFile}/>
        </div>
      </div>
      <div id='container' className='flex fill col-12 p-0'>
        <Map graph={graph} />
        <LogList loglist={loglist} />
      </div>
    </div>
  );
}

export default App;
