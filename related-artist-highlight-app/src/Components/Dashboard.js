import React, { useEffect, useState } from 'react';
// import { useAuth } from './useAuth';
import { Footer } from './Footer';
import { AutoRecomendationsContainer } from '../Containers/AutoRecommendationsContainer';
import { Header } from './Header';
import { AritstsRelatedToSearch } from './AritstsRelatedToSearch';
// import axios from 'axios';

export const Dashboard = ({ 
    artistSearch, setArtistSearch, fetchSearch, renderDropdown, searchResults, usersTopArtists, accessToken, returnedSearchArists 
}) => {
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
                            <p className='m-5 w-90 introduction-paragraph fade-in'>
                                Discover some lesser-known artist that are similar to your favorites! You can explore some of the automatically-generated higlights below
                                (based on your current favorite artists), or search recommendations for any artist of your choice.
                            </p>
                        </div>  
                        <AutoRecomendationsContainer usersTopArtists={usersTopArtists} accessToken={accessToken} />
                        <h3 className='fade-in'>Search Results:</h3>
                        {
                        returnedSearchArists.length !== 0 ? 
                        // render the display when serach results have been returned
                        <AritstsRelatedToSearch returnedSearchArists={returnedSearchArists}/> :
                        // else render text advising use of search functionality 
                        <h5 className='text-center p-3 fade-in'>Search an artist and checkout some artist that are related!</h5>
                        } 
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
  )
}
