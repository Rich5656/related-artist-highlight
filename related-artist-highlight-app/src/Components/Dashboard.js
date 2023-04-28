import React, { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { Footer } from './Footer';
import { AutoRecomendations } from './AutoRecomendations';
import { Header } from './Header';
import { AritstsRelatedToSearch } from './AritstsRelatedToSearch';
import axios from 'axios';
import Pulse from 'react-reveal/Pulse';

export const Dashboard = ({ code }) => {
    // state compnoents
    const [ usersTopArtists, setUsersTopArtists ] = useState([]);
    const [ artistSearch, setArtistSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ returnedSearchArists, setReturnedSearchArtists ] = useState([]);

    // setting access token to pass to back end for API calls
    const accessToken = useAuth(code);
    

    useEffect(() => {
        if (!accessToken) return; 

        // getting top 3 artists or fewer if fewer are avilable
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
        // make sure no search results are rendered when there are no results
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
                            <Pulse>
                                <p className='m-5 w-90 introduction-paragraph'>Discover some lesser-known artist that are similar to your favorites! You can explore some of the automatically-generated higlights below
                                (based on your current favorite artists), or search for reccomendations of any artist of your choice.
                                </p>
                            </Pulse>
                        </div>  
                        <AutoRecomendations usersTopArtists={usersTopArtists} accessToken={accessToken} />
                        <h3>Search Results:</h3>
                        {
                        returnedSearchArists.length !== 0 ? 
                        // render the display when serach results have been returned
                        <AritstsRelatedToSearch returnedSearchArists={returnedSearchArists}/> :
                        // else render text advising use of search functionality 
                        <h5 className='text-center p-3'>Search an artist and checkout some artist that are related!</h5>
                        } 
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
  )
}
