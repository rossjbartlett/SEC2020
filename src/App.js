import React, { useState, useEffect } from 'react';
import Map from './components/map/Map';
import './App.scss';

function renderTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  return `${minutes}:${seconds}`
}

const test_initial_graph = 
   [ // test, todo RM
    [{tile: 'K', robots: [1, 2]}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}],
    [{tile: '0', robots: []}, {tile: '0', robots: []}, {tile: 'A', robots: []}, {tile: '4', robots: []}, {tile: '0', robots: []}, {tile: '8', robots: []}, {tile: '0', robots: []}, {tile: '12', robots: []}],
    [{tile: 'A', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}],
    [{tile: '0', robots: []}, {tile: '1', robots: []}, {tile: '0', robots: []}, {tile: '5', robots: []}, {tile: '0', robots: []}, {tile: '9', robots: []}, {tile: '0', robots: []}, {tile: '13', robots: []}],
    [{tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: 'A', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}],
    [{tile: '0', robots: []}, {tile: '2', robots: []}, {tile: 'A', robots: []}, {tile: '6', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '14', robots: []}],
    [{tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: '0', robots: []}, {tile: 'A', robots: []}, {tile: '0', robots: []}],
    [{tile: '0', robots: []}, {tile: '3', robots: []}, {tile: '0', robots: []}, {tile: '7', robots: []}, {tile: '0', robots: []}, {tile: '1', robots: []}, {tile: '0', robots: []}, {tile: '15', robots: []}]
  ]

function App({ socket }) {
  const [graph, setGraph] = useState(test_initial_graph); // todo []
  const [log, setLog] = useState([]);
  const [time, setTime] = useState(412); // todo 0

  useEffect(() => {
    socket.on('graph', g => setGraph(g));
    socket.on('time', t => setTime(t));
    socket.on('log', l => setLog(l));
  }, [socket]);

  function handleSend(e) {
    e.preventDefault(); // prevent refresh when using form
  }

  return (
    <div id='app'>
        <h1>Time: {renderTime(time)}</h1> 
      <div id='container' className="flex fill col-12 p-0">

        <Map graph={graph}/>
        <div id='log' className="col-3 fill"></div>
        {/* <LogList log={log}/> */}
      </div>
    </div>
  );
}

export default App;
