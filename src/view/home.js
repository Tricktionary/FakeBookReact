import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const GET_ALL_SONGS = gql`
    query allSongs {
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
        <div style={pageSection}>
            <h1>FakeBook</h1>
            {data.allSongs.map( ({ id, name }) => (
                <div>
                    {id}: {name}
                </div>
            ))}
            </div>
    );
    
}

export default Home