import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const marginTop = {
    marginTop: '20px'
}
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}


const SUBMIT_FORM = gql`
        mutation{
            createSong( name:"test", pageRangeStart:1, pageRangeEnd:3, pageCount:4){
                song{
                    name
                }
            }
        }
`;


export function UploadForm(){
    let input;
    const [uploadMutation, { data }] = useMutation(SUBMIT_FORM);

    let handleSubmit = function(e){
        e.preventDefault();
        console.log(input.value);
        uploadMutation(
            { 
                variables: {
                    type: input.value 
            } 
        })
        input.value = '';
        ;
    }
    return (
        <div style={pageSection}>
            <h1>Song Upload Form</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Song Name</label>
                    <input type="text" placeholder="Song Name" ref={node => { input = node; }}/>
                </div>
                
                <button className="ui button green" type="submit">Add Todo</button>
            </form>
        </div>
      );
    
}

export default UploadForm