import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const GET_BOOK = gql`
    query getBook($book_id: Int!){
        getBook(id:$book_id){
                id
                bookTitle
                pdfUrl
        }
    }
`;
 
export function BookView(

){

    const { loading, error, data } = useQuery(GET_BOOK);
     
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={pageSection}>
            <h1>FakeBook</h1>
        </div>
    );
    
}

export default BookView