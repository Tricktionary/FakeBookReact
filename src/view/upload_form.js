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

    return (
        <div>
          <form
            onSubmit={e => {
              console.log("TEST");
              e.preventDefault();
              uploadMutation({ variables: { type: input.value } });
              input.value = '';
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button className="ui button" type="submit">Add Todo</button>
          </form>
        </div>
      );
    
}

export default UploadForm