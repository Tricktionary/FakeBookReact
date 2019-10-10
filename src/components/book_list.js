import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const height = {
    marginTop: "300px"
}


const GET_BOOKS = gql`
    query allThings($bookCursor: String!){
        books(first:10, after:$bookCursor){
            pageInfo{
                endCursor
                hasNextPage
            }
            nodes {
                id
                title
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
            setBooks(books.concat(data.books.nodes));
        }
    }, [data, error, loading])


    function loadMore(){
        fetchMore({
            variables: {
                bookCursor: data.books.pageInfo.endCursor
            },
            updateQuery: ( previousResult, { fetchMoreResult }) => {
                const newData = fetchMoreResult.books.nodes
                const pageInfo = fetchMoreResult.books.pageInfo;
                setBookCursor(pageInfo.endCursor);
                setBooks(books.concat(newData))
            }
        })
    }

    return (
        <div>
            <div className="row">
                <h3>Books</h3>
                {books.map( ({ id, title }) => (
                    <div key={id}>
                        <a href={"/book/"+id}> Book:{title} </a>
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