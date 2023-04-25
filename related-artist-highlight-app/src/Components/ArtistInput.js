import React, { useState } from 'react';
import { AritstsRelatedToSearch } from './AritstsRelatedToSearch';

export const ArtistInput = ({ setArtistSearch, searchResults, fetchSearch, renderDropdown }) => {
    // className='d-flex justify-content-right align-items-right mx-3'
    console.log('renderding of aritst input component: ', searchResults);
    return (
        <>
            <div> 
                <div className='d-flex justify-content-right align-items-right mx-3'>
                    <input className='rounded-pill px-md-3 ' type="text" name='search-text' id='search-text' placeholder='Search an artist' maxLength='75' onChange={(event) => setArtistSearch(event.target.value)} />
                    <button className='rounded-pill px-md-2 mx-md-1' onClick={fetchSearch}>Search</button>
                </div>
                {searchResults.length !== 0 ?
                <div className='position-absolute mx-3 mt-1 p-2 bg-black shadow-lg rounded-3 overflow-y-auto'> 
                    <ul className='m-0 p-0' style={{listStyleType: 'none'}}>
                        {renderDropdown()}
                    </ul>   
                </div> :
                null}
            </div>       
        </>
 )
}
