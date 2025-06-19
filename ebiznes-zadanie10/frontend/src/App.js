import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  
  useEffect(() => {
    const url = (window.RUNTIME_CONFIG && window.RUNTIME_CONFIG.REACT_APP_API_URL) || 
                process.env.REACT_APP_API_URL || 
                'http://localhost:5000/api';
    setApiUrl(url);
    
    console.log('Attempting to fetch from:', url);
    
    fetch(url)
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, []);

  return (
    <div className="App" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <h1>React Frontend Deployed on Render</h1>
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', marginBottom: '10px' }}>
          {message ? (
            <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>
          ) : (
            <p style={{ color: 'orange' }}>Loading data from backend...</p>
          )}
        </div>
        
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#ffeeee', borderRadius: '5px', marginTop: '10px' }}>
            <p style={{ color: 'red' }}>Error connecting to backend:</p>
            <p>{error}</p>
          </div>
        )}
        
        <div style={{ fontSize: '0.8em', marginTop: '20px', color: '#666' }}>
          <p>Attempting to connect to: {apiUrl}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Current time: {new Date().toLocaleString()}</p>
        </div>
      </header>
    </div>
  );
}

export default App;