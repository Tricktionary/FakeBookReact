import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EditBookModal from '../components/edit_modal_book'
import ViewSongModal from '../components/view_song_modal'

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}
const pdfWindow = {
    marginLeft: '5%',
    width: '100%',
    height: '1000px'
}

const GET_BOOK = gql`
    query getBook($id: Int!){
        getBook(id:$id){
                id
                title
                pdfUrl
                song{
                    name
                    id
                }
        }
    }
`;

export function BookView(props){
    const { loading, error, data } = useQuery(GET_BOOK, { variables: { id: parseInt(props.match.params.id) } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
 
    return (
        <div style={pageSection}>
            <h1>View Book: {data.getBook.title}</h1>
            <EditBookModal book_title={data.getBook.title} book_id={data.getBook.id}/>
            <ViewSongModal book_title={data.getBook.title} songs={data.getBook.song} />
            <iframe title="book_frame" src={data.getBook.pdfUrl} style={pdfWindow}></iframe>
        </div>
    );   
}

export default BookView