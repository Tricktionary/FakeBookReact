import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const GET_ALL_SONGS = gql`
    query{
        allBooks{
            id
            bookTitle
        }
        allSongs{
            id
            name
        }
    }
`;

export function Home(){

    const { loading, error, data } = useQuery(GET_ALL_SONGS);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={pageSection} >
            <h1>FakeBook</h1>
            
            <div class="ui grid"> 
                <div class="eight wide column">
                    <h3>Books</h3>
                    {data.allBooks.map( ({ id, bookTitle }) => (
                        <div key={id}>
                            <a href={"/book/"+id}> Book:{bookTitle} </a>
                        </div>
                    ))}
                </div>

                
                <div class="eight wide column"> 
                    <h3>Songs</h3>
                    {data.allSongs.map( ({ id, name }) => (
                        <div key={id}>
                            <a href={"/song/"+id}> Song: {name} </a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
    
}

export default Home