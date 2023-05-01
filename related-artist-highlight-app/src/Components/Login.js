import React from 'react';
import Fade from 'react-reveal/Fade'
import { Container } from 'react-bootstrap';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=f124335254b9413f9008b34cb5f1b4c9&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read'; 

export const Login = () => {
  return (
    <>
      <Container className='d-flex-column justify-content-center align-items-center main-style' style={{ minHeight: '100vh' }}>
        <Fade left>
          <h1 className='text-center pt-5 mb-0' >Welcome to Related Artists Highlights</h1>
        </Fade>
        <div className='d-flex justify-content-center align-items-center'>
          <Fade right>
            <p className='text-center m-5 w-50' style={{fontSize: '120%'}}>Discover some lesser-known artist that are similar to your favorites! You can explore some of the automatically-generated higlights below
            (based on your current favorite artists), or search for reccomendations of any artist of your choice.
            </p>
          </Fade>
        </div>
        <div className='d-flex justify-content-center align-items-center pb-5'>
          <Fade bottom>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>Login Using Spotify</a>
          </Fade>
        </div>
      </Container>
    </>

  )
}
