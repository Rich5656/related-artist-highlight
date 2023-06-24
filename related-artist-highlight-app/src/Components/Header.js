import React from 'react'
import { ArtistInput } from './ArtistInput';

export const Header = ({ artistSearch, setArtistSearch, fetchSearch, renderDropdown, searchResults }) => {
  return (
    <>
      <div className='navbar bg-dark sticky-top justify-content-md-between justify-content-center'>
        <h2 className='text-center p-3'>Related Aritsts Highlights</h2>
        < ArtistInput 
          artistSearch={artistSearch} setArtistSearch={setArtistSearch}
          fetchSearch={fetchSearch} renderDropdown={renderDropdown} searchResults={searchResults}
        />
      </div> 
    </>
  )
}
