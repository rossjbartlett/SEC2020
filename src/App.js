import React, { useState, useEffect } from 'react';
import './App.css';

function App({ socket }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    socket.on('response', function (msg) {
      setOutput(msg);
    });
  }, [socket]);

  function handleSend(e) {
    e.preventDefault(); // prevent refresh when using form
    if (input.trim()) {
      socket.emit('request', input);
      setInput('');
    }
  }

  return (
    <div id='app'>
      <div id='container'>
        <form onSubmit={handleSend}>
          <label>
            Input:
            <input
              type='text'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </label>
          <input id='response' type='submit' value='Send' />
        </form>
        <div id='response'>Response: {output}</div>
      </div>
    </div>
  );
}

export default App;
