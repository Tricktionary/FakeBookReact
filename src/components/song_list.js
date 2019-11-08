import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const height = {
    marginTop: "300px"
}


const GET_SONGS = gql`
    query allSongs( $songCursor:String! ){
        songs(first:10, after:$songCursor){
            pageInfo{
                endCursor
                hasNextPage
            }
            nodes {
                id
                name
            }
        }
    }
`

export function SongList(){
    const [songs, setSongs] = useState([]);
    const [songCursor, setSongCursor] = useState("");

    const { loading, error, data, fetchMore} = 
        useQuery(GET_SONGS,  
            {
                variables: { 
                    songCursor: songCursor
                }
            }
        );

    // On Load
    useEffect(() => {
        if(!error && !loading){
            console.log(data);
            setSongs(songs.concat(data.songs.nodes));
        }
    }, [data, error, loading])

    // Load more song data 
    function loadMore(){
        fetchMore({
            variables: {
                songCursor: data.songs.pageInfo.endCursor
            },
            updateQuery: ( previousResult, { fetchMoreResult }) => {
                const newData = fetchMoreResult.songs.nodes
                const pageInfo = fetchMoreResult.songs.pageInfo;
                setSongCursor(pageInfo.endCursor);
                setSongs(songs.concat(newData))
            }
        })
    }
    
    

    return(
        <div> 
            <div className="row"> 
                <h3>Songs</h3>
                {songs.map( ({ id, name }) => (
                    <div key={id}>
                        <a href={"/song/"+id}> Song: {name} </a>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="floatDown" style={height}>
                    <button name="moreSong" className="ui button" onClick={loadMore}>
                        More
                    </button>
                </div>
            </div>
        </div>
    )
}


export default SongList