import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const GET_ALL_SONGS = gql`
    query allBooks {
        allBooks{
            id
            bookTitle
            pdfUrl
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
            {data.allBooks.map( ({ id, bookTitle, pdfUrl }) => (
                <div key={id}>
                    <a href={"/book/"+id}> Book:{bookTitle} </a>
                </div>
            ))}
        </div>
    );
    
}

export default Home