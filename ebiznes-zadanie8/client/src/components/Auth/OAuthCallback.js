import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get('token');
    if (!encoded) {
      setError('No authentication token received');
      setLoading(false);
      return void setTimeout(() => navigate('/login'), 3000);
    }

    try {
      const token = decodeURIComponent(encoded);
      if (!token.includes('.')) throw new Error('Invalid token format');
      localStorage.setItem('token', token);

      fetch('http://localhost:8080/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (!res.ok) {
            return res.text().then(txt => { throw new Error(txt || res.statusText); });
          }
          return res.json();
        })
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          setLoading(false);
          navigate('/');
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
          setTimeout(() => navigate('/login'), 3000);
        });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [navigate, location.search]);

  if (loading) return <div className="oauth-callback">Processing authentication...</div>;
  if (error)   return <div className="oauth-callback"><div className="error">{error}</div><p>Redirecting...</p></div>;
  return <div className="oauth-callback"><div>Authentication successful! Redirecting...</div></div>;
};

export default OAuthCallback;