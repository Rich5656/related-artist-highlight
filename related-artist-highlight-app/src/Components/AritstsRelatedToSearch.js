import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Fade from 'react-reveal/Fade';

export const AritstsRelatedToSearch = ({ returnedSearchArists }) => {
    // function for rendering the three related artists cards
    const renderRetrunedSearchAritsts = () => {
    return returnedSearchArists.map((artistItem, index) => {
        const genresArray = [...artistItem.genres];
        return (
                <Col className='d-flex align-items-center col-12 col-md-4' key={'col' + artistItem.name}>
                    <Card className='card-style w-100 h-90 mb-4 justify-content-center'> 
                        <Card.Title  key={'cardTitle' + artistItem.name} className='text-center m-3'>
                            {artistItem.name}
                        </Card.Title>
                        <Card.Img key={'cardImg' + artistItem.name} className='p-4 p-md-3' src={artistItem.images[0].url} alt='album art'/>
                        <Card.Footer key={'cardFoot' + artistItem.name} className='m-2 p-0 pt-2 card-footer-formatting'>
                            Genres: {genresArray.splice(0, 4).join(', ')}
                        </Card.Footer>
                    </Card>
                </Col>
        )
    })
  }

    return (
        <>
            <div className='p-3 m-3 text-center align-items-center justify-content-center'>
                <Fade right>
                    <Row className='justify-content-center'>
                        {renderRetrunedSearchAritsts()}
                    </Row>
                </Fade>
                <p className='m-4 p-3 search-information-text'>Search results are randomly generated from 7 related artists with the lowest popularity ratings. If you serach the same artist again
                    you will likely get some different recommendations.
                </p>
            </div>
        </>
  )
}
