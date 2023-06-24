import React, { useEffect, useState } from 'react';
import { AutoRecomendations } from '../Components/AutoRecommendations';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card'
import axios from 'axios';

// Compoonent to display the 3 auto recommendations based on the user's favorite artists
export const AutoRecomendationsContainer = ({ usersTopArtists, accessToken }) => {
    const [ relatedArtists, setRelatedArtists ] = useState([]);

    useEffect(() => {
        if (usersTopArtists.length === 0) return;
        // break out of this if accessToken or users top artists aren't present
        if (!usersTopArtists || !accessToken) return;
        axios.post('http://localhost:3001/relatedToTopArtists', { accessToken, usersTopArtists })
            .then(res => setRelatedArtists(res.data.vals))
            .catch(err => console.log(err));
    }, [usersTopArtists, accessToken])

    return < AutoRecomendations usersTopArtists={usersTopArtists} relatedArtists={relatedArtists} />
}