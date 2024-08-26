import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleOAuthCallback } from '../actions/authActions';

function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('OAuthCallback - location:', location);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    console.log('OAuthCallback - token:', token);
    
    if (token) {
      dispatch(handleOAuthCallback(token))
        .then(() => {
          console.log('OAuthCallback - handleOAuthCallback success');
          navigate('/');
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          navigate('/login', { state: { error: 'Authentication failed. Please try again.' } });
        });
    } else {
      console.error('No token received in OAuth callback');
      navigate('/login', { state: { error: 'No authentication token received. Please try again.' } });
    }
  }, [dispatch, navigate, location]);

  return <div>Processing authentication...</div>;
}

export default OAuthCallback;