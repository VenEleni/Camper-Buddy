import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleOAuthCallback } from '../actions/authActions';

function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get('token');
      
      if (token) {
        try {
          await dispatch(handleOAuthCallback(token));
          // Redirect to the homepage
          navigate('/');
        } catch (error) {
          console.error('Error processing OAuth callback:', error);
          navigate('/login', { state: { error: 'Failed to process login. Please try again.' } });
        }
      } else {
        console.error('No token received from OAuth login');
        navigate('/login', { state: { error: 'No authentication token received. Please try again.' } });
      }
    };

    handleCallback();
  }, [dispatch, navigate, location]);

  return <div>Processing login...</div>;
}

export default OAuthCallback;