import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export const AritstsRelatedToSearch = ({ returnedSearchArists, clickedOnArtistName }) => {
    console.log('rendering artist cards: ', returnedSearchArists)
    // function for rendering the three related artists cards
    const renderRetrunedSearchAritsts = () => {
    return returnedSearchArists.map((artistItem, index) => {
        const genresArray = [...artistItem.genres];
        return (
            <Col className='d-flex align-items-stretch' key={'col' + artistItem.name}>
                <Card className='card-style h-100 w-100'> 
                    <Card.Title  key={'cardTitle' + artistItem.name} className='text-center m-3'>
                        {artistItem.name}
                    </Card.Title>
                    <Card.Img key={'cardImg' + artistItem.name} className='mx-auto' style={{width: '50%', height: '50%'}} src={artistItem.images[0].url} alt='album art'/>
                    {/* <Card.Body>
                        <Card.Text style={{textAlign: 'left'}}>This artist is related to {clickedOnArtistName}</Card.Text>
                    </Card.Body> */}
                    <Card.Footer key={'cardFoot' + artistItem.name} className='m-2' style={{textAlign: 'left'}}>
                        Genres: {genresArray.splice(0, 4).join(', ')}
                        {/* This artist is related to {clickedOnArtistName} */}
                    </Card.Footer>
                </Card>
            </Col>
        )
    })
  }

    return (
        <>
            <div className='p-3 m-3 text-center align-items-center justify-content-center' style={{marginBottom: '10px'}}>
                <Row>
                    {renderRetrunedSearchAritsts()}
                </Row>
                <p className='m-4 p-3' style={{color: '#a0e0f2'}}>Search results are randomly generated from 7 related artists with the lowest popularity ratings. If you serach the same artist again
                    you will likely get some different reccomendations.
                </p>
            </div>
        </>
  )
}
