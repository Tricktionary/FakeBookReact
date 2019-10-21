import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
} 
  
const GENERAL_SEARCH = gql`
    query search($name: String!){
        songs(name:$name){
            nodes{
                id
                name
                book{
                    title
                    id
                }
            }
        }
        books(title:$name){
            nodes{
                id
                title
            }
        }
    }
`

export function GeneralSearchView(){  
    const [name, setName] = useState();
    
    const [search,{ called, loading, data }] = useLazyQuery(GENERAL_SEARCH);

    // Handle Form Submit
    let handleSubmit = function(e){
        e.preventDefault();
        console.log("Search")
        search({
            variables:{
                name:name
            }
        });
    }
    
    // Handle the input change
    let handleInputChange = function(e){
        switch(e.target.name){
            case "name":
                setName(e.target.value);
                break;
            default:
                break;
        }
    }
    if (!called) {
        return(
            <div style={pageSection}>
                <h1>Search</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Please input name of object" onChange={function(e){handleInputChange(e)}}/>
                    </div>
                    <div className="field"> 
                        <button className= 'ui button green' type="submit">Search</button>
                    </div>
                </form>
            </div>
        )
    }

    if (called && loading) return <p>Loading ...</p>

    if (data) {
        console.log(data);
    }
      
    return (
        <div style={pageSection}>
            <h1>Search Results</h1>
            
            <div className="ui grid"> 

                {/* Book View */}
                <div className="eight wide column">
                    <h3>Books</h3>
                    {data.books.nodes.map(book => (
                        <div key={book.id +"/" + book.title}>
                        <a href={"/book/"+book.id}> Book: {book.title} </a>
                        </div>
                    ))}
                </div>    
                
                {/* Song List */}
                <div className="eight wide column"> 
                    <h3>Songs</h3>
                    {data.songs.nodes.map(song => (
                        <div key={song.id+"/" + song.name}>
                        <a href={"/song/"+song.id}> Song: {song.name} FROM {song.book.title} </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );  
}

export default GeneralSearchView