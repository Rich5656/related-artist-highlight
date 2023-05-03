import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Fade from 'react-reveal/Fade';

// Compoonent to display the 3 auto recommendations based on the user's favorite artists
export const AutoRecomendations = ({ usersTopArtists, accessToken }) => {
    const [ relatedArtists, setRelatedArtists ] = useState([]);

    useEffect(() => {
        if (usersTopArtists.length === 0) return;
        // break out of this if accessToken or users top artists aren't present
        if (!usersTopArtists || !accessToken) return;

        fetch('/.netlify/functions/relatedToTopArtists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessToken: accessToken, usersTopArtists: usersTopArtists})
        })
            .then(res => res.json())
            .then(res => setRelatedArtists(res.vals))
            .catch(err => console.log(err))
    }, [usersTopArtists, accessToken])

  return (
    <div className='pt-1 p-3 mt-1 m-3 text-center align-items-center justify-content-center'>
        <Fade right>
            <Row className='justify-content-center'>
                {relatedArtists.length !== 0 ? (
                    // display the related artists if there are results returned
                    relatedArtists.map((artistItem, index) => {
                        return (
                            <Col className='d-flex align-items-center col-12 col-md-4' key={'col' + artistItem.name}>
                                <Card className='card-style w-100 h-90 mb-4 justify-content-center'> 
                                    <Card.Title  key={'cardTitle' + artistItem.name} className='text-center m-2'>
                                        {artistItem.name}
                                    </Card.Title>
                                    <Card.Img key={'cardImg' + artistItem.name} className='p-4 p-md-3' src={artistItem.images[0].url} alt='album art'/>
                                    <Card.Footer key={'cardFoot' + artistItem.name} className='m-2 p-0 pt-2 card-footer-formatting'>
                                        This artist is related to {usersTopArtists[index].name}
                                    </Card.Footer>
                                </Card>
                            </Col>  
                        )
                    })
                ) : (
                    // Render text if no data was returned
                        <h1>Sorry, no data is avilable</h1>
                )
                }
            </Row>
        </Fade>
    </div>
  )
}
