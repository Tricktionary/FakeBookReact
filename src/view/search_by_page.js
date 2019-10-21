import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
} 


const SEARCH_BY_PAGE = gql`
  query($title: String!, $pageNumber: Int!){
      searchSongByPage(title:$title,pageNumber:$pageNumber){
        nodes{
          id
          name
        }
    }
  }
`
  
export function SearchByPage(){  
 
  const [bookTitle, setBookTitle] = useState();
  const [pageNumber, setPageNumber] = useState();

  const [getBooks,{ called, loading, data }] = useLazyQuery(SEARCH_BY_PAGE);
  

  // Sets Search Params
  let handleSubmit = function(e){
    e.preventDefault();
    console.log("Search")
    getBooks({
      variables:{
        title: bookTitle,
        pageNumber: pageNumber 
      }
    });
  }

  // Handle Input change
  let handleInputChange = function(e){
      switch(e.target.name){
          case "bookTitle":
              setBookTitle(e.target.value);
              break;
          case "pageNumber":
              setPageNumber(parseInt(e.target.value));
              break;
          default:
              break;
      }
  }

  if (!called) {
    return (
      <div style={pageSection}>
        <h1>Search By Page</h1>
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book Tile</label>
                <input type="text" name="bookTitle" placeholder="Please input Book Title" onChange={function(e){handleInputChange(e)}}/>
            </div>
            <div className="field">
                <label>Page Number</label>
                <input type="number" name="pageNumber" placeholder="Please Page Number" onChange={function(e){handleInputChange(e)}}/>
            </div>
            <div className="field"> 
                <button className= 'ui button green' type="submit">Search</button>
            </div>
        </form>
    </div>
    )
  }

  if (called && loading) return <p>Loading ...</p>

  if (data && data.searchSongByPage) {
    console.log(data.searchSongByPage.nodes);
  }
  

  return (
    <div style={pageSection}>
      <h1>Search Results</h1>

      {data.searchSongByPage.nodes.map(song => (
        <div key={song.id}>
          <a href={"/song/"+song.id}> Song: {song.name} </a>
        </div>
      ))}

    </div>      
  );  
}

export default SearchByPage