import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
 
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const GET_BOOK = gql`
    query getBook($id: Int!){
        getBook(id:$id){
                id
                bookTitle
                pdfUrl
        }
    }
`;
  
export function BookView(props){
    console.log(props)
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { id: parseInt(props.match.params.id) } });
     
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={pageSection}>
            <h1>View Book</h1>

        </div>
    );
    
}

export default BookView