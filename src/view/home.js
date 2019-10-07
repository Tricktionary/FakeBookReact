import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const height = {
    height: "300px"
}

const GET_ALL_THINGS = gql`
    query allThings($bookCursor: String!, $songCursor:String!){
        allSongs(first:10, after:$songCursor){
            pageInfo{
                endCursor
            }
            nodes {
                id
                name
            }
        }
        allBooks(first:10, after:$bookCursor){
            pageInfo{
                    endCursor
            }
            nodes {
                id
                bookTitle
            }
        }  
    }
`

export function Home(prop){
    
    const [bookCursor, setBookCursor] = useState("");
    const [songCursor, setSongCursor] = useState("");

    const { loading, error, data } = 
        useQuery(GET_ALL_THINGS,  
            {
                variables: { 
                    bookCursor: bookCursor,
                    songCursor: songCursor
                }
            }
        );
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={pageSection} >
            <h1>FakeBook</h1>
            
            <div className="ui grid"> 
            
                <div className="eight wide column">
                    <div className="row" style={height}>
                        <h3>Books</h3>
                        {data.allBooks.nodes.map( ({ id, bookTitle }) => (
                            <div key={id}>
                                <a href={"/book/"+id}> Book:{bookTitle} </a>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="floatDown">
                            <button className="ui button">
                                Prev
                            </button>
                            <button className="ui button">
                                Next
                            </button>
                        </div>
                    </div>
                </div>    

                <div className="eight wide column"> 
                    <div className="row" style={height}> 
                        <h3>Songs</h3>
                        {data.allSongs.nodes.map( ({ id, name }) => (
                            <div key={id}>
                                <a href={"/song/"+id}> Song: {name} </a>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="floatDown">
                            <button className="ui button">
                                Prev
                            </button>
                            <button className="ui button">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    );
    
}

export default Home