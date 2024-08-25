import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleOAuthCallback } from '../actions/authActions';

function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      dispatch(handleOAuthCallback(token));
      navigate('/'); // Redirect to home page or dashboard
    } else {
      console.error('No token received from OAuth login');
      navigate('/login'); // Redirect back to login page
    }
  }, [dispatch, navigate]);

  return <div>Processing login...</div>;
}

export default OAuthCallback;