import React, { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import axios from 'axios';

// Compoonent to display the 3 auto recommendations based on the users favorite artists
export const AutoRecomendations = ({ usersTopArtists, accessToken }) => {
    const [ relatedArtists, setRelatedArtists ] = useState([]);
    
    // const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (usersTopArtists.length === 0) return;
        console.log('useEffect ran')
        // break out of this if accessToken or users top artists aren't present
        if (!usersTopArtists || !accessToken) return;
        axios.post('http://localhost:3001/relatedToTopArtists', { accessToken, usersTopArtists })
            .then(res => setRelatedArtists(res.data.vals))
            .catch(err => console.log(err));
    }, [usersTopArtists, accessToken])

    // console.log(relatedArtists, usersTopArtists, spotifyApi)
  return (
    <div className='pt-1 p-3 mt-1 m-3 text-center align-items-center justify-content-center' style={{marginBottom: '10px'}}>
        <Row>
            {relatedArtists.length !== 0 ? (
                relatedArtists.map((artistItem, index) => {
                    return (
                        <Col className='d-flex align-items-stretch' key={'col' + artistItem.name}>
                            <Card className='card-style w-100 h-100'> 
                                <Card.Title  key={'cardTitle' + artistItem.name} className='text-center m-3'>
                                    {artistItem.name}
                                </Card.Title>
                                <Card.Img key={'cardImg' + artistItem.name} className='mx-auto card-img-formatting' src={artistItem.images[0].url} alt='album art'/>
                                <Card.Footer key={'cardFoot' + artistItem.name} className='m-2 card-footer-formatting'>
                                    This artist is related to {usersTopArtists[index].name}
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })
            ) : (
                <h1>Sorry, no data is avilable</h1>
            )
            }
        </Row>
    </div>
  )
}
