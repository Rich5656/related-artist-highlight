import React from 'react'
import { ArtistInput } from './ArtistInput';

export const Header = ({ spotifyApi, artistSearch, setArtistSearch, fetchSearch, renderDropdown, searchResults }) => {
  return (
    <>
      <div className='navbar bg-dark sticky-top'>
        <h2 className='text-center p-3'>Related Aritsts Highlight</h2>
        < ArtistInput spotifyApi={spotifyApi} artistSearch={artistSearch} setArtistSearch={setArtistSearch}
        fetchSearch={fetchSearch} renderDropdown={renderDropdown} searchResults={searchResults}
        />
      </div> 
    </>
  )
}
