import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL || 'http://localhost:5000/api')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Frontend</h1>
        <p>{message || 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;