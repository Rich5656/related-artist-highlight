import React, { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { Footer } from './Footer';
import { AutoRecomendations } from './AutoRecomendations';
import { Header } from './Header';
import { AritstsRelatedToSearch } from './AritstsRelatedToSearch';
import axios from 'axios';

export const Dashboard = ({ code }) => {
    // state compnoents
    const [ usersTopArtists, setUsersTopArtists ] = useState([]);
    const [ artistSearch, setArtistSearch ] = useState('');
    // state components that are set in ArtistInput and used in DisplaySearchResults
    const [ searchResults, setSearchResults ] = useState([]);
    const [ returnedSearchArists, setReturnedSearchArtists ] = useState([]);
    const [ clickedOnArtistName, setClickedOnArtistName ] = useState('');

    console.log(searchResults);
    // setting up api and setting access token
    const accessToken = useAuth(code);
    // setting access token
    // spotifyApi.setAccessToken(accessToken);

    useEffect(() => {
        if (!accessToken) return; 

        // getting top 3 or fewer if available are avilable
        axios.post('http://localhost:3001/topArtists', { accessToken })
            .then(res => {
                setUsersTopArtists(res.data.topArtistsArray);
            })
            .catch(err => {
                console.log(err)
            })
    }, [accessToken])


    // API query to get top 5 artists matching the user's search so they can choose the correct one
    const fetchSearch = (event) => {
        console.log('fetch Search is running: ')
        if (artistSearch.length === 0) {
            setSearchResults([]);
            return;
        }
        event.preventDefault();

        axios.post('http://localhost:3001/searchArtist', { artistSearch, accessToken })
            .then(res => {
                setSearchResults(res.data.topFive);
            })
            .catch(err => console.log(err));
    };

    
    const renderDropdown = () => {
        console.log('RenderDropdown is running: ', searchResults)
        // make sure no serach results are rendered when it is empty
        if (searchResults.length === 0) return;

        // rendering the top five search results in dropdown so the user can pick the correct one if it is not the first result
        return searchResults.map(artistItem => {
            return (<li className='m-0 p-0' onClick={(event) => getArtistsRelatedToSearch(event, artistItem.id, artistItem.name)}  key={artistItem.id}>{artistItem.name}</li>)
        });
    }

    const getArtistsRelatedToSearch = (event, id, name) => {
        event.preventDefault();
        
        // Clearing the dropdown menu
        setSearchResults([]);

        //setting the clicked on artists name
        setClickedOnArtistName(name);

        axios.post('http://localhost:3001/relatedArtists', { id, accessToken })
            .then(res => setReturnedSearchArtists(res.data.relatedArtistsResults))
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className='main-style'>
                <Header artistSearch={artistSearch} setArtistSearch={setArtistSearch} 
                fetchSearch={fetchSearch} renderDropdown={renderDropdown} searchResults={searchResults}
                />
            </div>
            <div className='d-flex justify-content-center align-itmes-center'>
                <div className='d-flex main-style w-75 justify-content-center align-items-center'>
                    <div>   
                        <div className='d-flex text-center justify-content-center align-items-center'>
                            <p className='m-5 w-90 introduction-paragraph'>Discover some lesser-known artist that are similar to your favorites! You can explore some of the automatically-generated higlights below
                            (based on your current favorite artists), or search for reccomendations of any artist of your choice.
                            </p>
                        </div>  
                        <AutoRecomendations usersTopArtists={usersTopArtists} accessToken={accessToken} />
                        <h3>Search Results:</h3>
                        {
                        returnedSearchArists.length !== 0 ? 
                        <AritstsRelatedToSearch returnedSearchArists={returnedSearchArists} clickedOnArtistName={clickedOnArtistName}/> : 
                        <h5 className='text-center p-3'>Search an artist and checkout some artist that are related!</h5>
                        } 
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
  )
}
