import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const height = {
    marginTop: "300px"
}


const GET_BOOKS = gql`
    query allThings($bookCursor: String!){
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


export function BookList(){
    const [bookCursor, setBookCursor] = useState("");
    const [books, setBooks] = useState([]);

    const { loading, error, data, fetchMore} = 
        useQuery(GET_BOOKS,  
            {
                variables: { 
                    bookCursor: bookCursor,
                 }
            }
        );

    // On Load
    useEffect(() => {
        if(!error && !loading){
            console.log(data);
            setBooks(data.allBooks.nodes);
        }
    }, [data, error, loading])


    function loadMore(){
        fetchMore({
            variables: {
                bookCursor: data.allBooks.pageInfo.endCursor
            },
            updateQuery: ( previousResult, { fetchMoreResult }) => {
                const newData = fetchMoreResult.allBooks.nodes
                const pageInfo = fetchMoreResult.allBooks.pageInfo;
            }
        })
    }

    return (
        <div>
            <div className="row">
                <h3>Books</h3>
                {books.map( ({ id, bookTitle }) => (
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

    )
}

export default BookList