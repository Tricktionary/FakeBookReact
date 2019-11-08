import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EditSongModal from '../components/edit_modal_song'

 
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

const GET_SONG = gql`
    query getSong($id: Int!){
        getSong(id:$id){
            id
            name
            pdfUrl
    		book{
                id
                title
            }
        }
    }
`;
  
export function SongView(props){
    console.log(props)
    const { loading, error, data } = useQuery(GET_SONG, { variables: { id: parseInt(props.match.params.id) } });
     
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div style={pageSection}>
            <h1>View Song: {data.getSong.name}</h1>
            <EditSongModal song_name={data.getSong.name} song_id={props.match.params.id} />
            <a  href={"/book/"+data.getSong.book.id} >Go to book: {data.getSong.book.title}</a>
            <iframe title="song_frame" src={data.getSong.pdfUrl} style={pdfWindow}></iframe>
        </div>
    );
    
}

export default SongView