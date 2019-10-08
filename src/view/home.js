import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const height = {
    marginTop: "300px"
}

const GET_ALL_THINGS = gql`
    query allThings($bookCursor: String!, $songCursor:String!){
        allSongs(first:10, after:$songCursor){
            pageInfo{
                endCursor
                hasNextPage
            }
            nodes {
                id
                name
            }
        }
        allBooks(first:10, after:$bookCursor){
            pageInfo{
                endCursor
                hasNextPage
            }
            nodes {
                id
                bookTitle
            }
        }  
    }
`

export function Home(){
    
    const [bookCursor, setBookCursor] = useState("");
    const [songCursor, setSongCursor] = useState("");

    const { loading, error, data, fetchMore} = 
        useQuery(GET_ALL_THINGS,  
            {
                variables: { 
                    bookCursor: bookCursor,
                    songCursor: songCursor
                }
            }
        );
    
    function loadMore(e){
        console.log("Next "+ e.target.name);
        switch(e.target.name){
            case "nextBook":
                fetchMore({
                    variables: {
                        bookCursor: data.allBooks.pageInfo.endCursor
                    },
                    updateQuery: ( previousResult, { fetchMoreResult }) => {
                        const newData = fetchMoreResult.allBooks.nodes
                        const pageInfo = fetchMoreResult.allBooks.pageInfo;
                    }
                })
                break;
            case "nextSong":
                fetchMore({
                    variables: {
                        songCursor: data.allSongs.pageInfo.endCursor
                    },
                    updateQuery: ( previousResult, { fetchMoreResult }) => {
                        const newData = fetchMoreResult.allSongs.nodes
                        const pageInfo = fetchMoreResult.allSongs.pageInfo;
                    }
                })
                break;
            default:
                break;
        }
    }
 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        
        <div style={pageSection} >
            <h1>FakeBook</h1>
            
            <div className="ui grid"> 

                <div className="eight wide column">
                    <div className="row">
                        <h3>Books</h3>
                        {data.allBooks.nodes.map( ({ id, bookTitle }) => (
                            <div key={id}>
                                <a href={"/book/"+id}> Book:{bookTitle} </a>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="floatDown" style={height}>
                            <button name="nextBook" className="ui button" onClick={loadMore}>
                                More
                            </button>
                        </div>
                    </div>
                </div>    

                <div className="eight wide column"> 
                    <div className="row"> 
                        <h3>Songs</h3>
                        {data.allSongs.nodes.map( ({ id, name }) => (
                            <div key={id}>
                                <a href={"/song/"+id}> Song: {name} </a>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="floatDown" style={height}>
                            <button name="nextSong" className="ui button" onClick={loadMore}>
                                More
                            </button>
                        </div>
                    </div>
                </div>

                
            </div>

        </div>
    );
    
}

export default Home