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
    ['K', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'A', 4, 0, 8, 0, 12],
    ['A', 0, 0, 0, 0, 0, 'A', 0],
    [0, 1, 0, 5, 0, 9, 0, 13],
    [0, 0, 0, 0, 0, 'A', 0, 0],
    [0, 2, 'A', 6, 0, 0, 0, 14],
    [0, 0, 0, 0, 0, 0, 'A', 0],
    [0, 3, 0, 7, 0, 1, 0, 15]
  ]

function App({ socket }) {
  const [initialGraph, setInitialGraph] = useState(test_initial_graph);
  const [graph, setGraph] = useState([]);
  const [log, setLog] = useState([]);
  const [time, setTime] = useState(412); // todo 0

  useEffect(() => {
    socket.on('graph', function (g) {
      setGraph(g);
    });
    socket.on('time', function (t) {
      setTime(t);
    });
    socket.on('log', function (l) {
      setLog(l);
    });
  }, [socket]);

  function handleSend(e) {
    e.preventDefault(); // prevent refresh when using form
  }

  return (
    <div id='app'>
        <h1>Time: {renderTime(time)}</h1> 
      <div id='container' className="flex fill col-12 p-0">

        <Map graph={graph} initialGraph={initialGraph}/>
        <div id='log' className="col-3 fill"></div>
        {/* <LogList log={log}/> */}
      </div>
    </div>
  );
}

export default App;
