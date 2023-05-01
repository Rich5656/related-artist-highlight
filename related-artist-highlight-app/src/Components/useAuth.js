import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// function to return the accessToken to the dashboard
export const useAuth = (code) => {
  //useRef to make sure the spotify fetch will only run once
  const dataAuthFetchedRef = useRef(false);
  
  
  // hooks for data returnd by spotify api call
  const [ accessToken, setAccessToken ] = useState('');
  const [ refreshToken, setRefreshToken ] = useState('');
  const [ expiresIn, setExpiresIn ] = useState('');


  
  // Initial Auth useEffect   
  useEffect(() => {
    // check if data has already been fetched and if false, the ref to true so this can't run twice
    if (dataAuthFetchedRef.current) return;
    dataAuthFetchedRef.current = true;
    
    // run the spotify request to obtain access tokens etc. 
    fetch(`/.netlify/functions/login?code=${code}`)
        .then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, '/');
        })
        .catch((err) => {
            window.location = '/';
        })

    // axios.post('http://localhost:3001/login', {
    //     code,
    // })
    // .then(res => {
    //     setAccessToken(res.data.accessToken);
    //     setRefreshToken(res.data.refreshToken);
    //     setExpiresIn(res.data.expiresIn);
    //     window.history.pushState({}, null, '/');
    // })
    // .catch((err) => {
    //     window.location = '/';
    // })
  }, [code])


  // refresh useEffect
  useEffect(() => {
    // check if both refresh token and expires in exist before running
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
        // run the spotify request to obtain access tokens etc. 
        fetch('/.netlify/functions/refresh', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({refreshToken: refreshToken})
        })
        .then(res => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
            window.location = '/';
        })
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
